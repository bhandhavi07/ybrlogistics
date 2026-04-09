import Link from "next/link";
import type { Metadata } from "next";
import PayDepositForm from "../../components/PayDepositForm";
import { verifyDepositToken } from "../../lib/depositToken";
import { formatUsd, getDepositAmountCents, isStripeConfigured } from "../../lib/stripeDeposit";

export const metadata: Metadata = {
  title: "Pay booking deposit",
  description:
    "Pay a booking deposit securely with Stripe (credit or debit card) after your quote is approved. YBR Logistics — California-based moving and logistics.",
  alternates: {
    canonical: "/pay",
  },
};

export default async function PayPage({
  searchParams,
}: {
  searchParams: Promise<{ t?: string }>;
}) {
  const sp = await searchParams;
  const rawToken = (sp.t || "").trim();

  const stripeOk = isStripeConfigured();
  let amountCents = 0;
  let amountDisplay = "—";
  let quoteRef: string | undefined;
  let tokenError: string | undefined;
  let depositToken: string | undefined;

  if (rawToken) {
    const verified = verifyDepositToken(rawToken);
    if (!verified.ok) {
      tokenError = verified.reason;
    } else {
      amountCents = verified.payload.amountCents;
      amountDisplay = formatUsd(amountCents);
      quoteRef = verified.payload.ref;
      depositToken = rawToken;
    }
  } else {
    const fromEnv = getDepositAmountCents();
    if (fromEnv > 0) {
      amountCents = fromEnv;
      amountDisplay = formatUsd(fromEnv);
    }
  }

  const ready = stripeOk && amountCents > 0 && !tokenError;

  let disabledReason: string | undefined;
  if (!stripeOk) {
    disabledReason = "Online payments are not enabled yet. Please call (408) 366-9696 or use Contact to arrange payment.";
  } else if (tokenError) {
    disabledReason = undefined;
  } else if (amountCents <= 0) {
    disabledReason =
      "Deposit amounts are set per quote. Use the personalized payment link we send you by email after we review your job details, or contact us to request a link.";
  }

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 640 }}>
        <h1 style={{ margin: 0, fontSize: "clamp(28px, 3vw, 40px)", lineHeight: 1.1 }}>Pay booking deposit</h1>
        <p style={{ margin: "12px 0 22px", color: "var(--muted)", lineHeight: 1.7, fontSize: 16, maxWidth: 720 }}>
          Pay the <strong style={{ color: "var(--text)" }}>booking deposit</strong> by card after you have an approved
          estimate. The amount matches your quote. The remaining balance is due per your estimate and{" "}
          <Link href="/terms-and-conditions" prefetch={false} style={{ fontWeight: 800, color: "var(--accent-red)" }}>
            terms
          </Link>
          . Questions?{" "}
          <Link href="/contact" prefetch={false} style={{ fontWeight: 800, color: "var(--accent-red)" }}>
            Contact us
          </Link>
          .
        </p>

        {tokenError ? (
          <div className="card" style={{ padding: 22, marginBottom: 16, borderColor: "rgba(185, 28, 28, 0.35)" }}>
            <p style={{ margin: 0, color: "#b91c1c", fontWeight: 750, lineHeight: 1.55 }}>{tokenError}</p>
            <p style={{ margin: "12px 0 0", color: "var(--muted)", fontSize: 14, fontWeight: 650 }}>
              Email or call us and we&apos;ll send a new payment link for your deposit.
            </p>
          </div>
        ) : null}

        <div className="card" style={{ padding: 22 }}>
          {quoteRef ? (
            <div style={{ marginBottom: 12, fontSize: 14, fontWeight: 750, color: "var(--muted)" }}>
              Reference: <span style={{ color: "var(--text)", fontWeight: 900 }}>{quoteRef}</span>
            </div>
          ) : null}
          <div style={{ marginBottom: 16, fontWeight: 900, fontSize: 18, color: "var(--text)" }}>
            Deposit amount: <span style={{ color: "var(--accent-red)" }}>{amountDisplay}</span>
          </div>
          <PayDepositForm
            amountDisplay={amountDisplay}
            disabled={!ready}
            disabledReason={disabledReason}
            depositToken={depositToken}
          />
        </div>

        <p style={{ margin: "20px 0 0", fontSize: 14, color: "var(--muted)", lineHeight: 1.6, fontWeight: 600 }}>
          Refunds and cancellations are described in our{" "}
          <Link href="/refund-policy" prefetch={false} style={{ fontWeight: 800, color: "var(--accent-red)" }}>
            refund policy
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
