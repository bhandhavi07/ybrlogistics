import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";

export const metadata: Metadata = {
  title: "YBR Logistics | Moving, Freight & Last-Mile Delivery in California",
  description:
    "YBR Logistics is a California-based moving and logistics service provider for residential and commercial moves, freight coordination, and last-mile delivery. Request a quote today.",
  alternates: {
    canonical: "https://www.ybrlogistics.com/",
  },
  openGraph: {
    title: "YBR Logistics | Moving, Freight & Last-Mile Delivery in California",
    description:
      "YBR Logistics is a California-based moving and logistics service provider for residential and commercial moves, freight coordination, and last-mile delivery. Request a quote today.",
    url: "https://www.ybrlogistics.com",
    siteName: "YBR Logistics",
    locale: "en_US",
    type: "website",
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
