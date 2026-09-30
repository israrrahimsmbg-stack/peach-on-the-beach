import { useState } from "react";
import { usePhotos, photoById } from "../lib/usePhotos";
import { displaySrc } from "../lib/photoStore";

const METRICS: Array<[string, string]> = [
  ["Interior Space", "550 m²"],
  ["Private Grounds", "1,595 m²"],
  ["Suites", "9 En-suite Bedrooms"],
  ["Care & Staff", "On-site Caretaker & Daily Housekeeping"],
  ["Tariff Baseline", "From €8,000 / wk"],
];

export default function Hero() {
  const photos = usePhotos();
  const hero = photoById(photos, "hero-aerial");
  const [loaded, setLoaded] = useState(false);

  return (
    <section id="top" className="pt-16 md:pt-[72px]">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-14 md:px-8 md:pt-20">
        <p className="animate-rise-in font-mono text-[10px] uppercase tracking-[0.28em] text-bronze">
          Pampelonne Beach · Ramatuelle · Saint-Tropez
        </p>
        <h1
          className="mt-6 max-w-3xl animate-rise-in font-serif text-5xl font-light leading-[1.05] text-navy md:text-7xl"
          style={{ animationDelay: "120ms" }}
        >
          A private residence above Pampelonne.
        </h1>
        <p
          className="mt-6 max-w-2xl animate-rise-in text-base font-light leading-relaxed text-stone md:text-lg"
          style={{ animationDelay: "220ms" }}
        >
          550 m² of interiors within 1,595 m² of pine grounds. Nine en-suite
          suites over three levels, minutes from the bay.
        </p>
      </div>

      <div className="mx-auto max-w-[1600px] px-0 md:px-8">
        <figure
          className="relative aspect-[16/10] w-full overflow-hidden bg-limestone-dark md:aspect-[21/9]"
          aria-label={hero?.caption ?? "The residence, pool and sea horizon."}
        >
          {hero && (
            <img
              src={displaySrc(hero)}
              alt={hero.caption}
              onLoad={() => setLoaded(true)}
              className={`h-full w-full object-cover ${loaded ? "photo-sharp" : "photo-blur"}`}
            />
          )}
          <figcaption className="absolute bottom-4 right-5 hidden font-mono text-[10px] uppercase tracking-[0.2em] text-limestone/90 md:block">
            {hero?.caption ?? ""}
          </figcaption>
        </figure>
      </div>

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <dl className="grid grid-cols-2 gap-px border-y border-sand bg-sand md:grid-cols-5">
          {METRICS.map(([label, value]) => (
            <div key={label} className="bg-limestone px-5 py-6">
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-light">
                {label}
              </dt>
              <dd className="mt-2 font-serif text-xl font-normal text-navy">
                {value}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-stone-light">
          Not listed on any portal. Particulars are shared privately, following
          introduction.
        </p>
      </div>
    </section>
  );
}
