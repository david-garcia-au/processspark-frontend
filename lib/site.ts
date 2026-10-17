/**
 * Single source of truth for site-wide, language-independent values.
 * Localised SEO text (title, description, keywords...) lives in lib/i18n.
 *
 * Set SITE_URL in the deployment environment to the canonical production
 * origin (https://www.processspark.com). It is used for canonical
 * URLs, Open Graph, the sitemap, robots.txt and structured data.
 */
import type { Locale } from "@/lib/i18n/config";

const FALLBACK_SITE_URL = "https://www.processspark.com";

function resolveSiteUrl(): string {
  const raw = process.env.SITE_URL?.trim() || FALLBACK_SITE_URL;
  try {
    return new URL(raw).origin;
  } catch {
    return FALLBACK_SITE_URL;
  }
}

export const siteUrl = resolveSiteUrl();

export const site = {
  name: "ProcessSpark",
  url: siteUrl,
  email: "Info@ProcessSpark.com",
  /** Invite-only demo platform (a separate app on its own subdomain). */
  demoUrl: "https://demo.processspark.com",
  images: [
    { id: "bottle-inspection", path: "/images/bottle-inspection.webp" },
    { id: "copy-by-hand", path: "/images/copy-by-hand.webp" },
  ],
} as const;

/**
 * Phone numbers by region, shown as small country cards (components/phone-cards.tsx),
 * in structured data and in llms.txt.
 *
 * To enable the Spain number, fill in display, tel and e164Dashed for region ES (full number supplied by David). Nothing else needs changing.
 *
 * A number is "ready" only when display, tel and e164Dashed are all non-null
 * (see `readyPhones`). A non-ready entry is treated as if it did not exist:
 * not rendered, not in structured data, not in llms.txt. Never put
 * placeholder digits here.
 *
 * `display` is the visible text (same in every language), `tel` the E.164
 * value for `tel:` links and `e164Dashed` the dashed form for structured data.
 * All ready numbers are always shown, in this order. Language never decides.
 */
export type Phone = {
  region: string;
  label: Record<Locale, string>;
  display: string | null;
  tel: string | null;
  e164Dashed: string | null;
  /** The company-wide number (Organization.telephone, no areaServed). */
  default?: boolean;
};

export const phones: readonly Phone[] = [
  {
    region: "AU",
    label: { en: "Australia", es: "Australia" },
    display: "+61 2 9164 7575",
    tel: "+61291647575",
    e164Dashed: "+61-2-9164-7575",
    default: true,
  },
  {
    region: "ES",
    label: { en: "Spain", es: "España" },
    display: null,
    tel: null,
    e164Dashed: null,
  },
];

export type ReadyPhone = Phone & {
  display: string;
  tel: string;
  e164Dashed: string;
};

function isReady(phone: Phone): phone is ReadyPhone {
  return (
    phone.display !== null && phone.tel !== null && phone.e164Dashed !== null
  );
}

/** The numbers that are fully filled in. Everything else must ignore the rest. */
export function readyPhones(): ReadyPhone[] {
  return phones.filter(isReady);
}

/** The company-wide number, used for Organization.telephone. */
export function defaultPhone(): ReadyPhone {
  const ready = readyPhones();
  const found = ready.find((phone) => phone.default) ?? ready[0];
  if (!found) throw new Error("lib/site.ts: no ready phone number");
  return found;
}

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, siteUrl).toString();
}
