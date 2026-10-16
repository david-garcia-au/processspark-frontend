import Link from "next/link";
import type { ComponentProps } from "react";
import { localePath, type Locale } from "@/lib/i18n/config";

/** Which page renders the header or footer. Decides where anchors point. */
export type PageId = "home" | "about";

/**
 * Hash links ("#contact") only work on the landing page. Elsewhere they point
 * back to it in the current language ("/#contact", "/es#contact").
 */
export function sectionHref(lang: Locale, page: PageId, hash: string): string {
  return page === "home" ? hash : `${localePath(lang)}${hash}`;
}

/**
 * Hash-only hrefs ("#contact") stay plain anchors, so in-page jumps on the
 * landing page behave exactly as before. Any other href is a route and goes
 * through next/link for client-side navigation.
 */
export function SiteLink({ href, ...props }: ComponentProps<"a"> & { href: string }) {
  if (href.startsWith("#")) return <a href={href} {...props} />;
  return <Link href={href} {...props} />;
}
