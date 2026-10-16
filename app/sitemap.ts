import type { MetadataRoute } from "next";
import { languageAlternates } from "@/lib/alternates";
import { localePath, locales } from "@/lib/i18n";
import { absoluteUrl, site } from "@/lib/site";

// Evaluated at build time, so lastModified is the date of the latest deploy.
const lastModified = new Date();

// Every page is listed once per locale, each entry pointing at all versions.
export default function sitemap(): MetadataRoute.Sitemap {
  const home = locales.map((locale) => ({
    url: absoluteUrl(localePath(locale)),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 1,
    alternates: { languages: languageAlternates("/") },
    images: site.images.map((image) => absoluteUrl(image.path)),
  }));
  const about = locales.map((locale) => ({
    url: absoluteUrl(localePath(locale, "/about")),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
    alternates: { languages: languageAlternates("/about") },
  }));
  return [...home, ...about];
}
