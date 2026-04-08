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

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
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

    if (website.trim()) {
      setSuccess("Thanks — we received your message.");
      return;
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    const trimmedPickup = pickupAddress.trim();
    const trimmedDelivery = deliveryAddress.trim();
    const trimmedService = serviceType.trim();
    const trimmedSize = estimatedSize.trim();
    const trimmedDate = preferredDate.trim();
    const trimmedExtra = additionalDetails.trim();

    if (!trimmedName) return setError("Please enter your full name.");
    if (!trimmedEmail || !isValidEmail(trimmedEmail)) return setError("Please enter a valid email address.");

    const digits = trimmedPhone.replace(/\D/g, "");
    if (!digits || digits.length < 7 || digits.length > 15) {
      return setError("Please enter a valid phone number.");
    }

    if (!trimmedPickup) return setError("Please enter a pickup address.");
    if (!trimmedDelivery) return setError("Please enter a delivery address.");
    if (!trimmedService) return setError("Please select a service type.");
    if (!trimmedSize) return setError("Please describe the estimated move or shipment size.");
    if (!trimmedDate) return setError("Please choose a preferred date.");

    const payload = {
      name: trimmedName,
      email: trimmedEmail,
      phone: trimmedPhone,
      pickupAddress: trimmedPickup,
      deliveryAddress: trimmedDelivery,
      serviceType: trimmedService,
      estimatedSize: trimmedSize,
      preferredDate: trimmedDate,
      additionalDetails: trimmedExtra,
    };

    try {
      setSubmitting(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data: { ok?: boolean; error?: string } = await res.json().catch(() => ({}));

      if (!res.ok || !data.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setSuccess("We received your request. We'll contact you within 24 hours with next steps.");
      setName("");
      setEmail("");
      setPhone("");
      setPickupAddress("");
      setDeliveryAddress("");
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
          <label style={{ fontWeight: 800 }}>Phone number</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(408) 366-9696"
            type="tel"
            required
            style={inputStyle}
            autoComplete="tel"
          />
        </div>
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

      <div style={{ display: "grid", gap: 6 }}>
        <label style={{ fontWeight: 800 }}>Pickup address</label>
        <input
          value={pickupAddress}
          onChange={(e) => setPickupAddress(e.target.value)}
          placeholder="Street, city, state, ZIP"
          required
          style={inputStyle}
          autoComplete="street-address"
        />
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        <label style={{ fontWeight: 800 }}>Delivery address</label>
        <input
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
          placeholder="Street, city, state, ZIP"
          required
          style={inputStyle}
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
          <label style={{ fontWeight: 800 }}>Estimated move or shipment size</label>
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
        <label style={{ fontWeight: 800 }}>Preferred date</label>
        <input
          value={preferredDate}
          onChange={(e) => setPreferredDate(e.target.value)}
          type="date"
          required
          style={inputStyle}
        />
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        <label style={{ fontWeight: 800 }}>Additional details</label>
        <textarea
          value={additionalDetails}
          onChange={(e) => setAdditionalDetails(e.target.value)}
          placeholder="Access, stairs, parking, special items, timing windows..."
          style={{ ...inputStyle, minHeight: 120, resize: "vertical" }}
        />
      </div>

      <p className="contactLeadFormDisclaimer" style={{ margin: 0, fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>
        By submitting this form, you agree to be contacted by YBR Logistics regarding your request.
      </p>

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
        {submitting ? "Sending..." : "Submit request"}
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
