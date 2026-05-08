import { NextResponse } from "next/server";
import crypto from "node:crypto";

function sortObject(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortObject);
  if (value && typeof value === "object") {
    return Object.keys(value as Record<string, unknown>)
      .sort()
      .reduce<Record<string, unknown>>((out, key) => {
        out[key] = sortObject((value as Record<string, unknown>)[key]);
        return out;
      }, {});
  }
  return value;
}

function timingSafeEqualHex(left: string, right: string) {
  const a = left.trim().toLowerCase();
  const b = right.trim().toLowerCase();
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(Buffer.from(a, "hex"), Buffer.from(b, "hex"));
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-nowpayments-sig");
  const secret = process.env.NOWPAYMENTS_IPN_SECRET;

  let payload: Record<string, unknown> = {};
  try {
    payload = JSON.parse(rawBody) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid_json" }, { status: 400 });
  }

  // [ANNOTEDLY_NOWPAYMENTS_WEBHOOK] received
  if (!signature || !secret) {
    return NextResponse.json(
      { ok: false, reason: "missing_signature_or_secret" },
      { status: 401 },
    );
  }

  const sorted = JSON.stringify(sortObject(payload));
  const expected = crypto
    .createHmac("sha512", secret.trim())
    .update(sorted)
    .digest("hex");
  const verified = timingSafeEqualHex(expected, signature);

  if (!verified) {
    return NextResponse.json({ ok: false, reason: "bad_signature" }, { status: 401 });
  }

  const status =
    typeof payload.payment_status === "string" ? payload.payment_status : "";
  const orderId =
    typeof payload.order_id === "string"
      ? payload.order_id
      : typeof payload.payment_id === "string"
      ? payload.payment_id
      : "unknown";

  // Wave 2: log only. Fulfilment is the responsibility of the post-Wave-2 SaaS app.
  // [ANNOTEDLY_NOWPAYMENTS_WEBHOOK] verified=true order_id=<orderId> status=<status>

  return NextResponse.json({
    ok: true,
    orderId,
    status,
    paid: status.toLowerCase() === "finished" || status.toLowerCase() === "confirmed",
  });
}
