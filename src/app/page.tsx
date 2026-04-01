import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";

export const metadata: Metadata = {
  title: "State & Interstate Freight and Last-Mile Delivery",
  description: "Get fast quotes for state and interstate freight, last-mile delivery, and dedicated routes.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
