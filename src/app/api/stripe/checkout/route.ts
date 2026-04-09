import { NextResponse } from "next/server";
import { verifyDepositToken } from "../../../../lib/depositToken";
import { getAppUrl } from "../../../../lib/appUrl";
import { getDepositAmountCents, getStripe, isStripeConfigured } from "../../../../lib/stripeDeposit";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

type Body = {
  customerEmail?: string;
  /** Signed deposit link token from /pay?t=... */
  token?: string;
};

export async function POST(req: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json({ ok: false, error: "Online payments are not configured." }, { status: 503 });
  }

  let body: Body = {};
  try {
    const raw = await req.text();
    if (raw) body = JSON.parse(raw) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const email = (body.customerEmail || "").trim();
  if (email && !isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
  }

  const token = (body.token || "").trim();
  let amountCents: number;
  let quoteRef: string | undefined;

  if (token) {
    const verified = verifyDepositToken(token);
    if (!verified.ok) {
      return NextResponse.json({ ok: false, error: verified.reason }, { status: 400 });
    }
    amountCents = verified.payload.amountCents;
    quoteRef = verified.payload.ref;
  } else {
    const fromEnv = getDepositAmountCents();
    if (fromEnv <= 0) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "No payment link token was provided. Open the personalized link from your quote email, or contact us for a deposit link.",
        },
        { status: 400 }
      );
    }
    amountCents = fromEnv;
  }

  const baseUrl = getAppUrl();
  const stripe = getStripe();

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: amountCents,
            product_data: {
              name: "Booking deposit — YBR Logistics",
              description: quoteRef
                ? `Deposit (quote/job ref: ${quoteRef}). Remaining balance is due per your estimate and terms.`
                : "Deposit toward your booking after quote approval. Remaining balance is due per your estimate and terms.",
            },
          },
        },
      ],
      success_url: `${baseUrl}/pay/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/pay/canceled`,
      customer_email: email || undefined,
      metadata: {
        source: "ybrlogistics-site",
        ...(quoteRef ? { quote_ref: quoteRef.slice(0, 500) } : {}),
        amount_cents: String(amountCents),
      },
    });

    if (!session.url) {
      return NextResponse.json({ ok: false, error: "Could not start checkout." }, { status: 502 });
    }

    return NextResponse.json({ ok: true, url: session.url });
  } catch (e) {
    console.error("[stripe checkout]", e);
    return NextResponse.json({ ok: false, error: "Could not start payment. Please try again later." }, { status: 502 });
  }
}
