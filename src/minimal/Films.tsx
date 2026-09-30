import Reveal from "../components/Reveal";
import { FILMS } from "../lib/films";

export default function Films() {
  return (
    <section className="py-24 md:py-36">
      <div className="mx-auto max-w-2xl px-5 md:px-8">
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-stone-light">
            Films
          </p>
          {FILMS.length === 0 ? (
            <>
              <p className="mt-8 font-serif text-2xl font-light leading-snug text-navy md:text-[2rem]">
                Moving image of the house — the grounds, the light, the
                seasons — is available on private request.
              </p>
              <a
                href="#inquiry"
                className="mt-8 inline-block border-b border-navy/40 pb-1 font-mono text-[10px] uppercase tracking-[0.24em] text-navy transition-colors hover:border-navy"
              >
                Request films
              </a>
            </>
          ) : (
            <div className="mt-10 space-y-16">
              {FILMS.map((film) => (
                <figure key={film.id}>
                  {film.kind === "youtube" ? (
                    <div className="aspect-video w-full bg-limestone-dark">
                      <iframe
                        src={film.src}
                        title={film.title}
                        className="h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <video
                      src={film.src}
                      controls
                      preload="metadata"
                      className="w-full"
                    />
                  )}
                  <figcaption className="mt-3 flex items-baseline justify-between gap-4">
                    <span className="font-serif text-xl font-light text-navy">
                      {film.title}
                    </span>
                    <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-stone-light">
                      {film.note}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
