"use client";

import { useState } from "react";
import type { CSSProperties, FormEvent } from "react";

type Props = {
  amountDisplay: string;
  disabled: boolean;
  disabledReason?: string;
  /** Signed token from /pay?t=... — required for variable amounts. */
  depositToken?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function PayDepositForm({ amountDisplay, disabled, disabledReason, depositToken }: Props) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (disabled) return;

    const trimmed = email.trim();
    if (trimmed && !isValidEmail(trimmed)) {
      setError("Please enter a valid email address, or leave it blank.");
      return;
    }

    const payload: { customerEmail?: string; token?: string } = {};
    if (trimmed) payload.customerEmail = trimmed;
    if (depositToken) payload.token = depositToken;

    try {
      setLoading(true);
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data: { ok?: boolean; url?: string; error?: string } = await res.json().catch(() => ({}));

      if (!res.ok || !data.ok || !data.url) {
        setError(data.error || "Could not start checkout. Please try again or contact us.");
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ display: "grid", gap: 14 }}>
      <div style={{ display: "grid", gap: 6 }}>
        <label style={{ fontWeight: 800 }}>Email (optional)</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="For Stripe receipt — same as your quote if possible"
          type="email"
          autoComplete="email"
          style={inputStyle}
          disabled={disabled || loading}
        />
      </div>

      {error ? (
        <div role="alert" style={{ color: "#b91c1c", fontWeight: 750 }}>
          {error}
        </div>
      ) : null}

      {disabled && disabledReason ? (
        <p style={{ margin: 0, color: "var(--muted)", fontSize: 14, fontWeight: 650, lineHeight: 1.55 }}>
          {disabledReason}
        </p>
      ) : null}

      <button className="btn btn-primary" type="submit" disabled={disabled || loading} style={{ opacity: loading ? 0.85 : 1 }}>
        {loading ? "Redirecting to secure checkout…" : `Pay ${amountDisplay} with card`}
      </button>

      <p style={{ margin: 0, fontSize: 13, color: "var(--muted)", lineHeight: 1.55, fontWeight: 600 }}>
        You will complete payment on Stripe&apos;s secure page (credit and debit cards). YBR Logistics does not store your
        card number on this website.
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
