import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { CollectionStructuredData } from "@/components/structured-data";
import { CtaBand } from "@/components/cta-band";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Media } from "@/components/media";
import { ProblemHub, type HubGroup } from "@/components/problem-hub";
import { SiteLink } from "@/components/site-link";
import {
  industries,
  problem,
  problemsByGroup,
  product,
  productHref,
} from "@/lib/catalogue";
import type { MediaSlot } from "@/lib/media";
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
  const every = industries(lang);
  const hubGroups: HubGroup[] = groups.map((g) => ({
    id: g.id,
    heading: g.heading,
    intro: g.intro,
    visual: (
      <Media
        slot={`problems-${g.id}` as MediaSlot}
        text={dict.media[`problems-${g.id}` as MediaSlot]}
        sizes="(max-width: 1000px) 100vw, 480px"
        className="ph-media"
      />
    ),
    problems: g.problemIds.map((id) => {
      const p = problem(lang, id);
      const where =
        p.industries.length === every.length
          ? [dict.problemCard.allIndustries]
          : every
              .filter((i) => p.industries.includes(i.id))
              .map((i) => i.copy.shortName);
      return {
        id,
        statement: p.statement,
        change: p.change,
        links: p.products.map((pid) => ({
          name: product(lang, pid).shortName,
          href: productHref(lang, pid),
        })),
        where: where.join(" · "),
      };
    }),
  }));
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
        <ProblemHub
          groups={hubGroups}
          members={members}
          filters={[
            { id: "all", label: copy.filterAll },
            ...every.map((industry) => ({
              id: industry.id,
              label: industry.copy.shortName,
              href: industry.href,
            })),
          ]}
          copy={{
            filterLabel: copy.filterLabel,
            liveAll: copy.liveAll,
            liveIndustry: copy.liveIndustry,
            seeIndustry: dict.homePage.selector.seeIndustry,
            whatChanges: dict.problemCard.whatChanges,
            seeSolution: dict.problemCard.seeSolution,
            industries: dict.problemCard.industries,
          }}
        />
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
