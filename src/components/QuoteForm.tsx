"use client";

import { useState } from "react";
import type { CSSProperties, FormEvent } from "react";

const SERVICE_OPTIONS = [
  "Residential Moving",
  "Commercial Moving",
  "Freight Coordination",
  "Last-Mile Delivery",
  "Storage and Distribution Support",
  "Other / Not sure",
] as const;

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function QuoteForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [estimatedSize, setEstimatedSize] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [website, setWebsite] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedEmail = email.trim();
    const trimmedPickup = pickupLocation.trim();
    const trimmedDelivery = deliveryLocation.trim();
    const trimmedService = serviceType.trim();
    const trimmedSize = estimatedSize.trim();
    const trimmedDate = preferredDate.trim();
    const trimmedExtra = additionalDetails.trim();
    const trimmedWebsite = website.trim();

    if (trimmedWebsite) {
      setSuccess("Thanks! We received your request.");
      return;
    }

    if (!trimmedName) return setError("Please enter your full name.");
    if (!trimmedPhone) return setError("Please enter your phone number.");
    const digits = trimmedPhone.replace(/\D/g, "");
    if (!digits || digits.length < 7 || digits.length > 15) return setError("Please enter a valid phone number.");
    if (!trimmedEmail || !isValidEmail(trimmedEmail)) return setError("Please enter a valid email address.");
    if (!trimmedPickup) return setError("Please enter the pickup address.");
    if (!trimmedDelivery) return setError("Please enter the delivery address.");
    if (!trimmedService) return setError("Please select a service type.");
    if (!trimmedSize) return setError("Please describe the estimated move or shipment size.");
    if (!trimmedDate) return setError("Please choose a preferred date.");
    if (trimmedExtra.length > 4000) return setError("Additional details are too long.");

    const payload = {
      name: trimmedName,
      email: trimmedEmail,
      phone: trimmedPhone,
      pickup_location: trimmedPickup,
      delivery_location: trimmedDelivery,
      service_type: trimmedService,
      estimated_size: trimmedSize,
      preferred_date: trimmedDate,
      additional_details: trimmedExtra || undefined,
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

      setSuccess("Thanks! We received your quote request and will contact you within 24 hours with next steps.");
      setName("");
      setPhone("");
      setEmail("");
      setPickupLocation("");
      setDeliveryLocation("");
      setServiceType("");
      setEstimatedSize("");
      setPreferredDate("");
      setAdditionalDetails("");
    } catch {
      setError("Network error. Please try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form id="quote-form" onSubmit={onSubmit} style={{ display: "grid", gap: 12, position: "relative" }}>
      <div className="contactLeadFormRow">
        <div style={{ display: "grid", gap: 6 }}>
          <label style={{ fontWeight: 800 }}>Full Name</label>
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
          <label style={{ fontWeight: 800 }}>Phone</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(408) 366-9696"
            required
            type="tel"
            style={inputStyle}
            autoComplete="tel"
          />
        </div>
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
        <label style={{ fontWeight: 800 }}>Pickup Address</label>
        <input
          value={pickupLocation}
          onChange={(e) => setPickupLocation(e.target.value)}
          placeholder="Street, city, state, ZIP"
          required
          style={inputStyle}
        />
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        <label style={{ fontWeight: 800 }}>Delivery Address</label>
        <input
          value={deliveryLocation}
          onChange={(e) => setDeliveryLocation(e.target.value)}
          placeholder="Street, city, state, ZIP"
          required
          style={inputStyle}
        />
      </div>

      <div className="contactLeadFormRow">
        <div style={{ display: "grid", gap: 6 }}>
          <label style={{ fontWeight: 800 }}>Service Type</label>
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
          <label style={{ fontWeight: 800 }}>Estimated Size</label>
          <input
            value={estimatedSize}
            onChange={(e) => setEstimatedSize(e.target.value)}
            placeholder="e.g. 2-bedroom home, 5 pallets"
            required
            style={inputStyle}
          />
        </div>
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        <label style={{ fontWeight: 800 }}>Preferred Date</label>
        <input
          value={preferredDate}
          onChange={(e) => setPreferredDate(e.target.value)}
          type="date"
          required
          style={inputStyle}
        />
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        <label style={{ fontWeight: 800 }}>Additional Details</label>
        <textarea
          value={additionalDetails}
          onChange={(e) => setAdditionalDetails(e.target.value)}
          placeholder="Access, stairs, parking, special items, timing windows (optional)"
          style={{ ...inputStyle, minHeight: 120, resize: "vertical" }}
        />
      </div>

      <div
        style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden" }}
        aria-hidden="true"
      >
        <label htmlFor="quote-website">Website</label>
        <input
          id="quote-website"
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
