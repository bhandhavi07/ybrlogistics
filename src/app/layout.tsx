import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "YbrLogistics - State & Interstate Freight & Last-Mile Delivery",
  description: "On-time deliveries, same-day options, and dedicated freight services across state and interstate routes.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
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

