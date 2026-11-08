import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { localeCookie } from "@/lib/i18n/config";
import { preferredLocale, resolveRequest } from "@/lib/i18n/routing";

/**
 * Locale routing. (`proxy` is the name of `middleware` in this Next version.)
 *
 * - /en/..., /es/...  pass through untouched.
 * - Anything else (/, /about, ...) is redirected to the visitor's language:
 *   NEXT_LOCALE cookie first, then Accept-Language, then English.
 *   /about -> /es/about for a Spanish browser, /en/about otherwise.
 *
 * The rules live in lib/i18n/routing.ts as a pure function. See docs/i18n.md.
 *
 * The matcher skips: /api, /_next, anything with a file extension (icon.svg,
 * sitemap.xml, robots.txt, manifest.webmanifest, llms.txt, images, PDFs) and
 * the extensionless metadata image routes that live at the app root.
 */
export function proxy(request: NextRequest) {
  const preferred = preferredLocale(
    request.cookies.get(localeCookie)?.value,
    request.headers.get("accept-language"),
  );
  const decision = resolveRequest(request.nextUrl.pathname, preferred);
  if (decision.action === "next") return NextResponse.next();
  const url = request.nextUrl.clone();
  url.pathname = decision.pathname;
  const response = NextResponse.redirect(url, decision.permanent ? 308 : 307);
  // The target depends on these two inputs, so caches must key on them.
  response.headers.set("Vary", "Accept-Language, Cookie");
  // A 308 is cached by browsers with no expiry, which would pin a visitor to
  // one language even after they change browser language or cookie. Search
  // engines still read the status code, so keep it, but forbid caching.
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export const config = {
  matcher: [
    "/((?!api/|_next/|apple-icon$|opengraph-image$|twitter-image$|.*\\..*).*)",
  ],
};
