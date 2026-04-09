/**
 * Generate a signed /pay link for a variable deposit (run locally — never commit secrets).
 *
 * Usage (from project root, with .env.local loaded):
 *   npx tsx scripts/generate-deposit-link.ts <amountCents> [expiresInDays] [ref]
 *
 * Examples:
 *   npx tsx scripts/generate-deposit-link.ts 15000 14 "Quote #1042"
 *   (15000 = $150.00, link valid 14 days, optional reference shown to customer)
 *
 * Requires STRIPE_PAYMENT_TOKEN_SECRET and NEXT_PUBLIC_APP_URL (or rely on default localhost for testing).
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

function loadEnvLocal() {
  const p = resolve(process.cwd(), ".env.local");
  if (!existsSync(p)) return;
  const raw = readFileSync(p, "utf8");
  for (const line of raw.split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq <= 0) continue;
    const key = t.slice(0, eq).trim();
    let val = t.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnvLocal();

async function main() {
  const { signDepositToken } = await import("../src/lib/depositToken");
  const { getAppUrl } = await import("../src/lib/appUrl");

  const amountCents = Number(process.argv[2]);
  const days = Math.min(90, Math.max(1, Number(process.argv[3]) || 14));
  const ref = (process.argv.slice(4).join(" ") || "").trim() || undefined;

  if (!Number.isFinite(amountCents) || amountCents < 50) {
    console.error("Usage: npx tsx scripts/generate-deposit-link.ts <amountCents> [expiresInDays] [ref]");
    console.error("Example: npx tsx scripts/generate-deposit-link.ts 15000 14 \"Quote #1042\"");
    process.exit(1);
  }

  const exp = Math.floor(Date.now() / 1000 + days * 86400);
  const token = signDepositToken({ amountCents, exp, ref });
  const base = getAppUrl();
  const url = `${base}/pay?t=${encodeURIComponent(token)}`;

  console.log("");
  console.log("Deposit (cents):", Math.floor(amountCents));
  console.log("Valid (days):   ", days);
  if (ref) console.log("Reference:      ", ref);
  console.log("");
  console.log(url);
  console.log("");
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
