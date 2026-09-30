import Reveal from "../components/Reveal";

export default function Statement() {
  return (
    <section className="py-24 md:py-36">
      <div className="mx-auto max-w-2xl px-5 md:px-8">
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-stone-light">
            The Villa
          </p>
          <p className="mt-8 font-serif text-2xl font-light leading-snug text-navy md:text-[2rem]">
            Set behind the pines above Pampelonne beach, the house is arranged
            for long days outdoors and quiet evenings in — suites across three
            levels, a heated pool, and gardens that run toward the sea.
          </p>
          <p className="mt-8 text-base font-light leading-relaxed text-stone">
            Interiors keep the sixties and seventies they were built in, with a
            private collection of modern art throughout. The house is offered
            for private stays by the week, and for select film and photography
            shoots.
          </p>
          <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-stone-light">
            Particulars — calendar, rates, and the full dossier — are shared
            privately, following introduction.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
