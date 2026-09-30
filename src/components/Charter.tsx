import { FileCheck, Phone, ShieldCheck } from "lucide-react";
import { CONCIERGE_GREETING, whatsappLink } from "../config";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const COMMITMENTS = [
  {
    icon: Phone,
    title: "Direct principal line",
    body: "Trade enquiries reach the principal's desk directly — no intermediary agencies, no relayed messages.",
  },
  {
    icon: ShieldCheck,
    title: "NDA compliance",
    body: "Non-disclosure executed before particulars are shared. Complete client privacy, as a matter of procedure.",
  },
  {
    icon: FileCheck,
    title: "Written commission guarantees",
    body: "Broker commissions agreed in writing, protected in full, and settled on confirmation.",
  },
];

export default function Charter() {
  return (
    <section id="advisors" className="scroll-mt-20 bg-limestone-deep py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            kicker="Advisors"
            title="A charter for trade partners."
            lede="For travel designers, concierge directors, and family offices placing clients at the residence — by referral and introduction. The terms below are standing commitments, not courtesies."
          />
        </Reveal>

        <div className="mt-14 grid gap-px border border-sand bg-sand md:grid-cols-3">
          {COMMITMENTS.map((c, i) => {
            const Icon = c.icon;
            return (
              <Reveal key={c.title} delayMs={i * 120} className="h-full">
                <div className="h-full bg-limestone p-8 md:p-10">
                  <Icon strokeWidth={1.25} className="h-5 w-5 text-bronze" />
                  <h3 className="mt-5 font-serif text-2xl font-light text-navy">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-sm font-light leading-relaxed text-stone">
                    {c.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delayMs={150}>
          <div className="mt-px flex flex-col items-start justify-between gap-6 border border-t-0 border-sand bg-limestone p-8 md:flex-row md:items-center md:p-10">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-bronze">
                Trade Enquiry Path
              </p>
              <p className="mt-3 max-w-xl text-sm font-light leading-relaxed text-stone">
                Fast-track calendar holds for vetted partners. Write via the
                Concierge Desk on WhatsApp, or use the private inquiry form —
                select “Travel Advisor / Family Office”.
              </p>
            </div>
            <a
              href={whatsappLink(CONCIERGE_GREETING)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center bg-navy px-6 py-3.5 font-mono text-[10px] uppercase tracking-[0.2em] text-limestone transition-colors hover:bg-bronze"
            >
              Concierge Desk — WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
