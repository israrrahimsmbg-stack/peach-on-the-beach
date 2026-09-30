import { useCallback, useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Reveal from "../components/Reveal";
import { GALLERY_SELECTS } from "../lib/selects";

export default function MinimalGallery() {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setIndex((i) =>
        i === null ? i : (i + dir + GALLERY_SELECTS.length) % GALLERY_SELECTS.length,
      ),
    [],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, step]);

  return (
    <section className="py-10 md:py-16">
      <div className="mx-auto max-w-2xl px-5 md:px-8">
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-stone-light">
            The House
          </p>
        </Reveal>
      </div>

      <div className="mx-auto mt-12 max-w-6xl space-y-16 px-5 md:space-y-24 md:px-8">
        {GALLERY_SELECTS.map((photo, i) => (
          <Reveal key={photo.id}>
            <figure>
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="block w-full cursor-zoom-in"
                aria-label={`Enlarge: ${photo.caption}`}
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  loading="lazy"
                  className="w-full object-cover"
                />
              </button>
              <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-stone-light">
                {photo.caption}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      {index !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/95 p-4 md:p-10"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={GALLERY_SELECTS[index].caption}
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-5 top-5 text-limestone/80 transition-colors hover:text-limestone"
            aria-label="Close"
          >
            <X strokeWidth={1.5} className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); step(-1); }}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 text-limestone/80 transition-colors hover:text-limestone md:left-8"
            aria-label="Previous photograph"
          >
            <ChevronLeft strokeWidth={1.5} className="h-8 w-8" />
          </button>
          <figure
            className="max-h-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={GALLERY_SELECTS[index].src}
              alt={GALLERY_SELECTS[index].caption}
              className="max-h-[82vh] w-auto object-contain"
            />
            <figcaption className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-limestone/70">
              {GALLERY_SELECTS[index].caption} · {index + 1} / {GALLERY_SELECTS.length}
            </figcaption>
          </figure>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); step(1); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-limestone/80 transition-colors hover:text-limestone md:right-8"
            aria-label="Next photograph"
          >
            <ChevronRight strokeWidth={1.5} className="h-8 w-8" />
          </button>
        </div>
      )}
    </section>
  );
}
