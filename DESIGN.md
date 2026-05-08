# DESIGN.md — Annotedly (info-aggregator-reseller)

> The research-syndicate house style. Milky-paper canvas, ink type, a single oxblood accent, word-level underlines for emphasis, hairline rules, mono source-IDs. Editorial authority that resellers can co-brand without losing their own voice.

---

## 1. Product and audience

**Product.** Annotedly is a curated cross-source intelligence service. Each subscription is a single vertical (fintech regulations, biotech grants, govtech procurement, climate-tech disclosures, semiconductor export controls). A Annotedly analyst-agent ingests 40–120 public + paywalled feeds per vertical, deduplicates, footnotes every claim, and ships a weekly digest plus a JSON/CSV feed and an inbox-ready summary. Resellers buy a license, white-label the surface (logo + accent + footer), and resell to their own clients.

**Audience.**
- *Primary — vertical analyst at a boutique consultancy.* 6–40 person firm. Already writes weekly notes for 5–30 paying clients. Time-starved, sourcing-paranoid, footnote-obsessed. Wants raw evidence, not generated summaries.
- *Secondary — partnerships lead at a mid-market SaaS vendor.* Already runs a "trends" newsletter for top accounts. Wants to syndicate Annotedly under their masthead so the newsletter feels less promotional.
- *Anti-persona — generic SMB content marketer chasing AI hype.* Will not pay $1,200/mo for evidence-grade work; will pay $29 for a ChatGPT wrapper. Send them away politely.

**Voice tagline.** *Footnoted intelligence. Reseller-ready.*

## 2. Visual positioning

**Reference axis.** Anthropic's research-journal warmth × *The Economist*'s rule-bound editorial × a regulator's docket cover. We swap Anthropic's warm parchment (#faf9f5) for milky white (#FAFAF8 — per the no-beige rule) and exchange the terracotta clay for **oxblood** (#7A1F2B). Headlines emphasize selected nouns with a thick text-decoration underline (lifted from Anthropic). Source attributions render as monospace dossier-IDs (lifted from regulator filings). Mastheads, hairlines, and blackletter-light section dividers make it feel like a printed dispatch — not a SaaS dashboard.

**What this project is not.**
- Not a news-aggregator app (no infinite feed, no cards-with-images grid).
- Not a "trending intelligence" deck (no purple gradients, no "AI" sparkle).
- Not a generic newsletter SaaS (no mailbox UI mockups, no ConvertKit-clone hero).

## 3. ShadCN baseline and local component policy

- Default UI primitive set: **shadcn/ui** (Radix + Tailwind). Add via `pnpm dlx shadcn@latest add <component>` only when needed — the Wave 2 landing intentionally avoids most ShadCN chrome and is hand-authored typography + hairlines.
- For Annotedly, only `Button` is vendored (`apps/landing/app/components/ui/button.tsx`) and re-themed against the Annotedly tokens (square edges, ink fill, hairline border, no shadow). The full ShadCN registry stays available for the SaaS app under `apps/app/`.
- **Local components live at** `apps/landing/app/components/` and are owned by this repo. No paid/pro libraries.
- **Exceptions:** none. Anything that drifts from ShadCN conventions in the future must be logged in the changelog (§15) and cite a reason.

## 4. Color tokens

| Token | Hex | Role |
|---|---|---|
| `--ink` | `#0E0F12` | Primary type, rules, masthead, button fills |
| `--ink-2` | `#1B1D22` | Secondary type, blockquote, dark-card body |
| `--ink-soft` | `#3F4148` | Tertiary type, captions, footnote ledger |
| `--paper` | `#FAFAF8` | Page base — milky white (replaces Anthropic's parchment per no-beige rule) |
| `--paper-2` | `#F2F0EA` | Sidebar/aside surface, vertical-coverage strip cells |
| `--paper-3` | `#E6E2D5` | Tertiary card surface, reseller mockup chrome |
| `--rule` | `#0E0F12` | Hairline borders (1px), table dividers, masthead bar |
| `--rule-soft` | `#C9C4B5` | Mid-weight rules between paragraphs in dossier excerpts |
| `--oxblood` | `#7A1F2B` | Single confident accent — used for emphasis underlines, "live invoice" CTA, dossier-number stamps |
| `--oxblood-deep` | `#5C141E` | Hover/pressed state of oxblood elements |
| `--olive` | `#4F5A2E` | Vertical-coverage tag (climate-tech / biotech) |
| `--ochre` | `#A87A2E` | Vertical-coverage tag (semiconductors / govtech) |

**Categorical tag colors** (`--olive`, `--ochre`) are used as **uppercase tracking labels with no fill** — never as button fills, never combined in the same section. The accent budget is one chromatic color per section.

## 5. Typography

| Family | Source | Role |
|---|---|---|
| **Source Serif 4** | Google Fonts (variable) | Editorial display, hero excerpt body, dossier headlines. Subs Anthropic Serif. |
| **Inter** | Google Fonts | All UI chrome — nav, buttons, body copy outside dossier excerpts, footnotes |
| **JetBrains Mono** | Google Fonts | Source-IDs (`§ FED-25-1144`), invoice numbers, line numbering, masthead datelines |

**Weights used:** Source Serif 400 / 600. Inter 400 / 500 / 600 / 700. JetBrains Mono 400 / 500.

**Type scale (Annotedly):**

| Role | Family / Weight | Size | Line-height | Tracking |
|---|---|---|---|---|
| `eyebrow` | Inter / 600 | 12px | 1.4 | 0.18em uppercase |
| `caption` | Inter / 500 | 13px | 1.4 | 0.04em |
| `body` | Inter / 400 | 16px | 1.55 | -0.01em |
| `dossier-body` | Source Serif 4 / 400 | 18px | 1.6 | 0 |
| `lead` | Inter / 400 | 20px | 1.45 | -0.01em |
| `subheading` | Inter / 600 | 24px | 1.3 | -0.01em |
| `heading-sm` | Source Serif 4 / 600 | 32px | 1.2 | -0.02em |
| `heading` | Source Serif 4 / 600 | 44px | 1.1 | -0.02em |
| `display` | Source Serif 4 / 600 | 64px | 1.05 | -0.025em |
| `dateline` | JetBrains Mono / 500 | 12px | 1.4 | 0.06em uppercase |
| `source-id` | JetBrains Mono / 400 | 13px | 1.4 | 0 |

**Emphasis system.** Selected nouns inside `display`, `heading`, and `heading-sm` receive a thick `text-decoration-line: underline; text-decoration-thickness: 4px; text-underline-offset: 6px;` in `--ink` — this is the **only** emphasis device. Color, italic, and bold-weight increases are not used as emphasis. Body copy uses no decoration except actual hyperlinks, which take a 1px underline in `--ink-soft`.

## 6. Spacing, radius, shadows, and borders

- Base unit: 4px. Scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128.
- **Radius:** buttons `0px` (square — formal signal). Cards `2px` (a hair, like a corner-rounded broadsheet plate). Reseller-mockup browser chrome `8px`. No pill / no full-rounded.
- **Shadows:** **none.** Depth comes from hairline rules and surface contrast. The only allowed shadow is `0 0 0 1px var(--rule)` as a focus ring on interactive elements.
- **Borders:** all rules are 1px solid `--rule` (full ink) or 1px solid `--rule-soft` (mid-weight) — never both in the same component.

## 7. Layout system and responsive rules

- Page max-width 1280px (matches the playbook v2 standard ≥1200px). Masthead bar is full-bleed; everything else lives in a 24px gutter grid.
- 12-column desktop grid (≥1024px). 8-column mobile grid (≥640px). 4-column phone grid (<640px).
- Section gap 96px desktop / 64px mobile.
- Card padding 32px desktop / 24px mobile.
- Mobile breakpoints: 390 (phone) / 768 (tablet) / 1024 (laptop) / 1280 (desktop). All sections tested at 320 / 768 / 1024 / 1440.
- Sticky masthead height 56px desktop / 48px mobile, ink fill, oxblood underline at 1px on scroll.

## 8. Component catalog

- **Masthead bar.** Full-bleed `--ink` strip. Left: wordmark `ANNOTEDLY` (Inter 700) + dossier-number stamp (`§ An-2026-05`) in JetBrains Mono / 500. Center: nav links (Coverage / Resellers / Pricing / FAQ). Right: `Open file` (oxblood-bordered ghost button). Bottom edge: 1px `--rule-soft` line that becomes 1px `--oxblood` after 16px scroll.
- **Hero dossier.** Two-column desktop. Left 7/12: a real digest excerpt rendered as if scanned from a printed brief — display headline with two underlined nouns, lead paragraph, source-IDs in mono, footnote markers, 2-column footnote ledger at bottom. Right 5/12: dateline, vertical badge, three-line "what's in this issue", primary CTA + secondary "Sample digest →".
- **Vertical coverage strip.** Five cells in a 5-col grid (desktop), two-col on mobile. Each cell: vertical name in serif, source-count in mono, three sample dossier-IDs as tracking-spaced labels. Cells separated by 1px `--rule-soft` only — no fill.
- **Reseller co-brand mockup.** Two side-by-side dossier-thumbnail mockups: left "Annotedly house masthead", right "Reseller masthead — *Atelier Northrop*" with a custom logo + accent. Caption explains that the body content is identical; only masthead/accent/footer change.
- **Pricing — three tiers.** Single-vertical / Bundle / Reseller-license. Cards on `--paper-2`, hairline border, single oxblood underline on the active price. NOWPayments crypto CTA on each tier. Beneath each: 4-line feature list in mono.
- **FAQ.** 6-row accordion, hairline-divided rows, no chevron animation — just rotated `+` glyph.
- **Footer.** Three columns + bottom rule. Mono colophon line ("Set in Source Serif 4 · Inter · JetBrains Mono. Rendered for Wave 2.")

## 9. Landing page structure

In source order, with the marketing strategy (`docs/08-marketing-strategy.md`) as the brief:

1. **Masthead bar** (sticky).
2. **Hero dossier** — Annotedly digest excerpt with footnotes, source-IDs, and underlined emphasis nouns. Eyebrow reads `ISSUE 2026-W19 · FINTECH DOSSIER · 24 SOURCES`.
3. **Vertical coverage strip** — fintech / biotech / govtech / climate-tech / semiconductors. Source-counts and sample dossier-IDs.
4. **What's inside an issue** — 4-step diagram (Crawl → Dedupe → Footnote → Ship). Mono numerals, hairline rules, no icons.
5. **Reseller co-brand mockup** — Annotedly house vs. reseller masthead, side by side. Caption explains scope of customization.
6. **Pricing** — Single-vertical $499 / Bundle $1,499 / Reseller-license $4,800 setup + $1,200 per added vertical/mo. NOWPayments crypto CTA on each.
7. **Methodology pull-quote** — short editorial statement on sourcing, deduplication, and footnoting policy. Set in Source Serif 4 / 32px.
8. **FAQ** — 6 questions. Sourcing, refunds, white-label scope, vertical roadmap, cancellation, KYC.
9. **Footer** — three columns (Coverage / Resellers / Annotedly), legal hairline, mono colophon.

No carousel. No animated mesh background. No hero photograph.

## 10. Imagery and generated asset rules

- Wave 2 ships **no raster imagery.** The visual anchor is typographic — display serif, mono dossier-IDs, hairlines, and a single black masthead bar.
- The reseller mockup uses two SVG-rendered dossier thumbnails (built with Tailwind divs + inline SVG seal stamps). No stock photos.
- If a polish pass adds `prin7r-generate-image`, the prompt rules:
  - Aspect 3:4 (dossier card), 16:9 (masthead band), 1:1 (seal stamp).
  - Mood: archival, printed, off-white paper, ink and oxblood only.
  - Forbidden: photographs of people, news app screenshots, glow / gradient, blue tints, "AI orb" iconography.
- Generated assets land in `apps/landing/public/generated/` with a sibling `<filename>.prompt.txt`.

## 11. Motion and interaction rules

- **Default state:** zero motion. The page is intentionally still — print rhythm.
- **Allowed motion:** (a) the masthead bottom rule transitioning from `--rule-soft` → `--oxblood` over 200ms on scroll, (b) FAQ row open/close at 180ms cubic-bezier(0.2, 0.8, 0.2, 1), (c) primary CTA background swap from `--paper` → `--ink` on hover at 120ms.
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` removes all transitions and the masthead rule stays `--rule-soft`.
- No parallax. No counters animating up. No cursor trails. No scroll-jacking.

## 12. Accessibility and quality gates

- Contrast: `--ink` on `--paper` = 16.4:1 (passes AAA). `--oxblood` on `--paper` = 8.7:1 (passes AAA). `--ink-soft` on `--paper` = 8.9:1 (passes AAA).
- Tab order: skip-to-content → masthead nav → primary CTA → secondary CTA → coverage strip cells → reseller toggle → pricing CTAs → FAQ rows → footer.
- All interactive elements have a 2px `--ink` focus ring (offset 2px, never removed).
- All images have `alt` attributes (decorative SVG seals use `alt=""` + `aria-hidden`).
- All copy real — no `Lorem ipsum`, no `TODO`.
- Verified at 320 / 768 / 1024 / 1440 px widths — no overflow, no overlap.

## 13. Screenshots and verification artifacts

Captured from the deployed URL (`https://info-aggregator-reseller.prin7r.com`) using Playwright Chromium against viewports 1440×900 and 390×844.

- `docs/screenshots/landing-desktop.png`
- `docs/screenshots/landing-mobile.png`

Both screenshots are committed to the repo and embedded in `README.md`.

## 14. External references and library sources

- Anthropic style reference (warm-stone research journal) — typography hierarchy + word-level underline emphasis pattern. We swap parchment for milky white and clay for oxblood per project-specific brand rules.
- *The Economist* / *Financial Times* — masthead-and-rule editorial structure.
- US Federal Register PDFs — dossier-ID format, footnote ledger pattern.
- shadcn/ui — Button primitive baseline.
- Refero Styles — design pattern gallery for dossier-style mastheads.

## 15. Changelog

- **2026-05-08 — initial Wave 2 build.** Annotedly brand identity established. Landing built end-to-end with the hero-dossier, coverage strip, reseller mockup, three-tier pricing with NOWPayments hosted-invoice CTA, FAQ, and editorial footer. ShadCN Button vendored and re-themed. No raster imagery. Quality gates pass.
- **2026-05-08 critical rebrand — Bureau → Annotedly (FAIL on live bureau.id collision)**. Original codename "Bureau" collided with `bureau.id`, an active Framer-built fraud-prevention / identity-decisioning SaaS with real GTM tracking. Renamed brand → **Annotedly** (new domain `annotedly.com`, verified available; brand essence: "annotated digests with citations"). Wordmark + monogram swapped (`B` → `An`); seal stamp text in §1 logo SVG updated. All `B-` brand-prefix dossier IDs migrated to `An-`: `B-2026-W19` → `An-2026-W19`, `B-SRC-26` → `An-SRC-26`, `B-COV-26-V1` / `B-METH-26` / `B-WL-26` / `B-PRC-26` / `B-FAQ-26` / `B-DECK-26` → `An-*`. Reseller-mockup customer initial ID `AN-2026-W19` (Atelier Northrop) re-keyed to `ATN-2026-W19` to avoid collision with the new Annotedly monogram. Debug log tags `[BUREAU_PAYMENT_DEBUG]` / `[BUREAU_NOWPAYMENTS_WEBHOOK]` → `[ANNOTEDLY_*]`. Checkout `orderId` prefix `bureau-` → `annotedly-`. The single legitimate "Consumer Financial Protection Bureau" reference (a real US regulator) is preserved. Container/repo slug `info-aggregator-reseller` unchanged. Touched files: `apps/landing/app/{layout.tsx,components/{masthead,footer,hero-dossier,reseller-mockup,coverage-strip,inside-an-issue,methodology,pricing,faq,ui/button}.tsx,api/{checkout,webhooks}/nowpayments/route.ts}`, `docs/01..13`, `docs/pitch-deck.html`, `README.md`, `apps/app/README.md`, `DESIGN.md`.
