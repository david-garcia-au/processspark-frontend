import type { Metadata, ResolvingMetadata } from "next";
import { languageAlternates } from "@/lib/alternates";
import { localePath, ogLocale, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

/**
 * Metadata for a catalogue page, following the About page pattern: canonical
 * and hreflang alternates from the locale-less path, and the layout's share
 * images carried over (an `openGraph` or `twitter` object replaces the
 * layout's). The layout template adds " | ProcessSpark" to `title`.
 */
export async function pageMetadata(
  parent: ResolvingMetadata,
  page: { lang: Locale; path: string; title: string; description: string },
): Promise<Metadata> {
  const { lang, path, title, description } = page;
  const url = localePath(lang, path);
  const locale = ogLocale[lang];
  const { openGraph: parentOg, twitter: parentTwitter } = await parent;
  const shareTitle = `${title} | ${site.name}`;
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
      ...(parentOg?.images?.length ? { images: parentOg.images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      ...(parentTwitter?.images?.length
        ? { images: parentTwitter.images }
        : {}),
    },
  };
}
