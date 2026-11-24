import type { NextConfig } from "next";
import { teamRedirects } from "./lib/catalogue/legacy";
import { locales } from "./lib/i18n/config";

const config: NextConfig = {
  turbopack: { root: process.cwd() },
  // The root layout lives under app/[lang], so unmatched URLs need a global
  // 404 page (app/global-not-found.tsx) instead of a layout-wrapped one.
  experimental: { globalNotFound: true },
  // The six team pages were retired. Each old address goes to the product that
  // replaced it, keeping the language. Config redirects run before the proxy.
  async redirects() {
    return [
      ...Object.entries(teamRedirects).map(([team, productId]) => ({
        source: `/:lang(${locales.join("|")})/solutions/${team}`,
        destination: `/:lang/solutions/${productId}`,
        permanent: true,
      })),
      // The demos page was briefly published as /demo-preview.
      {
        source: `/:lang(${locales.join("|")})/demo-preview`,
        destination: "/:lang/demos",
        permanent: true,
      },
    ];
  },
};
export default config;
