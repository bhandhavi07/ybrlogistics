"use client";

import { useState } from "react";
import type { CSSProperties, FormEvent } from "react";

const RATING_SELECT = (
  <>
    <option value="">Select…</option>
    <option value="5">5 — Excellent</option>
    <option value="4">4 — Good</option>
    <option value="3">3 — Fair</option>
    <option value="2">2 — Below expectations</option>
    <option value="1">1 — Poor</option>
  </>
);

function parseRating(value: string): number | null {
  const n = Number(value);
  if (!Number.isInteger(n) || n < 1 || n > 5) return null;
  return n;
}

export default function FeedbackForm() {
  const [name, setName] = useState("");
  const [overallRating, setOverallRating] = useState("");
  const [staffRating, setStaffRating] = useState("");
  const [politenessRating, setPolitenessRating] = useState("");
  const [timingsRating, setTimingsRating] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (website.trim()) {
      setSuccess("Thank you for your feedback.");
      return;
    }

    const trimmedName = name.trim();
    const trimmedMessage = message.trim();
    const o = parseRating(overallRating);
    const s = parseRating(staffRating);
    const p = parseRating(politenessRating);
    const t = parseRating(timingsRating);

    if (!trimmedName) return setError("Please enter your name.");
    if (o === null) return setError("Please select an overall rating.");
    if (s === null) return setError("Please select a staff rating.");
    if (p === null) return setError("Please select a politeness rating.");
    if (t === null) return setError("Please select a rating for scheduling and timing.");

    if (trimmedMessage.length > 8000) return setError("Message is too long.");

    const payload = {
      name: trimmedName,
      overallRating: o,
      staffRating: s,
      politenessRating: p,
      timingsRating: t,
      message: trimmedMessage || undefined,
    };

    try {
      setSubmitting(true);
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data: { ok?: boolean; error?: string } = await res.json().catch(() => ({}));

      if (!res.ok || !data.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setSuccess("Thank you for your feedback. We appreciate you taking the time to share your experience.");
      setName("");
      setOverallRating("");
      setStaffRating("");
      setPolitenessRating("");
      setTimingsRating("");
      setMessage("");
    } catch {
      setError("Network error. Please try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="contactLeadForm" style={{ display: "grid", gap: 14 }}>
      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        aria-hidden
        className="contactLeadFormHoneypot"
      />

      <div style={{ display: "grid", gap: 6 }}>
        <label style={{ fontWeight: 800 }}>Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
          style={inputStyle}
          autoComplete="name"
        />
      </div>

      <div className="contactLeadFormRow">
        <div style={{ display: "grid", gap: 6 }}>
          <label style={{ fontWeight: 800 }}>Overall rating</label>
          <select
            value={overallRating}
            onChange={(e) => setOverallRating(e.target.value)}
            required
            style={inputStyle}
          >
            {RATING_SELECT}
          </select>
        </div>
        <div style={{ display: "grid", gap: 6 }}>
          <label style={{ fontWeight: 800 }}>Staff rating</label>
          <select
            value={staffRating}
            onChange={(e) => setStaffRating(e.target.value)}
            required
            style={inputStyle}
          >
            {RATING_SELECT}
          </select>
        </div>
      </div>

      <div className="contactLeadFormRow">
        <div style={{ display: "grid", gap: 6 }}>
          <label style={{ fontWeight: 800 }}>Politeness</label>
          <select
            value={politenessRating}
            onChange={(e) => setPolitenessRating(e.target.value)}
            required
            style={inputStyle}
          >
            {RATING_SELECT}
          </select>
        </div>
        <div style={{ display: "grid", gap: 6 }}>
          <label style={{ fontWeight: 800 }}>Timings</label>
          <select
            value={timingsRating}
            onChange={(e) => setTimingsRating(e.target.value)}
            required
            style={inputStyle}
          >
            {RATING_SELECT}
          </select>
        </div>
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        <label style={{ fontWeight: 800 }}>Message (optional)</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Anything else you would like us to know..."
          style={{ ...inputStyle, minHeight: 120, resize: "vertical" }}
        />
      </div>

      {error ? (
        <div role="alert" style={{ color: "#b91c1c", fontWeight: 750 }}>
          {error}
        </div>
      ) : null}

      {success ? (
        <div role="status" style={{ color: "#166534", fontWeight: 750 }}>
          {success}
        </div>
      ) : null}

      <button className="btn btn-primary" type="submit" disabled={submitting} style={{ opacity: submitting ? 0.8 : 1 }}>
        {submitting ? "Sending..." : "Submit Feedback"}
      </button>

      <p style={{ margin: 0, fontSize: 14, color: "var(--muted)", lineHeight: 1.65, fontWeight: 650 }}>
        Thank you for taking the time to share your experience with YBR Logistics.
      </p>
    </form>
  );
}

const inputStyle: CSSProperties = {
  padding: "12px 12px",
  border: "1px solid var(--border)",
  borderRadius: 12,
  outline: "none",
  fontSize: 14,
  background: "white",
};
