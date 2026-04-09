/**
 * Public site URL for Stripe redirects (success/cancel). Set NEXT_PUBLIC_APP_URL in production
 * (e.g. https://www.ybrlogistics.com) so redirects match your domain; falls back to Vercel preview URL or localhost.
 */
export function getAppUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    const host = vercel.replace(/^https?:\/\//, "");
    return `https://${host}`;
  }

  return "http://localhost:3000";
}
