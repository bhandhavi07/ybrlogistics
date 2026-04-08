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

/** Full service catalog — Services page & homepage alignment. */
export const servicesCatalog: ServiceItem[] = [
  {
    title: "Residential Moving",
    body: "Local and long-distance household moving with organized loading, careful handling, and scheduled delivery.",
    bestFor: "Home moves, apartments, and full-house relocations",
    image: siteImages.services.moving,
    imageAlt: "Moving truck on the road for residential relocation",
    icon: "moving",
  },
  {
    title: "Commercial Moving",
    body: "Office, equipment, and business relocation services designed to reduce downtime and keep operations moving.",
    bestFor: "Office moves, equipment transfers, and business relocations",
    image: siteImages.services.dcc,
    imageAlt: "Commercial fleet for office and equipment relocation",
    icon: "truckDedicated",
  },
  {
    title: "Freight Transportation",
    body: "State and interstate freight support for scheduled lanes, urgent loads, and dedicated transportation needs.",
    bestFor: "Scheduled lanes, urgent loads, and dedicated freight",
    image: siteImages.services.localFreight,
    imageAlt: "Freight truck on the road for transportation",
    icon: "truck",
  },
  {
    title: "Last-Mile Delivery",
    body: "Final-mile delivery solutions with appointment coordination, delivery updates, and professional service.",
    bestFor: "Appointment deliveries, B2B handoffs, and final-mile routes",
    image: siteImages.services.lastMile,
    imageAlt: "Fleet vehicles for last-mile delivery",
    icon: "van",
  },
  {
    title: "Storage and Distribution Support",
    body: "Flexible logistics support for inventory movement, outbound freight, and scheduled distribution.",
    bestFor: "Inventory overflow, outbound freight, and distribution runs",
    image: siteImages.services.warehouse,
    imageAlt: "Trailers and yard staging for storage and distribution",
    icon: "warehouse",
  },
];
