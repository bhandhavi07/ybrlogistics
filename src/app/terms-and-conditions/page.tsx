import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for YBR Logistics services and website use.",
  alternates: { canonical: "/terms-and-conditions" },
};

export default function TermsPage() {
  return (
    <section className="section">
      <div className="container legalPage">
        <h1>Terms &amp; Conditions</h1>
        <p>
          These Terms &amp; Conditions govern the use of YBR Logistics services and website.
        </p>

        <h2>Estimates</h2>
        <p>
          All quotes and estimates are based on the information provided by the customer. Final pricing may change if
          job scope, inventory, access conditions, distance, wait time, stairs, packing requirements, or requested
          services differ from the original estimate.
        </p>

        <h2>Booking and Deposits</h2>
        <p>
          A deposit may be required to confirm a booking date. Deposits are applied toward the total service cost unless
          otherwise stated in writing.
        </p>

        <h2>Remaining Balance</h2>
        <p>
          The remaining balance is due upon unloading or completion of service, unless other written payment terms have
          been agreed to in advance.
        </p>

        <h2>Additional Charges</h2>
        <p>
          Any additional work outside the original estimate, including extra labor, additional items, long carry, stairs,
          storage, waiting time, packing materials, or schedule changes, will be discussed with the customer before
          additional charges are added whenever reasonably possible.
        </p>

        <h2>Customer Responsibilities</h2>
        <p>
          Customers are responsible for providing accurate job details, ensuring access to pickup and delivery
          locations, securing valuables and personal documents, and informing YBR Logistics of any special handling
          requirements before service begins.
        </p>

        <h2>Delays and Uncontrollable Events</h2>
        <p>
          YBR Logistics is not responsible for delays caused by weather, road closures, traffic conditions,
          mechanical events, government restrictions, customer delays, or other causes outside reasonable control.
        </p>

        <h2>Claims</h2>
        <p>
          Any service-related concern or claim should be reported promptly in writing after delivery or service
          completion.
        </p>

        <h2>Website Use</h2>
        <p>All content on this website is for general informational purposes and may be updated without notice.</p>

        <h2>Contact</h2>
        <p>
          For questions about these Terms &amp; Conditions, contact{" "}
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
