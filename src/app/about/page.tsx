import Image from "next/image";
import Link from "next/link";
import { siteImages } from "../../data/siteImages";

export default function AboutPage() {
  const trustStats = [
    { label: "Years supporting freight operations", value: "8+" },
    { label: "Deliveries coordinated", value: "5,000+" },
    { label: "Primary coverage", value: "Bay Area / California" },
  ];

  const whoWeServe = [
    "Small businesses shipping weekly inventory",
    "E-commerce teams with daily dispatch needs",
    "Retail and distribution partners managing multi-stop deliveries",
  ];

  const whyChooseUs = [
    "On-time deliveries with dedicated routes",
    "Same-day availability for urgent shipments",
    "Fast response and clear next-step communication",
  ];

  return (
    <section className="section">
      <div className="container">
        <h1 style={{ margin: 0, fontSize: "clamp(28px, 3vw, 40px)", lineHeight: 1.1 }}>About Us</h1>
        <p style={{ margin: "12px 0 14px", color: "var(--muted)", lineHeight: 1.7, fontSize: 16, maxWidth: 820 }}>
          We help businesses move freight reliably without delays or confusion.
        </p>
        <p style={{ margin: "0 0 22px", color: "var(--muted)", lineHeight: 1.7, fontSize: 16, maxWidth: 820 }}>
          Our team plans shipments around your pickup windows, delivery commitments, and handling requirements so your
          operations stay on schedule.
        </p>

        <div className="card" style={{ padding: 0, overflow: "hidden", marginBottom: 22 }}>
          <div className="aboutLeadImage">
            <Image
              src={siteImages.aboutMain}
              alt="Commercial truck on the road with motion blur for over-the-road operations"
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
              We build shipment plans around real constraints and keep communication active from dispatch to delivery.
              You get updates early, not after delays happen.
            </div>
          </div>
        </div>

        <div className="aboutValuesGrid" style={{ marginBottom: 18 }}>
          {trustStats.map((item) => (
            <div key={item.label} className="card cardLift" style={{ padding: 18 }}>
              <div style={{ fontSize: 26, fontWeight: 900, color: "var(--accent-red)" }}>{item.value}</div>
              <div style={{ color: "var(--muted)", marginTop: 8, fontWeight: 700, lineHeight: 1.5 }}>{item.label}</div>
            </div>
          ))}
        </div>

        <div className="aboutPhotoRow">
          <div className="aboutGalleryThumb">
            <Image
              src={siteImages.aboutGallery.intermodal}
              alt="Freeway traffic for intermodal and long-distance connectivity"
              fill
              sizes="(max-width: 900px) 100vw, 33vw"
              className="mediaImg mediaCoverBoost"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="aboutGalleryThumb">
            <Image
              src={siteImages.aboutGallery.warehouse}
              alt="Fleet vehicles parked at a logistics yard for staging and distribution"
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

        <div className="aboutValuesGrid">
          <div className="card cardLift" style={{ padding: 18 }}>
            <div style={{ fontWeight: 900, lineHeight: 1.25 }}>Who we serve</div>
            <ul style={{ margin: "10px 0 0", paddingLeft: 18, color: "var(--muted)", fontWeight: 600, lineHeight: 1.6 }}>
              {whoWeServe.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="card cardLift" style={{ padding: 18 }}>
            <div style={{ fontWeight: 900, lineHeight: 1.25 }}>Why choose us</div>
            <ul style={{ margin: "10px 0 0", paddingLeft: 18, color: "var(--muted)", fontWeight: 600, lineHeight: 1.6 }}>
              {whyChooseUs.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="card cardLift" style={{ padding: 18 }}>
            <div style={{ fontWeight: 900, lineHeight: 1.25 }}>Where we operate</div>
            <div style={{ color: "var(--muted)", marginTop: 10, fontWeight: 600, lineHeight: 1.6 }}>
              We serve Bay Area and California routes, with extended support for regional and long-haul schedules when
              your lanes require it.
            </div>
          </div>
        </div>

        <div style={{ marginTop: 22 }} className="card">
          <div style={{ padding: 22 }}>
            <div style={{ fontWeight: 900, fontSize: 18 }}>Explore our full service catalog</div>
            <div style={{ color: "var(--muted)", marginTop: 8, fontWeight: 600, lineHeight: 1.7 }}>
              Review service types, use cases, and coverage before requesting a shipment quote.
            </div>
            <div style={{ marginTop: 16 }}>
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
