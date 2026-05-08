# 01 — Brand identity

## Codename

**Annotedly** — a research syndicate. Closer to a regulator&rsquo;s docket cover or a regional broadsheet&rsquo;s masthead than to an AI-product landing page.

## Brand pyramid

- **Essence:** *footnoted*.
- **Personality:** archival · meticulous · resellable.
- **Values:** primary sources, attribution at the paragraph level, restraint.
- **Attributes:** dateline · masthead · seal · ledger · hairline.

## Positioning statement

> For boutique consultancies and partnership leads who already publish weekly notes to paying clients, **Annotedly** is a vertical-intelligence subscription that delivers a footnoted, white-labelable dossier on a single regulated vertical — unlike Bloomberg Terminal seats and unfiltered Twitter scrapes, because every paragraph has a source-ID an analyst can hand to her partner without re-keying.

## Audience persona

### Primary &mdash; *Mireille, 38, fintech analyst at a 14-person Brussels consultancy*
- **Goals.** Ship a Friday client note by 11:00 CET that is sourceable, hand-defensible, and short enough that a partner reads it.
- **Frustrations.** She spends Thursday night at the Federal Register, then deduplicating five outlets writing about the same FDIC rule. Her competitors quote bloggers and pretend they don&rsquo;t.
- **Channels.** LinkedIn (silent reader, occasional poster), Substack, two private Slack groups for EMEA fintech analysts, the FT app on the metro.

### Secondary &mdash; *Ravi, 41, partnerships lead at a $30M ARR vertical-SaaS company*
- **Goals.** Send a monthly &ldquo;ecosystem dispatch&rdquo; to the top 80 accounts that feels less like marketing. Get re-shared.
- **Frustrations.** His content team has tried three newsletter formats; the last one was unsubscribed-from twice. He needs an editorial product to syndicate, not another writer.
- **Channels.** Quarterly partner summits, a LinkedIn group of 1,800 partnerships practitioners, weekly demos with target accounts.

## Voice & tone

### Do
- Lead with the schedule, the source-ID, and the dedupe ratio.
- Use the active voice and full names of the regulators / agencies / firms.
- Say what was deduplicated and why.

### Don&rsquo;t
- Don&rsquo;t use &ldquo;AI-powered&rdquo;, &ldquo;intelligence platform&rdquo;, or &ldquo;next-generation&rdquo;.
- Don&rsquo;t cite a tweet without a primary source.
- Don&rsquo;t paraphrase a leaked document; quote it and footnote the leak.

### Sample sentence
> &ldquo;Friday: 24 source items, 17 footnotes, 2 leaked memos with provenance verified, 1 retraction. The dedupe ratio this issue is 17:1 — we read 412, you read 24.&rdquo;

## Visual system

### Palette (5 colors)

| Role | Token | Hex |
|---|---|---|
| Page surface (paper) | `--paper` | `#FAFAF8` |
| Primary type / rules | `--ink` | `#0E0F12` |
| Soft type / footnotes | `--ink-soft` | `#3F4148` |
| Accent (single) | `--oxblood` | `#7A1F2B` |
| Categorical chrome | `--paper-2` | `#F2F0EA` |

Plus two restricted categorical tag colors used only for vertical labels: `--olive #4F5A2E` (biotech / climate-tech) and `--ochre #A87A2E` (semis / govtech). Never combined in the same section.

### Typography

| Family | Source | Role |
|---|---|---|
| **Source Serif 4** | Google Fonts (variable) | Editorial display, dossier excerpt body |
| **Inter** | Google Fonts | UI chrome, body copy outside dossier excerpts |
| **JetBrains Mono** | Google Fonts | Source-IDs, datelines, masthead numerals |

### Logo concept

A square ink seal stamp with the wordmark `ANNOTEDLY` in Inter Bold, an oxblood underline at 1px under the &ldquo;O&rdquo;, and a JetBrains Mono dossier-number stamp (`§ An-2026-W19`) to the right of the wordmark.

```svg
<svg width="220" height="56" viewBox="0 0 220 56" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="56" height="56" fill="#0E0F12"/>
  <text x="28" y="36" font-family="Inter, sans-serif" font-weight="700" font-size="22" fill="#FAFAF8" text-anchor="middle" letter-spacing="-0.04em">An</text>
  <rect x="14" y="42" width="28" height="2" fill="#7A1F2B"/>
  <text x="68" y="34" font-family="Inter, sans-serif" font-weight="700" font-size="20" fill="#0E0F12" letter-spacing="-0.02em">ANNOTEDLY</text>
  <text x="156" y="33" font-family="JetBrains Mono, monospace" font-weight="500" font-size="11" fill="#3F4148" letter-spacing="0.18em">§ An-2026</text>
</svg>
```

### Spacing & radius

- Base unit 4px. Section gap 96px desktop, 64px mobile. Card padding 32px.
- Buttons square (`0`). Cards `2px` (a hair, broadsheet plate). Browser-chrome mockups `8px`.
- Zero shadows. Depth via hairline rules and surface contrast only.

### Motion principles

Default state is still. Allowed motion: masthead bottom rule color shift on scroll, FAQ open/close, CTA hover. All motion respects `prefers-reduced-motion: reduce`.

## Forbidden

- Lifting Anthropic&rsquo;s warm parchment (#faf9f5) verbatim — replaced with milky white #FAFAF8 per the project no-beige rule.
- Generic &ldquo;intelligence&rdquo; purple, news-app gradients, stock photos of newspapers.
- Anything that looks like Bloomberg Terminal blue-on-black or a SaaS dashboard with a kanban.
