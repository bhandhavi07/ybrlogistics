import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { siteImages } from "../../data/siteImages";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact YbrLogistics for routes, partnerships, billing, and operations support.",
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
        <p style={{ margin: "12px 0 28px", color: "var(--muted)", lineHeight: 1.7, fontSize: 16 }}>
          Have a question about routes, partnerships, billing, or operations? Reach out and our team will get back to you.
        </p>

        <div className="contactGrid">
          <div className="card" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
            <div className="imgFrameH48">
              <Image
                src={siteImages.contactAside}
                alt="Commercial freight trailers and responsive logistics service"
                fill
                sizes="(max-width: 900px) 100vw, 40vw"
                className="mediaCoverBoost"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div style={{ padding: 18 }}>
              <div style={{ fontWeight: 950, fontSize: 18 }}>Get in touch</div>
              <div style={{ color: "var(--muted)", marginTop: 10, fontWeight: 650, lineHeight: 1.7 }}>
                <div>
                  <span style={{ fontWeight: 900, color: "var(--text)" }}>Address:</span> 24240 Nora Cir, Hayward, CA 94545
                </div>
                <div>
                  <span style={{ fontWeight: 900, color: "var(--text)" }}>Phone:</span>{" "}
                  <a href="tel:+14083669696" style={{ fontWeight: 800 }}>
                    +1 (408) 366-9696
                  </a>
                </div>
                <div>
                  <span style={{ fontWeight: 900, color: "var(--text)" }}>Email:</span>{" "}
                  <a href="mailto:Sandeep@ybrlogistics.com" style={{ fontWeight: 800 }}>
                    Sandeep@ybrlogistics.com
                  </a>
                </div>
                <div style={{ marginTop: 10 }}>
                  <span style={{ fontWeight: 900, color: "var(--text)" }}>Hours:</span> 7 days a week
                </div>
              </div>

            </div>
          </div>
        </div>

        <div
          className="card"
          style={{
            marginTop: 32,
            padding: 22,
            background: "linear-gradient(135deg, #fff8fa 0%, #f8fafc 100%)",
            borderColor: "rgba(196, 30, 58, 0.2)",
          }}
        >
          <h2 style={{ margin: 0, fontSize: 22, lineHeight: 1.2 }}>Need pricing for a shipment?</h2>
          <p style={{ margin: "10px 0 0", color: "var(--muted)", lineHeight: 1.7, fontSize: 16 }}>
            Get accurate pricing by sharing your shipment details in our quote form.
          </p>
          <div style={{ marginTop: 14 }}>
            <Link href="/quote" prefetch={false} className="btn btn-primary">
              Get Your Quote
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
