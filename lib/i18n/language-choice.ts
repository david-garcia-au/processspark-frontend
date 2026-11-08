import { localeCookie } from "./config";

/**
 * Save an explicit language choice in a cookie. proxy.ts reads it before
 * Accept-Language, so the visitor keeps the language they picked. Client only.
 */
export function rememberLanguageChoice(locale: string): void {
  document.cookie = `${localeCookie}=${encodeURIComponent(locale)}; path=/; max-age=31536000; samesite=lax`;
}
