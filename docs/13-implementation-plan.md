# 13 — Implementation Plan

> **Hand-off ready.** This plan is for the Phase 2 implementation agent picking up Bureau after Wave 2's marketing landing has shipped. You will find: (a) deployed landing at `https://info-aggregator-reseller.prin7r.com` with NOWPayments hosted-invoice checkout wired and verified; (b) brand identity / audience / architecture in `/docs/01..10-*.md`; (c) the user-story contract in `/docs/11-user-stories-and-scenarios.md`; (d) the technical spec in `/docs/12-technical-specification.md`. Wave 3 brings the editorial pipeline online: Sun-Fri ingestion → dedupe → triage → publish, plus per-subscriber feeds and per-reseller white-labeling. Read docs 11 + 12 before any phase. **The hardest engineering problem is editorial integrity at scale**: a 17:1 dedupe ratio that holds up to a partner's audit. Don't shortcut the source-attribution chain.

---

## 1. Phase breakdown

7 phases.

| Phase | Goal | Effort |
|---|---|---|
| **0 — Scaffolding** | Apps stubs build; landing untouched; first vertical (fintech) feeds enumerated | M — 2-3d |
| **1 — Ingestion + dedupe core** | One-vertical end-to-end: ingest → dedupe → triage → publish | XL — 5-8d |
| **2 — UX surfaces (subscriber dashboard + editorial admin)** | Subscriber dashboard + admin triage UI | L — 3-5d |
| **3 — Payments + Notion + first paying subscriber** | Single tier flow end-to-end + welcome flow | M — 2-3d |
| **4 — Production hardening** | Idempotency, rate limits, alerts, leak provenance protocol | M — 1-2d |
| **5 — Launch ops (Bundle + Reseller)** | Bundle delivery; Reseller renderer + custom domain | L — 3-5d |
| **6 — Post-launch (cross-vertical, retractions, analytics)** | Cross-vertical index; retraction flow; subscriber analytics | M — 1-2d |

---

### Phase 0 — Scaffolding

**Goal.** Apps stubs build. First vertical (fintech) source list curated at 40-120 feeds. Editorial style guide documented.

**Tasks.**
1. Verify Wave 2 state.
2. Fork open-saas into `apps/app/`. Magic-link + Bearer (admin) auth.
3. Add Postgres + Redis + MinIO to compose.
4. `workers/{ingest,process,publish}/` skeletons.
5. Curate fintech source list at `data/sources/fintech.json`: 60+ feeds covering Federal Register, FED, OCC, CFPB, ESMA, FDIC, FINMA, plus 10-Q/10-K filings.
6. Editorial style guide at `/docs/editorial-style.md`: voice, footnote format, dedupe rationale template.

**Effort.** M — 80-120 tool-uses, 2-3 days.

**DoD.**
- [ ] `pnpm install` clean. Open-saas Wasp on `:3001`.
- [ ] Workers stubs run.
- [ ] Postgres + Redis + MinIO healthy.
- [ ] Fintech source list has 60+ feeds with feed type + crawl cadence.
- [ ] Editorial style guide reviewed by editorial desk lead.

**Hand-off context.**
- Source-list quality is the make-or-break asset. A 17:1 dedupe ratio requires 400+ inputs/week, which requires curating 60-100 feeds.

---

### Phase 1 — Ingestion + dedupe core

**Goal.** Sun-Fri end-to-end pipeline runs for fintech. Editorial desk can triage on Thu and publish Fri 09:00 ET.

**Tasks.**
1. Drizzle schema per doc 12 §2.
2. Ingest worker: cron + RSS + HTTP polling per `data/sources/fintech.json`. Stores raw in `sources` with SHA-256.
3. Process worker: SimHash dedupe + LLM tiebreak (OpenRouter / Anthropic) + cluster output → `dossierItems` candidates.
4. Footnote ledger: assigns `B-{year}-W{week}-§{n}` IDs.
5. Editorial triage admin UI `/admin/triage`: list candidates, mark keep/discard/merge/flag-for-comment.
6. Publish worker Fri 09:00 ET: PDF render via Playwright (HTML → PDF), email send via Postmark, JSON+CSV feed update.
7. Dedupe-ratio calculation surfaced in admin dashboard + public methodology page.

**Effort.** XL — 400-700 tool-uses, 5-8 days.

**DoD.**
- [ ] Sun 17:00 freeze captures 400+ fintech inputs.
- [ ] Mon-Wed dedupe + LLM tiebreak produces 20-30 candidate dossier items.
- [ ] Thu triage UI usable; editorial keeps ~24 items.
- [ ] Fri 09:00 ET publish: PDF rendered, email sent to test subscribers, JSON+CSV feed updated.
- [ ] Dedupe ratio surfaced (e.g., 17:1).
- [ ] Methodology page reflects this week's ratio.

**Hand-off context.**
- LLM tiebreak: don't be cute. Use a structured prompt that emits `{ duplicate: bool, rationale }` and never paraphrases the source.
- Triage UI is editorial desk's daily tool — make it fast (keyboard shortcuts, sortable, filter by confidence).
- Don't auto-publish; always require editorial approval.

---

### Phase 2 — UX surfaces (subscriber dashboard + editorial admin)

**Goal.** Subscribers can view past issues + feed token + tracked log. Editorial desk has full triage + publish + retract surface.

**Tasks.**
1. Subscriber dashboard `/app/issues`: list of past issues subscriber has access to.
2. Subscriber feed config `/app/feed`: shows feed URL, token, rotation history.
3. Tracked log `/app/tracked-log`: only visible during 3-week trial, shows inputs landed/discarded with rationale.
4. Audit drawer `/dossier/:itemId`: full source provenance.
5. Editorial admin `/admin/triage` (Phase 1) + `/admin/issues` (publish, retract) + `/admin/leaks` (record leak + emit subject tokens).
6. Mobile pass on subscriber dashboard.

**Effort.** L — 200-350 tool-uses, 3-5 days.

**DoD.**
- [ ] Subscriber sees their issues with audit-drawer functional.
- [ ] Tracked log visible during trial; hidden after 3 weeks.
- [ ] Editorial desk can record a leak, emit subject tokens, and publish a comment alongside.
- [ ] Admin can retract an issue; retraction renders in next issue.
- [ ] Mobile a11y >= 95.

**Hand-off context.**
- Editorial admin is internal tool — focus on speed over polish.
- Audit drawer is the public proof of editorial integrity. Render it well.

---

### Phase 3 — Payments + Notion + first paying subscriber

**Goal.** Single tier flow end-to-end. First real subscriber receives Friday issue.

**Tasks.**
1. Persist subscriptions on `POST /api/checkout/nowpayments`.
2. Webhook activates sub, mints feedToken, sends welcome email (this week's issue replay + feed URL + tracked-log link).
3. Sample request flow: form → editorial desk Postmark + Telegram ping.
4. Notion sync: paid subscriptions → `Bureau Subscriptions` data source.
5. Subscription renewal: NOWPayments lacks recurring; email fresh invoice 5 days before `validUntil`.

**Effort.** M — 100-180 tool-uses, 2-3 days.

**DoD.**
- [ ] $499 Single fintech purchase end-to-end: invoice → IPN → sub active → welcome email + replay + tracked log.
- [ ] Notion `Bureau Subscriptions` row appears.
- [ ] Sample request triggers desk email within 30s.
- [ ] Renewal invoice email goes out at `validUntil - 5d`.

**Hand-off context.**
- Welcome email is the customer's first impression of Bureau's editorial voice. Have editorial desk write the template.

---

### Phase 4 — Production hardening

**Goal.** System survives forged IPN, feed scraping, source 404s, libel risk.

**Tasks.**
1. Idempotency on checkout + sub activation.
2. Traefik rate limits.
3. Forged-IPN tests + feed-token rotation.
4. Admin-key + integration-key + signing-key rotation runbooks.
5. Slack alerts: webhook sig, dedupe-ratio anomaly, source quarantine, daily subscription anomalies.
6. PII scrub.
7. CSP headers.
8. Leak-provenance verification protocol: every leak must have `chainOfCustody`, `subjectsNotified[]`, `subjectsCommentedBy[]`, `provenanceVerifiedBy` (editorial desk lead).
9. Retraction protocol: documented in `/docs/runbooks/retractions.md`.

**Effort.** M — 80-120 tool-uses, 1-2 days.

**DoD.**
- [ ] Idempotency: same body 5x = ONE invoice.
- [ ] Forged IPN bad sig = 401.
- [ ] Slack `#alerts-bureau` receives test messages.
- [ ] CSP header on every response.
- [ ] Leak protocol drilled with editorial desk in a tabletop exercise.

**Hand-off context.**
- Editorial integrity > engineering elegance. When in doubt, slow down and ping the desk lead.

---

### Phase 5 — Launch ops (Bundle + Reseller)

**Goal.** Bundle subscribers see all 5 verticals. First Reseller-license customer ships co-branded issue.

**Tasks.**
1. Add 4 more verticals (biotech, govtech, climate, semis) to ingest + process. Each has its own `data/sources/<vertical>.json`.
2. Bundle subscriber feed: combined JSON+CSV across all 5 verticals; cross-vertical index in week 4.
3. Reseller config: persist in `resellerConfigs`. Render Friday issue with custom masthead + accent + footer + delivery endpoint + lag.
4. Custom domain support: `eco-dispatch.com` resolves Bureau-rendered issues with reseller's branding.
5. Reseller dashboard `/app/reseller`: subscriber list, issue history, customizations.

**Effort.** L — 200-350 tool-uses, 3-5 days.

**DoD.**
- [ ] All 5 verticals publishing weekly.
- [ ] Bundle subscriber receives 5 verticals + cross-vertical index in week 4.
- [ ] Reseller test config: rendered issue matches per-reseller masthead/accent/footer/delivery URL/lag.
- [ ] Custom domain serves rendered issues.

**Hand-off context.**
- Reseller customizations are CSS-injection; logo via SVG; footer text plain string. Don't allow arbitrary HTML in reseller config.
- Cross-vertical index is editorial-curated, not auto-generated.

---

### Phase 6 — Post-launch (cross-vertical, retractions, analytics)

**Goal.** Cross-vertical index live. Retraction protocol exercised. Subscriber analytics for editorial.

**Tasks.**
1. Cross-vertical anchor surface: dossier items tagged with multi-vertical relevance; cross-index built on triage.
2. Retraction flow: when an issue is retracted, the next issue's footer carries the retraction with original source-ID + reason.
3. Subscriber analytics: which dossier items get clicked / source-deep-linked. Editorial uses to refine.
4. Public `/changelog` page: new sources, new verticals, retractions.

**Effort.** M — 80-120 tool-uses, 1-2 days.

**DoD.**
- [ ] Cross-vertical anchor renders in week-4 index for Bundle subs.
- [ ] Retraction protocol tested with a simulated correction.
- [ ] Subscriber analytics dashboard for editorial.
- [ ] `/changelog` publicly visible.

**Hand-off context.**
- Click analytics: per-dossier-item count, no PII.

---

## 2. Cross-cutting concerns

| Concern | First addressed | Notes |
|---|---|---|
| Accessibility | Phase 2 | Lighthouse a11y >= 95 |
| i18n | Out of scope through Wave 4 |
| Mobile | Phase 2 | Responsive subscriber dashboard |
| Telemetry | Phase 4 | Stdout JSON; Loki Wave 4+ |
| GDPR / DSAR | Phase 4 | EU-heavy subscriber base; runbook |
| SOC 2 / regulated-use | Out of scope (anti-persona) |

---

## 3. Risk register

| # | Risk | Owner | Mitigation |
|---|---|---|---|
| R1 | NOWPayments outage | Phase 4 | Plisio + Reown wired Wave 4 |
| R2 | Forged IPN | Phase 4 | HMAC-SHA512 |
| R3 | Source 404 between freeze and publish | Phase 1 | WaybackMachine fallback + editorial decision |
| R4 | Libel risk from leaked document | Phase 4 | Provenance verification + 24h subject notice + comment mechanism + retraction protocol |
| R5 | Feed scraping leaks paid content | Phase 4 | Per-subscriber HMAC token; 30-day rotation; rate limit; anomaly alerting |
| R6 | LLM tiebreak hallucinates dedupe rationale | Phase 1 | Editorial desk reviews triage; SimHash always available as ground truth |

---

## 4. References

- Doc 11 — `/docs/11-user-stories-and-scenarios.md`.
- Doc 12 — `/docs/12-technical-specification.md`.
- DESIGN.md — `/DESIGN.md` — broadsheet visual contract.
- Wave 2 build report — `/Users/keer/projects/prin7r/wave2-reports/info-aggregator-reseller.md` — production state.
- Payments prototypes — `/Users/keer/projects/prin7r/payments-prototypes/`.
