import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How YBR Logistics collects, uses, and protects information submitted through this website.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <section className="section">
      <div className="container legalPage">
        <h1>Privacy Policy</h1>
        <p>
          YBR Logistics respects your privacy and is committed to protecting the information you provide through this
          website.
        </p>

        <h2>Information We Collect</h2>
        <p>
          We may collect your name, phone number, email address, pickup and delivery information, and any details you
          submit through contact or quote forms.
        </p>

        <h2>How We Use Information</h2>
        <p>
          We use your information to respond to quote requests, communicate about services, schedule jobs, improve our
          website, and provide customer support.
        </p>

        <h2>Information Sharing</h2>
        <p>
          We do not sell personal information. Information may be shared only as needed to operate the business,
          provide requested services, comply with legal obligations, or protect our business and customers.
        </p>

        <h2>Data Security</h2>
        <p>
          We take reasonable steps to protect submitted information, but no website transmission or storage method can
          be guaranteed to be completely secure.
        </p>

        <h2>Cookies and Analytics</h2>
        <p>
          Our website may use standard website technologies such as cookies or analytics tools to understand traffic and
          improve the site experience.
        </p>

        <h2>Your Choices</h2>
        <p>
          You may contact us to update or request deletion of the personal information you previously submitted,
          subject to legal and operational requirements.
        </p>

        <h2>Contact</h2>
        <p>
          If you have questions about this Privacy Policy, contact{" "}
          <a href="mailto:Sandeep@ybrlogistics.com">Sandeep@ybrlogistics.com</a>.
        </p>

        <p style={{ marginTop: 28 }}>
          <Link href="/contact" prefetch={false} className="homePaymentLegalLink">
            ← Back to Contact
          </Link>
        </p>
      </div>
    </section>
  );
}
