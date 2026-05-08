"use client";

import { useEffect, useState } from "react";

export function Masthead() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-ink text-paper">
      <div className="mx-auto flex max-w-page items-center justify-between gap-6 px-6 py-3 md:py-4">
        <a href="#" className="flex items-baseline gap-3" aria-label="Annotedly home">
          <span className="text-paper font-sans text-[18px] font-bold tracking-[-0.01em]">ANNOTEDLY</span>
          <span className="hidden md:inline font-mono text-[11px] uppercase tracking-[0.18em] text-paper/60">
            § An-2026-W19
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-6 font-sans text-[13px] text-paper/80">
          <a href="#coverage" className="hover:text-paper">Coverage</a>
          <a href="#reseller" className="hover:text-paper">Resellers</a>
          <a href="#pricing" className="hover:text-paper">Pricing</a>
          <a href="#faq" className="hover:text-paper">FAQ</a>
        </nav>
        <a
          href="#pricing"
          className="border border-oxblood px-4 py-2 font-sans text-[13px] font-medium text-paper hover:bg-oxblood/20 transition-colors duration-150"
        >
          Open file →
        </a>
      </div>
      <div
        className={`h-px w-full transition-colors duration-200 ${
          scrolled ? "bg-oxblood" : "bg-paper/20"
        }`}
        aria-hidden
      />
    </header>
  );
}
