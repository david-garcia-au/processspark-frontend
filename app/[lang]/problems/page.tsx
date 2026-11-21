import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { CollectionStructuredData } from "@/components/structured-data";
import { CtaBand } from "@/components/cta-band";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ProblemCard } from "@/components/problem-card";
import { ProblemSelector } from "@/components/problem-selector";
import { SiteLink } from "@/components/site-link";
import {
  industries,
  problem,
  problemIds,
  problemsByGroup,
  type ProblemId,
} from "@/lib/catalogue";
import { getDictionary, hasLocale, localePath, locales } from "@/lib/i18n";
import { pageMetadata } from "@/lib/page-metadata";

export const dynamicParams = false;

const path = "/problems";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(
  { params }: PageProps<"/[lang]/problems">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { seo } = getDictionary(lang).problemsPage;
  return pageMetadata(parent, { lang, path, ...seo });
}

export default async function ProblemsPage({
  params,
}: PageProps<"/[lang]/problems">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const copy = dict.problemsPage;
  const { groups, members } = problemsByGroup(lang);
  const cards: Partial<Record<ProblemId, ReactNode>> = Object.fromEntries(
    problemIds.map((id) => [
      id,
      <ProblemCard
        key={id}
        lang={lang}
        problem={problem(lang, id)}
        copy={dict.problemCard}
        hub
        showIndustries
      />,
    ]),
  );
  return (
    <>
      <CollectionStructuredData lang={lang} dict={dict} kind="problems" />
      <a className="skip-link" href="#main">
        {dict.common.skipLink}
      </a>
      <Header
        lang={lang}
        copy={dict.header}
        switcherCopy={dict.languageSwitcher}
        brandLabel={dict.common.brandLabel}
        mediaCopy={dict.media}
        page="problems"
      />
      <main id="main" className="sol-page hub-page">
        <section className="home-hero about-hero" aria-labelledby="hub-title">
          <div className="home-hero-glow" aria-hidden="true" />
          <div className="shell home-hero-inner">
            <h1 id="hub-title">{copy.heading}</h1>
            <div className="home-hero-side">
              <p>{copy.summary}</p>
            </div>
          </div>
        </section>
        <section className="shell hub-body" aria-label={copy.heading}>
          <ProblemSelector
            followHash
            filters={[
              { id: "all", label: copy.filterAll },
              ...industries(lang).map((industry) => ({
                id: industry.id,
                label: industry.copy.shortName,
                href: industry.href,
              })),
            ]}
            cards={cards}
            layout={{
              kind: "groups",
              groups: groups.map((group) => ({
                id: group.id,
                heading: (
                  <h2 className="hub-group-heading" id={`group-${group.id}`}>
                    {group.heading}
                  </h2>
                ),
                ids: group.problemIds,
              })),
              members,
            }}
            copy={{
              groupLabel: copy.filterLabel,
              liveAll: copy.liveAll,
              liveIndustry: copy.liveIndustry,
              seeIndustry: dict.homePage.selector.seeIndustry,
            }}
          />
        </section>
        <section className="shell hub-note" aria-labelledby="not-listed">
          <h2 id="not-listed">{copy.notListedHeading}</h2>
          <p>{copy.notListedText}</p>
          <SiteLink className="text-link" href={`${localePath(lang)}#contact`}>
            {dict.header.menu.notListed}
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
        page="problems"
      />
    </>
  );
}
