import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type WheelEvent,
} from "react";
import {
  ChevronDown,
  ImagePlus,
  Maximize2,
  Minus,
  Plus,
  Upload,
  X,
} from "lucide-react";
import {
  displaySrc,
  uploadPhoto,
  type ResolvedPhoto,
} from "../lib/photoStore";
import { usePhotos } from "../lib/usePhotos";

/* ---------------------------------- data ---------------------------------- */

const ZONES: Array<{ id: string; title: string; note: string }> = [
  { id: "hero", title: "The Approach", note: "Arrival aspect" },
  { id: "exterior", title: "Grounds", note: "Villa, gardens, pine canopy" },
  { id: "pool", title: "Pool", note: "Heated pool, terraces, pool bar" },
  { id: "level1", title: "Level 1 — Top Floor", note: "Master suite, salon, bathing" },
  { id: "ground", title: "Garden Level", note: "Guest suites, gallery corridor" },
  { id: "family", title: "Family Wing", note: "Children's dormitories" },
  { id: "wellness", title: "Wellness", note: "Gym, hammam, massage" },
  { id: "experience", title: "The Experience", note: "Bar, kitchen, alfresco dining" },
];

const ACCEPT = "image/jpeg";

/* ------------------------------- blur-up img ------------------------------ */

function PhotoImg({
  photo,
  className = "",
  eager = false,
}: {
  photo: ResolvedPhoto;
  className?: string;
  eager?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <img
      src={displaySrc(photo)}
      alt={photo.caption}
      loading={eager ? "eager" : "lazy"}
      onLoad={() => setLoaded(true)}
      className={`${loaded ? "photo-sharp" : "photo-blur"} ${className}`}
    />
  );
}

/* --------------------------------- lightbox -------------------------------- */

function Lightbox({
  photos,
  index,
  onClose,
  onNavigate,
}: {
  photos: ResolvedPhoto[];
  index: number;
  onClose: () => void;
  onNavigate: (next: number) => void;
}) {
  const [zoom, setZoom] = useState(1);
  const photo = photos[index];

  useEffect(() => {
    setZoom(1);
  }, [index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((index + 1) % photos.length);
      if (e.key === "ArrowLeft")
        onNavigate((index - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, photos.length, onClose, onNavigate]);

  const onWheel = (e: WheelEvent) => {
    const next = Math.min(3, Math.max(1, zoom + (e.deltaY < 0 ? 0.25 : -0.25)));
    setZoom(Math.round(next * 100) / 100);
  };

  if (!photo) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-navy/[0.97]"
      role="dialog"
      aria-modal="true"
      aria-label="Photograph viewer"
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-5 py-4 md:px-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-limestone/70">
          {String(index + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
          {" — "}
          {photo.caption}
        </p>
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            aria-label="Zoom out"
            onClick={() => setZoom((z) => Math.max(1, Math.round((z - 0.5) * 100) / 100))}
            className="inline-flex h-10 w-10 items-center justify-center text-limestone/80 hover:text-limestone"
          >
            <Minus strokeWidth={1.5} className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Zoom in"
            onClick={() => setZoom((z) => Math.min(3, Math.round((z + 0.5) * 100) / 100))}
            className="inline-flex h-10 w-10 items-center justify-center text-limestone/80 hover:text-limestone"
          >
            <Plus strokeWidth={1.5} className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Close viewer"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center text-limestone/80 hover:text-limestone"
          >
            <X strokeWidth={1.5} className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        className="relative flex flex-1 items-center justify-center overflow-hidden px-4 pb-6 md:px-16"
        onWheel={onWheel}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Previous photograph"
          onClick={() => onNavigate((index - 1 + photos.length) % photos.length)}
          className="absolute left-2 z-10 hidden h-12 w-12 items-center justify-center border border-limestone/20 text-limestone/80 hover:text-limestone md:inline-flex"
        >
          <span className="font-serif text-2xl leading-none">←</span>
        </button>
        <div className="max-h-full overflow-auto">
          <img
            key={photo.id}
            src={displaySrc(photo)}
            alt={photo.caption}
            draggable={false}
            className="max-h-[74vh] w-auto animate-fade-in select-none object-contain"
            style={{ transform: `scale(${zoom})`, transformOrigin: "center" }}
          />
        </div>
        <button
          type="button"
          aria-label="Next photograph"
          onClick={() => onNavigate((index + 1) % photos.length)}
          className="absolute right-2 z-10 hidden h-12 w-12 items-center justify-center border border-limestone/20 text-limestone/80 hover:text-limestone md:inline-flex"
        >
          <span className="font-serif text-2xl leading-none">→</span>
        </button>
      </div>

      <p className="px-5 pb-5 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-limestone/50">
        Esc to close · Arrow keys to move · Scroll to zoom
      </p>
    </div>
  );
}

/* ------------------------------ curate upload ------------------------------ */

function CurateUpload({
  zone,
  onUploaded,
}: {
  zone: string;
  onUploaded: (photo: ResolvedPhoto) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sanitize = (name: string): string =>
    name
      .toLowerCase()
      .replace(/\.[^.]+$/, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 48) || `photo-${Date.now()}`;

  const onFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setError(null);
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = String(reader.result ?? "");
      if (!dataUrl.startsWith("data:image/jpeg")) {
        setError("JPEG files only.");
        return;
      }
      setBusy(true);
      try {
        const entry = await uploadPhoto({
          filename: `${sanitize(file.name)}.jpg`,
          zone,
          caption: file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " "),
          dataUrl,
        });
        onUploaded(entry);
      } catch {
        setError("Upload unavailable — the dev server API is offline.");
      } finally {
        setBusy(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="mt-4 flex items-center gap-3">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={busy}
        className="inline-flex items-center gap-2 border border-sand-dark px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-stone transition-colors hover:border-navy hover:text-navy disabled:opacity-50"
      >
        {busy ? <Upload strokeWidth={1.5} className="h-3.5 w-3.5 animate-pulse" /> : <ImagePlus strokeWidth={1.5} className="h-3.5 w-3.5" />}
        {busy ? "Uploading…" : "Curate photography"}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        className="hidden"
        onChange={onFile}
        aria-label={`Upload a photograph to ${zone}`}
      />
      {error && <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-bronze">{error}</p>}
    </div>
  );
}

/* --------------------------------- gallery --------------------------------- */

export default function Gallery() {
  const photos = usePhotos();
  const [overrides, setOverrides] = useState<ResolvedPhoto[]>([]);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const merged = [...photos];
  overrides.forEach((o) => {
    const i = merged.findIndex((p) => p.id === o.id);
    if (i >= 0) merged[i] = o;
    else merged.push(o);
  });

  const flat = ZONES.flatMap((z) => merged.filter((p) => p.zone === z.id));
  const openAt = useCallback(
    (id: string) => {
      const i = flat.findIndex((p) => p.id === id);
      if (i >= 0) setLightbox(i);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [merged.length],
  );

  return (
    <div>
      {ZONES.map((zone) => {
        const items = merged.filter((p) => p.zone === zone.id);
        if (items.length === 0) return null;
        return (
          <div key={zone.id} className="mt-14 first:mt-0">
            <div className="flex items-baseline justify-between border-b border-sand pb-4">
              <h3 className="font-serif text-2xl font-light text-navy">{zone.title}</h3>
              <p className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-stone-light md:block">
                {zone.note}
              </p>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
              {items.map((photo, i) => (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => openAt(photo.id)}
                  className="group relative block aspect-[4/3] w-full overflow-hidden bg-limestone-dark text-left"
                  aria-label={`View photograph: ${photo.caption}`}
                >
                  <PhotoImg
                    photo={photo}
                    eager={i < 2}
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute inset-0 flex items-end justify-between bg-navy/0 p-4 transition-colors group-hover:bg-navy/25">
                    <span className="max-w-[80%] font-mono text-[10px] uppercase tracking-[0.2em] text-limestone opacity-0 transition-opacity group-hover:opacity-100">
                      {photo.caption}
                    </span>
                    <Maximize2 strokeWidth={1.5} className="h-4 w-4 text-limestone opacity-0 transition-opacity group-hover:opacity-100" />
                  </span>
                </button>
              ))}
            </div>
            <CurateUpload
              zone={zone.id}
              onUploaded={(entry) => setOverrides((prev) => [...prev, entry])}
            />
          </div>
        );
      })}

      <details className="mt-14 border border-sand bg-limestone-deep px-5 py-4">
        <summary className="flex cursor-pointer items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-stone">
          <ChevronDown strokeWidth={1.5} className="h-3.5 w-3.5" />
          Photography notes for the estate manager
        </summary>
        <div className="mt-3 space-y-2 text-sm font-light leading-relaxed text-stone">
          <p>
            “Curate photography” uploads a JPEG into <span className="font-mono text-xs">public/images/villa/</span> via
            the dev-server API and registers it in <span className="font-mono text-xs">data/photos.json</span>.
            The index is served at <span className="font-mono text-xs">GET /api/photos</span>.
          </p>
          <p>
            Browsers keep a last-known copy in IndexedDB, so the gallery remains
            available offline.
          </p>
        </div>
      </details>

      {lightbox !== null && flat[lightbox] && (
        <Lightbox
          photos={flat}
          index={lightbox}
          onClose={() => setLightbox(null)}
          onNavigate={setLightbox}
        />
      )}
    </div>
  );
}
