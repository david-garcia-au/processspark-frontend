import type { NextConfig } from "next";
const config: NextConfig = {
  turbopack: { root: process.cwd() },
  // The root layout lives under app/[lang], so unmatched URLs need a global
  // 404 page (app/global-not-found.tsx) instead of a layout-wrapped one.
  experimental: { globalNotFound: true },
};
export default config;
