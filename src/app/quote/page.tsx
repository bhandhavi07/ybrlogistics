import QuoteForm from "../../components/QuoteForm";

export default function QuotePage() {
  return (
    <section className="section">
      <div className="container">
        <div style={{ marginBottom: 22 }}>
          <h1 style={{ margin: 0, fontSize: "clamp(28px, 3vw, 40px)", lineHeight: 1.1 }}>Request a Shipping Quote</h1>
          <p style={{ margin: "12px 0 0", color: "var(--muted)", lineHeight: 1.7, fontSize: 16 }}>
            Share your shipment details for state and interstate coverage and we&apos;ll send your quote quickly.
          </p>
          <p style={{ margin: "12px 0 0", color: "var(--muted)", fontWeight: 700, fontSize: 14 }}>
            Takes less than 1 minute to fill
          </p>
          <p style={{ margin: "8px 0 0", color: "var(--accent-red)", fontWeight: 800, fontSize: 14 }}>
            No obligation • Fast response • Transparent pricing
          </p>
        </div>

        <div className="contactGrid">
          <div className="card" style={{ padding: 20 }}>
            <h2 style={{ margin: 0, fontSize: 22, lineHeight: 1.2 }}>Why request a quote with us?</h2>
            <ul style={{ margin: "12px 0 0", paddingLeft: 20, color: "var(--muted)", fontWeight: 650, lineHeight: 1.8 }}>
              <li>Fast response within 24 hours</li>
              <li>Dedicated routes available</li>
              <li>Same-day delivery options</li>
              <li>Serving state and interstate routes</li>
            </ul>
            <p style={{ margin: "12px 0 0", color: "var(--muted)", lineHeight: 1.7, fontSize: 15 }}>
              Share your shipment details and we&apos;ll send the next steps clearly.
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

