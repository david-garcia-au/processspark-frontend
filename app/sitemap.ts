import type { MetadataRoute } from "next";
import { defaultLocale, hreflang, localePath, locales } from "@/lib/i18n";
import { absoluteUrl, site } from "@/lib/site";

// Evaluated at build time, so lastModified is the date of the latest deploy.
const lastModified = new Date();

// Every page is listed once per locale, each entry pointing at all versions.
const languages = {
  ...Object.fromEntries(
    locales.map((locale) => [
      hreflang[locale],
      absoluteUrl(localePath(locale)),
    ]),
  ),
  "x-default": absoluteUrl(localePath(defaultLocale)),
};

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: absoluteUrl(localePath(locale)),
    lastModified,
    changeFrequency: "monthly",
    priority: 1,
    alternates: { languages },
    images: site.images.map((image) => absoluteUrl(image.path)),
  }));
}
