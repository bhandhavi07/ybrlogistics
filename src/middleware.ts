import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CANONICAL_ORIGIN = "https://www.ybrlogistics.com";

/**
 * 301 redirects for production domain:
 * - http → https
 * - ybrlogistics.com (apex) → www.ybrlogistics.com
 *
 * Skips localhost, preview hosts, and non-production domains.
 */
export function middleware(request: NextRequest) {
  const rawHost = request.headers.get("host") || "";
  const host = rawHost.split(":")[0]?.toLowerCase() ?? "";
  const proto = (request.headers.get("x-forwarded-proto") || "").toLowerCase();

  if (host === "localhost" || host === "127.0.0.1") {
    return NextResponse.next();
  }

  const isOurDomain = host === "ybrlogistics.com" || host === "www.ybrlogistics.com";
  if (!isOurDomain) {
    return NextResponse.next();
  }

  const path = request.nextUrl.pathname + request.nextUrl.search;

  const isHttps = proto === "https" || proto === "";
  const isApex = host === "ybrlogistics.com";

  if (isApex || !isHttps) {
    const dest = new URL(path, CANONICAL_ORIGIN);
    if (request.nextUrl.href !== dest.href) {
      return NextResponse.redirect(dest, 301);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"],
};
