"use client";

import { useState } from "react";

type Plan = {
  id: "single" | "bundle" | "reseller";
  eyebrow: string;
  name: string;
  price: string;
  cadence: string;
  underlinedNoun: string;
  features: string[];
  cta: string;
  emphasized?: boolean;
};

const plans: Plan[] = [
  {
    id: "single",
    eyebrow: "Single vertical",
    name: "Single",
    price: "$499",
    cadence: "per vertical / month",
    underlinedNoun: "evidence",
    features: [
      "One vertical of your choice",
      "Weekly Friday dossier (PDF + email)",
      "JSON + CSV feed endpoint",
      "Footnote ledger + source list per issue",
    ],
    cta: "Subscribe — Single",
  },
  {
    id: "bundle",
    eyebrow: "All five verticals",
    name: "Bundle",
    price: "$1,499",
    cadence: "all five verticals / month",
    underlinedNoun: "scope",
    features: [
      "Fintech · Biotech · Govtech · Climate · Semis",
      "All weekly dossiers + cross-vertical index",
      "Combined JSON + CSV feed",
      "Quarterly editorial review call",
    ],
    cta: "Subscribe — Bundle",
    emphasized: true,
  },
  {
    id: "reseller",
    eyebrow: "Reseller license",
    name: "Reseller",
    price: "$4,800",
    cadence: "setup + $1,200 per added vertical / month",
    underlinedNoun: "syndicate",
    features: [
      "Re-mastheaded copy, your logo + accent",
      "Custom URL, email-from, and footer line",
      "Methodology page co-branded with Annotedly",
      "Up to 3 verticals at launch; add more anytime",
    ],
    cta: "Open license — Reseller",
  },
];

export function Pricing() {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function startCheckout(plan: Plan["id"]) {
    setLoading(plan);
    setError(null);
    try {
      const r = await fetch("/api/checkout/nowpayments", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = (await r.json()) as { checkoutUrl?: string; error?: string };
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }
      setError(data.error ?? "Checkout could not be created. Please retry or email hello@info-aggregator-reseller.prin7r.com.");
    } catch (err) {
      setError("Network error. Please retry shortly.");
    } finally {
      setLoading(null);
    }
  }

  return (
    <section id="pricing" className="border-b border-rule">
      <div className="mx-auto max-w-page px-6 py-20 md:py-24">
        <div className="flex items-baseline justify-between border-b border-rule-soft pb-4 mb-12">
          <h2 className="font-mono text-[12px] uppercase tracking-[0.18em] text-ink-soft">
            Pricing — three rails
          </h2>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
            An-PRC-26
          </span>
        </div>

        <p className="max-w-[60ch] font-serif text-[28px] leading-[1.2] tracking-[-0.02em] text-ink mb-12">
          Three rails. Crypto-only checkout — <span className="under">USDT</span> or{" "}
          <span className="under">USDC</span>, on the chain of your choice.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((p) => (
            <article
              key={p.id}
              className={[
                "border bg-paper-2 p-8 flex flex-col",
                p.emphasized ? "border-ink" : "border-rule-soft",
              ].join(" ")}
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft mb-3">
                {p.eyebrow}
              </p>
              <h3 className="font-serif text-[36px] leading-[1.1] tracking-[-0.02em] text-ink mb-2">
                {p.name}
              </h3>
              <p className="font-serif text-[44px] leading-[1.1] tracking-[-0.02em] text-ink">
                <span className={p.emphasized ? "under" : ""}>{p.price}</span>
              </p>
              <p className="font-sans text-[14px] text-ink-soft mb-6">{p.cadence}</p>
              <ul className="space-y-2 mb-8 grow">
                {p.features.map((f) => (
                  <li key={f} className="font-sans text-[14px] leading-[1.5] text-ink-2 flex gap-2">
                    <span className="font-mono text-[12px] text-oxblood mt-0.5">§</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => startCheckout(p.id)}
                disabled={loading !== null}
                className={[
                  "block w-full font-sans text-[14px] font-medium text-center py-3 px-6 transition-colors duration-150",
                  p.emphasized
                    ? "bg-ink text-paper hover:bg-oxblood"
                    : "border border-ink text-ink hover:bg-ink hover:text-paper",
                  loading === p.id ? "opacity-70 cursor-progress" : "",
                  loading && loading !== p.id ? "opacity-40" : "",
                ].join(" ")}
              >
                {loading === p.id ? "Opening invoice…" : `${p.cta} →`}
              </button>
            </article>
          ))}
        </div>

        {error ? (
          <p
            role="alert"
            className="mt-8 font-mono text-[12px] uppercase tracking-[0.12em] text-oxblood"
          >
            ⚠ {error}
          </p>
        ) : null}

        <p className="mt-10 max-w-[64ch] font-sans text-[14px] text-ink-soft">
          NOWPayments hosted invoice. Net-30 wire is available for reseller-license
          deals — email <a className="underline" href="mailto:hello@info-aggregator-reseller.prin7r.com">hello@info-aggregator-reseller.prin7r.com</a>{" "}
          with your firm name and a vertical shortlist.
        </p>
      </div>
    </section>
  );
}
