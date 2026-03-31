"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { HomeBulletIcon } from "../components/home/HomeBulletIcon";
import { siteImages } from "../data/siteImages";

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

export default function HomePageClient() {
  const reduceMotion = useReducedMotion();

  const focusAreas = [
    {
      title: "Plan & move freight",
      body: "On-time pickups and deliveries backed by active dispatch updates.",
      image: siteImages.homeFocus.freight,
      imageAlt: "Semi truck on the highway for freight planning",
      href: "/services",
    },
    {
      title: "Store & distribute",
      body: "Warehouse and distribution support that keeps outbound freight moving.",
      image: siteImages.homeFocus.storage,
      imageAlt: "White enclosed trailers for storage and distribution",
      href: "/services",
    },
    {
      title: "Moving & relocation support",
      body: "Residential and commercial relocation with clear scheduling and careful handling.",
      image: siteImages.homeFocus.urgent,
      imageAlt: "Commercial freight trailers for moving and relocation support",
      href: "/services",
    },
  ];

  const whyBullets: { text: string; icon: "route" | "clock" | "package" | "chat" }[] = [
    { text: "On-time deliveries with dedicated route planning", icon: "route" },
    { text: "Same-day availability for urgent lane coverage", icon: "clock" },
    { text: "Handling discipline for freight, moving, and relocation jobs", icon: "package" },
    { text: "Fast response from one dispatch contact", icon: "chat" },
  ];

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
            alt="Commercial freight truck on the highway"
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
            <div className="reveal heroBleedKicker">YbrLogistics</div>
            <h1 className="reveal revealDelay1 heroBleedTitle">
              Freight & last-mile delivery across the Bay Area — fast, reliable, and on time
            </h1>
            <p className="reveal revealDelay2 heroBleedLead">
              Bay Area and California coverage with on-time deliveries and fast dispatch response.
            </p>
            <div className="reveal revealDelay2 heroBleedActions">
              <Link className="btn btn-primary btn-lg" href="/quote" prefetch={false}>
                Get a Quote
              </Link>
            </div>
            <p className="heroBleedTrust">Serving Bay Area / California</p>
          </div>
        </div>
      </section>

      <section className="homeTrustStrip" aria-label="Trust metrics">
        <div className="container homeTrustStripInner">
          <span>100+ shipments handled</span>
          <span>98% on-time delivery</span>
          <span>24/7 support</span>
        </div>
      </section>

      <motion.section className="section sectionLoose" {...motionIntro}>
        <div className="container homeIntroGrid">
          <div className="homeIntroCopy">
            <h2 className="homeSectionTitle">Why teams work with us</h2>
            <p className="homeIntroLead">
              Outcomes first—so you spend less time chasing status and more time running the business.
            </p>
            <ul className="homeBulletList">
              {whyBullets.map((b) => (
                <li key={b.text} className="homeBulletItem">
                  <span className="homeBulletIconWrap" aria-hidden>
                    <HomeBulletIcon variant={b.icon} />
                  </span>
                  <span>{b.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <Link href="/services" prefetch={false} className="homeIntroCard card">
            <div className="homeIntroCardImageWrap">
              <Image
                src={siteImages.heroCard}
                alt="Semi truck on the highway for regional and line-haul freight"
                fill
                sizes="(max-width: 900px) 100vw, 40vw"
                className="homeIntroCardImg"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="homeIntroCardBody">
              <div className="homeIntroCardTitle">Regional & long-haul reach</div>
              <p className="homeIntroCardText">
                Dependable pickups and deliveries across the lanes you run—from local routes to broader regional and
                line-haul needs.
              </p>
              <span className="homeIntroCardHint">View services →</span>
            </div>
          </Link>
        </div>
      </motion.section>

      <section className="section sectionLoose">
        <div className="container">
          <h2 className="homeSectionTitle">How we support your operations</h2>
          <p className="homeSectionSubtitle">
            Three focused capabilities that reduce delays and keep deliveries moving.
          </p>

          <motion.div className="homeFocusGrid" {...motionStagger}>
            {focusAreas.map((item) => (
              <motion.div key={item.title} {...motionCard} style={{ height: "100%" }}>
                <Link href={item.href} prefetch={false} className="homeFocusCard card cardElevated">
                  <div className="homeFocusCardImageWrap">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="(max-width: 900px) 100vw, 33vw"
                      className="homeFocusCardImg"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="homeFocusCardBody">
                    <div className="homeFocusCardTitle">{item.title}</div>
                    <p className="homeFocusCardText">{item.body}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="homeViewAllWrap">
            <Link className="btn btn-ghost homeViewAllBtn" href="/services" prefetch={false}>
              View Services
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

      <motion.section className="section sectionLoose sectionCta" {...(reduceMotion ? {} : { initial: "hidden", whileInView: "visible", viewport: { once: true }, variants: fadeUp })}>
        <div className="container">
          <div className="homeCtaStrip card">
            <div className="homeCtaGrid">
              <div className="homeCtaCopy">
                <h2 className="homeCtaTitle">Get your shipment quote in minutes</h2>
                <p className="homeCtaText">
                  Share pickup, delivery, shipment type, and target date. We&apos;ll send a clear quote with next steps.
                </p>
                <p className="homeCtaUrgency">Response within 24 hours</p>
                <div className="homeCtaActions">
                  <Link className="btn btn-primary btn-lg" href="/quote" prefetch={false}>
                    Get a Quote
                  </Link>
                </div>
              </div>
              <div className="homeCtaMedia">
                <Image
                  src={siteImages.splitWarehouse}
                  alt="Enclosed trailers and logistics yard operations"
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
