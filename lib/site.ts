/**
 * Single source of truth for site-wide, language-independent values.
 * Localised SEO text (title, description, keywords...) lives in lib/i18n.
 *
 * Set SITE_URL in the deployment environment to the canonical production
 * origin (https://www.processspark.com). It is used for canonical
 * URLs, Open Graph, the sitemap, robots.txt and structured data.
 */
const FALLBACK_SITE_URL = "https://www.processspark.com";

function resolveSiteUrl(): string {
  const raw = process.env.SITE_URL?.trim() || FALLBACK_SITE_URL;
  try {
    return new URL(raw).origin;
  } catch {
    return FALLBACK_SITE_URL;
  }
}

export const siteUrl = resolveSiteUrl();

export const site = {
  name: "ProcessSpark",
  url: siteUrl,
  email: "Info@ProcessSpark.com",
  images: [
    { id: "bottle-inspection", path: "/images/bottle-inspection.webp" },
    { id: "copy-by-hand", path: "/images/copy-by-hand.webp" },
  ],
} as const;

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, siteUrl).toString();
}
