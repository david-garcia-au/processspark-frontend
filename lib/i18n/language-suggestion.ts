/**
 * Language suggestion banner: copy and storage helpers. No dictionary imports,
 * so this is safe to bundle for the client.
 *
 * The strings are Spanish on purpose: the banner appears on English pages for
 * visitors whose browser prefers Spanish. They are not part of the Dictionary
 * (that type must match across locales); the banner marks them with lang="es".
 */
export const languageSuggestion = {
  label: "Sugerencia de idioma",
  message: "¿Prefieres ver esta web en español?",
  action: "Ver en español",
  dismiss: "Cerrar",
} as const;

/** localStorage key. Set once the visitor dismissed the banner or chose a language. */
export const languageSuggestionKey = "ps-lang-suggestion";

/** Remember the choice. Storage can be blocked, so never throw. */
export function rememberLanguageChoice(): void {
  try {
    window.localStorage.setItem(languageSuggestionKey, "1");
  } catch {
    /* storage unavailable: the banner may show again, nothing else breaks */
  }
}

export function hasLanguageChoice(): boolean {
  try {
    return window.localStorage.getItem(languageSuggestionKey) !== null;
  } catch {
    return false;
  }
}

/**
 * True when a Spanish language comes before any English one in the browser's
 * preference list (or Spanish is the only one of the two).
 */
export function prefersSpanish(): boolean {
  const list =
    navigator.languages && navigator.languages.length > 0
      ? navigator.languages
      : navigator.language
        ? [navigator.language]
        : [];
  for (const entry of list) {
    const tag = entry.toLowerCase();
    if (tag.startsWith("en")) return false;
    if (tag.startsWith("es")) return true;
  }
  return false;
}
