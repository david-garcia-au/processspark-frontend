import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { CollectionStructuredData } from "@/components/structured-data";
import { CtaBand } from "@/components/cta-band";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Media } from "@/components/media";
import { SiteLink } from "@/components/site-link";
import {
  industries,
  problem,
  products,
  type IndustryId,
  type ProductId,
} from "@/lib/catalogue";
import { getDictionary, hasLocale, localePath, locales } from "@/lib/i18n";
import { pageMetadata } from "@/lib/page-metadata";

export const dynamicParams = false;

const path = "/industries";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(
  { params }: PageProps<"/[lang]/industries">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { seo } = getDictionary(lang).industriesPage;
  return pageMetadata(parent, { lang, path, ...seo });
}

export default async function IndustriesPage({
  params,
}: PageProps<"/[lang]/industries">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const copy = dict.industriesPage;
  const list = industries(lang);
  // Products offered to no industry are left out of the table.
  const rows = products(lang).filter((p) =>
    list.some((i) => i.products.includes(p.id)),
  );
  const example = (industry: IndustryId, id: ProductId) =>
    list.find((i) => i.id === industry)?.copy.examples[id];
  return (
    <>
      <CollectionStructuredData lang={lang} dict={dict} kind="industries" />
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
      />
      <main id="main" className="sol-page industries-page">
        <section
          className="home-hero about-hero"
          aria-labelledby="industries-title"
        >
          <div className="home-hero-glow" aria-hidden="true" />
          <div className="shell home-hero-inner">
            <h1 id="industries-title">{copy.heading}</h1>
            <div className="home-hero-side">
              <p>{copy.summary}</p>
            </div>
          </div>
        </section>
        <section className="shell industry-cards" aria-label={copy.heading}>
          <ul>
            {list.map((industry) => (
              <li key={industry.id} className="industry-card">
                <Media
                  slot={industry.media}
                  text={dict.media[industry.media]}
                  sizes="(max-width: 850px) 100vw, 360px"
                />
                <h2>{industry.copy.name}</h2>
                <p>{industry.copy.whoFor}</p>
                <ul className="industry-card-problems">
                  {industry.featuredProblems.slice(0, 3).map((id) => (
                    <li key={id}>{problem(lang, id).statement}</li>
                  ))}
                </ul>
                <SiteLink className="text-link" href={industry.href}>
                  {copy.seeIndustry.replace("{name}", industry.copy.shortName)}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </SiteLink>
              </li>
            ))}
          </ul>
        </section>
        <section className="shell industry-table" aria-labelledby="table-title">
          <h2 id="table-title">{copy.tableHeading}</h2>
          <p className="industry-table-intro">{copy.tableIntro}</p>
          <table className="industry-grid">
            <thead>
              <tr>
                <th scope="col">{copy.tableSolution}</th>
                {list.map((industry) => (
                  <th scope="col" key={industry.id}>
                    <SiteLink href={industry.href}>
                      {industry.copy.shortName}
                    </SiteLink>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <th scope="row">
                    <SiteLink href={row.href}>{row.shortName}</SiteLink>
                  </th>
                  {list.map((industry) => (
                    <td key={industry.id}>
                      {example(industry.id, row.id) ?? (
                        <span className="industry-grid-none">
                          {copy.notOffered}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="industry-stack">
            {list.map((industry) => (
              <section key={industry.id} className="industry-stack-card">
                <h3>
                  <SiteLink href={industry.href}>
                    {industry.copy.shortName}
                  </SiteLink>
                </h3>
                <dl>
                  {industry.products.map((id) => {
                    const item = rows.find((r) => r.id === id)!;
                    return (
                      <div key={id}>
                        <dt>
                          <SiteLink href={item.href}>{item.shortName}</SiteLink>
                        </dt>
                        <dd>{industry.copy.examples[id]}</dd>
                      </div>
                    );
                  })}
                </dl>
              </section>
            ))}
          </div>
        </section>
        <section className="shell hub-note" aria-labelledby="industries-more">
          <h2 id="industries-more" className="sr-only">
            {copy.notListed}
          </h2>
          <p>{copy.notListed}</p>
        </section>
        <CtaBand
          heading={copy.ctaHeading}
          text={dict.contact.signoff.line1}
          button={dict.contact.discoveryButton}
          href={`${localePath(lang)}#contact`}
        />
      </main>
      <Footer
        lang={lang}
        copy={dict.footer}
        switcherCopy={dict.languageSwitcher}
        brandLabel={dict.common.brandLabel}
        page="industries"
      />
    </>
  );
}
