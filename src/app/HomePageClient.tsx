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

const trustPills = [
  "Licensed and insured",
  "California-based operations",
  "State and interstate service",
  "Residential, commercial, and freight support",
  "Quotes with clear next steps",
];

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
            <div className="reveal revealDelay2 heroBleedActions heroBleedActions--split">
              <Link className="btn btn-primary btn-lg" href="/quote" prefetch={false}>
                Get a Quote
              </Link>
              <a className="btn btn-secondary btn-lg" href="tel:+14083669696">
                Call (408) 366-9696
              </a>
            </div>
            <p className="heroBleedTrust">California-based · Licensed &amp; insured · State &amp; interstate</p>
          </div>
        </div>
      </section>

      <section className="homeTrustBadges" aria-label="Trust highlights">
        <div className="container">
          <ul className="homeTrustBadgesList">
            {trustPills.map((label) => (
              <li key={label} className="homeTrustBadge">
                {label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="homeTrustStrip" aria-label="Operations">
        <div className="container homeTrustStripInner">
          <span>Written estimates &amp; clear scheduling</span>
          <span>High-value &amp; time-sensitive job experience</span>
          <span>Direct communication from quote to delivery</span>
        </div>
      </section>

      <section className="section sectionLoose homeLicensedBanner" aria-label="Licensed operations">
        <div className="container">
          <div className="homeLicensedBannerInner card">
            <div className="homeLicensedBannerIcon" aria-hidden>
              ✓
            </div>
            <div>
              <div className="homeLicensedBannerTitle">Licensed &amp; insured logistics</div>
              <p className="homeLicensedBannerText">
                Moving, freight, and last-mile delivery with documentation and professional standards customers and
                partners expect for larger jobs.
              </p>
            </div>
          </div>
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
            <h2 className="homeSectionTitle">Why customers choose YBR Logistics</h2>
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

      <section className="section sectionLoose homePlaceholderSection" aria-label="Social proof">
        <div className="container">
          <div className="homePlaceholderGrid">
            <div className="homePlaceholderCard card">
              <h3 className="homePlaceholderTitle">Customer testimonials</h3>
              <p className="homePlaceholderText">
                We&apos;re collecting reviews from recent moves and freight jobs. Check back soon, or ask us for
                references when you request a quote.
              </p>
            </div>
            <div className="homePlaceholderCard card homePlaceholderCard--photo">
              <h3 className="homePlaceholderTitle">On the job</h3>
              <p className="homePlaceholderText">
                Placeholder for real truck and job-site photography. Replace with your fleet and crew photos when
                ready.
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
                <div className="homeCtaActions homeCtaActions--split">
                  <Link className="btn btn-primary btn-lg" href="/quote" prefetch={false}>
                    Get a Quote
                  </Link>
                  <a className="btn btn-secondary btn-lg" href="tel:+14083669696">
                    Call (408) 366-9696
                  </a>
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
