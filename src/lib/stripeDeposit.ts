import Stripe from "stripe";

function env(name: string) {
  const value = process.env[name];
  return value && value.trim() ? value.trim() : undefined;
}

/** Minimum Stripe charge in USD cents (Stripe typically allows $0.50+). */
export const MIN_DEPOSIT_CENTS = 50;

export function isStripeConfigured(): boolean {
  return Boolean(env("STRIPE_SECRET_KEY"));
}

/**
 * Optional fixed fallback deposit (cents) when no signed link is used.
 * Normal flow: each customer uses a personalized `/pay?t=...` link with amount embedded in the token.
 */
export function getDepositAmountCents(): number {
  const raw = env("STRIPE_DEPOSIT_AMOUNT_CENTS");
  if (!raw) return 0;
  const n = Number(raw);
  if (!Number.isFinite(n) || n < MIN_DEPOSIT_CENTS) return 0;
  return Math.floor(n);
}

export function getStripe(): Stripe {
  const key = env("STRIPE_SECRET_KEY");
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  return new Stripe(key);
}

export function formatUsd(cents: number): string {
  return (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
}
