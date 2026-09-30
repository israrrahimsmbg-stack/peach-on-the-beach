import { useState } from "react";
import { displaySrc, type ResolvedPhoto } from "../lib/photoStore";
import { photoById, usePhotos } from "../lib/usePhotos";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

interface Level {
  id: string;
  tab: string;
  mono: string;
  title: string;
  body: string;
  facts: Array<[string, string]>;
  photoIds: string[];
}

const LEVELS: Level[] = [
  {
    id: "level1",
    tab: "Level 1 — Top Floor",
    mono: "Level 01 · Top Floor",
    title: "The principal floor.",
    body: "The first-floor master suite holds the sea-view balcony and the limestone soaking bath, the living salon opening onto the upper terrace. The principal floor is acoustically separated from the guest and family levels below.",
    facts: [
      ["Master Suite", "First floor, private sea-view balcony"],
      ["Bathing", "Limestone soaking bath, double vanity"],
      ["Salon", "Sea aspect, upper-terrace access"],
    ],
    photoIds: [
      "salon",
      "master-bedroom",
      "upper-terrace",
      "master-bedroom-2",
      "bath-vanity",
      "bath-tub",
      "bath-vanity-wide",
    ],
  },
  {
    id: "ground",
    tab: "Ground Floor — Garden Level",
    mono: "Level 00 · Garden Level",
    title: "Suites on the lawn.",
    body: "Four en-suite guest suites open directly onto the private lawns — terrace doors, garden aspects, no corridors to cross. Caretaker quarters sit apart from the guest rooms; service stays invisible.",
    facts: [
      ["Guest Suites", "Four en-suite, direct lawn access"],
      ["Aspect", "Terrace doors, private lawns"],
      ["Service", "Independent caretaker quarters"],
    ],
    photoIds: [
      "guest-suite-garden",
      "guest-suite-1",
      "guest-suite-2",
      "guest-suite-terrace",
      "gallery-corridor",
    ],
  },
  {
    id: "family",
    tab: "Level 2 — Family Wing",
    mono: "Level 02 · Family Wing",
    title: "A wing of its own.",
    body: "Dedicated children's dormitories with an adjacent private nanny suite — a self-contained wing, separated by level so early nights and late dinners never meet.",
    facts: [
      ["Dormitories", "Dedicated children's rooms"],
      ["Nanny Suite", "Adjacent, private"],
      ["Separation", "Generational acoustic zoning"],
    ],
    photoIds: ["family-wing"],
  },
];

function LevelPhoto({ photo }: { photo: ResolvedPhoto }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <img
      src={displaySrc(photo)}
      alt={photo.caption}
      onLoad={() => setLoaded(true)}
      className={`h-full w-full object-cover ${loaded ? "photo-sharp" : "photo-blur"}`}
    />
  );
}

export default function SpatialArchitecture() {
  const photos = usePhotos();
  const [active, setActive] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(0);

  const level = LEVELS[active];
  const levelPhotos = level.photoIds
    .map((id) => photoById(photos, id))
    .filter((p): p is ResolvedPhoto => Boolean(p));
  const current = levelPhotos[Math.min(photoIdx, Math.max(0, levelPhotos.length - 1))];

  const selectLevel = (i: number) => {
    setActive(i);
    setPhotoIdx(0);
  };

  return (
    <section id="architecture" className="scroll-mt-20 bg-limestone-deep py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            kicker="Spatial Architecture"
            title="Three levels, three quiet zones."
            lede="The house is arranged for generational separation — principal, guests, and family each hold their own level, acoustically and spatially distinct."
          />
        </Reveal>

        <Reveal delayMs={100}>
          <div className="mt-12 flex flex-col gap-px border border-sand bg-sand sm:flex-row" role="tablist" aria-label="House levels">
            {LEVELS.map((l, i) => (
              <button
                key={l.id}
                role="tab"
                aria-selected={active === i}
                onClick={() => selectLevel(i)}
                className={`flex-1 px-6 py-4 text-left transition-colors ${
                  active === i ? "bg-navy" : "bg-limestone hover:bg-limestone-dark"
                }`}
              >
                <span
                  className={`font-mono text-[10px] uppercase tracking-[0.2em] ${
                    active === i ? "text-limestone/70" : "text-stone-light"
                  }`}
                >
                  {l.mono}
                </span>
                <span
                  className={`mt-1 block font-serif text-lg font-normal ${
                    active === i ? "text-limestone" : "text-navy"
                  }`}
                >
                  {l.tab}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        <div key={level.id} className="mt-px grid animate-fade-in gap-px border border-t-0 border-sand bg-sand lg:grid-cols-2">
          <div className="bg-limestone px-6 py-10 md:px-12 md:py-14">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-bronze">
              {level.mono}
            </p>
            <h3 className="mt-4 font-serif text-3xl font-light text-navy md:text-4xl">
              {level.title}
            </h3>
            <p className="mt-5 max-w-xl text-base font-light leading-relaxed text-stone">
              {level.body}
            </p>
            <dl className="mt-8 divide-y divide-sand border-y border-sand">
              {level.facts.map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-6 py-3.5">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-light">
                    {k}
                  </dt>
                  <dd className="text-right text-sm font-light text-navy">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="bg-limestone p-4 md:p-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-limestone-dark">
              {current && <LevelPhoto key={current.id} photo={current} />}
              {current && (
                <p className="absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-[0.2em] text-limestone/90">
                  {current.caption}
                </p>
              )}
            </div>
            {levelPhotos.length > 1 && (
              <div className="mt-3 grid grid-cols-4 gap-3 md:grid-cols-7">
                {levelPhotos.map((p, i) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPhotoIdx(i)}
                    aria-label={`Show photograph: ${p.caption}`}
                    className={`aspect-square overflow-hidden bg-limestone-dark transition-opacity ${
                      i === Math.min(photoIdx, levelPhotos.length - 1)
                        ? "outline outline-1 outline-offset-2 outline-bronze"
                        : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={displaySrc(p)}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
