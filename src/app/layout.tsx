import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const siteUrl = "https://www.ybrlogistics.com";
const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "YbrLogistics",
  url: siteUrl,
  telephone: "+1-408-366-9696",
  email: "Sandeep@ybrlogistics.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "24240 Nora Cir",
    addressLocality: "Hayward",
    addressRegion: "CA",
    postalCode: "94545",
    addressCountry: "US",
  },
  areaServed: "State and interstate routes",
  description: "Freight and last-mile delivery with same-day options and dedicated routes.",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "YbrLogistics - State & Interstate Freight & Last-Mile Delivery",
    template: "%s | YbrLogistics",
  },
  description: "On-time deliveries, same-day options, and dedicated freight services across state and interstate routes.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "YbrLogistics - State & Interstate Freight & Last-Mile Delivery",
    description: "On-time deliveries, same-day options, and dedicated freight services across state and interstate routes.",
    url: siteUrl,
    siteName: "YbrLogistics",
    locale: "en_US",
    type: "website",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
        {gaMeasurementId ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`} strategy="afterInteractive" />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${gaMeasurementId}');`}
            </Script>
          </>
        ) : null}
        <Header />
        <main style={{ flex: 1 }}>{children}</main>
        <Link href="/quote" prefetch={false} className="mobileStickyQuoteCta">
          Get a Quote
        </Link>
        <Footer />
      </body>
    </html>
  );
}

