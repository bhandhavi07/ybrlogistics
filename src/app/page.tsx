import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";

export const metadata: Metadata = {
  title: "YBR Logistics | Moving, Freight & Last-Mile Delivery in California",
  description:
    "YBR Logistics provides residential moving, commercial moving, freight coordination, and last-mile delivery with California-based operations and broader service support. Request a quote today.",
  alternates: {
    canonical: "https://www.ybrlogistics.com/",
  },
  openGraph: {
    title: "YBR Logistics | Moving, Freight & Last-Mile Delivery in California",
    description:
      "YBR Logistics provides residential moving, commercial moving, freight coordination, and last-mile delivery with California-based operations and broader service support. Request a quote today.",
    url: "https://www.ybrlogistics.com",
    siteName: "YBR Logistics",
    locale: "en_US",
    type: "website",
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
