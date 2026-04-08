"use client";

import { useState } from "react";
import type { CSSProperties, FormEvent } from "react";

const SERVICE_OPTIONS = [
  "Residential Moving",
  "Commercial Moving",
  "Freight Transportation",
  "Last-Mile Delivery",
  "Storage and Distribution Support",
  "Other / Not sure",
] as const;

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function FeedbackForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [dateOfService, setDateOfService] = useState("");
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
    const trimmedPhone = phone.trim();
    const trimmedService = serviceType.trim();
    const trimmedDate = dateOfService.trim();
    const trimmedMessage = message.trim();
    const ratingNum = Number(rating);

    if (!trimmedName) return setError("Please enter your full name.");
    if (!trimmedEmail || !isValidEmail(trimmedEmail)) return setError("Please enter a valid email address.");

    if (trimmedPhone) {
      const digits = trimmedPhone.replace(/\D/g, "");
      if (!digits || digits.length < 7 || digits.length > 15) {
        return setError("Please enter a valid phone number or leave it blank.");
      }
    }

    if (!trimmedService) return setError("Please select a service type.");
    if (!trimmedDate) return setError("Please enter the date of service.");
    if (!rating || !Number.isInteger(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return setError("Please select a rating from 1 to 5.");
    }
    if (trimmedMessage.length < 10) return setError("Please enter your feedback (at least 10 characters).");

    const payload = {
      name: trimmedName,
      email: trimmedEmail,
      phone: trimmedPhone || undefined,
      serviceType: trimmedService,
      dateOfService: trimmedDate,
      rating: ratingNum,
      message: trimmedMessage,
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
      setPhone("");
      setServiceType("");
      setDateOfService("");
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

      <div className="contactLeadFormRow">
        <div style={{ display: "grid", gap: 6 }}>
          <label style={{ fontWeight: 800 }}>Full name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            required
            style={inputStyle}
            autoComplete="name"
          />
        </div>
        <div style={{ display: "grid", gap: 6 }}>
          <label style={{ fontWeight: 800 }}>Email address</label>
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
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        <label style={{ fontWeight: 800 }}>Phone number (optional)</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="(408) 366-9696"
          type="tel"
          style={inputStyle}
          autoComplete="tel"
        />
      </div>

      <div className="contactLeadFormRow">
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
          <label style={{ fontWeight: 800 }}>Date of service</label>
          <input
            value={dateOfService}
            onChange={(e) => setDateOfService(e.target.value)}
            placeholder="e.g. March 2025 or 2025-03-15"
            required
            style={inputStyle}
          />
        </div>
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        <label style={{ fontWeight: 800 }}>Rating (1 to 5)</label>
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
          style={inputStyle}
        >
          <option value="">Select a rating</option>
          <option value="5">5 — Excellent</option>
          <option value="4">4 — Good</option>
          <option value="3">3 — Fair</option>
          <option value="2">2 — Below expectations</option>
          <option value="1">1 — Poor</option>
        </select>
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        <label style={{ fontWeight: 800 }}>Feedback message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us about your experience with YBR Logistics..."
          required
          style={{ ...inputStyle, minHeight: 140, resize: "vertical" }}
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
