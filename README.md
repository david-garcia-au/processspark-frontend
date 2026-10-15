# ProcessSpark landing page

Independent Next.js App Router / TypeScript application. Run all commands from this repository's root.

```sh
npm ci
npm run dev
# http://localhost:3000
npm run lint
npm run typecheck
npm run build
```

## Reference and design

Reference: `david-garcia-au/industrialbutterflyvalves-frontend`, Next.js 16, React 19, Tailwind 4, shadcn new-york components and Lucide icons. Reuses its shadcn Button and class-name utility; the new app has an independent package manifest and lockfile. The Button uses the explicitly installed `radix-ui` Slot export rather than relying on a transitive dependency.

The reference's clear industrial hierarchy, spacious sections, sector groupings and direct enquiry paths informed the design. ProcessSpark uses graphite green, warm white and restrained safety orange, realistic illustrative photography and Today → After process comparisons. The refreshed desktop reading scale uses 16–18px body copy, larger controls and clearer AI/ML transformation messaging. There are no borrowed manufacturer credentials, customer logos, fabricated results, AWS services, analytics or external image dependencies.

## Structure

- `app/[lang]/page.tsx`, `app/[lang]/layout.tsx`: server-rendered landing page (English at `/`, Spanish at `/es`) and its metadata.
- `proxy.ts`, `lib/i18n/`: locale routing and the English and Spanish dictionaries. See `docs/i18n.md`.
- `lib/content.ts`: language-independent structure (ids, icons, order). All copy is in `lib/i18n/en.ts` and `lib/i18n/es.ts`.
- `components/language-switcher.tsx`: EN / ES switch.
- `components/process-explorer.tsx`: Radix accessible tabs, with automatic keyboard navigation.
- `components/header.tsx`: responsive navigation.
- `components/process-brief.tsx`: contact form that posts to `/api/contact` (SES email) with a local brief download.
- `components/transformation-visuals.tsx`: conveyor inspection hero and document-processing story, using optimised local images.
- `docs/visual-assets.md`: image provenance, generation prompts and saved asset paths.
- `components/inspection-visual.tsx`: preserved original SVG illustration, no longer displayed on the homepage.
- `components/ui/button.tsx`: shadcn Button.
- `app/globals.css`: responsive design tokens and styles, reduced-motion support.
- `app/transformation.css`: typography refresh and responsive photographic sections.

## Enquiries and launch

The CTA opens a validated enquiry form. It prepares a `mailto:` draft addressed to Info@ProcessSpark.com, with name, company, process category and description. Visitors review and send it in their mail app; the UI never reports successful delivery. A local text download is available if a mail app is not configured. No personal information is sent to a server or persisted in browser storage.

For server-side delivery, connect an email/CRM endpoint and add server validation, abuse controls and appropriate privacy wording. Before launch, confirm the canonical domain for social URLs. No deployment or production integration is part of this implementation.

## SEO and AI discoverability

- `lib/site.ts`: canonical URL and shared SEO values. The canonical origin is `https://www.processspark.com`. Set `SITE_URL` in the deployment environment only to override it. Google Search Console is verified via DNS, so no verification tag is needed; the optional `GOOGLE_SITE_VERIFICATION` and `BING_SITE_VERIFICATION` variables emit tags if ever required.
- `app/[lang]/layout.tsx`: per-language metadata (title, description, canonical, hreflang alternates, Open Graph, Twitter, robots) and viewport.
- `components/structured-data.tsx`: JSON-LD (Organization, WebSite, WebPage) generated per language from the dictionaries.
- `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`: sitemap.xml, robots.txt (search and AI crawlers allowed), web manifest.
- `app/llms.txt/route.ts`, `app/es/llms.txt/route.ts`: `/llms.txt` (English) and `/es/llms.txt` (Spanish) summaries for AI assistants, built by `lib/llms.ts`.
- `app/opengraph-image.tsx`, `app/twitter-image.tsx`, `app/apple-icon.tsx`: generated social and touch icons. `app/[lang]/social-image/route.tsx` renders the Spanish social image.

## Validation notes

- Production build uses Webpack because Turbopack build workers cannot bind their internal port in this desktop sandbox. Development preview uses Turbopack.
- Updated Next.js and its ESLint configuration to 16.4.0 in this app only.
- npm audit reports five high findings in the development-only ESLint → fast-glob → micromatch → braces chain (GHSA-vfj7-8cjw-p6xm). The suggested automated fix downgrades the Next.js ESLint configuration to 14.x and is not applied. Production dependencies have no reported findings in this audit.
- Use Node 22.13 or newer.

## Browser verification

Checked the desktop preview at 1440 px and phone layout at 390 px: all six tabs change panels, arrow keys select adjacent tabs, mobile navigation opens and closes after selection, and the document does not overflow horizontally. The form validates required fields and the download action reaches its explicit local-only confirmation state. Mail delivery is not claimed or tested: sending occurs in the visitor's mail app. No browser console warnings or errors were observed during tab testing.
