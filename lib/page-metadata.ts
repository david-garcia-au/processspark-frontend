import type { Metadata, ResolvingMetadata } from "next";
import { languageAlternates } from "@/lib/alternates";
import { localePath, ogLocale, type Locale } from "@/lib/i18n";
import { absoluteUrl, site } from "@/lib/site";

/**
 * Metadata for a catalogue page, following the About page pattern: canonical
 * and hreflang alternates from the locale-less path, and the page's own share
 * card (app/[lang]/social-image/[...slug], same path as the page). The layout
 * template adds " | ProcessSpark" to `title`.
 */
export async function pageMetadata(
  _parent: ResolvingMetadata,
  page: { lang: Locale; path: string; title: string; description: string },
): Promise<Metadata> {
  const { lang, path, title, description } = page;
  const url = localePath(lang, path);
  const locale = ogLocale[lang];
  const shareTitle = `${title} | ${site.name}`;
  const images = [
    {
      url: absoluteUrl(localePath(lang, `/social-image${path}`)),
      width: 1200,
      height: 630,
      alt: shareTitle,
      type: "image/png",
    },
  ];
  return {
    title,
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      title: shareTitle,
      description,
      url,
      type: "website",
      siteName: site.name,
      ...(locale ? { locale } : {}),
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images,
    },
  };
}
