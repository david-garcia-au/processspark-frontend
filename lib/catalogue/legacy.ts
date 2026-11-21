/**
 * Old addresses and anchors. Plain data with no imports and no TypeScript-only
 * runtime syntax, so next.config.ts can load it for the redirects.
 */

/** Old /solutions/<team> pages and the product that replaces each one. */
export const teamRedirects = {
  sales: "quotes-rfqs",
  finance: "invoice-bookkeeping",
  operations: "digitise-paperwork",
  engineering: "talk-to-your-documents",
  people: "employee-service-desk",
  leadership: "talk-to-your-data",
};

/**
 * Old /solutions#<id> anchors (JSON-LD and llms.txt used to link to them).
 * Fragments never reach the server, so each one stays as an empty span placed
 * before the product card it maps to. "capabilities" sits before the first
 * group section.
 */
export const anchorAliases = {
  sales: "quotes-rfqs",
  requests: "quotes-rfqs",
  finance: "invoice-bookkeeping",
  purchasing: "invoice-bookkeeping",
  operations: "digitise-paperwork",
  engineering: "talk-to-your-documents",
  knowledge: "talk-to-your-documents",
  people: "employee-service-desk",
  onboarding: "employee-service-desk",
  leadership: "talk-to-your-data",
  reporting: "talk-to-your-data",
  briefings: "talk-to-your-data",
  capabilities: "groups",
};

/** Slugs that may never become a product id. */
export const reservedProductSlugs = ["teams"];
