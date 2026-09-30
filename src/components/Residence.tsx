import Gallery from "./Gallery";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Residence() {
  return (
    <section id="residence" className="scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            kicker="The Residence"
            title="One house, presented in full."
            lede="An architectural 9-bedroom estate above Pampelonne — 550 m² of limestone interiors within 1,595 m² of pine grounds. Real photography, accurate facts, nothing beyond the walls."
          />
        </Reveal>

        <Reveal delayMs={120}>
          <div className="mt-12 border-t border-sand pt-10">
            <Gallery />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
