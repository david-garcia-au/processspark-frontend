import { defaultLocale, hreflang, localePath, locales } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/site";

/**
 * hreflang alternates for a page, given its locale-less path ("/" or "/about").
 * Lists every language version, the page itself included, with absolute URLs.
 */
export function languageAlternates(path = "/"): Record<string, string> {
  return {
    ...Object.fromEntries(
      locales.map((locale) => [
        hreflang[locale],
        absoluteUrl(localePath(locale, path)),
      ]),
    ),
    "x-default": absoluteUrl(localePath(defaultLocale, path)),
  };
}
