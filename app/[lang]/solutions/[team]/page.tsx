import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { SiteLink, sectionHref } from "@/components/site-link";
import { languageAlternates } from "@/lib/alternates";
import { capabilities } from "@/lib/capabilities";
import {
  getDictionary,
  hasLocale,
  localePath,
  locales,
  ogLocale,
} from "@/lib/i18n";
import { site } from "@/lib/site";
import { solutionsCopy } from "@/lib/solutions-copy";
import { getTeam, teamIds, teams } from "@/lib/teams";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => teamIds.map((team) => ({ lang, team })));
}

export async function generateMetadata(
  { params }: PageProps<"/[lang]/solutions/[team]">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { lang, team: teamId } = await params;
  if (!hasLocale(lang)) notFound();
  const team = getTeam(lang, teamId);
  if (!team) notFound();
  const path = `/solutions/${team.id}`;
  const url = localePath(lang, path);
  const title = `${team.label} | ${site.name}`;
  const description = `${team.problem} ${team.examples.join(", ")}.`;
  const locale = ogLocale[lang];
  const { openGraph: parentOg, twitter: parentTwitter } = await parent;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: site.name,
      ...(locale ? { locale } : {}),
      ...(parentOg?.images?.length ? { images: parentOg.images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(parentTwitter?.images?.length
        ? { images: parentTwitter.images }
        : {}),
    },
  };
}

export default async function TeamPage({
  params,
}: PageProps<"/[lang]/solutions/[team]">) {
  const { lang, team: teamId } = await params;
  if (!hasLocale(lang)) notFound();
  const team = getTeam(lang, teamId);
  if (!team) notFound();
  const dict = getDictionary(lang);
  const copy = solutionsCopy[lang];
  const closing = dict.solutionsPage.closing;
  const capabilityTitles = Object.fromEntries(
    capabilities[lang].map((item) => [item.id, item.title]),
  );

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
        page="solutions"
        path={`/solutions/${team.id}`}
      />
      <main id="main" className="solutions-page team-page">
        <div className="shell">
          <nav className="breadcrumb" aria-label={copy.breadcrumbLabel}>
            <SiteLink href={localePath(lang, "/solutions")}>
              {dict.header.solutions}
            </SiteLink>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{team.label}</span>
          </nav>
          <h1>{team.problem}</h1>
          <ul className="team-examples">
            {team.examples.map((example) => (
              <li key={example}>{example}</li>
            ))}
          </ul>
          <section className="team-cases" aria-labelledby="cases-heading">
            <h2 id="cases-heading">{copy.casesHeading}</h2>
            {team.cases.map((item) => (
              <article className="solution-line" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                {item.capability ? (
                  <SiteLink
                    className="text-link"
                    href={`${localePath(lang, "/solutions")}#${item.capability}`}
                  >
                    {copy.readMore}: {capabilityTitles[item.capability]}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </SiteLink>
                ) : null}
              </article>
            ))}
          </section>
          <nav className="other-teams" aria-labelledby="other-teams-heading">
            <h2 id="other-teams-heading">{copy.otherTeams}</h2>
            <ul>
              {teams[lang]
                .filter((other) => other.id !== team.id)
                .map((other) => (
                  <li key={other.id}>
                    <SiteLink
                      href={localePath(lang, `/solutions/${other.id}`)}
                    >
                      {other.label}
                    </SiteLink>
                  </li>
                ))}
            </ul>
          </nav>
          <aside className="solutions-closing">
            <h2>{closing.heading}</h2>
            <p>{closing.text}</p>
            <SiteLink href={sectionHref(lang, "solutions", "#contact")}>
              {copy.cta} <ArrowUpRight size={16} aria-hidden="true" />
            </SiteLink>
          </aside>
        </div>
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
