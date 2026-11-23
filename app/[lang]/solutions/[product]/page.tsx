import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Media } from "@/components/media";
import { DocsDemo } from "@/components/docs-demo";
import { QuotesDemo } from "@/components/quotes-demo";
import { quotesDemo } from "@/lib/quotes-demo";
import { ProblemCard } from "@/components/problem-card";
import { SiteLink } from "@/components/site-link";
import { ProductStructuredData } from "@/components/structured-data";
import { productFaq } from "@/lib/faq";
import {
  controlPattern,
  industriesForProduct,
  isProductId,
  mainProblem,
  product as getProduct,
  problemsForProduct,
  productIds,
  productsByGroup,
} from "@/lib/catalogue";
import { getDictionary, hasLocale, locales, localePath } from "@/lib/i18n";
import { pageMetadata } from "@/lib/page-metadata";
import { crmDemoUi, docsDemo } from "@/lib/crm-demo";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    productIds.map((product) => ({ lang, product })),
  );
}

export async function generateMetadata(
  { params }: PageProps<"/[lang]/solutions/[product]">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { lang, product } = await params;
  if (!hasLocale(lang) || !isProductId(product)) notFound();
  const { seo } = getProduct(lang, product);
  return pageMetadata(parent, {
    lang,
    path: `/solutions/${product}`,
    ...seo,
  });
}

export default async function ProductPage({
  params,
}: PageProps<"/[lang]/solutions/[product]">) {
  const { lang, product: id } = await params;
  if (!hasLocale(lang) || !isProductId(id)) notFound();
  const dict = getDictionary(lang);
  const copy = dict.productPage;
  const item = getProduct(lang, id);
  const main = mainProblem(lang, id);
  const problems = problemsForProduct(lang, id);
  const where = industriesForProduct(lang, id);
  const pattern = controlPattern(lang, item.control);
  const group = productsByGroup(lang).find((g) => g.id === item.group)!;
  const siblings = group.products.filter((p) => p.id !== id);
  const faq = productFaq(copy.faq, item);
  return (
    <>
      <ProductStructuredData lang={lang} dict={dict} id={id} />
      <a className="skip-link" href="#main">
        {dict.common.skipLink}
      </a>
      <Header
        lang={lang}
        copy={dict.header}
        switcherCopy={dict.languageSwitcher}
        brandLabel={dict.common.brandLabel}
        mediaCopy={dict.media}
        page="solutions"
        path={`/solutions/${id}`}
      />
      <main id="main" className="sol-page product-page">
        <section
          className="home-hero about-hero team-hero"
          aria-labelledby="product-title"
        >
          <div className="home-hero-glow" aria-hidden="true" />
          <div className="shell home-hero-inner">
            <nav className="hero-breadcrumb" aria-label={copy.breadcrumbLabel}>
              <SiteLink href={`/${lang}/solutions`}>
                {copy.breadcrumbRoot}
              </SiteLink>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{item.shortName}</span>
            </nav>
            <p className="product-lead-problem">{main.statement}</p>
            <h1 id="product-title">{item.name}</h1>
            <div className="home-hero-side">
              <p>{item.lead}</p>
            </div>
          </div>
        </section>

        {id === "talk-to-your-documents" ? (
          <section className="demo-section" id="demo" aria-labelledby="demo-title">
            <div className="shell">
              <div className="demo-head">
                <p className="demo-eyebrow">{crmDemoUi[lang].regionLabel}</p>
                <h2 id="demo-title">{docsDemo[lang].heading}</h2>
              </div>
              <DocsDemo demo={docsDemo[lang]} ui={crmDemoUi[lang]} />
            </div>
          </section>
        ) : null}
        {id === "quotes-rfqs" ? (
          <section className="demo-section" id="demo" aria-labelledby="demo-title">
            <div className="shell">
              <div className="demo-head">
                <p className="demo-eyebrow">{crmDemoUi[lang].regionLabel}</p>
                <h2 id="demo-title">{quotesDemo[lang].heading}</h2>
              </div>
              <QuotesDemo demo={quotesDemo[lang]} ui={crmDemoUi[lang]} />
            </div>
          </section>
        ) : null}

        <section className="shell sol-team sol-team-solo cat-section pp-what">
          <div className="sol-team-grid">
            <div className="pp-visual">
              <div className="sol-team-photo">
                <Media
                  slot={item.media}
                  text={dict.media[item.media]}
                  sizes="(max-width: 1000px) 100vw, 640px"
                  className="cat-media"
                />
              </div>
              <div className="sol-chat" aria-label={copy.illustrative}>
                <p>
                  <Sparkles size={16} aria-hidden="true" />
                  {item.prompt.question}
                </p>
                <p>
                  <Check size={14} aria-hidden="true" />
                  {item.prompt.reply}
                </p>
              </div>
            </div>
            <div className="sol-team-body">
              <h2 className="cat-heading" id="what-title">
                {copy.whatItDoesHeading}
              </h2>
              <ul className="cat-checks" aria-labelledby="what-title">
                {item.covers.map((text) => (
                  <li key={text}>{text}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <section className="pp-band" aria-labelledby="familiar-title">
          <div className="shell cat-section">
            <h2 id="familiar-title" className="cat-heading">
              {copy.familiarHeading}
            </h2>
            <div className="problem-grid">
              {problems.map((problem) => (
                <div className="problem-slot" key={problem.id}>
                  <ProblemCard
                    lang={lang}
                    problem={problem}
                    copy={dict.problemCard}
                    showIndustries
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="shell cat-section cat-two pp-facts" aria-labelledby="who-title">
          <div className="pp-panel pp-panel-dark">
            <h2 id="who-title" className="cat-heading">
              {copy.controlHeading}
            </h2>
            <p className="cat-lede">{pattern.title}</p>
            <p>{item.controlText}</p>
          </div>
          <div className="pp-panel pp-panel-light">
            <h2 className="cat-heading">{copy.whoForHeading}</h2>
            <p>{item.whoFor}</p>
          </div>
        </section>

        {where.length > 0 ? (
          <section
            className="shell cat-section"
            aria-labelledby="industries-title"
          >
            <h2 id="industries-title" className="cat-heading">
              {copy.industriesHeading}
            </h2>
            <ul className="cat-rows">
              {where.map(({ industry, example }) => (
                <li key={industry.id}>
                  <h3>
                    <SiteLink href={industry.href}>
                      {industry.copy.name}
                    </SiteLink>
                  </h3>
                  <p>{example}</p>
                  <SiteLink className="text-link" href={industry.href}>
                    {industry.copy.shortName}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </SiteLink>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="shell cat-section cat-two pp-next" aria-labelledby="first-title">
          <div>
            <h2 id="first-title" className="cat-heading">
              {copy.firstStepHeading}
            </h2>
            <p>{item.firstStep}</p>
          </div>
          {item.goodToKnow.length > 0 ? (
            <div>
              <h2 className="cat-heading">{copy.goodToKnowHeading}</h2>
              <ul className="cat-plain">
                {item.goodToKnow.map((text) => (
                  <li key={text}>{text}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>

        <section className="shell cat-section pp-works" aria-labelledby="works-title">
          <h2 id="works-title" className="cat-heading">
            {copy.worksWithHeading}
          </h2>
          <p className="cat-intro">{item.worksWith}</p>
          <ul className="cat-related">
            {item.related.map((relatedId) => {
              const other = getProduct(lang, relatedId);
              return (
                <li key={relatedId}>
                  <SiteLink href={other.href}>
                    {other.shortName}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </SiteLink>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="shell cat-section pp-faq" aria-labelledby="faq-title">
          <h2 id="faq-title" className="cat-heading">
            {copy.faq.heading}
          </h2>
          <div className="cat-faq">
            {faq.map((entry) => (
              <details key={entry.question}>
                <summary>{entry.question}</summary>
                <p>{entry.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {siblings.length > 0 ? (
          <nav className="shell sol-others" aria-labelledby="others-title">
            <h2 id="others-title">{copy.othersHeading}</h2>
            <ul>
              {siblings.map((other) => (
                <li key={other.id}>
                  <SiteLink href={other.href}>{other.shortName}</SiteLink>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
        <CtaBand
          heading={copy.contactHeading}
          text={copy.contactText}
          button={dict.contact.discoveryButton}
          href={`${localePath(lang)}#contact`}
        />
      </main>
      <Footer
        lang={lang}
        copy={dict.footer}
        switcherCopy={dict.languageSwitcher}
        brandLabel={dict.common.brandLabel}
        page="solutions"
        path={`/solutions/${id}`}
      />
    </>
  );
}
