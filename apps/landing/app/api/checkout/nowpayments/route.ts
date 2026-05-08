import { NextResponse } from "next/server";

const PLANS = {
  single: { amount: 499, name: "Bureau · Single vertical (1 month)" },
  bundle: { amount: 1499, name: "Bureau · Bundle — all five verticals (1 month)" },
  reseller: { amount: 4800, name: "Bureau · Reseller license (setup)" },
} as const;

type PlanId = keyof typeof PLANS;

function isPlan(v: unknown): v is PlanId {
  return typeof v === "string" && v in PLANS;
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { plan?: string };
  if (!isPlan(body.plan)) {
    return NextResponse.json({ error: "Unknown plan." }, { status: 400 });
  }
  const plan = PLANS[body.plan];
  const apiKey = process.env.NOWPAYMENTS_API_KEY;
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ??
    new URL("/", request.url).origin;

  const orderId = `bureau-${body.plan}-${Date.now().toString(36)}`;

  if (!apiKey) {
    // [BUREAU_PAYMENT_DEBUG] checkout endpoint — no NOWPAYMENTS_API_KEY in env, returning mock URL
    return NextResponse.json({
      checkoutUrl: `${baseUrl}/?status=mock&order=${orderId}`,
      orderId,
      mode: "mock",
      message:
        "Live NOWPayments key is not configured for this environment. The integration code is in place; set NOWPAYMENTS_API_KEY in /opt/prin7r-deploys/info-aggregator-reseller/.env to enable real invoices.",
    });
  }

  const r = await fetch("https://api.nowpayments.io/v1/invoice", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
    },
    body: JSON.stringify({
      price_amount: plan.amount,
      price_currency: "usd",
      pay_currency: "usdttrc20",
      ipn_callback_url: `${baseUrl}/api/webhooks/nowpayments`,
      order_id: orderId,
      order_description: plan.name,
      success_url: `${baseUrl}/?status=success&order=${orderId}`,
      cancel_url: `${baseUrl}/?status=cancelled&order=${orderId}`,
      is_fixed_rate: false,
      is_fee_paid_by_user: false,
    }),
  });

  if (!r.ok) {
    const text = await r.text();
    // [BUREAU_PAYMENT_DEBUG] NOWPayments invoice failed
    return NextResponse.json(
      { error: `NOWPayments invoice creation failed (${r.status}): ${text.slice(0, 240)}` },
      { status: 502 },
    );
  }

  const data = (await r.json()) as { invoice_url?: string; id?: string };
  if (!data.invoice_url) {
    return NextResponse.json(
      { error: "NOWPayments did not return an invoice_url." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    checkoutUrl: data.invoice_url,
    orderId,
    invoiceId: data.id,
    mode: "live",
  });
}
