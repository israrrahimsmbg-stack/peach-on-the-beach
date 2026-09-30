import { useEffect, useState } from "react";

export default function MinimalHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "border-b border-sand bg-limestone/95 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <a
          href="#top"
          className={`font-serif text-lg font-normal tracking-wide transition-colors ${
            scrolled ? "text-navy" : "text-limestone"
          }`}
        >
          Peach on the Beach
        </a>
        <a
          href="#inquiry"
          className={`font-mono text-[10px] uppercase tracking-[0.24em] transition-colors ${
            scrolled
              ? "text-stone hover:text-navy"
              : "text-limestone/90 hover:text-limestone"
          }`}
        >
          Private inquiry
        </a>
      </div>
    </header>
  );
}
