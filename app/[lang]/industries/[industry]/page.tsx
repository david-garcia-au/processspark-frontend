import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Media } from "@/components/media";
import { ProblemCard } from "@/components/problem-card";
import { SiteLink } from "@/components/site-link";
import { IndustryStructuredData } from "@/components/structured-data";
import {
  industry as getIndustry,
  industries,
  industryIds,
  isIndustryId,
  product as getProduct,
  problemsForIndustry,
  productsForIndustry,
} from "@/lib/catalogue";
import { getDictionary, hasLocale, locales } from "@/lib/i18n";
import { pageMetadata } from "@/lib/page-metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    industryIds.map((industry) => ({ lang, industry })),
  );
}

export async function generateMetadata(
  { params }: PageProps<"/[lang]/industries/[industry]">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { lang, industry } = await params;
  if (!hasLocale(lang) || !isIndustryId(industry)) notFound();
  const { seo } = getIndustry(lang, industry).copy;
  return pageMetadata(parent, {
    lang,
    path: `/industries/${industry}`,
    ...seo,
  });
}

export default async function IndustryPage({
  params,
}: PageProps<"/[lang]/industries/[industry]">) {
  const { lang, industry: id } = await params;
  if (!hasLocale(lang) || !isIndustryId(id)) notFound();
  const dict = getDictionary(lang);
  const copy = dict.industryPage;
  const industry = getIndustry(lang, id);
  const { featured, more } = problemsForIndustry(lang, id);
  const offered = productsForIndustry(lang, id);
  const name = industry.copy.shortName;
  const spotlight = getProduct(lang, industry.spotlight);
  return (
    <>
      <IndustryStructuredData lang={lang} dict={dict} id={id} />
      <a className="skip-link" href="#main">
        {dict.common.skipLink}
      </a>
      <Header
        lang={lang}
        copy={dict.header}
        switcherCopy={dict.languageSwitcher}
        brandLabel={dict.common.brandLabel}
        mediaCopy={dict.media}
        page="industries"
        path={`/industries/${id}`}
        hasContact
      />
      <main id="main" className="sol-page industry-page">
        <section
          className="home-hero about-hero team-hero"
          aria-labelledby="industry-title"
        >
          <div className="home-hero-glow" aria-hidden="true" />
          <div className="shell home-hero-inner">
            <nav className="hero-breadcrumb" aria-label={copy.breadcrumbLabel}>
              <SiteLink href={`/${lang}/industries`}>
                {copy.breadcrumbRoot}
              </SiteLink>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{name}</span>
            </nav>
            <h1 id="industry-title">{industry.copy.heroTitle}</h1>
            <div className="home-hero-side">
              <p>{industry.copy.heroLead}</p>
              <ul className="hero-chips">
                <li>{industry.copy.whoFor}</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="shell cat-section" aria-labelledby="familiar-title">
          <div className="cat-split">
            <div>
              <h2 id="familiar-title" className="cat-heading">
                {copy.familiarHeading}
              </h2>
            </div>
            <Media
              slot={industry.media}
              text={dict.media[industry.media]}
              sizes="(max-width: 850px) 100vw, 420px"
              className="cat-media"
            />
          </div>
          <div className="problem-grid">
            {featured.map((item) => (
              <div className="problem-slot" key={item.id}>
                <ProblemCard
                  lang={lang}
                  problem={item}
                  copy={dict.problemCard}
                />
              </div>
            ))}
          </div>
        </section>

        <section className="shell cat-section" aria-labelledby="story-title">
          <h2 id="story-title" className="cat-heading">
            {industry.copy.story.heading}
          </h2>
          <ol className="cat-steps">
            {industry.story.map((productId, index) => {
              const step = industry.copy.story.steps[productId]!;
              const item = getProduct(lang, productId);
              return (
                <li key={productId}>
                  <span className="cat-step-number" aria-hidden="true">
                    {index + 1}
                  </span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                  <SiteLink className="text-link" href={item.href}>
                    {item.shortName}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </SiteLink>
                </li>
              );
            })}
          </ol>
        </section>

        <section className="shell cat-section" aria-labelledby="products-title">
          <h2 id="products-title" className="cat-heading">
            {copy.productsHeading.replace("{industry}", name)}
          </h2>
          <p className="cat-intro">{copy.productsIntro}</p>
          <ul className="cat-rows">
            {offered.map(({ product, example }) => (
              <li key={product.id}>
                <h3>
                  <SiteLink href={product.href}>{product.shortName}</SiteLink>
                </h3>
                <p>{example}</p>
                <SiteLink className="text-link" href={product.href}>
                  {copy.seeSolution}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </SiteLink>
              </li>
            ))}
          </ul>
        </section>

        <section
          className="shell cat-section cat-spotlight"
          aria-labelledby="spotlight-title"
        >
          <h2 id="spotlight-title" className="cat-heading">
            {industry.copy.spotlight.heading}
          </h2>
          <div className="cat-spotlight-body">
            {industry.copy.spotlight.paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
            <SiteLink className="text-link" href={spotlight.href}>
              {spotlight.shortName}
              <ArrowUpRight size={16} aria-hidden="true" />
            </SiteLink>
          </div>
        </section>

        {more.length > 0 ? (
          <section className="shell cat-section" aria-labelledby="more-title">
            <h2 id="more-title" className="cat-heading">
              {copy.moreHeading.replace("{industry}", name)}
            </h2>
            <ul className="cat-more">
              {more.map((item) => (
                <li key={item.id}>
                  <SiteLink href={getProduct(lang, item.products[0]).href}>
                    <span>{item.statement}</span>
                    <small>{getProduct(lang, item.products[0]).shortName}</small>
                  </SiteLink>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="shell cat-section" aria-labelledby="start-title">
          <h2 id="start-title" className="cat-heading">
            {copy.startHeading}
          </h2>
          <p className="cat-intro">{copy.startText}</p>
        </section>

        <ContactSection
          lang={lang}
          contact={dict.contact}
          heading={copy.contactHeading}
          text={copy.contactText}
        />

        <nav className="shell sol-others" aria-labelledby="other-industries">
          <h2 id="other-industries">{copy.othersHeading}</h2>
          <ul>
            {industries(lang)
              .filter((other) => other.id !== id)
              .map((other) => (
                <li key={other.id}>
                  <SiteLink href={other.href}>{other.copy.shortName}</SiteLink>
                </li>
              ))}
          </ul>
        </nav>
      </main>
      <Footer
        lang={lang}
        copy={dict.footer}
        switcherCopy={dict.languageSwitcher}
        brandLabel={dict.common.brandLabel}
        page="industries"
        path={`/industries/${id}`}
      />
    </>
  );
}
