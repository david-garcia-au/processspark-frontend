import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { CollectionStructuredData } from "@/components/structured-data";
import { CtaBand } from "@/components/cta-band";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { SiteLink } from "@/components/site-link";
import {
  anchorAliases,
  comparisons,
  industriesForProduct,
  mainProblem,
  productsByControl,
  productsByGroup,
} from "@/lib/catalogue";
import { getDictionary, hasLocale, localePath, locales } from "@/lib/i18n";
import { pageMetadata } from "@/lib/page-metadata";

export const dynamicParams = false;

const path = "/solutions";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(
  { params }: PageProps<"/[lang]/solutions">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { seo } = getDictionary(lang).solutionsPage;
  return pageMetadata(parent, { lang, path, ...seo });
}

export default async function SolutionsPage({
  params,
}: PageProps<"/[lang]/solutions">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const copy = dict.solutionsPage;
  const aliases = anchorAliases();
  const groups = productsByGroup(lang);
  const alias = (key: string) =>
    (aliases[key] ?? []).map((id) => (
      <span key={id} id={id} className="anchor-alias" />
    ));
  return (
    <>
      <CollectionStructuredData lang={lang} dict={dict} kind="solutions" />
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
      />
      <main id="main" className="sol-page solutions-index">
        <section
          className="home-hero about-hero"
          aria-labelledby="solutions-title"
        >
          <div className="home-hero-glow" aria-hidden="true" />
          <div className="shell home-hero-inner">
            <h1 id="solutions-title">{copy.heading}</h1>
            <div className="home-hero-side">
              <p>{copy.summary}</p>
            </div>
          </div>
        </section>
        {alias("groups")}
        <nav className="shell sol-nav" aria-label={copy.groupNavLabel}>
          <ul>
            {groups.map((group) => (
              <li key={group.id}>
                <a href={`#${group.id}`}>{group.name}</a>
              </li>
            ))}
          </ul>
        </nav>
        {groups.map((group) => (
          <section
            key={group.id}
            id={group.id}
            className="shell cat-section"
            aria-labelledby={`${group.id}-title`}
          >
            <h2 id={`${group.id}-title`} className="cat-heading">
              {group.name}
            </h2>
            <p className="cat-intro">{group.intro}</p>
            <ul className="solution-cards">
              {group.products.map((item) => {
                const main = mainProblem(lang, item.id);
                const where = industriesForProduct(lang, item.id);
                return (
                  <li key={item.id} id={item.id} className="solution-card">
                    {alias(item.id)}
                    <h3>
                      <SiteLink href={item.href}>{item.name}</SiteLink>
                    </h3>
                    <p className="solution-card-problem">
                      <span>{copy.problemLabel}</span> {main.statement}
                    </p>
                    <p>{item.oneLine}</p>
                    {where.length > 0 ? (
                      <ul className="solution-card-chips">
                        <li className="solution-card-chips-label">
                          {copy.industriesLabel}
                        </li>
                        {where.map(({ industry }) => (
                          <li key={industry.id}>
                            <SiteLink href={industry.href}>
                              {industry.copy.shortName}
                            </SiteLink>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    <SiteLink className="text-link" href={item.href}>
                      {copy.seeSolution}
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </SiteLink>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
        <section
          id="compare"
          className="shell cat-section"
          aria-labelledby="compare-title"
        >
          <h2 id="compare-title" className="cat-heading">
            {copy.compareHeading}
          </h2>
          <p className="cat-intro">{copy.compareIntro}</p>
          <div className="cat-compare">
            {comparisons(lang).map((item) => (
              <article key={item.id}>
                <h3>{item.heading}</h3>
                <p>{item.text}</p>
                <ul>
                  {item.products.map((p) => (
                    <li key={p.id}>
                      <SiteLink href={p.href}>{p.shortName}</SiteLink>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
        <section
          id="control"
          className="shell cat-section"
          aria-labelledby="control-title"
        >
          <h2 id="control-title" className="cat-heading">
            {copy.controlHeading}
          </h2>
          <p className="cat-intro">{copy.controlIntro}</p>
          <div className="cat-compare">
            {productsByControl(lang).map((pattern) => (
              <article key={pattern.id}>
                <h3>{pattern.title}</h3>
                <p>{pattern.text}</p>
                <ul>
                  {pattern.products.map((p) => (
                    <li key={p.id}>
                      <SiteLink href={p.href}>{p.shortName}</SiteLink>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <SiteLink
            id="industries-link"
            className="text-link"
            href={localePath(lang, "/industries")}
          >
            {copy.industriesLink}
            <ArrowUpRight size={16} aria-hidden="true" />
          </SiteLink>
        </section>
        <CtaBand
          heading={copy.ctaHeading}
          text={copy.ctaText}
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
      />
    </>
  );
}
