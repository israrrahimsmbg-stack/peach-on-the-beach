import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin, type ViteDevServer } from "vite";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { IncomingMessage, ServerResponse } from "node:http";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const PHOTOS_DIR = path.join(rootDir, "public", "images", "villa");
const INDEX_PATH = path.join(rootDir, "data", "photos.json");
const MAX_BODY_BYTES = 20 * 1024 * 1024; // 20 MB — room for a high-res JPEG
const MAX_FILE_BYTES = 15 * 1024 * 1024;
const SAFE_NAME = /^[\w-]+\.jpe?g$/i;

interface PhotoEntry {
  id: string;
  zone: string;
  src: string;
  caption: string;
  updatedAt: string;
}

async function readIndex(): Promise<PhotoEntry[]> {
  try {
    const raw = await fs.readFile(INDEX_PATH, "utf8");
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as PhotoEntry[]) : [];
  } catch {
    return [];
  }
}

async function writeIndex(entries: PhotoEntry[]): Promise<void> {
  await fs.mkdir(path.dirname(INDEX_PATH), { recursive: true });
  await fs.writeFile(INDEX_PATH, JSON.stringify(entries, null, 2) + "\n", "utf8");
}

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    let size = 0;
    req.on("data", (chunk: Buffer) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(new Error("payload too large"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

function json(res: ServerResponse, status: number, body: unknown): void {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

interface UploadPayload {
  filename?: unknown;
  zone?: unknown;
  caption?: unknown;
  dataUrl?: unknown;
}

async function handlePhotosApi(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<boolean> {
  const url = (req.url ?? "").split("?")[0];
  if (url !== "/api/photos") return false;

  if (req.method === "GET") {
    const entries = await readIndex();
    res.setHeader("Cache-Control", "no-store");
    json(res, 200, entries);
    return true;
  }

  if (req.method === "POST") {
    let payload: UploadPayload;
    try {
      payload = JSON.parse(await readBody(req)) as UploadPayload;
    } catch {
      json(res, 400, { error: "invalid JSON body" });
      return true;
    }

    const filename = typeof payload.filename === "string" ? payload.filename.trim() : "";
    if (!SAFE_NAME.test(filename)) {
      json(res, 400, { error: "filename must match [a-zA-Z0-9_-].jpg" });
      return true;
    }

    const dataUrl = typeof payload.dataUrl === "string" ? payload.dataUrl.replace(/\s+/g, "") : "";
    const match = /^data:image\/jpeg;base64,([A-Za-z0-9+/=]+)$/.exec(dataUrl);
    if (!match) {
      json(res, 400, { error: "dataUrl must be a base64-encoded image/jpeg data URL" });
      return true;
    }

    const buffer = Buffer.from(match[1], "base64");
    if (buffer.length === 0 || buffer.length > MAX_FILE_BYTES) {
      json(res, 413, { error: "image payload out of bounds" });
      return true;
    }

    await fs.mkdir(PHOTOS_DIR, { recursive: true });
    await fs.writeFile(path.join(PHOTOS_DIR, filename), buffer);

    const zone = typeof payload.zone === "string" && payload.zone.trim() ? payload.zone.trim() : "uncategorized";
    const caption = typeof payload.caption === "string" ? payload.caption.trim() : "";
    const id = filename.replace(/\.[^.]+$/, "");
    const entry: PhotoEntry = {
      id,
      zone,
      src: `/images/villa/${filename}`,
      caption,
      updatedAt: new Date().toISOString(),
    };

    const entries = await readIndex();
    const existing = entries.findIndex((e) => e.id === id);
    if (existing >= 0) entries[existing] = entry;
    else entries.push(entry);
    await writeIndex(entries);

    json(res, 201, entry);
    return true;
  }

  json(res, 405, { error: "method not allowed" });
  return true;
}

async function handleVillaImage(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<boolean> {
  const url = (req.url ?? "").split("?")[0];
  const prefix = "/images/villa/";
  if (!url.startsWith(prefix) || req.method !== "GET") return false;

  const name = decodeURIComponent(url.slice(prefix.length));
  if (!SAFE_NAME.test(name)) {
    res.statusCode = 404;
    res.end();
    return true;
  }

  try {
    const data = await fs.readFile(path.join(PHOTOS_DIR, name));
    res.statusCode = 200;
    res.setHeader("Content-Type", "image/jpeg");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.setHeader("Content-Length", data.length);
    res.end(data);
  } catch {
    res.statusCode = 404;
    res.end();
  }
  return true;
}

function photoMiddleware(): Plugin {
  return {
    name: "peach-photo-store",
    configureServer(server: ViteDevServer) {
      server.middlewares.use(async (req, res, next) => {
        try {
          if (await handlePhotosApi(req, res)) return;
          if (await handleVillaImage(req, res)) return;
        } catch {
          if (!res.headersSent) {
            res.statusCode = 500;
            res.end();
          }
          return;
        }
        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), photoMiddleware()],
});
