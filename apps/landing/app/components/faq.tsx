"use client";

import { useState } from "react";

const items = [
  {
    q: "How exactly does the white-label work?",
    a: "On a Reseller-license, you give us a wordmark, an accent hex, a logo SVG (optional), an email-from address, and a URL where the dossier should live. We render two copies of every issue — Annotedly house, and your edition with those swapped in. Body, footnotes, and source-IDs are byte-identical. Your clients never see Annotedly anywhere unless you opt-in to a co-branded methodology page.",
  },
  {
    q: "Where do the sources come from?",
    a: "Each vertical maintains its own ingest list of 40–120 feeds: regulator gazettes, government RFP boards, peer-reviewed pre-print servers, vendor 10-Q/10-K disclosures, EDGAR / Companies House / equivalents, leaked documents only when provenance is verifiable. We publish the full source list for every vertical at the start of each subscription and update it quarterly. We do not scrape paywalled news sites we do not have a license for.",
  },
  {
    q: "What is your refund policy?",
    a: "If your first dossier is not what was promised, write within 14 days and the month is refunded. After that, subscriptions are month-to-month and cancel at end of period — no annual lock-in, no surprise renewals. Reseller-license setup fees are refundable for 30 days after the first co-branded issue ships.",
  },
  {
    q: "Which verticals are on the roadmap?",
    a: "Active verticals as of 2026-W19: fintech regulations, biotech grants, govtech procurement, climate-tech disclosures, semiconductor export controls. On the 2026 H2 roadmap: space-launch / orbital allocation, marine logistics + tariffs, pharma reimbursement (US + EU). We add a vertical only when the source list and the dedupe ruleset both pass internal review — usually a six-week build.",
  },
  {
    q: "Is there a free sample?",
    a: "Yes — email hello@info-aggregator-reseller.prin7r.com with your firm name and the vertical you want. We ship the prior week's dossier (rolling, not the current week) within one business day. No credit card.",
  },
  {
    q: "Why crypto-only checkout?",
    a: "USDT/USDC settle in minutes on Tron, Ethereum, Polygon, and BSC. Net-30 wire is available for reseller-license deals at $4,800+. We are not running a card processor in Wave 2 because card chargebacks would force us to verify subscriber identity in ways that conflict with our reseller-confidentiality posture.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="border-b border-rule">
      <div className="mx-auto max-w-page px-6 py-20 md:py-24">
        <div className="flex items-baseline justify-between border-b border-rule-soft pb-4 mb-10">
          <h2 className="font-mono text-[12px] uppercase tracking-[0.18em] text-ink-soft">
            FAQ — six questions
          </h2>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
            An-FAQ-26
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12">
          <div className="lg:col-span-4 mb-8 lg:mb-0">
            <p className="font-serif text-[28px] leading-[1.2] tracking-[-0.02em] text-ink">
              Honest <span className="under">answers</span> &mdash; the kind we&rsquo;d want from a vendor.
            </p>
          </div>

          <div className="lg:col-span-8">
            <ul className="border-t border-rule-soft">
              {items.map((it, i) => {
                const isOpen = open === i;
                return (
                  <li key={it.q} className="border-b border-rule-soft">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="w-full flex items-baseline justify-between gap-6 py-5 text-left"
                    >
                      <span className="font-serif text-[20px] leading-[1.3] tracking-[-0.01em] text-ink">
                        {it.q}
                      </span>
                      <span
                        className="font-mono text-[18px] leading-none text-oxblood transition-transform duration-200"
                        style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                        aria-hidden
                      >
                        +
                      </span>
                    </button>
                    {isOpen ? (
                      <div className="pb-6 pr-10">
                        <p className="font-sans text-[15px] leading-[1.6] text-ink-2 max-w-[68ch]">
                          {it.a}
                        </p>
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
