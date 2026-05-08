type Vertical = {
  name: string;
  cadence: string;
  sources: number;
  ids: string[];
  tagColor: "ink" | "oxblood" | "olive" | "ochre";
};

const verticals: Vertical[] = [
  {
    name: "Fintech",
    cadence: "Weekly",
    sources: 24,
    ids: ["FED-25-1144", "OCC-IL-1188", "CFPB-EM-26-04"],
    tagColor: "oxblood",
  },
  {
    name: "Biotech grants",
    cadence: "Weekly",
    sources: 31,
    ids: ["NIH-RFA-26-117", "BARDA-08-26", "EMA-CHMP-Q2"],
    tagColor: "olive",
  },
  {
    name: "Govtech procurement",
    cadence: "Twice weekly",
    sources: 18,
    ids: ["GSA-OASIS-26", "TED-2026-S88", "GAO-26-104"],
    tagColor: "ink",
  },
  {
    name: "Climate-tech",
    cadence: "Weekly",
    sources: 22,
    ids: ["DOE-CDR-RFP-26", "ESMA-CSRD-Q2", "JPN-METI-CC-26"],
    tagColor: "olive",
  },
  {
    name: "Semiconductors",
    cadence: "Weekly",
    sources: 19,
    ids: ["BIS-EXP-26-A", "MOFCOM-26-22", "EU-CHIPS-26-08"],
    tagColor: "ochre",
  },
];

const tagClass: Record<Vertical["tagColor"], string> = {
  ink: "text-ink",
  oxblood: "text-oxblood",
  olive: "text-olive",
  ochre: "text-ochre",
};

export function CoverageStrip() {
  return (
    <section id="coverage" className="border-b border-rule">
      <div className="mx-auto max-w-page px-6 py-20 md:py-24">
        <div className="flex items-baseline justify-between border-b border-rule-soft pb-4 mb-10">
          <h2 className="font-mono text-[12px] uppercase tracking-[0.18em] text-ink-soft">
            Coverage — five verticals
          </h2>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
            B-COV-26-V1
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {verticals.map((v, i) => (
            <article
              key={v.name}
              className={[
                "px-6 py-8 lg:py-10",
                i !== 0 ? "lg:border-l border-rule-soft" : "",
                i !== verticals.length - 1 ? "border-b lg:border-b-0 border-rule-soft" : "",
              ].join(" ")}
            >
              <p className={`font-mono text-[11px] uppercase tracking-[0.18em] mb-4 ${tagClass[v.tagColor]}`}>
                ● {v.cadence}
              </p>
              <h3 className="font-serif text-[26px] leading-[1.15] tracking-[-0.02em] text-ink mb-6">
                {v.name}
              </h3>
              <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-ink-soft mb-2">
                {v.sources} sources monitored
              </p>
              <ul className="space-y-1">
                {v.ids.map((id) => (
                  <li key={id} className="font-mono text-[12px] tracking-[0.04em] text-ink/80">
                    § {id}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="mt-10 max-w-[64ch] font-sans text-[15px] text-ink-soft">
          Each vertical maintains its own ingest list, source-priority weighting,
          deduplication rules, and house style sheet for footnoting. Adding a vertical
          to a Bundle subscription takes roughly two weeks; we publish the source list
          and the ruleset before we ship the first issue.
        </p>
      </div>
    </section>
  );
}
