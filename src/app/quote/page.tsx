import type { Metadata } from "next";
import QuoteForm from "../../components/QuoteForm";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Tell us about your move, delivery, or logistics job for a clear estimate and next steps from YBR Logistics.",
  alternates: {
    canonical: "/quote",
  },
};

export default function QuotePage() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 720 }}>
        <div style={{ marginBottom: 22 }}>
          <h1 style={{ margin: 0, fontSize: "clamp(28px, 3vw, 40px)", lineHeight: 1.1 }}>Request a Quote</h1>
          <p style={{ margin: "12px 0 0", color: "var(--muted)", lineHeight: 1.7, fontSize: 16, maxWidth: 640 }}>
            Provide your job details and we will send you a clear estimate and next steps.
          </p>
        </div>

        <div className="card" style={{ padding: 22 }}>
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
