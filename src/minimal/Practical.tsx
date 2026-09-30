import Reveal from "../components/Reveal";

const FACTS: Array<[string, string]> = [
  ["Location", "Above Pampelonne beach, Ramatuelle — minutes on foot to the bay and Club 55."],
  ["The house", "Five ensuite guest suites across three quiet levels, rooms for children and separate staff quarters. Heated pool, gym, hammam, gardens to the sea."],
  ["Good to know", "Nice airport about ninety minutes; Saint-Tropez port about ten. The beach clubs of Pampelonne are reached on foot."],
  ["Service", "On-site caretaker and daily housekeeping."],
  ["Stays", "Weekly stays, by private inquiry. Rates on request."],
  ["Shoots", "Select film and photography shoots, by private arrangement."],
  ["Parking", "Covered for three vehicles, five in total."],
  ["Privacy", "Offered directly by the owner. Exact location shared following verification; non-disclosure on request."],
];

export default function Practical() {
  return (
    <section className="py-24 md:py-36">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-stone-light">
            Particulars
          </p>
        </Reveal>
        <dl className="mt-10 border-t border-sand">
          {FACTS.map(([label, value]) => (
            <Reveal key={label}>
              <div className="grid gap-2 border-b border-sand py-7 md:grid-cols-[180px_1fr] md:gap-8">
                <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-stone-light md:pt-1">
                  {label}
                </dt>
                <dd className="font-serif text-xl font-light leading-relaxed text-navy md:text-2xl">
                  {value}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
