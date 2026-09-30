import { useState } from "react";
import { Coffee, Waves, Wine } from "lucide-react";
import { displaySrc, type ResolvedPhoto } from "../lib/photoStore";
import { photoById, usePhotos } from "../lib/usePhotos";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

interface Vignette {
  time: string;
  title: string;
  body: string;
  photoId: string;
  icon: typeof Coffee;
}

const VIGNETTES: Vignette[] = [
  {
    time: "Morning Stillness",
    title: "06:40 — the house before the day.",
    body: "Coffee on the shaded terrace, dawn light through the parasol pines, early laps in the heated pool. The house wakes quietly.",
    photoId: "pool-loungers",
    icon: Coffee,
  },
  {
    time: "Pampelonne & Club 55",
    title: "Midday — proximity without commotion.",
    body: "The beach clubs and yacht tenders of Pampelonne, minutes away. Return when you choose, to stone calm.",
    photoId: "pool-panorama",
    icon: Waves,
  },
  {
    time: "Evenings Under the Pines",
    title: "20:30 — dinner under starlight.",
    body: "Aperitifs at the travertine summer bar, then twelve seats around the alfresco table beneath the pines. The evening sets its own pace.",
    photoId: "dining-terrace",
    icon: Wine,
  },
];

function VignettePhoto({ photo }: { photo: ResolvedPhoto | undefined }) {
  const [loaded, setLoaded] = useState(false);
  if (!photo) return <div className="aspect-[16/10] w-full bg-limestone-dark" />;
  return (
    <div className="aspect-[16/10] w-full overflow-hidden bg-limestone-dark">
      <img
        src={displaySrc(photo)}
        alt={photo.caption}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover ${loaded ? "photo-sharp" : "photo-blur"}`}
      />
    </div>
  );
}

export default function Experience() {
  const photos = usePhotos();

  return (
    <section id="experience" className="scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            kicker="The Experience"
            title="The daily tempo."
            lede="Three movements of an ordinary day at the residence — morning, midday, evening."
          />
        </Reveal>

        <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
          {VIGNETTES.map((v, i) => {
            const Icon = v.icon;
            return (
              <Reveal key={v.time} delayMs={i * 120}>
                <article>
                  <VignettePhoto photo={photoById(photos, v.photoId)} />
                  <div className="mt-6 flex items-center gap-3">
                    <Icon strokeWidth={1.25} className="h-4 w-4 text-bronze" />
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-bronze">
                      {v.time}
                    </p>
                  </div>
                  <h3 className="mt-3 font-serif text-2xl font-light text-navy">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-sm font-light leading-relaxed text-stone">
                    {v.body}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
