import type { ServiceIconId } from "../components/service/ServiceIcons";
import { siteImages } from "./siteImages";

export type ServiceItem = {
  title: string;
  body: string;
  bestFor: string;
  image: string;
  imageAlt: string;
  icon: ServiceIconId;
};

/** Full service catalog — Services page. */
export const servicesCatalog: ServiceItem[] = [
  {
    title: "Local & Regional Freight Transportation",
    body: "On-time lane coverage for local and regional freight moves.",
    bestFor: "Retail replenishment and multi-stop Bay Area routes",
    image: siteImages.services.localFreight,
    imageAlt: "Commercial truck on a curved road for regional freight runs",
    icon: "truck",
  },
  {
    title: "Dedicated Contract Carriage (DCC)",
    body: "Dedicated trucks and drivers assigned only to your account.",
    bestFor: "Recurring routes with fixed pickup and delivery windows",
    image: siteImages.services.dcc,
    imageAlt: "White Volvo semi-truck on the road for dedicated carriage",
    icon: "truckDedicated",
  },
  {
    title: "Warehousing & Distribution Support",
    body: "Storage, cross-dock, and outbound distribution in one workflow.",
    bestFor: "E-commerce and inventory overflow during peak weeks",
    image: siteImages.services.warehouse,
    imageAlt: "White enclosed trailers at a logistics yard for distribution",
    icon: "warehouse",
  },
  {
    title: "Last-Mile Delivery",
    body: "Fast last-mile coverage with proof of delivery at every stop.",
    bestFor: "Storefront drops, scheduled appointments, and B2B handoffs",
    image: siteImages.services.lastMile,
    imageAlt: "Parked fleet vehicles and vans for last-mile delivery routes",
    icon: "van",
  },
  {
    title: "Specialized & Contracted Deliveries",
    body: "Special handling for high-care freight and contracted delivery plans.",
    bestFor: "Fragile, high-value, or handling-sensitive shipments",
    image: siteImages.services.specialized,
    imageAlt: "Tanker truck on a mountain road for specialized and contracted freight",
    icon: "cargo",
  },
  {
    title: "Moving & Relocation",
    body: "Planned moves with secure load, transport, and unload execution.",
    bestFor: "Office relocation and business equipment moves",
    image: siteImages.services.moving,
    imageAlt: "White truck on the road for household or office relocation",
    icon: "moving",
  },
  {
    title: "Same Day Delivery",
    body: "Same-day delivery options for urgent shipments.",
    bestFor: "Rush replacement parts and time-critical deliveries",
    image: siteImages.services.sameDay,
    imageAlt: "Vehicle on a freeway for expedited same-day lane coverage",
    icon: "bolt",
  },
  {
    title: "Daily Line-Haul",
    body: "Daily line-haul with consistent schedules and route discipline.",
    bestFor: "Hub-to-hub transfers and nightly freight movement",
    image: siteImages.services.linehaul,
    imageAlt: "Semi-truck on the highway for scheduled line-haul",
    icon: "route",
  },
];
