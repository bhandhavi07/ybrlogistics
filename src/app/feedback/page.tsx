import type { Metadata } from "next";
import FeedbackForm from "../../components/FeedbackForm";

export const metadata: Metadata = {
  title: "Leave Feedback | YBR Logistics",
  description:
    "Share your experience with YBR Logistics for moving, freight, or delivery services.",
  alternates: {
    canonical: "/feedback",
  },
};

export default function FeedbackPage() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 640 }}>
        <h1 style={{ margin: 0, fontSize: "clamp(28px, 3vw, 40px)", lineHeight: 1.1 }}>Leave Feedback</h1>
        <p style={{ margin: "14px 0 24px", color: "var(--muted)", lineHeight: 1.75, fontSize: 16 }}>
          We appreciate your feedback. If you have used YBR Logistics for moving, freight, or delivery services, please
          share your experience with us below.
        </p>

        <div className="card" style={{ padding: 24 }}>
          <FeedbackForm />
        </div>
      </div>
    </section>
  );
}
