import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowRight, Check, Sparkles } from "lucide-react";
import { AccentHeading } from "@/components/accent-heading";
import { Brand } from "@/components/brand";
import { DataDemo } from "@/components/data-demo";
import { DeskDemo } from "@/components/desk-demo";
import { DocsDemo } from "@/components/docs-demo";
import { InvoiceDemo } from "@/components/invoice-demo";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Media } from "@/components/media";
import { NcrDemo } from "@/components/ncr-demo";
import { ProcessBrief } from "@/components/process-brief";
import { QuotesDemo } from "@/components/quotes-demo";
import { SiteLink } from "@/components/site-link";
import {
  isProductId,
  mainProblem,
  product as getProduct,
  productIds,
  type ProductId,
} from "@/lib/catalogue";
import { crmDemoUi, docsDemo } from "@/lib/crm-demo";
import { dataDemo } from "@/lib/data-demo";
import { deskDemo } from "@/lib/desk-demo";
import { getDictionary, hasLocale, localePath, locales } from "@/lib/i18n";
import { invoiceDemo } from "@/lib/invoice-demo";
import { landingCategory, landingCopy } from "@/lib/landing-copy";
import { ncrDemo } from "@/lib/ncr-demo";
import { quotesDemo } from "@/lib/quotes-demo";
import { site } from "@/lib/site";

/**
 * Ad landing pages, one per solution. Deliberately not part of the site: no
 * menu, no footer links, not in the sitemap, and `noindex` so they never
 * compete with /solutions/<product> in search. robots.txt must NOT block
 * them, or ad platforms cannot check the page and a crawler never sees the
 * noindex.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    productIds.map((product) => ({ lang, product })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/lp/[product]">): Promise<Metadata> {
  const { lang, product } = await params;
  if (!hasLocale(lang) || !isProductId(product)) notFound();
  const { seo } = getProduct(lang, product);
  return {
    title: seo.title,
    description: seo.description,
    // Replaces the layout's `index: true` robots object as a whole.
    robots: {
      index: false,
      follow: false,
      googleBot: { index: false, follow: false },
    },
    // The layout's canonical points at the home page; a landing page is not
    // an alternate of it.
    alternates: { canonical: localePath(lang, `/lp/${product}`) },
  };
}

type Demo = { heading: string; node: React.ReactNode } | null;

function landingDemo(lang: "en" | "es", id: ProductId): Demo {
  const ui = crmDemoUi[lang];
  switch (id) {
    case "talk-to-your-documents":
      return {
        heading: docsDemo[lang].heading,
        node: <DocsDemo demo={docsDemo[lang]} ui={ui} />,
      };
    case "quotes-rfqs":
      return {
        heading: quotesDemo[lang].heading,
        node: <QuotesDemo demo={quotesDemo[lang]} ui={ui} />,
      };
    case "employee-service-desk":
      return {
        heading: deskDemo[lang].heading,
        node: <DeskDemo demo={deskDemo[lang]} ui={ui} />,
      };
    case "invoice-bookkeeping":
      return {
        heading: invoiceDemo[lang].heading,
        node: <InvoiceDemo demo={invoiceDemo[lang]} ui={ui} />,
      };
    case "digitise-paperwork":
      return {
        heading: ncrDemo[lang].heading,
        node: <NcrDemo demo={ncrDemo[lang]} ui={ui} />,
      };
    case "talk-to-your-data":
      return {
        heading: dataDemo[lang].heading,
        node: <DataDemo demo={dataDemo[lang]} ui={ui} />,
      };
    default:
      return null;
  }
}

function demoAccent(lang: "en" | "es", id: ProductId): string | undefined {
  switch (id) {
    case "talk-to-your-documents":
      return docsDemo[lang].headingAccent;
    case "quotes-rfqs":
      return quotesDemo[lang].headingAccent;
    case "employee-service-desk":
      return deskDemo[lang].headingAccent;
    case "invoice-bookkeeping":
      return invoiceDemo[lang].headingAccent;
    case "digitise-paperwork":
      return ncrDemo[lang].headingAccent;
    case "talk-to-your-data":
      return dataDemo[lang].headingAccent;
    default:
      return undefined;
  }
}

export default async function LandingPage({
  params,
}: PageProps<"/[lang]/lp/[product]">) {
  const { lang, product: id } = await params;
  if (!hasLocale(lang) || !isProductId(id)) notFound();
  const dict = getDictionary(lang);
  const copy = landingCopy[lang];
  const item = getProduct(lang, id);
  const main = mainProblem(lang, id);
  const demo = landingDemo(lang, id);
  const path = `/lp/${id}`;

  return (
    <>
      <a className="skip-link" href="#main">
        {dict.common.skipLink}
      </a>
      <header className="lp-bar">
        <div className="shell lp-bar-inner">
          <Brand label={dict.common.brandLabel} href="#top" />
          <div className="lp-bar-end">
            <LanguageSwitcher
              lang={lang}
              copy={dict.languageSwitcher}
              path={path}
            />
            <SiteLink className="nav-cta lp-bar-cta" href="#book">
              {copy.ctaShort}
            </SiteLink>
          </div>
        </div>
      </header>
      <main id="main" className="lp-page product-page">
        <section className="home-hero lp-hero" aria-labelledby="lp-title">
          <div className="home-hero-glow" aria-hidden="true" />
          <div className="shell lp-hero-inner">
            <div className="lp-hero-copy">
              <h1 id="lp-title">{main.statement}</h1>
              <p className="lp-product">{item.name}</p>
              <p className="lp-lead">{item.lead}</p>
              {demo ? (
                <SiteLink className="lp-demo-link" href="#demo">
                  {copy.seeDemo} <ArrowDown size={18} aria-hidden="true" />
                </SiteLink>
              ) : null}
            </div>
            <div className="lp-form" id="book">
              <h2>{copy.formHeading}</h2>
              <p className="lp-note">{copy.note}</p>
              <ProcessBrief
                lang={lang}
                copy={dict.contact.form}
                email={site.email}
                defaultCategory={landingCategory[id]}
                compact
              />
            </div>
          </div>
        </section>

        {demo ? (
          <section
            className="demo-section"
            id="demo"
            aria-labelledby="demo-title"
          >
            <div className="shell">
              <div className="demo-head">
                <p className="demo-eyebrow">{crmDemoUi[lang].regionLabel}</p>
                <h2 id="demo-title">
                  <AccentHeading
                    text={demo.heading}
                    accent={demoAccent(lang, id)}
                  />
                </h2>
              </div>
              {demo.node}
            </div>
          </section>
        ) : null}

        {demo ? null : (
          <section className="shell lp-visual" aria-label={copy.exampleLabel}>
            <div className="sol-team-photo">
              <Media
                slot={item.media}
                text={dict.media[item.media]}
                sizes="(max-width: 1000px) 100vw, 640px"
                className="cat-media"
              />
            </div>
            <div className="sol-chat">
              <p>
                <Sparkles size={16} aria-hidden="true" />
                {item.prompt.question}
              </p>
              <p>
                <Check size={14} aria-hidden="true" />
                {item.prompt.reply}
              </p>
            </div>
          </section>
        )}

        <section className="lp-close" aria-labelledby="close-title">
          <div className="shell lp-close-inner">
            <div>
              <h2 id="close-title">{copy.closeHeading}</h2>
              <ul className="lp-points">
                {item.covers.slice(0, 3).map((text) => (
                  <li key={text}>
                    <Check size={18} aria-hidden="true" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
            <SiteLink className="pill pill-light" href="#book">
              {copy.cta} <ArrowRight size={18} aria-hidden="true" />
            </SiteLink>
          </div>
        </section>
      </main>
      <footer className="lp-foot">
        <div className="shell lp-foot-inner">
          <span>{dict.footer.copyright}</span>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <SiteLink href={localePath(lang, "/privacy")}>
            {copy.privacy}
          </SiteLink>
        </div>
      </footer>
    </>
  );
}
