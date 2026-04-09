import { NextResponse } from "next/server";
import { getAppUrl } from "../../../../lib/appUrl";
import { signDepositToken } from "../../../../lib/depositToken";

function env(name: string) {
  const value = process.env[name];
  return value && value.trim() ? value.trim() : undefined;
}

type Body = {
  /** Deposit in USD cents (e.g. 15000 = $150.00). */
  amountCents: number;
  /** Days until link expires (default 14). */
  expiresInDays?: number;
  /** Quote or job reference (optional, shown on pay page and Stripe metadata). */
  ref?: string;
};

/**
 * Creates a signed /pay link for a variable deposit amount.
 * Protect with DEPOSIT_LINK_API_KEY — call from your machine or a private tool, never expose the key in the browser.
 */
export async function POST(req: Request) {
  const apiKey = env("DEPOSIT_LINK_API_KEY");
  if (!apiKey || apiKey.length < 12) {
    return NextResponse.json({ ok: false, error: "Deposit link API is not configured." }, { status: 503 });
  }

  const auth = req.headers.get("authorization") || "";
  const bearer = auth.startsWith("Bearer ") ? auth.slice(7).trim() : "";
  if (bearer !== apiKey) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const amountCents = Number(body.amountCents);
  if (!Number.isFinite(amountCents)) {
    return NextResponse.json({ ok: false, error: "amountCents is required." }, { status: 400 });
  }

  const days = Math.min(90, Math.max(1, Number(body.expiresInDays) || 14));
  const exp = Math.floor(Date.now() / 1000 + days * 86400);
  const ref = (body.ref || "").trim().slice(0, 120) || undefined;

  let token: string;
  try {
    token = signDepositToken({ amountCents, exp, ref });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Invalid amount.";
    return NextResponse.json({ ok: false, error: msg }, { status: 400 });
  }

  const base = getAppUrl();
  const url = `${base}/pay?t=${encodeURIComponent(token)}`;

  return NextResponse.json({ ok: true, token, url, expiresInDays: days });
}
