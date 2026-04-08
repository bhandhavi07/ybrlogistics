import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Refund and deposit policy for YBR Logistics moving and logistics services.",
  alternates: { canonical: "/refund-policy" },
};

export default function RefundPolicyPage() {
  return (
    <section className="section">
      <div className="container legalPage">
        <h1>Refund Policy</h1>
        <p>Deposits are used to reserve scheduling, dispatch planning, and service availability.</p>

        <h2>Deposits</h2>
        <p>
          Deposits may be refundable, partially refundable, or non-refundable depending on the timing of cancellation,
          route planning, and services already committed. Specific deposit terms should be confirmed in writing at the time
          of booking.
        </p>

        <h2>Cancellations and Rescheduling</h2>
        <p>
          Customers should request cancellations or rescheduling as early as possible. Refund eligibility may be
          reduced when notice is short or when labor, route scheduling, or equipment has already been assigned.
        </p>

        <h2>Completed Services</h2>
        <p>
          Charges for completed services are non-refundable except in cases where YBR Logistics agrees in writing that
          an adjustment is appropriate.
        </p>

        <h2>Additional Charges</h2>
        <p>Approved additional services and charges are non-refundable once performed.</p>

        <h2>Contact</h2>
        <p>
          For refund questions, contact{" "}
          <a href="mailto:Sandeep@ybrlogistics.com">Sandeep@ybrlogistics.com</a>.
        </p>

        <p style={{ marginTop: 28 }}>
          <Link href="/contact" prefetch={false} className="homePaymentLegalLink">
            ← Back to Contact
          </Link>
        </p>
      </div>
    </section>
  );
}
