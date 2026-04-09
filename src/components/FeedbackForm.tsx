"use client";

import { useState } from "react";
import type { CSSProperties, FormEvent } from "react";

const SERVICE_OPTIONS = [
  "Residential Moving",
  "Commercial Moving",
  "Freight Coordination",
  "Last-Mile Delivery",
  "Other",
] as const;

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function parseRating(value: string): number | null {
  const n = Number(value);
  if (!Number.isInteger(n) || n < 1 || n > 5) return null;
  return n;
}

export default function FeedbackForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [serviceDate, setServiceDate] = useState("");
  const [rating, setRating] = useState("");
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
    const trimmedEmail = email.trim();
    const trimmedService = serviceType.trim();
    const trimmedDate = serviceDate.trim();
    const trimmedMessage = message.trim();
    const r = parseRating(rating);

    if (!trimmedName) return setError("Please enter your name.");
    if (!trimmedEmail || !isValidEmail(trimmedEmail)) return setError("Please enter a valid email address.");
    if (!trimmedService) return setError("Please select a service type.");
    if (!trimmedDate) return setError("Please enter the service date.");
    if (r === null) return setError("Please select a rating from 1 to 5.");
    if (trimmedMessage.length > 8000) return setError("Message is too long.");

    const payload = {
      name: trimmedName,
      email: trimmedEmail,
      serviceType: trimmedService,
      serviceDate: trimmedDate,
      rating: r,
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
      setEmail("");
      setServiceType("");
      setServiceDate("");
      setRating("");
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

      <div style={{ display: "grid", gap: 6 }}>
        <label style={{ fontWeight: 800 }}>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          type="email"
          style={inputStyle}
          autoComplete="email"
        />
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        <label style={{ fontWeight: 800 }}>Service type</label>
        <select
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
          required
          style={inputStyle}
        >
          <option value="">Select a service</option>
          {SERVICE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        <label style={{ fontWeight: 800 }}>Date</label>
        <input
          value={serviceDate}
          onChange={(e) => setServiceDate(e.target.value)}
          type="date"
          required
          style={inputStyle}
        />
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        <label style={{ fontWeight: 800 }}>Rating (1–5)</label>
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
          style={inputStyle}
        >
          <option value="">Select rating</option>
          <option value="5">5 — Excellent</option>
          <option value="4">4 — Good</option>
          <option value="3">3 — Fair</option>
          <option value="2">2 — Below expectations</option>
          <option value="1">1 — Poor</option>
        </select>
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        <label style={{ fontWeight: 800 }}>Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us about your experience"
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
