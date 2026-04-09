import { createHmac, timingSafeEqual } from "node:crypto";
import { MIN_DEPOSIT_CENTS } from "./stripeDeposit";

function env(name: string) {
  const value = process.env[name];
  return value && value.trim() ? value.trim() : undefined;
}

export type DepositTokenPayload = {
  v: 1;
  /** Amount in USD cents (integer). */
  amountCents: number;
  /** Unix timestamp (seconds) when token expires. */
  exp: number;
  /** Optional quote or job reference shown to the customer. */
  ref?: string;
};

function getTokenSecret(): string | undefined {
  return env("STRIPE_PAYMENT_TOKEN_SECRET");
}

function getMaxDepositCents(): number {
  const raw = env("STRIPE_DEPOSIT_MAX_CENTS");
  if (!raw) return 500_000; /* $5,000 default cap */
  const n = Number(raw);
  if (!Number.isFinite(n) || n < MIN_DEPOSIT_CENTS) return 500_000;
  return Math.floor(n);
}

/** Create a signed token (server-side or trusted script only — requires secret). */
export function signDepositToken(payload: Omit<DepositTokenPayload, "v"> & { v?: 1 }): string {
  const secret = getTokenSecret();
  if (!secret || secret.length < 16) {
    throw new Error("STRIPE_PAYMENT_TOKEN_SECRET is missing or too short (use at least 16 random characters).");
  }

  const full: DepositTokenPayload = {
    v: 1,
    amountCents: Math.floor(payload.amountCents),
    exp: Math.floor(payload.exp),
    ref: payload.ref?.trim() || undefined,
  };

  if (full.amountCents < MIN_DEPOSIT_CENTS) {
    throw new Error(`amountCents must be at least ${MIN_DEPOSIT_CENTS} ($0.50).`);
  }

  const maxCents = getMaxDepositCents();
  if (full.amountCents > maxCents) {
    throw new Error(`amountCents exceeds maximum (${maxCents} cents). Increase STRIPE_DEPOSIT_MAX_CENTS if needed.`);
  }

  const payloadStr = JSON.stringify(full);
  const sig = createHmac("sha256", secret).update(payloadStr).digest("base64url");
  const payloadB64 = Buffer.from(payloadStr, "utf8").toString("base64url");
  return `${payloadB64}.${sig}`;
}

export type VerifyResult =
  | { ok: true; payload: DepositTokenPayload }
  | { ok: false; reason: string };

export function verifyDepositToken(token: string): VerifyResult {
  const secret = getTokenSecret();
  if (!secret) {
    return { ok: false, reason: "Payment links are not configured." };
  }

  const parts = token.split(".");
  if (parts.length !== 2) {
    return { ok: false, reason: "Invalid payment link." };
  }

  const [payloadB64, sigB64] = parts;
  let payloadStr: string;
  try {
    payloadStr = Buffer.from(payloadB64, "base64url").toString("utf8");
  } catch {
    return { ok: false, reason: "Invalid payment link." };
  }

  const expectedSig = createHmac("sha256", secret).update(payloadStr).digest("base64url");

  try {
    const a = Buffer.from(sigB64, "utf8");
    const b = Buffer.from(expectedSig, "utf8");
    if (a.length !== b.length || !timingSafeEqual(a, b)) {
      return { ok: false, reason: "Invalid or tampered payment link." };
    }
  } catch {
    return { ok: false, reason: "Invalid payment link." };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(payloadStr);
  } catch {
    return { ok: false, reason: "Invalid payment link." };
  }

  const p = parsed as Partial<DepositTokenPayload>;
  if (p.v !== 1 || typeof p.amountCents !== "number" || typeof p.exp !== "number") {
    return { ok: false, reason: "Invalid payment link." };
  }

  const amountCents = Math.floor(p.amountCents);
  const exp = Math.floor(p.exp);

  if (amountCents < MIN_DEPOSIT_CENTS) {
    return { ok: false, reason: "Invalid deposit amount." };
  }

  const maxCents = getMaxDepositCents();
  if (amountCents > maxCents) {
    return { ok: false, reason: "Invalid deposit amount." };
  }

  if (Date.now() / 1000 > exp) {
    return { ok: false, reason: "This payment link has expired. Contact us for a new link." };
  }

  const ref = typeof p.ref === "string" && p.ref.trim() ? p.ref.trim().slice(0, 120) : undefined;

  return {
    ok: true,
    payload: { v: 1, amountCents, exp, ref },
  };
}
