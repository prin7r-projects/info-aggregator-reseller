# 11 — User Stories and Scenarios

This document is the canonical input contract for Bureau's Phase 2 SaaS implementation. It enumerates personas, primary user stories, end-to-end scenarios, and ties each flow to the frontend touch-points and backend services that doc 12 specifies. Every API endpoint in doc 12 must trace back to a story here; no orphan endpoints, no orphan stories.

Bureau is a **vertical-intelligence subscription** — a footnoted, white-labelable Friday 09:00 ET dossier covering one or more regulated verticals (fintech, biotech, govtech, climate-tech, semis), with an editorially-curated source list, dedupe ratio, and per-paragraph source-IDs. Three tiers: Single ($499/mo), Bundle ($1,499/mo), Reseller-license ($4,800 setup + $1,200/vertical/mo).

---

## 1. Personas summary

### P1 — Mireille, fintech analyst at Brussels boutique consultancy (primary; deep dive `05-audience-profile.md` §Persona 1)

38, 14-person firm, €115k base + bonus. Ships a defensible weekly note. Will pay $499/mo on personal card and expense within the same week. Voice cue: "if a partner asks, I need to point at a Federal Register page number, not a tweet." Trigger: Thursday-night Federal Register reading is unsustainable.

### P2 — Ravi, partnerships lead at $30M ARR vertical SaaS (secondary; deep dive `05-audience-profile.md` §Persona 2)

41, in Toronto. C$210k + variable on partner-sourced revenue. Wants a respected ecosystem newsletter to top 80 accounts. Voice cue: "if we ship something the analyst community treats as editorial, we don't need to gate it." Buying signal: $4,800 setup + $1,200/mo on marketing budget without CFO conversation.

### P3 — Daniela, head of insights at a 40-person mid-market consultancy (new in this doc, secondary)

44, 40-person London firm covering 3 verticals. Buys Bundle for the firm. Voice cue: "I need to tell my partners that the source list is editorial-grade, not scraped." Buys after Mireille-equivalent on her team has used Single for a month.

### Anti-personas (out of scope — see doc 05 §Anti-personas)

Solo content marketer chasing AI hype, generic SMB founder, Tier-1 bank compliance officer (not certified for regulated use yet), crypto trader looking for fintech alpha (we cover regulations, not market signals), adversarial scrapers.

---

## 2. Primary user stories

12 stories covering the dossier production cycle, subscription flow, reseller workflow, and editorial integrity guarantees.

1. **As Mireille, I want to receive a Friday 09:00 ET dossier in my inbox with footnoted source-IDs at the paragraph level, so that I can ground my client note without re-reading 412 sources.** *(US-01)*
2. **As Mireille, I want every paragraph's source-ID to deep-link to the primary source (Federal Register page, NIH paper, 10-Q exhibit), so that my partner can audit the chain of evidence in <30s.** *(US-02)*
3. **As Mireille, I want a tracked log of inputs that landed vs. discarded in each issue (during my first three weeks), so that I can defend the dedupe quality to my firm.** *(US-03)*
4. **As Mireille, I want to subscribe to Single ($499/mo) via NOWPayments hosted invoice (USDT/USDC), so that I don't have to wait for a card-merchant onboarding.** *(US-04)*
5. **As Mireille, I want to request a free sample of last week's issue before paying, so that I can verify the editorial quality matches the marketing copy.** *(US-05)*
6. **As Daniela, I want Bundle ($1,499/mo, all 5 verticals) with a quarterly editorial review call, so that the editorial desk can prioritize cross-vertical anchors my firm cares about.** *(US-06)*
7. **As Ravi, I want a Reseller-license that lets me re-masthead the dossier with my brand (logo, accent color, footer line, custom URL), so that my account list reads my newsletter as editorial, not as a syndicate.** *(US-07)*
8. **As Ravi, I want my dossier delivered to my custom delivery endpoint at Friday 09:00 ET + a configurable lag, so that I can stage my own send.** *(US-08)*
9. **As Ravi, I want a co-branded methodology page that points to Bureau's back-end without naming it, so that my brand owns the editorial appearance.** *(US-09)*
10. **As any subscriber, I want a per-subscriber JSON + CSV feed at a private endpoint, so that I can pull the issue into my own analytics tooling without screen-scraping.** *(US-10)*
11. **As any subscriber, I want a documented leak-provenance policy + comment-from-subject mechanism on every leaked document, so that I'm protected from publishing unverified leaks.** *(US-11)*
12. **As any subscriber, I want to cancel monthly without lock-in, so that I'm not stuck if the editorial quality slips.** *(US-12)*

---

## 3. Main scenarios (happy paths)

### Scenario 1 — Mireille requests sample → subscribes Single

**Trigger.** Mireille reads a tweet from a Brussels peer recommending Bureau. Lands on `https://info-aggregator-reseller.prin7r.com`.

**Steps.**
1. Reads the masthead. The hero shows a real dossier excerpt with footnotes. *Frontend: `Masthead`, `DossierExcerpt` on `apps/landing/app/page.tsx`.*
2. Scrolls to the methodology section showing dedupe ratio "17:1 — we read 412, you read 24."
3. Clicks **Request a sample**. Form: `{ name, email, vertical }`. *Backend: `POST /api/sample/request` records + emails editorial desk.*
4. Within 4 business hours: editorial desk sends Mireille last week's issue (gated by her email + vertical).
5. Mireille reviews. Quality matches.
6. Returns to landing. Clicks **Subscribe — Single fintech $499/mo**.
7. Browser POSTs to `/api/checkout/nowpayments` with `{ tier: 'single', vertical: 'fintech' }`. *Backend: `POST /api/checkout/nowpayments` builds NOWPayments invoice, returns `{ invoice_url, invoice_id, subscriptionId }`.*
8. Pays $499 in USDT-Polygon.
9. NOWPayments POSTs IPN to `/api/webhooks/nowpayments`. Server verifies HMAC-SHA512.
10. `SubscriptionService.activate(subId)` activates subscription, mints feed endpoint URL, sends welcome email with: this week's issue replay + feed URL + tracked-log link (3-week trial period).
11. Friday 09:00 ET: dossier delivered to Mireille's inbox.

**Success criteria.** Sample request → response in <4h. Subscription active within 5s of IPN. Tracked log accessible.

**Frontend touch-points.** `Masthead`, `DossierExcerpt`, `MethodologySection`, `SampleRequestForm`, `PricingTier`.
**Backend touch-points.** `POST /api/sample/request`, `POST /api/checkout/nowpayments`, `POST /api/webhooks/nowpayments`, `SubscriptionService`, `FeedService`, dossier-delivery worker.

### Scenario 2 — Daniela buys Bundle, gets quarterly call

**Trigger.** Daniela's team analyst (Mireille-equivalent) used Single for 5 weeks. She wants Bundle for the firm.

**Steps.**
1. Daniela goes to Pricing → **Subscribe — Bundle $1,499/mo**.
2. Checkout body: `{ tier: 'bundle', firm: 'Acme Insights' }`. NOWPayments invoice for $1,499.
3. Pays. IPN fires. Subscription active across all 5 verticals.
4. Within 24h: editorial desk emails an "ICP fit" form: which verticals does Acme cover? Cross-vertical anchors of interest?
5. Daniela responds. Editorial desk schedules quarterly review call (90 days out).
6. Friday 09:00 ET: 5 verticals delivered + a cross-vertical index in week 4.

**Success criteria.** Bundle subscription delivers 5 verticals immediately. ICP-fit form sent within 24h. Quarterly call scheduled.

### Scenario 3 — Ravi closes Reseller-license

**Trigger.** Ravi clicks **Talk to the desk — Reseller** on pricing.

**Steps.**
1. Lands at scheduling form `/api/concierge/reseller`. Books 30-min call.
2. Editorial desk lead joins. Scopes: 3 verticals (fintech + climate + semis), launch issue date 30 days out, accent color #2A4D6F, masthead "ECO Dispatch", footer line "Powered by Acme Bureau Partners."
3. Desk issues a custom invoice via `POST /api/admin/reseller-licenses` with `{ resellerName, verticals, accentHex, masthead, footerLine, deliveryUrl, deliveryLagMin, customDomain }`. Returns NOWPayments hosted invoice for $4,800 setup + first month $3,600 (3 verticals × $1,200).
4. Ravi pays. IPN fires. Reseller config persisted.
5. 30 days later: first co-branded issue rendered for "ECO Dispatch" + delivered to Ravi's endpoint at Fri 09:00 ET + 30 min lag.

**Success criteria.** Call → invoice in <24h. First co-branded issue ships on schedule. Reseller config persisted with all customization fields.

### Scenario 4 — Issue cycle Sun-Fri

**Trigger.** Sunday 17:00 ET — input freeze for the week's issue.

**Steps.**
1. **Sun 17:00.** Ingest agent freezes input set across all 5 verticals (412 sources/vertical avg).
2. **Mon-Wed.** Process agent runs SimHash dedupe + LLM tiebreak + footnote-ID assignment.
3. **Thu.** Editorial desk runs human triage in `/admin/triage`. Decisions: keep / discard / merge / flag-for-comment.
4. **Fri 09:00 ET.** Publish job runs. PDF rendered, email sent, JSON+CSV feed updated, reseller renderer kicks off (with per-reseller masthead + accent + footer + delivery endpoint + lag).
5. **Fri 09:30 ET.** Public methodology page updated with this week's dedupe ratio.

**Success criteria.** Friday 09:00 ET delivery hits >99% on-time. Dedupe ratio published transparently. Reseller renders match the per-reseller config.

### Scenario 5 — Subject of a leak submits a comment

**Trigger.** Bureau's editorial desk receives a leaked memo from a regulator beat reporter Wed 17:00. Provenance verified.

**Steps.**
1. Editorial desk emails the memo's subject (the named firm) Wed 18:00 with: "We intend to publish this leak Friday. You may submit a comment we cite alongside."
2. Subject submits a comment Thu 14:00 via `POST /api/leaks/comment` with `{ leakId, comment, attribution }`.
3. Comment is published in the Friday issue alongside the leak with full attribution.

**Success criteria.** 24+ hour notice given. Comment published verbatim.

### Scenario 6 — Subscriber audits a footnote

**Trigger.** Mireille's partner asks "where did this number come from?" during Friday 11:00 review.

**Steps.**
1. Mireille clicks the source-ID `[B-2026-W19-§14]` on the dossier paragraph.
2. Browser opens `/dossier/B-2026-W19-§14`. Renders the original source link, retrieval timestamp, source version, dedupe rationale.
3. Partner reviews. Asks for the underlying Federal Register PDF. Mireille clicks deep-link → opens FR page directly.

**Success criteria.** Audit trail accessible in <30s. Primary source deep-linked.

---

## 4. Edge case scenarios

### EC-1 — IPN replay

`SubscriptionService.activate()` is idempotent on `(subscriptionId, status)`.

### EC-2 — Subscriber drops off after `/api/checkout/nowpayments` but before payment

Subscription `status='pending'`. Sweeper expires after 7 days; if buyer returns, same invoice.

### EC-3 — Subject contests a leak post-publication (libel risk)

Subject emails desk. Desk reviews; if a factual error, retraction issued in next issue + an out-of-band correction email to all subscribers. Retraction logged with original source-ID.

### EC-4 — Source goes 404 between freeze and publish

If a source is deleted between Sun 17:00 freeze and Fri 09:00 publish, the dossier carries a `source_unavailable` flag with `last_retrieved_at` + WaybackMachine snapshot if available. Editorial decision: keep or discard.

### EC-5 — Reseller delivery endpoint fails

If reseller's delivery endpoint returns 5xx, Bureau retries 3x with exp-backoff. On persistent failure, ping the reseller via Slack or email.

### EC-6 — Subscriber feed endpoint scraped by an unauthorized party

Per-subscriber feed URLs are HMAC-signed with a short-lived token (30-day). Rate limited to 60 req/min. Anomalous patterns (>1 IP, >10x daily volume) trigger Slack alert + token rotation prompt to subscriber.

### EC-7 — Cross-vertical anchor between Fintech + Climate (e.g., "EU green-bond rules")

Cross-vertical index in week 4 surfaces these anchors. Subscribers in Bundle see them; Single subscribers see a "this anchor crosses to Climate" footer with a CTA to upgrade.

---

## 5. Anti-scenarios

### AS-1 — No "free month"

Free sample yes, free month no. Implementation must NOT add a 14-day trial path.

### AS-2 — No AI-hype copy ("AI-powered intelligence")

Brand voice forbids. Implementation must NOT add this copy under any circumstance.

### AS-3 — No tweet-quoting in dossiers

Editorial integrity. Tweets are not primary sources; they're at most retrieval signals leading to primary sources.

### AS-4 — No paraphrasing leaked documents

Quote and footnote, never paraphrase. Implementation must NOT have a "summarize this leak" code path.

### AS-5 — No SOC 2 / regulated-use certification

Anti-persona (Tier-1 bank compliance officer). Bureau will tell them so on email.

### AS-6 — No public scraping endpoints

Feeds are per-subscriber, signed, rate-limited. No public catalog endpoint.

---

## 6. Cross-references

- §2 stories US-01..US-12 → doc 12 §3 endpoints.
- §3 scenarios → doc 12 §1 architecture services + doc 13 phase Definitions of Done.
- §4 edge cases → doc 12 §7 security/integrity controls + doc 13 phase 5.
- §5 anti-scenarios → doc 12 §10 non-goals.
