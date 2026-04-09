import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import ContactForm from "../../components/ContactForm";
import ContactFaq from "../../components/ContactFaq";
import { siteImages } from "../../data/siteImages";

export const metadata: Metadata = {
  title: "Contact YBR Logistics",
  description:
    "Contact YBR Logistics by phone, email, or message. We respond to questions about services, availability, and scheduling.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <section className="section">
      <div className="container">
        <h1 style={{ margin: 0, fontSize: "clamp(28px, 3vw, 40px)", lineHeight: 1.1 }}>Contact YBR Logistics</h1>
        <p style={{ margin: "12px 0 28px", color: "var(--muted)", lineHeight: 1.7, fontSize: 16, maxWidth: 720 }}>
          Have a question about our services, availability, or scheduling? Send us a message and our team will get back to
          you. For detailed pricing on a specific job, use{" "}
          <Link href="/quote" prefetch={false} style={{ fontWeight: 800, color: "var(--accent-red)" }}>
            Request a Quote
          </Link>
          . Already a customer? You can also{" "}
          <Link href="/feedback" prefetch={false} style={{ fontWeight: 800, color: "var(--accent-red)" }}>
            leave feedback
          </Link>
          .
        </p>

        <div className="contactGrid contactGrid--wide">
          <div className="card" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
            <div className="imgFrameH48">
              <Image
                src={siteImages.contactAside}
                alt="Commercial trailers and logistics yard"
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
                  <span style={{ fontWeight: 900, color: "var(--text)" }}>Address:</span> 24240 Nora Cir, Hayward, CA 94545
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
            <h2 style={{ margin: "0 0 6px", fontSize: 20, fontWeight: 900 }}>Send us a message</h2>
            <p style={{ margin: "0 0 16px", color: "var(--muted)", fontSize: 14, fontWeight: 650, lineHeight: 1.55 }}>
              General questions only—no job details required.
            </p>
            <ContactForm />
          </div>
        </div>

        <div className="contactFaqSection">
          <ContactFaq />
        </div>
      </div>
    </section>
  );
}
