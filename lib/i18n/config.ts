/**
 * Locale configuration. No dictionary imports here, so this file is safe to
 * use from the proxy, route handlers and client code.
 */
export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];
/** Served without a URL prefix (/ instead of /en). */
export const defaultLocale: Locale = "en";
export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
/** Value of <html lang>. */
export const htmlLang: Record<Locale, string> = { en: "en", es: "es" };
/** Value used for hreflang and JSON-LD inLanguage. */
export const hreflang: Record<Locale, string> = { en: "en", es: "es-ES" };
/**
 * Value of og:locale. The default locale is left out on purpose: its tags
 * stay as they were before localisation.
 */
export const ogLocale: Record<Locale, string | undefined> = {
  en: undefined,
  es: "es_ES",
};
/** Visible text of the language switcher. The full names live in the dictionary. */
export const localeCodes: Record<Locale, string> = { en: "EN", es: "ES" };
/** Public path for a site-relative path in the given locale. */
export function localePath(locale: Locale, path = "/"): string {
  if (locale === defaultLocale) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}
/** Path of the Open Graph / Twitter image for a locale. */
export function socialImagePath(locale: Locale): string {
  return locale === defaultLocale
    ? "/opengraph-image"
    : localePath(locale, "/social-image");
}
