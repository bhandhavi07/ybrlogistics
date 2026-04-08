"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { HomeBulletIcon } from "../components/home/HomeBulletIcon";
import { ServiceIcon } from "../components/service/ServiceIcons";
import { siteImages } from "../data/siteImages";
import { servicesCatalog } from "../data/services";

const easeOut = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
};

const staggerParent = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.06 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easeOut } },
};

const trustFoundationItems: {
  label: string;
  sub?: string;
  icon: "shield" | "map" | "route" | "document" | "payment" | "contact";
}[] = [
  { label: "Licensed & Insured", icon: "shield" },
  { label: "California-Based Operations", icon: "map" },
  { label: "State and Interstate Routes", icon: "route" },
  { label: "Written Estimates", icon: "document" },
  { label: "Clear Booking and Payment Process", icon: "payment" },
  { label: "Direct Support by Phone and Email", icon: "contact" },
];

const businessCredentials = [
  "Active carrier authority",
  "USDOT: 3252374",
  "MC: 1092818",
  "Licensed & insured",
  "California-based operations",
];

function TrustFoundationIcon({ id }: { id: (typeof trustFoundationItems)[number]["icon"] }) {
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
    case "contact":
      return (
        <svg {...common}>
          <path
            d="M5 5h14v10H8l-3 3V5z"
            stroke={stroke}
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path d="M9 9h6M9 12h3" stroke={stroke} strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

const whyChooseBullets: { text: string; icon: "route" | "clock" | "package" | "chat" }[] = [
  { text: "On-time pickup and delivery coordination", icon: "route" },
  { text: "Responsive dispatch communication", icon: "chat" },
  { text: "Residential and commercial moving support", icon: "package" },
  { text: "Freight and last-mile delivery coverage", icon: "clock" },
  { text: "Careful handling for high-value and time-sensitive jobs", icon: "package" },
];

const faqItems = [
  {
    q: "Do you require a deposit?",
    a: "Yes. A deposit may be required to confirm your booking.",
  },
  {
    q: "When is the remaining balance due?",
    a: "The remaining balance is typically due upon unloading or completion of service unless other written terms apply.",
  },
  {
    q: "Do you discuss extra charges first?",
    a: "Yes. Any additional charges outside the original estimate are discussed before being added whenever reasonably possible.",
  },
  {
    q: "Do you handle both moving and freight jobs?",
    a: "Yes. We support residential moving, commercial moving, freight transportation, and last-mile delivery.",
  },
];

export default function HomePageClient() {
  const reduceMotion = useReducedMotion();

  const motionIntro = reduceMotion ? {} : { initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-60px" }, variants: fadeUp };
  const motionStagger = reduceMotion
    ? {}
    : { initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-40px" }, variants: staggerParent };
  const motionCard = reduceMotion ? {} : { variants: staggerItem };

  return (
    <>
      <section className="heroBleed" aria-label="Hero">
        <div className="heroBleedMedia" aria-hidden>
          <Image
            src={siteImages.heroBanner}
            alt="Commercial freight and moving operations"
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
              Reliable Moving, Freight, and Last-Mile Delivery Across California and Interstate Routes
            </h1>
            <p className="reveal revealDelay2 heroBleedLead">
              YBR Logistics provides residential moving, commercial moving, freight transportation, and last-mile delivery
              with clear scheduling, responsive communication, and careful handling from pickup to final delivery.
            </p>
            <div className="reveal revealDelay2 heroBleedActions heroBleedActions--primary">
              <Link className="btn btn-primary btn-lg" href="/quote" prefetch={false}>
                Get a Quote
              </Link>
              <Link className="heroBleedSecondaryLink" href="/contact" prefetch={false}>
                Contact Us
              </Link>
            </div>
            <p className="heroBleedTrust">California-based · Licensed &amp; insured · State &amp; interstate</p>
          </div>
        </div>
      </section>

      <section className="homeTrustFoundation section sectionLoose" aria-label="Licensed and insured trust">
        <div className="container">
          <div className="homeTrustFoundationHeader">
            <span className="homeTrustFoundationEyebrow">Licensed &amp; insured</span>
            <h2 className="homeTrustFoundationTitle">Trusted Moving, Freight, and Logistics Support</h2>
            <p className="homeTrustFoundationIntro">
              YBR Logistics provides reliable residential moving, commercial moving, freight transportation, and last-mile
              delivery with clear communication, written estimates, and professional handling from pickup to final
              delivery.
            </p>
          </div>

          <div className="homeTrustTileGrid">
            {trustFoundationItems.map((item) => (
              <div key={item.label} className="homeTrustTile card">
                <div className="homeTrustTileIconWrap" aria-hidden>
                  <TrustFoundationIcon id={item.icon} />
                </div>
                <div className="homeTrustTileBody">
                  <div className="homeTrustTileLabel">{item.label}</div>
                  {item.icon === "contact" ? (
                    <div className="homeTrustTileContact">
                      <a href="tel:+14083669696" className="homeTrustTileLink">
                        (408) 366-9696
                      </a>
                      <span className="homeTrustTileSep" aria-hidden>
                        ·
                      </span>
                      <a href="mailto:Sandeep@ybrlogistics.com" className="homeTrustTileLink">
                        Sandeep@ybrlogistics.com
                      </a>
                    </div>
                  ) : item.sub ? (
                    <p className="homeTrustTileSub">{item.sub}</p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>

          <div className="homeTrustCallout card">
            <div className="homeTrustCalloutIcon" aria-hidden>
              <TrustFoundationIcon id="payment" />
            </div>
            <div className="homeTrustCalloutBody">
              <div className="homeTrustCalloutTitle">Payment-safe booking</div>
              <p className="homeTrustCalloutText">
                Deposit required to confirm booking. Remaining balance due upon unloading or service completion. Any
                additional charges are discussed and approved before being added.
              </p>
            </div>
          </div>

          <p className="homeTrustFootnote">
            Service availability depends on route, scheduling, and shipment details. Contact us for current availability
            and quote requests.
          </p>
        </div>
      </section>

      <section className="section sectionLoose">
        <div className="container">
          <h2 className="homeSectionTitle">Services built for real jobs</h2>
          <p className="homeSectionSubtitle">
            From household moves to freight lanes and final-mile delivery — structured processes and clear communication
            at every step.
          </p>

          <div className="homeServiceCardGrid">
            {servicesCatalog.map((s) => (
              <article key={s.title} className="homeServiceCard card cardElevated">
                <div className="homeServiceCardImageWrap">
                  <Image
                    src={s.image}
                    alt={s.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw"
                    className="homeServiceCardImg"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="homeServiceCardBody">
                  <span className="homeServiceCardIconWrap" aria-hidden>
                    <ServiceIcon id={s.icon} />
                  </span>
                  <h3 className="homeServiceCardTitle">{s.title}</h3>
                  <p className="homeServiceCardDesc">{s.body}</p>
                  <p className="homeServiceCardBestFor">
                    <strong>Best for:</strong> {s.bestFor}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="homeViewAllWrap">
            <Link className="btn btn-ghost homeViewAllBtn" href="/services" prefetch={false}>
              View all services
              <svg className="homeViewAllBtnIcon" viewBox="0 0 24 24" width="18" height="18" aria-hidden>
                <path
                  fill="currentColor"
                  d="M13.025 5l-1.4 1.4 4.6 4.6H4v2h12.225l-4.6 4.6 1.4 1.4L20 12l-6.975-7z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="section sectionLoose homeCredentialsSection" aria-label="Business credentials">
        <div className="container">
          <h2 className="homeSectionTitle">Business Credentials</h2>
          <p className="homeSectionSubtitle">
            Factual carrier and operating information for customers evaluating larger moves and freight work.
          </p>
          <ul className="homeCredentialsList">
            {businessCredentials.map((line) => (
              <li key={line} className="homeCredentialsItem card">
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section sectionLoose homePaymentSection" aria-label="Payment process">
        <div className="container">
          <div className="homePaymentGrid">
            <div className="homePaymentHighlight card">
              <div className="homePaymentHighlightLabel">How billing works</div>
              <p className="homePaymentHighlightText">
                Deposit required to confirm booking. Remaining balance due upon unloading or service completion. Any
                additional charges are discussed and approved before being added.
              </p>
            </div>
            <div className="homePaymentDetail card">
              <h2 className="homeSectionTitle homeSectionTitle--left">How our payment process works</h2>
              <p className="homePaymentIntro">
                To keep every job clear and organized, we use a simple payment process:
              </p>
              <ol className="homePaymentSteps">
                <li>We review your move or shipment details and provide a written estimate.</li>
                <li>A deposit is collected to confirm your booking date.</li>
                <li>
                  The remaining balance is due upon unloading or completion of service, unless otherwise stated in
                  writing.
                </li>
                <li>
                  Any additional work requested outside the original estimate will be discussed and approved before extra
                  charges are added.
                </li>
              </ol>
              <Link href="/terms-and-conditions" prefetch={false} className="homePaymentLegalLink">
                Read full terms →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <motion.section className="section sectionLoose" {...motionIntro}>
        <div className="container homeIntroGrid">
          <div className="homeIntroCopy">
            <h2 className="homeSectionTitle">Why Customers Choose YBR Logistics</h2>
            <p className="homeIntroLead">
              Straightforward scheduling, responsive updates, and careful handling — especially important when jobs
              involve significant value and tight timelines.
            </p>
            <ul className="homeBulletList">
              {whyChooseBullets.map((b) => (
                <li key={b.text} className="homeBulletItem">
                  <span className="homeBulletIconWrap" aria-hidden>
                    <HomeBulletIcon variant={b.icon} />
                  </span>
                  <span>{b.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <Link href="/about" prefetch={false} className="homeIntroCard card">
            <div className="homeIntroCardImageWrap">
              <Image
                src={siteImages.heroCard}
                alt="Professional trucking and logistics"
                fill
                sizes="(max-width: 900px) 100vw, 40vw"
                className="homeIntroCardImg"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="homeIntroCardBody">
              <div className="homeIntroCardTitle">Our standards</div>
              <p className="homeIntroCardText">
                Written estimates, honest scope discussions, and professional execution from pickup through delivery.
              </p>
              <span className="homeIntroCardHint">About YBR Logistics →</span>
            </div>
          </Link>
        </div>
      </motion.section>

      <section className="section sectionLoose homeVisualTrustSection" aria-label="Fleet and job photography">
        <div className="container">
          <h2 className="homeSectionTitle">On the road &amp; on the job</h2>
          <p className="homeSectionSubtitle">
            Add real fleet and job-site photography when assets are ready—professional visuals reinforce trust for
            larger residential and commercial jobs.
          </p>
          <div className="homeVisualTrustGrid homeVisualTrustGrid--two">
            <div className="homeVisualTrustCard card">
              <div className="homeVisualTrustFrame homeVisualTrustFrame--truck" aria-hidden />
              <h3 className="homeVisualTrustLabel">Truck photo placeholder</h3>
              <p className="homeVisualTrustHint">
                Replace with a high-quality image of your truck or fleet branding. Recommended: wide shot, good lighting,
                readable company markings.
              </p>
            </div>
            <div className="homeVisualTrustCard card">
              <div className="homeVisualTrustFrame homeVisualTrustFrame--job" aria-hidden />
              <h3 className="homeVisualTrustLabel">Job photo placeholder</h3>
              <p className="homeVisualTrustHint">
                Replace with a professional moving or freight job photo: loading, secure strapping, or delivery in
                progress (with customer permission).
              </p>
            </div>
          </div>
        </div>
      </section>

      <motion.section className="section sectionLoose" {...motionStagger}>
        <div className="container">
          <h2 className="homeSectionTitle">Common questions</h2>
          <p className="homeSectionSubtitle">Straight answers about deposits, billing, and how we work.</p>
          <div className="homeFaqGrid">
            {faqItems.map((item) => (
              <motion.div key={item.q} className="homeFaqItem card" {...motionCard}>
                <div className="homeFaqQ">{item.q}</div>
                <p className="homeFaqA">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section className="section sectionLoose sectionCta" {...(reduceMotion ? {} : { initial: "hidden", whileInView: "visible", viewport: { once: true }, variants: fadeUp })}>
        <div className="container">
          <div className="homeCtaStrip card">
            <div className="homeCtaGrid">
              <div className="homeCtaCopy">
                <h2 className="homeCtaTitle">Need a quote for moving, freight, or delivery services?</h2>
                <p className="homeCtaText">
                  Send us your pickup location, delivery location, service type, and preferred date. We will respond with
                  a clear quote and next steps.
                </p>
                <p className="homeCtaUrgency">Response within 24 hours · Written estimates available</p>
                <div className="homeCtaActions homeCtaActions--primary">
                  <Link className="btn btn-primary btn-lg" href="/quote" prefetch={false}>
                    Get a Quote
                  </Link>
                  <Link href="/contact" prefetch={false} className="homeCtaSecondaryLink">
                    Contact Us
                  </Link>
                </div>
              </div>
              <div className="homeCtaMedia">
                <Image
                  src={siteImages.splitWarehouse}
                  alt="Logistics yard and enclosed trailers"
                  fill
                  sizes="(max-width: 900px) 100vw, 40vw"
                  className="homeCtaMediaImg mediaCoverBoost"
                  style={{ objectFit: "cover" }}
                />
                <div className="homeCtaMediaOverlay" aria-hidden />
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
}
