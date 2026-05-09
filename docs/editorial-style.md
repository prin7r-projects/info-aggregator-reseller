# Editorial style guide

> Annotedly's editorial contract: every claim has a primary source, every paragraph has a stable id, every dedupe is reasoned in writing. This document is the working reference for editors, reviewers, and reseller content leads. It assumes [01 — Brand identity](./01-brand-identity.md) and the publishing pipeline in [12 — Technical specification](./12-technical-specification.md).

## 1. Voice & tone

Annotedly publishes a footnoted, white-labelable dossier on a single regulated vertical. The voice is **precise, citation-first, neutral, and audit-friendly**. We write the way a senior compliance analyst writes for a partner who only has eight minutes — short sentences, named regulators, dated source items, no marketing varnish.

We never sell. We attribute. The dossier is the product; the methodology is the moat. A reader who disagrees with our triage should still be able to retrace every step we took, because every paragraph carries a source-id and every dedupe carries a reason. If a sentence reads like a press release, it is broken; rewrite it as a fact with a date and a citation.

Tone is restrained — closer to a regulator's docket cover than a SaaS newsletter. Numbers, datelines, and regulator names carry the weight; adjectives do not. When the picture is uncertain we say so explicitly with a residual-uncertainty note rather than papering over it with confident prose.

### 1.1 Do / don't pairs

**Pair 1 — Reporting a regulator action.**

- *Do:* "On 2026-04-22 the **CFPB** issued enforcement order **2026-CFPB-0017** against Acme Bank, NA for §1031 UDAAP violations [^An-2026-W17-§3]."
- *Don't:* "The CFPB just dropped a major action that has the fintech world buzzing about UDAAP risk."

**Pair 2 — Reporting a deduplicated cluster.**

- *Do:* "Five outlets covered the FDIC's 2026-04-19 supervisory letter; we kept the FDIC press release as canonical and noted the four secondary reports in the dedupe rationale [^An-2026-W17-§9]."
- *Don't:* "Everyone is talking about the FDIC letter — here's our take on what it means for fintechs."

## 2. Footnote format

Every published claim is footnoted with a stable, machine-checkable id of the form:

```
An-{year}-W{week}-§{n}
```

Where:

- `An` — fixed product prefix (Annotedly).
- `{year}` — 4-digit publication year (e.g. `2026`).
- `W{week}` — ISO 8601 week number with leading zero (e.g. `W07`, `W19`, `W52`). The week boundary is the dossier's publish-date week, not the source-event week.
- `§{n}` — paragraph index inside that dossier issue, starting at `§1`. Numbers are not zero-padded. Paragraphs are counted in dossier render order, including the masthead and excluding ads, page furniture, and reseller chrome.

The id is stable for the lifetime of the issue. If a paragraph is later corrected, the id is preserved and a separate **Retraction** or **Amendment** footnote is added that references the original id.

### 2.1 Worked examples

**Example A — single primary source.**

```markdown
> The **OCC** finalised its principles-based framework for third-party risk
> management on 2026-03-11 [^An-2026-W11-§4].

[^An-2026-W11-§4]: OCC, "Final Interagency Guidance on Third-Party
    Relationships: Risk Management" (PDF), retrieved 2026-03-12,
    sha256 `f1c4…a90b`. Source-id `src_occ_2026_tprm_final`.
```

**Example B — clustered cluster with secondary references.**

```markdown
> Five outlets covered the **FDIC**'s 2026-04-19 supervisory letter on
> brokered deposits; the agency release is canonical and the four
> secondary reports are listed in the dedupe rationale
> [^An-2026-W17-§9].

[^An-2026-W17-§9]: Canonical: FDIC FIL-21-2026, retrieved 2026-04-19,
    sha256 `9b22…eea8`, source-id `src_fdic_fil_21_2026`. Dedupe
    rationale: see issue's §9 dedupe block. Secondary reports
    (excluded from the dossier body): Reuters, American Banker,
    Bloomberg, FT — source-ids on file.
```

### 2.2 Mechanical rules

- ISO week always uses two digits: `W01`, never `W1`.
- Year-week boundaries: a dossier published on `2027-01-04` is `An-2027-W01-…`.
- Paragraphs that span multiple claims share one footnote per claim, comma-separated: `[^An-2026-W19-§3a, ^An-2026-W19-§3b]`. The `a`/`b` suffix is alphabetical, never numeric.
- The footnote definition lives in the same dossier issue. Cross-issue references use the full id with a leading dossier link.
- Validators reject any paragraph in the dossier body that has no footnote unless it is explicitly tagged `editorial: masthead`, `editorial: methodology`, or `editorial: changelog`.

## 3. Dedupe rationale template

When a reviewer collapses two or more near-duplicate items into a single dossier entry, the rationale block is filled in inside the dossier draft and stored verbatim in the published issue's audit drawer. Use this template — every field is required.

```markdown
### Dedupe rationale — §{n} ({date})

**Cluster id:** `dedupe_{year}_{week}_{nn}`

**Original sources (newest first):**

1. `src_{primary_id}` — {publisher}, {url}, retrieved {YYYY-MM-DD}, sha256 `{hash}`.
2. `src_{secondary_id}` — {publisher}, {url}, retrieved {YYYY-MM-DD}, sha256 `{hash}`.
3. (add as needed)

**Fields compared:**

- regulator / issuer
- action type (rule, enforcement order, supervisory letter, speech, press release)
- effective / publication date
- docket / file number
- substantive paragraph hash (SimHash, threshold {value})
- LLM tiebreak verdict (if invoked) — model, prompt id, verdict
- jurisdiction

**Decision:**

- **Canonical kept:** `src_{primary_id}` ({reason in one sentence}).
- **Folded in:** `src_{secondary_id}` (and any others) — listed for
  provenance but not rendered into the dossier body.
- **Discarded:** {none | source-id and reason}.

**Residual uncertainty:**

- {one short paragraph naming what we could not verify, or `none`}.

**Reviewer:** {editor handle} · **Reviewed-at:** {YYYY-MM-DDThh:mm:ssZ}
```

The block is required even when the cluster collapses to a single source — record `n=1` and explain why no secondary sources qualified. The audit drawer surfaces this block to readers who click the source-id; the reseller masthead never overrides it.

## 4. Citation hygiene

The contract: **every fact in a dossier paragraph ties to exactly one canonical source URL captured in our system, and no paraphrase ships without that link.** Concretely:

- Each footnote points to a `sources` row with `url`, `retrievedAt`, `sha256`, and a stable `source-id`. If the row is missing, the paragraph cannot ship — the validator blocks the publish step.
- Quotations use straight double quotes and an exact-byte match against the captured source. If the source has been amended since capture, footnote both the original capture and the amendment, and explain in the dedupe block.
- Paraphrases must add information density (compression, synthesis, dating) over the source — never reword for tone. If the paraphrase reads like a press-release rewrite, replace it with a quotation or cut the paragraph.
- Tweets, LinkedIn posts, and other social posts are never primary. They may appear in the dedupe block as "secondary signal" alongside the primary regulator/issuer source. We never publish a paragraph whose only citation is a social post.
- Leaked documents are quoted, not paraphrased. The footnote names the leak channel, the verification we performed, and the residual uncertainty in plain language. If verification fails, the paragraph is cut.
- Retrievals carry an `If-Modified-Since` discipline: when the source URL changes content under the same URL, we re-capture, re-hash, and re-footnote — the original footnote id is preserved and an amendment footnote is appended.
- Source-ids are stable across issues. A regulator's order cited in W11 and again in W19 reuses the same `source-id`; only the footnote id changes.
- Internal links inside the dossier (cross-paragraph references) use the §-id, never a page anchor or pixel scroll target.
- Reseller masthead chrome may not introduce new claims. If the reseller adds a foreword, the foreword carries its own footnote ids in the reseller's namespace, never `An-…`.

## 5. Style do/don't quick reference

- **Numbers under 10:** spell out (`three`, `seven`) in body prose; use numerals (`3`, `7`) inside tables, figures, and legal-citation strings.
- **Numbers 10 and above:** numerals everywhere (`24 source items`, `412 inputs`).
- **Currency:** ISO code first, then amount, no thousands separator below 10 000: `USD 7,500`, `EUR 1,250`, `CHF 950`. Never `$7.5k`.
- **Percentages:** numeral plus `%` with no space: `17%`, never `17 percent` or `17 %`.
- **Ratios:** colon, no spaces, lower-to-higher reading: `17:1`, not `1:17` or `17 to 1`.
- **Dates:** ISO 8601 (`2026-04-22`) in dossier body, footnotes, and audit fields. Long-form (`22 April 2026`) only in marketing copy that lives outside the dossier.
- **Times:** 24-hour clock with timezone: `11:00 CET`, `09:30 ET`. Never `11am`, never naive local time.
- **Quarters and weeks:** `Q2 2026`, `W17 2026`, never `Q2/26` or `wk17`.
- **Regulator names:** first mention is the full legal name plus the acronym in parens — `Consumer Financial Protection Bureau (CFPB)`, `Office of the Comptroller of the Currency (OCC)`, `Federal Deposit Insurance Corporation (FDIC)`, `Financial Industry Regulatory Authority (FINRA)`, `European Securities and Markets Authority (ESMA)`, `Swiss Financial Market Supervisory Authority (FINMA)`. Subsequent mentions in the same paragraph use the acronym alone.
- **Acronyms:** define on first use per dossier issue, even if the acronym is also defined in a prior issue. Do not gloss within a quotation — leave the source's text intact.
- **Statutes and rules:** cite by section symbol and number, not by name only: `§1031 UDAAP`, `Reg E §1005.6`, `MiFID II Art. 26`. Names follow in parens if helpful.
- **Docket and order numbers:** render verbatim, in bold on first use: `**2026-CFPB-0017**`, `**FIL-21-2026**`, `**OCC EA 2026-014**`.
- **Company names:** use the full legal entity on first mention (`Acme Bank, NA`) and the colloquial form thereafter (`Acme`). Never use a ticker as a stand-in for a company name.
- **Em dashes vs en dashes:** em dash (`—`) for parentheticals, en dash (`–`) for ranges (`pp. 12–18`, `2024–2026`). No spaces around either.
- **Quotations:** straight double quotes for quoted source text, single quotes for nested quotation only. Block quotations (>40 words) use a blockquote with the footnote id appended.
- **Editorial labels:** `Update`, `Correction`, `Retraction`, `Amendment` — capitalised, bold, end of paragraph: `**Correction (2026-04-30):** earlier version misstated the effective date as 2026-05-01; the correct date is 2026-06-01 [^An-2026-W18-§7].`
- **Forbidden vocabulary:** *AI-powered*, *intelligence platform*, *next-generation*, *cutting-edge*, *unprecedented*, *game-changing*, *deep insights*, *thought leadership*. Replace with the specific fact (date, count, source).
- **Tone hedges to avoid:** *arguably*, *some say*, *it could be argued*, *many believe*. If we cannot attribute the claim, we do not publish it.

## 6. Out of scope for this guide

This document does not redesign the brand, change the colour system, or modify the publishing pipeline. For those, see [01 — Brand identity](./01-brand-identity.md) and [12 — Technical specification](./12-technical-specification.md). Implementation details for the validator, sources schema, and dedupe pipeline are tracked in [13 — Implementation plan](./13-implementation-plan.md).
