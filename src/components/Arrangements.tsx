import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

interface Tier {
  n: string;
  title: string;
  body: string;
  lines: string[];
  tariff: string;
  tariffNote?: string;
}

const TIERS: Tier[] = [
  {
    n: "01",
    title: "Private Estate Buyout",
    body: "Residential hire of all nine suites, the grounds, and daily housekeeping. The house is yours alone — staffed, serviced, and quiet.",
    lines: [
      "All 9 en-suite suites",
      "1,595 m² private grounds",
      "Daily housekeeping & on-site caretaker",
      "Minimum stay — 7 nights",
    ],
    tariff: "From €8,000 / week",
    tariffNote: "Peak-season tariffs quoted privately upon inquiry.",
  },
  {
    n: "02",
    title: "Full Hospitality Curation",
    body: "A hospitality layer arranged around the buyout — provisioned per stay, scaled to the party, and handled by the concierge desk.",
    lines: [
      "On-demand private chef",
      "Sommelier provisioning",
      "Yacht tender transfers",
      "Dedicated concierge",
    ],
    tariff: "Quoted per stay",
  },
  {
    n: "03",
    title: "Family Office & Advisory",
    body: "Confidential representation for principals, family offices, and appointed advisors — structured before any dates are discussed.",
    lines: [
      "Confidential representation",
      "NDA execution",
      "Fast-track calendar holds",
      "Protected broker commissions",
    ],
    tariff: "By private arrangement",
  },
];

export default function Arrangements() {
  return (
    <section id="arrangements" className="scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            kicker="Arrangements"
            title="Three ways to hold the house."
            lede="A limited number of weeks are released each season. Every arrangement begins with a conversation — quoted privately, confirmed in writing."
          />
        </Reveal>

        <div className="mt-14 grid gap-px border border-sand bg-sand md:grid-cols-3">
          {TIERS.map((tier, i) => (
            <Reveal key={tier.n} delayMs={i * 120} className="h-full">
              <article className="flex h-full flex-col bg-limestone p-8 md:p-10">
                <p className="font-mono text-[11px] tracking-[0.2em] text-bronze">
                  {tier.n}
                </p>
                <h3 className="mt-4 font-serif text-3xl font-light text-navy">
                  {tier.title}
                </h3>
                <p className="mt-4 text-sm font-light leading-relaxed text-stone">
                  {tier.body}
                </p>
                <ul className="mt-6 flex-1 space-y-3 border-t border-sand pt-6">
                  {tier.lines.map((line) => (
                    <li
                      key={line}
                      className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone"
                    >
                      {line}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 border-t border-sand pt-6">
                  <p className="font-serif text-2xl font-normal text-navy">
                    {tier.tariff}
                  </p>
                  {tier.tariffNote && (
                    <p className="mt-2 text-xs font-light leading-relaxed text-stone-light">
                      {tier.tariffNote}
                    </p>
                  )}
                  <a
                    href="#inquiry"
                    className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-navy transition-colors hover:text-bronze"
                  >
                    Request terms
                    <ArrowRight strokeWidth={1.5} className="h-3.5 w-3.5" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
