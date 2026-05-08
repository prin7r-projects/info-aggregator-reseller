export function ResellerMockup() {
  return (
    <section id="reseller" className="border-b border-rule">
      <div className="mx-auto max-w-page px-6 py-20 md:py-24">
        <div className="flex items-baseline justify-between border-b border-rule-soft pb-4 mb-12">
          <h2 className="font-mono text-[12px] uppercase tracking-[0.18em] text-ink-soft">
            White-label — what you change, what we hold
          </h2>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
            B-WL-26
          </span>
        </div>

        <div className="max-w-[60ch] mb-16">
          <p className="font-serif text-[28px] leading-[1.2] tracking-[-0.02em] text-ink mb-6">
            One <span className="under">body</span>. Two <span className="under">mastheads</span>.
            Same footnotes.
          </p>
          <p className="font-sans text-[16px] leading-[1.55] text-ink-2">
            Reseller-license clients ship the same dossier we ship — under their own
            masthead, with their accent, their logo, and their footer line. We
            pre-render two copies per issue: one for the Bureau house edition, one
            keyed to the reseller&rsquo;s style sheet. The body, the citations, and the
            dossier-IDs are byte-identical.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <DossierThumb
            label="House masthead"
            mastheadName="BUREAU"
            mastheadId="§ B-2026-W19"
            accent="oxblood"
            footerLine="Bureau · Set in Source Serif 4 · Issued under house sourcing standard B-SRC-26."
          />
          <DossierThumb
            label="Reseller masthead — Atelier Northrop"
            mastheadName="ATELIER NORTHROP"
            mastheadId="§ AN-2026-W19"
            accent="forest"
            footerLine="Atelier Northrop, Brussels · Distributed to AN private-client list · Sourced via Bureau B-SRC-26."
          />
        </div>

        <p className="mt-12 max-w-[60ch] font-sans text-[14px] text-ink-soft">
          What you can change: masthead wordmark, accent color, footer colophon,
          email-from name, and the URL the dossier lives at. What stays: the
          footnote system, the dossier-ID format, the editorial style guide, and
          the source list. Resellers can publish a Methodology page that points
          to ours; we make that easy.
        </p>
      </div>
    </section>
  );
}

function DossierThumb({
  label,
  mastheadName,
  mastheadId,
  accent,
  footerLine,
}: {
  label: string;
  mastheadName: string;
  mastheadId: string;
  accent: "oxblood" | "forest";
  footerLine: string;
}) {
  const accentClass =
    accent === "oxblood"
      ? "bg-oxblood text-paper"
      : "bg-[#1B3A2A] text-[#F4EDE0]";
  const accentDot = accent === "oxblood" ? "bg-oxblood" : "bg-[#1B3A2A]";

  return (
    <figure>
      <figcaption className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft mb-3">
        {label}
      </figcaption>
      <div className="border border-rule bg-paper rounded-plate overflow-hidden">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-rule-soft bg-paper-2 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rule-soft" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-rule-soft" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-rule-soft" aria-hidden />
          <span className="ml-3 font-mono text-[11px] text-ink-soft truncate">
            {accent === "oxblood"
              ? "info-aggregator-reseller.prin7r.com/issue/2026-w19"
              : "research.atelier-northrop.eu/dispatch/2026-w19"}
          </span>
        </div>
        {/* Masthead */}
        <div className={`${accentClass} px-6 py-3 flex items-baseline justify-between`}>
          <span className="font-sans font-bold text-[16px] tracking-[-0.01em]">
            {mastheadName}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-70">
            {mastheadId}
          </span>
        </div>
        {/* Body */}
        <div className="px-6 py-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft mb-2">
            Issue 2026-W19 · Fintech · 24 Sources
          </p>
          <h4 className="font-serif text-[20px] leading-[1.2] tracking-[-0.02em] text-ink mb-4">
            Brokered deposits&mdash;what changed and who pays
          </h4>
          <div className="space-y-2 mb-5">
            <div className="h-2 w-full bg-rule-soft" />
            <div className="h-2 w-[92%] bg-rule-soft" />
            <div className="h-2 w-[78%] bg-rule-soft" />
            <div className="h-2 w-[88%] bg-rule-soft" />
          </div>
          {/* Footnote ledger */}
          <div className="border-t border-rule-soft pt-3 grid grid-cols-2 gap-x-4 gap-y-1.5">
            {["[1] § FED-25-1144", "[2] § OCC-IL-1188", "[3] § CFPB-EM-26-04", "[4] § ESMA-26-Q2"].map(
              (cite) => (
                <span key={cite} className="font-mono text-[10px] text-ink-soft truncate">
                  {cite}
                </span>
              ),
            )}
          </div>
        </div>
        {/* Footer */}
        <div className="border-t border-rule-soft px-6 py-3 flex items-center gap-3">
          <span className={`h-1.5 w-6 ${accentDot}`} aria-hidden />
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft truncate">
            {footerLine}
          </span>
        </div>
      </div>
    </figure>
  );
}
