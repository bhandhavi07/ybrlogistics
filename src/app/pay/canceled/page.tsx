import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment canceled",
  description: "Checkout was canceled. You can try again or contact YBR Logistics.",
  alternates: {
    canonical: "/pay/canceled",
  },
};

export default function PayCanceledPage() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 640 }}>
        <h1 style={{ margin: 0, fontSize: "clamp(28px, 3vw, 40px)", lineHeight: 1.1 }}>Checkout canceled</h1>
        <p style={{ margin: "14px 0 0", color: "var(--muted)", lineHeight: 1.7, fontSize: 16 }}>
          No charge was made. You can return to pay your deposit when you are ready, or{" "}
          <Link href="/contact" prefetch={false} style={{ fontWeight: 800, color: "var(--accent-red)" }}>
            contact us
          </Link>{" "}
          for help.
        </p>
        <p style={{ margin: "18px 0 0", display: "flex", flexWrap: "wrap", gap: 12 }}>
          <Link className="btn btn-primary" href="/pay" prefetch={false}>
            Try again
          </Link>
          <Link className="btn btn-ghost" href="/" prefetch={false}>
            Home
          </Link>
        </p>
      </div>
    </section>
  );
}
