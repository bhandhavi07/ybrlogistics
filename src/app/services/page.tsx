import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ServiceIcon } from "../../components/service/ServiceIcons";
import { servicesCatalog } from "../../data/services";

export const metadata: Metadata = {
  title: "Moving, Freight & Delivery Services",
  description:
    "Residential moving, commercial moving, freight coordination, last-mile delivery, and storage support from YBR Logistics across California and interstate routes.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return (
    <section className="section servicesSection">
      <div className="container">
        <header className="servicesPageHead">
          <h1 className="servicesPageTitle">Services for Moving, Freight &amp; Last-Mile Delivery</h1>
          <p className="servicesPageSubtitle">
            California-based operations with state and interstate coverage—structured quotes, clear communication, and
            careful handling for residential, commercial, and freight jobs.
          </p>
        </header>

        <div className="servicesPageGrid">
          {servicesCatalog.map((s) => (
            <article key={s.title} className="serviceCard card">
              <div className="serviceCardImageWrap">
                <Image
                  src={s.image}
                  alt={s.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="serviceCardImg"
                />
              </div>

              <div className="serviceCardBody">
                <div className="serviceCardTop">
                  <span className="serviceCardIconWrap" aria-hidden>
                    <ServiceIcon id={s.icon} />
                  </span>
                  <h2 className="serviceCardTitle">{s.title}</h2>
                </div>
                <p className="serviceCardDesc">{s.body}</p>
                <p className="serviceCardBestFor">
                  <strong>Best for:</strong> {s.bestFor}
                </p>
                <Link href="/contact" prefetch={false} className="serviceCardLearnMore">
                  Learn More
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="card servicesBottomCta">
          <div className="servicesBottomCtaInner">
            <div>
              <div className="servicesBottomCtaTitle">Not sure which service fits?</div>
              <p className="servicesBottomCtaText">
                Tell us origin, destination, and freight type—we&apos;ll point you to the right option.
              </p>
            </div>
            <Link className="btn btn-primary" href="/quote" prefetch={false}>
              Get a Quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
