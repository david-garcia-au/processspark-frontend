import type { Locale } from "./config";
import { en, type Dictionary } from "./en";
import { es } from "./es";

export {
  defaultLocale,
  hasLocale,
  htmlLang,
  hreflang,
  localeCodes,
  localePath,
  locales,
  ogLocale,
  socialImagePath,
} from "./config";
export type { Locale } from "./config";
export type { Dictionary } from "./en";

const dictionaries: Record<Locale, Dictionary> = { en, es };

/**
 * Server-side only. Client components must receive the slice they need as
 * props and use `import type { Dictionary }` so no copy is bundled for them.
 */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
