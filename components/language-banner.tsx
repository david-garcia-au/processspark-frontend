"use client";

import { X } from "lucide-react";
import { useState, useSyncExternalStore } from "react";
import { hreflang, localePath, type Locale } from "@/lib/i18n/config";
import {
  hasLanguageChoice,
  languageSuggestion as copy,
  prefersSpanish,
  rememberLanguageChoice,
} from "@/lib/i18n/language-suggestion";

/**
 * Offers the Spanish version to visitors whose browser prefers Spanish.
 * Client-only on purpose: detection runs after hydration (server snapshot is false), so the server HTML
 * is identical for everyone and every URL stays static and cacheable. It is
 * fixed-position, so it never shifts the layout. See docs/i18n.md.
 */
const subscribe = () => () => {};
const shouldSuggest = () => prefersSpanish() && !hasLanguageChoice();
const onServer = () => false;

export function LanguageBanner({ lang }: { lang: Locale }) {
  // The server snapshot is always false, so the server HTML never has the
  // banner. After hydration React re-renders with the browser's answer.
  const suggest = useSyncExternalStore(subscribe, shouldSuggest, onServer);
  const [dismissed, setDismissed] = useState(false);

  if (lang !== "en" || !suggest || dismissed) return null;

  return (
    <div
      className="lang-banner"
      role="region"
      aria-label={copy.label}
      lang="es"
    >
      <p className="lang-banner-text" lang="es">
        {copy.message}
      </p>
      <a
        className="lang-banner-link"
        href={localePath("es")}
        lang={hreflang.es}
        hrefLang={hreflang.es}
        onClick={rememberLanguageChoice}
      >
        {copy.action}
      </a>
      <button
        type="button"
        className="lang-banner-close"
        aria-label={copy.dismiss}
        lang="es"
        onClick={() => {
          rememberLanguageChoice();
          setDismissed(true);
        }}
      >
        <X aria-hidden="true" size={18} />
      </button>
    </div>
  );
}
