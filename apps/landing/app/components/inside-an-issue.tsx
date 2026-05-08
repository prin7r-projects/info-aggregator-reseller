const stages = [
  {
    n: "01",
    title: "Crawl",
    body:
      "An ingest agent watches 40–120 feeds per vertical: regulator gazettes, RFPs, dockets, peer-reviewed pre-prints, vendor disclosures, leaked memos with verifiable provenance. The agent stores raw text plus a SHA-256 hash and the original URL.",
  },
  {
    n: "02",
    title: "Dedupe",
    body:
      "A clustering pass identifies redundant items — three outlets reporting the same comment letter become one entry with three citations. We discard summaries; we keep primary sources. The dedupe ratio is published in every issue.",
  },
  {
    n: "03",
    title: "Footnote",
    body:
      "Each claim in the dossier is mapped to a numbered source. No claim ships without a citation. The footnote ledger renders a dossier-ID (§ FED-25-1144) and a full bibliographic line — analyst-grade, not blog-grade.",
  },
  {
    n: "04",
    title: "Ship",
    body:
      "Friday morning Eastern: the dossier emails to subscribers, the structured CSV/JSON drops to the feed endpoint, and the reseller-license clients receive a re-mastheaded copy with their own logo, accent, and footer line.",
  },
];

export function InsideAnIssue() {
  return (
    <section className="border-b border-rule bg-paper-2">
      <div className="mx-auto max-w-page px-6 py-20 md:py-24">
        <div className="flex items-baseline justify-between border-b border-rule-soft pb-4 mb-12">
          <h2 className="font-mono text-[12px] uppercase tracking-[0.18em] text-ink-soft">
            Inside an issue — four stages
          </h2>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
            B-METH-26
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
          {stages.map((s, i) => (
            <div key={s.n} className={`relative ${i !== 0 ? "lg:border-l border-rule-soft lg:pl-10" : ""}`}>
              <p className="font-mono text-[36px] leading-[1] text-ink mb-4">{s.n}</p>
              <h3 className="font-serif text-[28px] leading-[1.1] tracking-[-0.02em] text-ink mb-3">
                {s.title}
              </h3>
              <p className="font-sans text-[15px] leading-[1.55] text-ink-2">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
