import {
  hreflang,
  localeCodes,
  localePath,
  locales,
  type Locale,
} from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type LanguageSwitcherProps = {
  /** Locale of the page being rendered. */
  lang: Locale;
  copy: Dictionary["languageSwitcher"];
  /** Locale-less path of the current page. The site is a single page, so "/". */
  path?: string;
  className?: string;
};

/**
 * EN | ES switch. Each link points at the same page in the other locale.
 * Hook-free on purpose, so it works in server and client trees. Imports the
 * locale config only, never the dictionaries.
 */
export function LanguageSwitcher({
  lang,
  copy,
  path = "/",
  className,
}: LanguageSwitcherProps) {
  return (
    <div
      role="group"
      aria-label={copy.label}
      className={cn("lang-switch", className)}
    >
      {locales.map((locale) =>
        locale === lang ? (
          <span
            key={locale}
            className="lang-switch-item"
            lang={hreflang[locale]}
            aria-current="true"
            aria-label={copy[locale]}
          >
            {localeCodes[locale]}
          </span>
        ) : (
          <a
            key={locale}
            className="lang-switch-item"
            href={localePath(locale, path)}
            lang={hreflang[locale]}
            hrefLang={hreflang[locale]}
            aria-label={copy[locale]}
          >
            {localeCodes[locale]}
          </a>
        ),
      )}
    </div>
  );
}
