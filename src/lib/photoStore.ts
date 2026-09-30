/**
 * Photo store — cache-first client for GET /api/photos with an IndexedDB
 * offline fallback, plus the estate-manager upload path (POST /api/photos).
 *
 * Resolution order for reads:
 *   1. Live API (/api/photos) — refreshes the IndexedDB cache and the
 *      cached image blobs in the background.
 *   2. IndexedDB "last-known" index + cached blobs (object URLs).
 *   3. Bundled static fallback (works in a static production build).
 */
import { FALLBACK_PHOTOS } from "./fallbackPhotos";

export interface PhotoEntry {
  id: string;
  zone: string;
  src: string;
  caption: string;
  updatedAt: string;
}

export interface ResolvedPhoto extends PhotoEntry {
  /** Object URL for an offline-cached blob; otherwise undefined (use `src`). */
  objectUrl?: string;
}

const DB_NAME = "peach-photo-store";
const DB_VERSION = 1;
const META_STORE = "photo-index";
const BLOB_STORE = "photo-blobs";

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(META_STORE)) {
        db.createObjectStore(META_STORE, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(BLOB_STORE)) {
        db.createObjectStore(BLOB_STORE);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error ?? new Error("indexedDB open failed"));
  });
}

async function withStore(
  store: string,
  mode: IDBTransactionMode,
  // biome-ignore lint/suspicious/noExplicitAny: IDBRequest result types vary per call
  run: (s: IDBObjectStore) => IDBRequest<any>,
): Promise<unknown> {
  const db = await openDb();
  try {
    return await new Promise<unknown>((resolve, reject) => {
      const tx = db.transaction(store, mode);
      const req = run(tx.objectStore(store));
      req.onsuccess = () => resolve(req.result as unknown);
      req.onerror = () => reject(req.error ?? new Error("indexedDB request failed"));
    });
  } finally {
    db.close();
  }
}

const getAllMeta = async (): Promise<PhotoEntry[]> =>
  (await withStore(META_STORE, "readonly", (s) => s.getAll())) as PhotoEntry[];

const putMeta = (entry: PhotoEntry): Promise<void> =>
  withStore(META_STORE, "readwrite", (s) => s.put(entry)).then(() => undefined);

const clearMeta = (): Promise<void> =>
  withStore(META_STORE, "readwrite", (s) => s.clear()).then(() => undefined);

const getBlob = async (id: string): Promise<Blob | undefined> =>
  (await withStore(BLOB_STORE, "readonly", (s) => s.get(id))) as Blob | undefined;

const putBlob = (id: string, blob: Blob): Promise<void> =>
  withStore(BLOB_STORE, "readwrite", (s) => s.put(blob, id)).then(() => undefined);

/** Cache image blobs for offline use; never throws (best-effort, background). */
async function refreshBlobs(entries: PhotoEntry[]): Promise<void> {
  await Promise.allSettled(
    entries.map(async (entry) => {
      const res = await fetch(entry.src, { cache: "force-cache" });
      if (!res.ok) return;
      const blob = await res.blob();
      await putBlob(entry.id, blob);
    }),
  );
}

async function readFromCache(): Promise<ResolvedPhoto[]> {
  const cached = await getAllMeta();
  return Promise.all(
    cached.map(async (entry) => {
      try {
        const blob = await getBlob(entry.id);
        return blob ? { ...entry, objectUrl: URL.createObjectURL(blob) } : entry;
      } catch {
        return entry;
      }
    }),
  );
}

export async function getPhotos(): Promise<ResolvedPhoto[]> {
  // 1 — live API
  try {
    const res = await fetch("/api/photos", { cache: "no-store" });
    if (!res.ok) throw new Error(`api ${res.status}`);
    const entries = (await res.json()) as PhotoEntry[];
    if (!Array.isArray(entries)) throw new Error("malformed index");
    try {
      await clearMeta();
      await Promise.all(entries.map(putMeta));
      void refreshBlobs(entries);
    } catch {
      /* cache write failures must not break the read path */
    }
    return entries;
  } catch {
    /* fall through to offline sources */
  }

  // 2 — IndexedDB last-known index
  try {
    const cached = await readFromCache();
    if (cached.length > 0) return cached;
  } catch {
    /* fall through */
  }

  // 3 — bundled static fallback
  return FALLBACK_PHOTOS;
}

export interface UploadInput {
  filename: string;
  zone: string;
  caption: string;
  dataUrl: string;
}

function dataUrlToBlob(dataUrl: string): Blob {
  const [header, base64] = dataUrl.split(",");
  const mime = (/data:(.*?);base64/.exec(header ?? "") ?? [])[1] ?? "image/jpeg";
  const bytes = atob(base64 ?? "");
  const buf = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) buf[i] = bytes.charCodeAt(i);
  return new Blob([buf], { type: mime });
}

export async function uploadPhoto(input: UploadInput): Promise<PhotoEntry> {
  const res = await fetch("/api/photos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`upload failed (${res.status}) ${detail}`);
  }
  const entry = (await res.json()) as PhotoEntry;
  try {
    await putMeta(entry);
    await putBlob(entry.id, dataUrlToBlob(input.dataUrl));
  } catch {
    /* cache write failures must not break the upload path */
  }
  return entry;
}

export const displaySrc = (photo: ResolvedPhoto): string => photo.objectUrl ?? photo.src;
