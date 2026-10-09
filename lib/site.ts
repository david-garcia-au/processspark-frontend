/**
 * Single source of truth for site-wide SEO / GEO values.
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
  tagline: "Less manual work. More possibility.",
  title: "ProcessSpark — Less manual work. More possibility.",
  description:
    "Practical AI for manufacturing, logistics and industrial services. Turn repetitive inspection, paperwork and reporting into better processes.",
  socialTitle:
    "ProcessSpark — AI for the work your people shouldn’t be doing manually.",
  socialDescription:
    "Start with one process. Build a practical solution. Measure what changes.",
  keywords: [
    "practical AI for manufacturing",
    "industrial AI",
    "AI for logistics",
    "digital transformation",
    "process automation",
    "computer vision inspection",
    "visual quality inspection",
    "document processing AI",
    "intelligent document processing",
    "machine learning",
    "field service reporting",
    "technical knowledge assistant",
    "predictive monitoring",
    "industrial services",
    "warehousing automation",
    "reduce manual work",
  ],
  sectors: [
    "Manufacturing",
    "Engineering",
    "Logistics",
    "Warehousing",
    "Industrial services",
  ],
  knowsAbout: [
    "Computer vision",
    "Machine learning",
    "Artificial intelligence",
    "Document processing",
    "Process automation",
    "Digital transformation",
    "Visual quality inspection",
    "Equipment and process monitoring",
  ],
  images: [
    {
      path: "/images/bottle-inspection.webp",
      alt: "Illustrative bottling line with a vision camera above bottles moving along a conveyor",
    },
    {
      path: "/images/document-processing.webp",
      alt: "Illustrative quality-control employee scanning paper inspection forms beside a laptop and a stack of records",
    },
  ],
} as const;

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, siteUrl).toString();
}
