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
      <div className="container">
        <div style={{ marginBottom: 22 }}>
          <h1 style={{ margin: 0, fontSize: "clamp(28px, 3vw, 40px)", lineHeight: 1.1 }}>Request a Quote</h1>
          <p style={{ margin: "12px 0 0", color: "var(--muted)", lineHeight: 1.7, fontSize: 16, maxWidth: 640 }}>
            Tell us about your move, delivery, or logistics job and we will send you a clear estimate and next steps.
          </p>
        </div>

        <div className="contactGrid">
          <div className="card" style={{ padding: 20 }}>
            <h2 style={{ margin: 0, fontSize: 22, lineHeight: 1.2 }}>What to include</h2>
            <ul style={{ margin: "12px 0 0", paddingLeft: 20, color: "var(--muted)", fontWeight: 650, lineHeight: 1.8 }}>
              <li>Pickup and delivery locations</li>
              <li>Service type and approximate size</li>
              <li>Preferred timing</li>
              <li>Any access or handling notes</li>
            </ul>
            <p style={{ margin: "14px 0 0", color: "var(--muted)", lineHeight: 1.7, fontSize: 15 }}>
              We typically respond within 24 hours with written estimates when details allow.
            </p>
          </div>

          <div className="card" style={{ padding: 18 }}>
            <QuoteForm />
          </div>
        </div>
      </div>
    </section>
  );
}
