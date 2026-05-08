# 04 — Pain points

Six pain points the target persona has *today*, each tied to a specific failure of an existing alternative.

## 1. Thursday-night Federal Register crawls

**Symptom.** Boutique analysts manually read 8-15 regulator gazettes on Thursday evening to be ready for a Friday client note.

**Why existing alternatives fail.**
- *Bloomberg Terminal* is configured for traders, not policy analysts. Regulator filings are deep in the navigation, not surfaced as a feed.
- *Westlaw* and *PACER* are query interfaces, not pushed digests. You have to know what to look for.
- *Substack newsletters* often summarize the same three rulings everyone summarized; analysts cannot defend a quotation from a Substack to a senior partner.

**Bureau response.** A vertical-scoped weekly dossier with primary-source footnote IDs. The analyst can hand the paragraph to the partner unaltered.

## 2. Dedupe debt

**Symptom.** Three news outlets, two trade publications, and one Substack all write about the FDIC&rsquo;s brokered-deposit rule. The analyst reads 6 articles to extract one fact.

**Why existing alternatives fail.**
- *Google Alerts* dumps duplicates into the inbox; severity zero.
- *Feedly Pro AI* claims to dedupe; in practice it groups same-day URLs only and misses paraphrased coverage 24h later.
- *Inoreader* dedupe is link-based, not content-based.

**Bureau response.** A SimHash + LLM-assisted clustering pass before the issue goes out. Each issue publishes its dedupe ratio (e.g. 17:1 means 412 read down to 24).

## 3. Provenance laundering

**Symptom.** A leaked document or memo gets quoted on Twitter without a chain of custody. The analyst doesn&rsquo;t know if it&rsquo;s real, doesn&rsquo;t know who saw it first, and can&rsquo;t cite it.

**Why existing alternatives fail.**
- *Twitter / X* aggressively deletes tweets after the fact; the URL goes 404.
- *Telegram* leak channels do not maintain provenance; first-mention is rarely tracked.
- *Discord* archives are private; impossible to cite externally.

**Bureau response.** Leaked documents are accepted only with verifiable provenance — a credible chain of custody, a screenshot with metadata, or independent confirmation. Each leak gets a `LEAK-` prefix in its dossier-ID and a separate footnote on the chain.

## 4. Reseller content debt

**Symptom.** Partnerships leads at SaaS firms run a &ldquo;trends&rdquo; newsletter to top accounts. Their content team writes it. It feels like marketing. Open rate stalls.

**Why existing alternatives fail.**
- *Hiring a freelance editorial writer* — variable quality, slow, $80-160 per piece, doesn&rsquo;t scale.
- *Repackaging analyst-firm content* (Gartner, Forrester) — usage rights are restrictive and the brand is loud.
- *Newsletter-builder SaaS (beehiiv, Substack)* — solves distribution, not content.

**Bureau response.** A reseller-license tier where the body of every issue is byte-identical, only the masthead and footer change. Resellers ship editorial content under their own brand without writing it.

## 5. Source-list opacity

**Symptom.** Analysts evaluating a research tool ask &ldquo;what sources do you cover?&rdquo; and get a vague &ldquo;hundreds of authoritative outlets.&rdquo;

**Why existing alternatives fail.**
- Most market-intelligence vendors treat source lists as proprietary.
- Analysts cannot tell if the tool covers the regulator that matters for their client.

**Bureau response.** Each vertical&rsquo;s full source list is published at the start of every subscription and updated quarterly. If we drop a source, the changelog says why.

## 6. Methodology opacity

**Symptom.** &ldquo;How does your AI assistant decide what&rsquo;s important?&rdquo; The vendor answers with a marketing video.

**Why existing alternatives fail.**
- LLM-based summarizers do not reliably show which document grounded which claim.
- &ldquo;Trust the model&rdquo; is not a defensible position in front of a regulator-facing client.

**Bureau response.** Public methodology page. Every claim → numbered footnote → dossier-ID → primary source URL. Editorial triage is human-in-loop and named (initials in the changelog).
