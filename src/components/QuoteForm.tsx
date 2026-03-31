"use client";

import { useState } from "react";
import type { CSSProperties, FormEvent } from "react";

type QuotePayload = {
  name: string;
  email: string;
  phone: string;
  pickup_location: string;
  delivery_location: string;
  preferred_date: string;
  message: string;
  website?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function QuoteForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    const trimmedPickupLocation = pickupLocation.trim();
    const trimmedDeliveryLocation = deliveryLocation.trim();
    const trimmedPreferredDate = preferredDate.trim();
    const trimmedMessage = message.trim();
    const trimmedWebsite = website.trim();

    if (!trimmedName) return setError("Please enter your name.");
    if (!trimmedEmail || !isValidEmail(trimmedEmail)) return setError("Please enter a valid email address.");
    if (!trimmedPhone) return setError("Please enter your phone number.");
    const digits = trimmedPhone.replace(/\D/g, "");
    if (!digits || digits.length < 7 || digits.length > 15) return setError("Please enter a valid phone number.");
    if (!trimmedPickupLocation) return setError("Please enter the pickup location.");
    if (!trimmedDeliveryLocation) return setError("Please enter the delivery location.");
    if (!trimmedPreferredDate) return setError("Please select preferred date.");
    if (!trimmedMessage || trimmedMessage.length < 10) return setError("Please enter a message (at least 10 characters).");
    if (trimmedMessage.length > 2000) return setError("Message is too long.");

    const payload: QuotePayload = {
      name: trimmedName,
      email: trimmedEmail,
      phone: trimmedPhone,
      pickup_location: trimmedPickupLocation,
      delivery_location: trimmedDeliveryLocation,
      preferred_date: trimmedPreferredDate,
      message: trimmedMessage,
      website: trimmedWebsite,
    };

    try {
      setSubmitting(true);
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data: { ok?: boolean; error?: string } = await res.json().catch(() => ({}));

      if (!res.ok || !data.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setSuccess("Thanks! We received your request and will contact you within 24 hours.");
      setName("");
      setEmail("");
      setPhone("");
      setPickupLocation("");
      setDeliveryLocation("");
      setPreferredDate("");
      setMessage("");
      setWebsite("");
    } catch {
      setError("Network error. Please try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form id="quote-form" onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "grid", gap: 6 }}>
        <label style={{ fontWeight: 800 }}>Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your full name"
          required
          style={inputStyle}
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
        />
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        <label style={{ fontWeight: 800 }}>Phone</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="(408) 123-4567"
          required
          type="tel"
          style={inputStyle}
        />
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        <label style={{ fontWeight: 800 }}>Pickup Location</label>
        <input
          value={pickupLocation}
          onChange={(e) => setPickupLocation(e.target.value)}
          placeholder="City or full pickup address"
          required
          style={inputStyle}
        />
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        <label style={{ fontWeight: 800 }}>Delivery Location</label>
        <input
          value={deliveryLocation}
          onChange={(e) => setDeliveryLocation(e.target.value)}
          placeholder="City or full delivery address"
          required
          style={inputStyle}
        />
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        <label style={{ fontWeight: 800 }}>Preferred Date</label>
        <input
          value={preferredDate}
          onChange={(e) => setPreferredDate(e.target.value)}
          required
          type="date"
          style={inputStyle}
        />
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        <label style={{ fontWeight: 800 }}>Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us shipment size, handling notes, or special requirements."
          required
          style={{ ...inputStyle, minHeight: 120, resize: "vertical" }}
        />
      </div>

      <div
        style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden" }}
        aria-hidden="true"
      >
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          autoComplete="off"
          tabIndex={-1}
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
        {submitting ? "Sending..." : "Request Quote"}
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

