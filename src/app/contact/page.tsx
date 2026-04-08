import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import ContactForm from "../../components/ContactForm";
import { siteImages } from "../../data/siteImages";

export const metadata: Metadata = {
  title: "Contact YBR Logistics",
  description:
    "Contact YBR Logistics for moving, freight, and last-mile delivery. Call (408) 366-9696 or send your job details through our secure form.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <section className="section">
      <div className="container">
        <h1 style={{ margin: 0, fontSize: "clamp(28px, 3vw, 40px)", lineHeight: 1.1 }}>Contact Us</h1>
        <p style={{ margin: "8px 0 0", color: "var(--accent-red)", lineHeight: 1.5, fontSize: 15, fontWeight: 800 }}>
          We respond within 24 hours.
        </p>
        <p style={{ margin: "12px 0 28px", color: "var(--muted)", lineHeight: 1.7, fontSize: 16, maxWidth: 720 }}>
          Request a quote or ask a question about moving, freight, or delivery. Use the form below or reach us directly
          by phone or email.{" "}
          <Link href="/feedback" prefetch={false} style={{ fontWeight: 800, color: "var(--accent-red)" }}>
            Leave feedback
          </Link>{" "}
          if you&apos;ve already used our services.
        </p>

        <div className="contactGrid contactGrid--wide">
          <div className="card" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
            <div className="imgFrameH48">
              <Image
                src={siteImages.contactAside}
                alt="Commercial freight trailers and logistics operations"
                fill
                sizes="(max-width: 900px) 100vw, 40vw"
                className="mediaCoverBoost"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div style={{ padding: 18 }}>
              <div style={{ fontWeight: 950, fontSize: 18 }}>YBR Logistics</div>
              <div style={{ color: "var(--muted)", marginTop: 10, fontWeight: 650, lineHeight: 1.7 }}>
                <div>
                  <span style={{ fontWeight: 900, color: "var(--text)" }}>Address:</span> 24240 Nora Cir, Hayward, CA
                  94545
                </div>
                <div>
                  <span style={{ fontWeight: 900, color: "var(--text)" }}>Phone:</span>{" "}
                  <a href="tel:+14083669696" style={{ fontWeight: 800 }}>
                    (408) 366-9696
                  </a>
                </div>
                <div>
                  <span style={{ fontWeight: 900, color: "var(--text)" }}>Email:</span>{" "}
                  <a href="mailto:Sandeep@ybrlogistics.com" style={{ fontWeight: 800 }}>
                    Sandeep@ybrlogistics.com
                  </a>
                </div>
                <div style={{ marginTop: 10 }}>
                  <span style={{ fontWeight: 900, color: "var(--text)" }}>Website:</span>{" "}
                  <a href="https://www.ybrlogistics.com" style={{ fontWeight: 800 }}>
                    www.ybrlogistics.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: 22 }}>
            <h2 style={{ margin: "0 0 6px", fontSize: 20, fontWeight: 900 }}>Quote &amp; contact form</h2>
            <p style={{ margin: "0 0 16px", color: "var(--muted)", fontSize: 14, fontWeight: 650, lineHeight: 1.55 }}>
              Tell us about your move or shipment. We&apos;ll follow up with a clear quote and next steps.
            </p>
            <ContactForm />
          </div>
        </div>

        <div
          className="card"
          style={{
            marginTop: 28,
            padding: 22,
            background: "linear-gradient(135deg, #fff8fa 0%, #f8fafc 100%)",
            borderColor: "rgba(196, 30, 58, 0.2)",
          }}
        >
          <h2 style={{ margin: 0, fontSize: 22, lineHeight: 1.2 }}>Prefer the dedicated quote flow?</h2>
          <p style={{ margin: "10px 0 0", color: "var(--muted)", lineHeight: 1.7, fontSize: 16 }}>
            You can also use our streamlined quote page for shipment-specific requests.
          </p>
          <div style={{ marginTop: 14 }}>
            <Link href="/quote" prefetch={false} className="btn btn-primary">
              Get a Quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
