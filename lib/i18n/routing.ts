import { defaultLocale, locales } from "./config";

export type RoutingDecision =
  | { action: "next" }
  | { action: "redirect"; pathname: string }
  | { action: "rewrite"; pathname: string };

/**
 * Pure routing rules used by proxy.ts (no Next imports, so the same rules can
 * be moved into next.config.ts redirects()/rewrites() if ever needed).
 *
 * - Unprefixed path          -> rewrite to the default locale (URL unchanged).
 * - Default locale prefix    -> redirect to the unprefixed path.
 * - Any other known locale   -> pass through.
 */
export function resolveRequest(pathname: string): RoutingDecision {
  const first = pathname.split("/")[1] ?? "";
  if ((locales as readonly string[]).includes(first)) {
    if (first !== defaultLocale) return { action: "next" };
    const rest = pathname.slice(first.length + 1);
    return { action: "redirect", pathname: rest === "" ? "/" : rest };
  }
  return {
    action: "rewrite",
    pathname: `/${defaultLocale}${pathname === "/" ? "" : pathname}`,
  };
}
