"use client";

import Link from "next/link";
import Image from "next/image";
import { ServiceIcon, type ServiceIconId } from "../components/service/ServiceIcons";
import { HowItWorksIcon } from "../components/home/HowItWorksIcons";
import { siteImages } from "../data/siteImages";

const trustCredentialItems: {
  label: string;
  icon: "shield" | "map" | "package" | "route" | "document";
}[] = [
  { label: "Licensed & insured service provider", icon: "shield" },
  { label: "California-based operations", icon: "map" },
  { label: "Residential and commercial support", icon: "package" },
  { label: "Freight coordination and last-mile delivery", icon: "route" },
  { label: "Written estimates and clear payment process", icon: "document" },
];

const homeServicesSummary: { title: string; description: string; icon: ServiceIconId }[] = [
  {
    title: "Residential Moving",
    description: "Local and long-distance household moving with careful handling and organized scheduling.",
    icon: "moving",
  },
  {
    title: "Commercial Moving",
    description: "Office and business relocation designed to reduce downtime.",
    icon: "truckDedicated",
  },
  {
    title: "Freight & Logistics",
    description: "Support for freight coordination and logistics planning for your job.",
    icon: "cargo",
  },
  {
    title: "Last-Mile Delivery",
    description: "Reliable final delivery with appointment coordination.",
    icon: "van",
  },
];

const homeOurWorkCards: { image: string; alt: string; caption: string }[] = [
  {
    image: siteImages.homeOurWork.truck,
    alt: "Commercial truck on the road representing professional moving and logistics support",
    caption: "Professional moving and logistics support",
  },
  {
    image: siteImages.homeOurWork.moving,
    alt: "Stacked moving boxes representing residential and commercial moving services",
    caption: "Residential and commercial moving services",
  },
  {
    image: siteImages.homeOurWork.logistics,
    alt: "Enclosed trailers at a yard representing organized handling and delivery coordination",
    caption: "Organized handling and delivery coordination",
  },
];

const howItWorksSteps: { title: string; step: 1 | 2 | 3 | 4 }[] = [
  { title: "Request a quote", step: 1 },
  { title: "Confirm booking with a deposit", step: 2 },
  { title: "We complete the job", step: 3 },
  { title: "Pay remaining balance after completion", step: 4 },
];

function TrustCredentialIcon({ id }: { id: (typeof trustCredentialItems)[number]["icon"] | "payment" }) {
  const stroke = "currentColor";
  const common = { width: 26, height: 26, viewBox: "0 0 24 24", fill: "none" as const, "aria-hidden": true as const };
  switch (id) {
    case "shield":
      return (
        <svg {...common}>
          <path
            d="M12 3l7 3v6c0 4.5-3.2 8.2-7 9-3.8-.8-7-4.5-7-9V6l7-3z"
            stroke={stroke}
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path d="M9.5 12.5l1.7 1.7 3.8-4.2" stroke={stroke} strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      );
    case "map":
      return (
        <svg {...common}>
          <path
            d="M9 4.5L3 6.5v12l6-2 6 2 6-2v-12l-6 2-6-2z"
            stroke={stroke}
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="10" r="1.6" fill={stroke} />
        </svg>
      );
    case "package":
      return (
        <svg {...common}>
          <path
            d="M12 3l8 4v6l-8 4-8-4V7l8-4z"
            stroke={stroke}
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path d="M12 12v9M4 7l8 4 8-4" stroke={stroke} strokeWidth="1.75" strokeLinejoin="round" />
        </svg>
      );
    case "route":
      return (
        <svg {...common}>
          <path
            d="M4 17h4l2-6 4 6h6"
            stroke={stroke}
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="7" cy="17" r="2" stroke={stroke} strokeWidth="1.75" />
          <circle cx="17" cy="17" r="2" stroke={stroke} strokeWidth="1.75" />
        </svg>
      );
    case "document":
      return (
        <svg {...common}>
          <path
            d="M8 3h6l4 4v14a1 1 0 01-1 1H8a2 2 0 01-2-2V5a2 2 0 012-2z"
            stroke={stroke}
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path d="M14 3v4h4M9 12h6M9 16h6" stroke={stroke} strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      );
    case "payment":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" stroke={stroke} strokeWidth="1.75" />
          <path d="M3 10h18" stroke={stroke} strokeWidth="1.75" />
          <path d="M7 15h4" stroke={stroke} strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

export default function HomePageClient() {
  return (
    <>
      <section className="heroBleed" aria-label="Hero">
        <div className="heroBleedMedia" aria-hidden>
          <Image
            src={siteImages.heroBanner}
            alt="Commercial moving and logistics operations"
            fill
            priority
            sizes="100vw"
            className="mediaImg mediaCoverBoost"
            style={{ objectFit: "cover" }}
          />
          <div className="heroBleedOverlay" />
          <div className="heroBleedOverlayGrad" aria-hidden />
        </div>
        <div className="container heroBleedContent">
          <div className="heroBleedInner">
            <div className="reveal heroBleedKicker">YBR Logistics</div>
            <h1 className="reveal revealDelay1 heroBleedTitle">
              Reliable Moving, Freight, and Last-Mile Delivery — California-Based Operations and Broader Service Support
            </h1>
            <p className="reveal revealDelay2 heroBleedLead">
              YBR Logistics is a California-based moving and logistics service provider. We offer residential moving,
              commercial moving, freight coordination, and last-mile delivery with clear communication and professional
              handling.
            </p>
            <div className="reveal revealDelay2 heroBleedActions heroBleedActions--primary">
              <Link className="btn btn-primary btn-lg" href="/quote" prefetch={false}>
                Get a Quote
              </Link>
              <Link className="heroBleedSecondaryLink heroBleedSecondaryLink--subtle" href="/contact" prefetch={false}>
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="homeTrustFoundation section sectionLoose" aria-label="Business credentials">
        <div className="container">
          <div className="homeTrustFoundationHeader">
            <h2 className="homeTrustFoundationTitle">Business Credentials</h2>
            <p className="homeTrustFoundationServing">
              Serving customers across California with broader service support based on scheduling and availability.
            </p>
          </div>

          <div className="homeTrustTileGrid">
            {trustCredentialItems.map((item) => (
              <div key={item.label} className="homeTrustTile card">
                <div className="homeTrustTileIconWrap" aria-hidden>
                  <TrustCredentialIcon id={item.icon} />
                </div>
                <div className="homeTrustTileBody">
                  <div className="homeTrustTileLabel">{item.label}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="homeTrustCallout card">
            <div className="homeTrustCalloutIcon" aria-hidden>
              <TrustCredentialIcon id="payment" />
            </div>
            <div className="homeTrustCalloutBody">
              <div className="homeTrustCalloutLines">
                <p className="homeTrustCalloutLine">Deposit required to confirm booking.</p>
                <p className="homeTrustCalloutLine">
                  Remaining balance due upon unloading or service completion.
                </p>
                <p className="homeTrustCalloutLine">
                  Any additional charges are discussed and approved before being added.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section sectionLoose homeWhoWeAreSection" aria-label="Who we are">
        <div className="container">
          <div className="homeWhoWeAreCard card">
            <h2 className="homeSectionTitle">Who We Are</h2>
            <p className="homeWhoWeAreText">
              YBR Logistics is a California-based moving and logistics service provider supporting residential moves,
              commercial relocations, freight coordination, and last-mile delivery.
            </p>
            <p className="homeWhoWeAreText">
              We focus on clear communication, reliable scheduling, and professional handling to ensure every job is managed
              efficiently from booking to completion.
            </p>
            <p className="homeWhoWeAreTagline">Clear estimates. Professional handling. Reliable scheduling.</p>
            <p className="homeWhoWeAreIdentityNote">
              Based in Hayward, California — this website describes YBR Logistics at this location only. We are not
              affiliated with other businesses that may use a similar name.
            </p>
          </div>
        </div>
      </section>

      <section className="section sectionLoose homeServicesCompactSection" aria-label="Our services">
        <div className="container">
          <h2 className="homeSectionTitle">Our Services</h2>
          <p className="homeSectionSubtitle">
            Reliable moving, freight, and logistics support designed for residential and commercial needs.
          </p>

          <div className="homeServicesCompactGrid">
            {homeServicesSummary.map((item) => (
              <article key={item.title} className="homeServicesCompactCard card">
                <div className="homeServicesCompactCardInner">
                  <span className="homeServicesCompactIconWrap" aria-hidden>
                    <ServiceIcon id={item.icon} />
                  </span>
                  <h3 className="homeServicesCompactTitle">{item.title}</h3>
                  <p className="homeServicesCompactDesc">{item.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="homeServicesCompactCta">
            <Link className="btn btn-primary" href="/services" prefetch={false}>
              View All Services
            </Link>
          </div>

          <p className="homeServicesCompactNote">
            Service availability depends on route, scheduling, and job requirements.
          </p>
        </div>
      </section>

      <section className="section sectionLoose homeHowItWorksSection" aria-label="How it works">
        <div className="container">
          <h2 className="homeSectionTitle">How It Works</h2>
          <p className="homeSectionSubtitle homeHowItWorksSubtitle">
            A simple path from quote to completion.
          </p>
          <ol className="homeHowItWorksGrid">
            {howItWorksSteps.map((item) => (
              <li key={item.step} className="homeHowItWorksCard card">
                <div className="homeHowItWorksIconWrap" aria-hidden>
                  <HowItWorksIcon step={item.step} />
                </div>
                <p className="homeHowItWorksStepTitle">{item.title}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section sectionLoose homeOurWorkSection" aria-label="Our work">
        <div className="container">
          <h2 className="homeSectionTitle">Our Work</h2>
          <p className="homeSectionSubtitle">
            Reliable moving and logistics services for residential and commercial needs.
          </p>
          <div className="homeOurWorkGrid">
            {homeOurWorkCards.map((card) => (
              <figure key={card.caption} className="homeOurWorkCard card">
                <div className="homeOurWorkImageWrap">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="(max-width: 800px) 100vw, 33vw"
                    className="homeOurWorkImg mediaCoverBoost"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <figcaption className="homeOurWorkCaption">{card.caption}</figcaption>
              </figure>
            ))}
          </div>
          <p className="homeOurWorkDisclaimer">
            Images shown are representative of the type of services we provide.
          </p>
        </div>
      </section>

      <section className="section sectionLoose homeFinalCtaSection" aria-label="Get a quote">
        <div className="container">
          <div className="homeFinalCta card">
            <h2 className="homeFinalCtaTitle">Need a Quote?</h2>
            <p className="homeFinalCtaText">
              Send us your job details and we&apos;ll provide a clear estimate and next steps.
            </p>
            <Link className="btn btn-primary btn-lg" href="/quote" prefetch={false}>
              Get a Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
