import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { CONCIERGE_GREETING, whatsappLink } from "../config";

const NAV = [
  { label: "The Residence", href: "#residence" },
  { label: "Spatial Architecture", href: "#architecture" },
  { label: "The Experience", href: "#experience" },
  { label: "Peninsula", href: "#peninsula" },
  { label: "Arrangements", href: "#arrangements" },
  { label: "Advisors", href: "#advisors" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b border-sand bg-limestone/90 backdrop-blur-md transition-shadow ${
        scrolled ? "shadow-[0_1px_24px_rgba(26,44,61,0.06)]" : ""
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-[72px] md:px-8">
        <a href="#top" className="flex flex-col leading-none">
          <span className="font-serif text-xl font-normal tracking-wide text-navy">
            Peach on the Beach
          </span>
          <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.28em] text-stone-light">
            Pampelonne
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone transition-colors hover:text-navy"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={whatsappLink(CONCIERGE_GREETING)}
            target="_blank"
            rel="noreferrer"
            title="WhatsApp — Concierge Desk"
            className="inline-flex items-center gap-2 border border-sand-dark px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-navy transition-colors hover:border-navy"
          >
            <Phone strokeWidth={1.5} className="h-3.5 w-3.5" />
            Concierge Desk
          </a>
          <a
            href="#inquiry"
            className="inline-flex items-center bg-navy px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-limestone transition-colors hover:bg-bronze"
          >
            Private Inquiry
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center text-navy lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X strokeWidth={1.5} className="h-5 w-5" /> : <Menu strokeWidth={1.5} className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav
          className="border-t border-sand bg-limestone px-5 py-4 lg:hidden"
          aria-label="Mobile"
        >
          <div className="flex flex-col gap-1">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-sand py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-stone last:border-0 hover:text-navy"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-3 flex gap-3">
              <a
                href={whatsappLink(CONCIERGE_GREETING)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 border border-sand-dark px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-navy"
              >
                <Phone strokeWidth={1.5} className="h-3.5 w-3.5" />
                Concierge Desk
              </a>
              <a
                href="#inquiry"
                onClick={() => setOpen(false)}
                className="inline-flex flex-1 items-center justify-center bg-navy px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-limestone"
              >
                Private Inquiry
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
