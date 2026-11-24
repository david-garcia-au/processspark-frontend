import type { MetadataRoute } from "next";
import { languageAlternates } from "@/lib/alternates";
import { industryIds, productIds } from "@/lib/catalogue";
import { localePath, locales } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/site";

// Evaluated at build time, so lastModified is the date of the latest deploy.
const lastModified = new Date();

type Entry = {
  path: string;
  priority: number;
  changeFrequency: "monthly" | "yearly";
};

// Every page is listed once per locale, each entry pointing at all versions.
// The catalogue pages come from the same ids the pages are generated from.
const pages: Entry[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/problems", priority: 0.8, changeFrequency: "monthly" },
  { path: "/industries", priority: 0.8, changeFrequency: "monthly" },
  ...industryIds.map((id) => ({
    path: `/industries/${id}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  })),
  { path: "/solutions", priority: 0.8, changeFrequency: "monthly" },
  ...productIds.map((id) => ({
    path: `/solutions/${id}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  })),
  { path: "/demo-preview", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/resources", priority: 0.5, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap((page) =>
    locales.map((locale) => ({
      url: absoluteUrl(localePath(locale, page.path === "/" ? "/" : page.path)),
      lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: { languages: languageAlternates(page.path) },
    })),
  );
}
