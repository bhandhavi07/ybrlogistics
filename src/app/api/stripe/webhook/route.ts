import { NextResponse } from "next/server";
import Stripe from "stripe";
import { sendInternalEmail } from "../../../../lib/sendInternalEmail";
import { getStripe, isStripeConfigured } from "../../../../lib/stripeDeposit";

export const runtime = "nodejs";

function env(name: string) {
  const value = process.env[name];
  return value && value.trim() ? value.trim() : undefined;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }

  const webhookSecret = env("STRIPE_WEBHOOK_SECRET");
  if (!webhookSecret) {
    console.warn("[stripe webhook] STRIPE_WEBHOOK_SECRET is not set — webhook ignored");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });
  }

  const body = await request.text();
  const sig = request.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
  }

  const stripe = getStripe();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("[stripe webhook] signature verification failed", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const amountTotal = session.amount_total;
    const currency = (session.currency || "usd").toUpperCase();
    const email = session.customer_details?.email || session.customer_email || "";
    const sid = session.id;
    const meta = session.metadata || {};
    const quoteRef = meta.quote_ref || "";

    const text = [
      "Stripe checkout completed.",
      "",
      `Session ID: ${sid}`,
      `Amount: ${amountTotal != null ? (amountTotal / 100).toFixed(2) : "?"} ${currency}`,
      `Customer email: ${email || "(not provided)"}`,
      quoteRef ? `Quote / job ref: ${quoteRef}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h2 style="margin: 0 0 12px;">Payment received (Stripe)</h2>
        <p><strong>Session ID:</strong> ${escapeHtml(sid)}</p>
        <p><strong>Amount:</strong> ${amountTotal != null ? escapeHtml((amountTotal / 100).toFixed(2)) : "?"} ${escapeHtml(currency)}</p>
        <p><strong>Customer email:</strong> ${escapeHtml(email || "(not provided)")}</p>
        ${quoteRef ? `<p><strong>Quote / job ref:</strong> ${escapeHtml(quoteRef)}</p>` : ""}
      </div>
    `;

    try {
      await sendInternalEmail(`Stripe payment received — ${sid.slice(-8)}`, text, html);
    } catch (e) {
      console.error("[stripe webhook] internal email failed", e);
    }
  }

  return NextResponse.json({ received: true });
}
