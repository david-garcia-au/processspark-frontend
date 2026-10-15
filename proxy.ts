import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { resolveRequest } from "@/lib/i18n/routing";

/**
 * Locale routing. (`proxy` is the name of `middleware` in this Next version.)
 *
 * - /about      -> rewritten to /en/about (the URL in the browser stays /about)
 * - /en, /en/x  -> 308 redirect to / and /x (the default locale has no prefix)
 * - /<other locale>/... passes through untouched
 *
 * The rules live in lib/i18n/routing.ts as a pure function. If a host ever
 * fails to run this proxy, the same rules can be expressed as redirects() and
 * rewrites() ({ beforeFiles }) in next.config.ts. See docs/i18n.md.
 *
 * The matcher skips: /api, /_next, anything with a file extension (icon.svg,
 * sitemap.xml, robots.txt, manifest.webmanifest, llms.txt, images, PDFs) and
 * the extensionless metadata image routes that live at the app root.
 */
export function proxy(request: NextRequest) {
  const decision = resolveRequest(request.nextUrl.pathname);
  if (decision.action === "next") return NextResponse.next();
  const url = request.nextUrl.clone();
  url.pathname = decision.pathname;
  return decision.action === "redirect"
    ? NextResponse.redirect(url, 308)
    : NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    "/((?!api/|_next/|apple-icon$|opengraph-image$|twitter-image$|.*\\..*).*)",
  ],
};
