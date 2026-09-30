import { useState } from "react";
import { HERO_SELECT } from "../lib/selects";

export default function MinimalHero() {
  const [loaded, setLoaded] = useState(false);

  return (
    <section id="top" className="relative flex h-[100svh] min-h-[560px] items-end">
      <img
        src={HERO_SELECT.src}
        alt={HERO_SELECT.caption}
        onLoad={() => setLoaded(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/25" />

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-14 md:px-8 md:pb-20">
        <p className="animate-rise-in font-mono text-[10px] uppercase tracking-[0.3em] text-limestone/80">
          Pampelonne · Ramatuelle · Saint-Tropez
        </p>
        <h1
          className="mt-5 animate-rise-in font-serif text-5xl font-light leading-[1.02] text-limestone md:text-7xl"
          style={{ animationDelay: "120ms" }}
        >
          Peach on the Beach
        </h1>
        <p
          className="mt-5 max-w-xl animate-rise-in text-base font-light leading-relaxed text-limestone/85 md:text-lg"
          style={{ animationDelay: "220ms" }}
        >
          A private residence above Pampelonne.
        </p>
        <a
          href="#inquiry"
          className="mt-8 inline-block animate-rise-in border-b border-limestone/50 pb-1 font-mono text-[10px] uppercase tracking-[0.24em] text-limestone transition-colors hover:border-limestone"
          style={{ animationDelay: "320ms" }}
        >
          Private inquiries
        </a>
      </div>
    </section>
  );
}
