import { defaultLocale, hasLocale, type Locale } from "./config";

export type RoutingDecision =
  | { action: "next" }
  | { action: "redirect"; pathname: string; permanent: boolean };

/**
 * Locale from an Accept-Language header: the highest-q entry whose primary
 * subtag is a supported locale. Returns undefined when none matches or the
 * header is missing (crawlers usually send none, so they get the default).
 */
export function negotiateLocale(header: string | null): Locale | undefined {
  if (!header) return undefined;
  const entries = header
    .split(",")
    .map((part, index) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
      const weight = q ? Number.parseFloat(q.slice(2)) : 1;
      return {
        primary: tag.trim().toLowerCase().split("-")[0],
        weight: Number.isNaN(weight) ? 0 : weight,
        index,
      };
    })
    .filter((e) => e.weight > 0)
    .sort((a, b) => b.weight - a.weight || a.index - b.index);
  return entries.map((e) => e.primary).find(hasLocale);
}

/**
 * Locale for a visitor on an unprefixed URL. A saved choice (cookie) beats the
 * browser preference, which beats the default.
 */
export function preferredLocale(
  cookieValue: string | undefined,
  acceptLanguage: string | null,
): Locale {
  if (cookieValue && hasLocale(cookieValue)) return cookieValue;
  return negotiateLocale(acceptLanguage) ?? defaultLocale;
}

/**
 * Pure routing rules used by proxy.ts (no Next imports).
 *
 * - /en/..., /es/...  -> pass through. Each URL is one language.
 * - Any other path    -> redirect to the visitor's locale (/about -> /es/about).
 *   Permanent (308) when that locale is the default, because it is the same
 *   answer for crawlers and for most visitors, so old English URLs transfer.
 *   Temporary (307) otherwise, since the answer depends on the visitor.
 */
export function resolveRequest(
  pathname: string,
  preferred: Locale,
): RoutingDecision {
  const first = pathname.split("/")[1] ?? "";
  if (hasLocale(first)) return { action: "next" };
  return {
    action: "redirect",
    pathname: `/${preferred}${pathname === "/" ? "" : pathname}`,
    permanent: preferred === defaultLocale,
  };
}
