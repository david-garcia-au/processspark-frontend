import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { DemoGallery } from "@/components/demo-gallery";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { product as getProduct, productIds } from "@/lib/catalogue";
import { contractsDemo, crmDemoUi, docsDemo } from "@/lib/crm-demo";
import { demoEntries, demoGalleryCopy, demoTeamIds } from "@/lib/demo-gallery";
import { deskDemo } from "@/lib/desk-demo";
import { invoiceDemo } from "@/lib/invoice-demo";
import { formsDemo } from "@/lib/forms-demo";
import { ncrDemo } from "@/lib/ncr-demo";
import { dataDemo } from "@/lib/data-demo";
import { getDictionary, hasLocale, locales } from "@/lib/i18n";
import { pageMetadata } from "@/lib/page-metadata";
import { quotesDemo } from "@/lib/quotes-demo";

/**
 * Every interactive demo on one page, filterable by product and team. The
 * "See it in action" links (menu card, home hero) point here.
 */
export const dynamicParams = false;
const demosPath = "/demos";
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}
export async function generateMetadata(
  { params }: PageProps<"/[lang]/demos">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const copy = demoGalleryCopy[lang];
  return pageMetadata(parent, {
    lang,
    path: demosPath,
    title: copy.title,
    description: copy.description,
  });
}
export default async function DemosPage({ params }: PageProps<"/[lang]/demos">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const copy = demoGalleryCopy[lang];
  // Only the products and teams that have a demo get a filter chip.
  const products = productIds
    .filter((id) => demoEntries.some((e) => e.products.includes(id)))
    .map((id) => ({ id, name: getProduct(lang, id).shortName }));
  const teams = demoTeamIds.filter((t) => demoEntries.some((e) => e.teams.includes(t)));
  return (
    <>
      <a className="skip-link" href="#main">
        {dict.common.skipLink}
      </a>
      <Header
        lang={lang}
        copy={dict.header}
        switcherCopy={dict.languageSwitcher}
        brandLabel={dict.common.brandLabel}
        mediaCopy={dict.media}
        page="demos"
        path={demosPath}
      />
      <main id="main" className="sol-page product-page demos-page">
        <section className="home-hero about-hero team-hero" aria-labelledby="demos-title">
          <div className="home-hero-glow" aria-hidden="true" />
          <div className="shell home-hero-inner">
            <h1 id="demos-title">
              <span>{copy.heading.line1}</span> <span className="orange">{copy.heading.line2}</span>
            </h1>
            <div className="home-hero-side">
              <p>{copy.lead}</p>
            </div>
          </div>
        </section>
        <section className="demo-section demos-band" aria-label={copy.filters.label}>
          <div className="shell">
            <DemoGallery
              copy={copy}
              ui={crmDemoUi[lang]}
              entries={demoEntries}
              scripts={{
                "docs-manuals": docsDemo[lang],
                "docs-contracts": contractsDemo[lang],
                quotes: quotesDemo[lang],
                desk: deskDemo[lang],
                invoices: invoiceDemo[lang],
                forms: formsDemo[lang],
                ncr: ncrDemo[lang],
                data: dataDemo[lang],
              }}
              products={products}
              teams={teams}
            />
          </div>
        </section>
      </main>
      <Footer
        lang={lang}
        copy={dict.footer}
        switcherCopy={dict.languageSwitcher}
        brandLabel={dict.common.brandLabel}
        page="demos"
      />
    </>
  );
}
