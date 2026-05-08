export function HeroDossier() {
  return (
    <section className="border-b border-rule" aria-label="Latest issue excerpt">
      <div className="mx-auto max-w-page px-6 pt-16 pb-24 md:pt-24 md:pb-32">
        {/* Issue dateline */}
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 border-b border-rule-soft pb-4 mb-12">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
            Issue 2026-W19
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
            · Fintech Dossier
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
            · 24 Sources
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
            · Filed 08 May 2026
          </span>
          <span className="ml-auto font-mono text-[11px] uppercase tracking-[0.18em] text-oxblood">
            ● Live
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-16">
          {/* Left: dossier excerpt 7/12 */}
          <article className="lg:col-span-7">
            <h1 className="font-serif text-[40px] leading-[1.05] tracking-[-0.025em] text-ink md:text-[64px] mb-8">
              <span className="under">Footnoted</span> intelligence,{" "}
              <span className="under">resellable</span> by your firm — without the rewrite.
            </h1>

            <div className="dossier-body font-serif text-[18px] leading-[1.6] text-ink-2 max-w-[58ch] space-y-5">
              <p>
                Each Friday, Annotedly ships a dossier on a single regulated vertical. The
                fintech edition this week tracks the FDIC&rsquo;s revised brokered-deposit
                rule
                <sup className="fn">[1]</sup>, three OCC stablecoin no-objection letters
                <sup className="fn">[2]</sup>, and a leaked CFPB enforcement memo on
                earned-wage advances
                <sup className="fn">[3]</sup>. We deduplicated 412 inbound items down to
                the 24 that materially move policy, then cross-referenced each with prior
                rulemakings, comment-letter signatories, and a mapped list of affected
                charters.
              </p>
              <p>
                A consultancy in Brussels read this same paragraph twelve hours ago under
                their own masthead — same body, their logo, their accent. Their analysts
                spent the saved morning briefing clients instead of crawling the
                Federal Register at 6 a.m. That is the entire pitch.
              </p>
            </div>

            {/* Footnote ledger */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 border-t border-rule-soft pt-6">
              <Footnote
                n="1"
                source="FED-25-1144"
                cite="FDIC, &ldquo;Brokered Deposits Restrictions; Final Rule,&rdquo; Fed. Reg. Vol. 91, No. 88, 8 May 2026."
              />
              <Footnote
                n="2"
                source="OCC-IL-1188"
                cite="Office of the Comptroller of the Currency, Interpretive Letter 1188, 6 May 2026."
              />
              <Footnote
                n="3"
                source="CFPB-EM-26-04"
                cite="Internal Enforcement Memorandum, Consumer Financial Protection Bureau, leaked 5 May 2026 (verified)."
              />
              <Footnote
                n="4"
                source="ESMA-26-Q2"
                cite="European Securities and Markets Authority, MiCA quarterly statement, 30 Apr 2026."
              />
            </div>
          </article>

          {/* Right: action panel 5/12 */}
          <aside className="lg:col-span-5 lg:pl-8 lg:border-l lg:border-rule-soft">
            <div className="sticky top-32">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft mb-3">
                In this issue
              </p>
              <ul className="font-serif text-[18px] leading-[1.5] text-ink space-y-2 mb-10 list-none">
                <li className="border-b border-rule-soft pb-2">
                  Brokered deposits — what changed and who pays
                </li>
                <li className="border-b border-rule-soft pb-2">
                  Three OCC stablecoin letters, side by side
                </li>
                <li className="border-b border-rule-soft pb-2">
                  CFPB on earned-wage advances: the leaked memo
                </li>
                <li className="border-b border-rule-soft pb-2">
                  MiCA Q2 statement and the 24 firms now in scope
                </li>
              </ul>

              <div className="flex flex-col gap-3">
                <a
                  href="#pricing"
                  className="block w-full bg-ink text-paper font-sans text-[14px] font-medium text-center py-3 px-6 hover:bg-oxblood transition-colors duration-150"
                >
                  Subscribe — $499 per vertical / month
                </a>
                <a
                  href="#sample"
                  className="block w-full border border-ink font-sans text-[14px] font-medium text-center py-3 px-6 text-ink hover:bg-paper-2 transition-colors duration-150"
                >
                  Sample digest →
                </a>
              </div>

              <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
                NOWPayments USDT/USDC · Crypto-only checkout · Net-30 wires for resellers
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Footnote({ n, source, cite }: { n: string; source: string; cite: string }) {
  return (
    <p className="font-sans text-[13px] leading-[1.45] text-ink-soft">
      <span className="font-mono text-[11px] tracking-[0.04em] text-oxblood mr-2">[{n}]</span>
      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft mr-2">
        § {source}
      </span>
      <span dangerouslySetInnerHTML={{ __html: cite }} />
    </p>
  );
}
