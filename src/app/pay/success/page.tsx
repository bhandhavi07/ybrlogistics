import Link from "next/link";
import type { Metadata } from "next";
import { formatUsd, getStripe, isStripeConfigured } from "../../../lib/stripeDeposit";

export const metadata: Metadata = {
  title: "Payment received",
  description: "Your booking deposit payment was submitted through Stripe.",
  alternates: {
    canonical: "/pay/success",
  },
};

export default async function PaySuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const sp = await searchParams;
  const sessionId = sp.session_id;
  let amountDisplay: string | null = null;

  if (sessionId && isStripeConfigured()) {
    try {
      const stripe = getStripe();
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      if (session.amount_total != null) {
        amountDisplay = formatUsd(session.amount_total);
      }
    } catch {
      /* invalid or expired session id */
    }
  }

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 640 }}>
        <h1 style={{ margin: 0, fontSize: "clamp(28px, 3vw, 40px)", lineHeight: 1.1 }}>Thank you</h1>
        <p style={{ margin: "14px 0 0", color: "var(--muted)", lineHeight: 1.7, fontSize: 16 }}>
          Your payment was submitted successfully{amountDisplay ? ` (${amountDisplay})` : ""}. You should receive a receipt
          from Stripe by email. We will follow up on your booking using the contact information from your quote or
          deposit.
        </p>
        <p style={{ margin: "18px 0 0" }}>
          <Link className="btn btn-primary" href="/" prefetch={false}>
            Back to home
          </Link>
        </p>
      </div>
    </section>
  );
}
