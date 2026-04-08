import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { siteImages } from "../../data/siteImages";

export const metadata: Metadata = {
  title: "About YBR Logistics",
  description:
    "YBR Logistics is a California-based logistics company providing moving, freight transportation, and last-mile delivery for residential and commercial customers.",
  alternates: {
    canonical: "/about",
  },
};

const values = [
  "Reliability in scheduling and service",
  "Clear communication from quote to completion",
  "Careful handling of customer property",
  "Honest pricing with written estimates",
  "Professional service on every job",
];

export default function AboutPage() {
  return (
    <section className="section">
      <div className="container">
        <h1 style={{ margin: 0, fontSize: "clamp(28px, 3vw, 40px)", lineHeight: 1.1 }}>About YBR Logistics</h1>
        <p style={{ margin: "14px 0 16px", color: "var(--muted)", lineHeight: 1.75, fontSize: 16, maxWidth: 860 }}>
          YBR Logistics is a California-based logistics company providing moving, freight transportation, and last-mile
          delivery services for residential and commercial customers. We focus on reliable scheduling, direct
          communication, and careful handling so every job is completed professionally and on time.
        </p>
        <p style={{ margin: "0 0 24px", color: "var(--muted)", lineHeight: 1.75, fontSize: 16, maxWidth: 860 }}>
          Our team supports both state and interstate routes, helping customers move household goods, business
          equipment, freight, and scheduled deliveries with confidence.
        </p>

        <div className="card" style={{ padding: 0, overflow: "hidden", marginBottom: 22 }}>
          <div className="aboutLeadImage">
            <Image
              src={siteImages.aboutMain}
              alt="Commercial truck on the road for logistics and moving operations"
              fill
              sizes="(max-width: 640px) 100vw, 80vw"
              className="mediaImg mediaCoverBoost"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
          <div style={{ padding: 20 }}>
            <div style={{ fontWeight: 950, fontSize: 18 }}>How we work with customers</div>
            <div style={{ color: "var(--muted)", marginTop: 8, fontWeight: 650, lineHeight: 1.7 }}>
              We align on scope up front, provide written estimates when applicable, and keep dispatch communication
              active through pickup and delivery—especially important for high-value moves and time-sensitive freight.
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: 22, marginBottom: 22 }}>
          <div style={{ fontWeight: 900, fontSize: 18, marginBottom: 12 }}>Our values</div>
          <ul style={{ margin: 0, paddingLeft: 20, color: "var(--muted)", fontWeight: 650, lineHeight: 1.75 }}>
            {values.map((v) => (
              <li key={v}>{v}</li>
            ))}
          </ul>
        </div>

        <div className="aboutPhotoRow">
          <div className="aboutGalleryThumb">
            <Image
              src={siteImages.aboutGallery.intermodal}
              alt="Freeway operations for long-distance logistics"
              fill
              sizes="(max-width: 900px) 100vw, 33vw"
              className="mediaImg mediaCoverBoost"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="aboutGalleryThumb">
            <Image
              src={siteImages.aboutGallery.warehouse}
              alt="Fleet and staging yard for distribution support"
              fill
              sizes="(max-width: 900px) 100vw, 33vw"
              className="mediaImg mediaCoverBoost"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="aboutGalleryThumb">
            <Image
              src={siteImages.aboutGallery.linehaul}
              alt="Line-haul trucking on the highway"
              fill
              sizes="(max-width: 900px) 100vw, 33vw"
              className="mediaImg mediaCoverBoost"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        <div style={{ marginTop: 22 }} className="card">
          <div style={{ padding: 22 }}>
            <div style={{ fontWeight: 900, fontSize: 18 }}>Ready for a written quote?</div>
            <div style={{ color: "var(--muted)", marginTop: 8, fontWeight: 600, lineHeight: 1.7 }}>
              Share your pickup and delivery details—we&apos;ll respond with clear pricing and next steps.
            </div>
            <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 12 }}>
              <Link className="btn btn-primary" href="/quote" prefetch={false}>
                Get a Quote
              </Link>
              <Link className="btn btn-ghost" href="/services" prefetch={false}>
                View Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
