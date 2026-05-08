export function Footer() {
  return (
    <footer className="bg-paper border-t border-rule">
      <div className="mx-auto max-w-page px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="col-span-2 md:col-span-1">
            <p className="font-sans text-[18px] font-bold tracking-[-0.01em] text-ink mb-2">BUREAU</p>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft mb-4">
              § B-2026-W19
            </p>
            <p className="font-sans text-[13px] leading-[1.55] text-ink-soft max-w-[28ch]">
              A research syndicate. Footnoted dossiers per vertical. White-labeled
              for the firms who already publish to their own clients.
            </p>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft mb-3">
              Coverage
            </p>
            <ul className="font-sans text-[14px] text-ink space-y-2">
              <li>Fintech regulations</li>
              <li>Biotech grants</li>
              <li>Govtech procurement</li>
              <li>Climate-tech disclosures</li>
              <li>Semiconductor export controls</li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft mb-3">
              For resellers
            </p>
            <ul className="font-sans text-[14px] text-ink space-y-2">
              <li><a href="#reseller" className="hover:underline">White-label scope</a></li>
              <li><a href="#pricing" className="hover:underline">Reseller license</a></li>
              <li><a href="#faq" className="hover:underline">Methodology FAQ</a></li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft mb-3">
              Bureau
            </p>
            <ul className="font-sans text-[14px] text-ink space-y-2">
              <li><a className="hover:underline" href="mailto:hello@info-aggregator-reseller.prin7r.com">hello@info-aggregator-reseller.prin7r.com</a></li>
              <li>
                <a className="hover:underline" href="https://github.com/prin7r-projects/info-aggregator-reseller">
                  Source repo →
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#sample">Sample digest</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-rule-soft pt-6 flex flex-col md:flex-row md:items-baseline md:justify-between gap-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">
            © 2026 Bureau · Prin7r Projects · Crypto-only checkout via NOWPayments
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">
            Set in Source Serif 4 · Inter · JetBrains Mono · Filed Wave 2
          </p>
        </div>
      </div>
    </footer>
  );
}
