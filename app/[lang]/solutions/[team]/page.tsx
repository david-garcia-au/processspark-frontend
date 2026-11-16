import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { SiteLink, sectionHref } from "@/components/site-link";
import { languageAlternates } from "@/lib/alternates";
import Image from "next/image";
import { CapabilityVignette } from "@/components/capability-vignettes";
import { capabilities } from "@/lib/capabilities";
import { teamImageSrc } from "@/lib/team-images";
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
  const capabilityById = Object.fromEntries(
    capabilities[lang].map((item) => [item.id, item]),
  );
  // The shared ideas this team's cases use, in the order they first appear.
  const usedIds = [
    ...new Set(team.cases.flatMap((item) => item.capability ?? [])),
  ];

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
      <main id="main" className="sol-page">
        <section
          className="home-hero about-hero team-hero"
          aria-labelledby="team-title"
        >
          <div className="home-hero-glow" aria-hidden="true" />
          <div className="shell home-hero-inner">
            <nav className="hero-breadcrumb" aria-label={copy.breadcrumbLabel}>
              <SiteLink href={localePath(lang, "/solutions")}>
                {dict.header.solutions}
              </SiteLink>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{team.label}</span>
            </nav>
            <h1 id="team-title">{team.problem}</h1>
            <div className="home-hero-side">
              <ul className="hero-chips">
                {team.examples.map((example) => (
                  <li key={example}>{example}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section
          className="sol-team sol-team-solo"
          aria-labelledby="cases-heading"
        >
          <div className="shell sol-team-grid">
            <div className="sol-team-photo" aria-hidden="true">
              <Image
                src={teamImageSrc(team.id)}
                alt=""
                fill
                sizes="(max-width: 1000px) 100vw, 520px"
                priority
              />
              <div className="sol-chat">
                <p>
                  <Sparkles size={16} />
                  {team.prompt.question}
                </p>
                <p>
                  <Check size={14} />
                  {team.prompt.reply}
                </p>
              </div>
            </div>
            <div className="sol-team-body">
              <h2 id="cases-heading">{copy.casesHeading}</h2>
              <ul className="sol-cases">
                {team.cases.map((item) => (
                  <li key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    {item.capability ? (
                      <SiteLink
                        className="sol-chip"
                        href={`${localePath(lang, "/solutions")}#${item.capability}`}
                      >
                        {capabilityById[item.capability].title}
                      </SiteLink>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {usedIds.length ? (
          <section className="shell sol-caps" aria-labelledby="related-heading">
            <h2 id="related-heading">{copy.relatedHeading}</h2>
            <div className="sol-cap-list">
              {usedIds.map((id) => {
                const item = capabilityById[id];
                return (
                  <article
                    key={id}
                    className="sol-cap"
                    data-cap={id}
                    aria-labelledby={`${id}-title`}
                  >
                    <div className="sol-cap-text">
                      <h3 id={`${id}-title`}>{item.title}</h3>
                      <p className="sol-cap-headline">{item.headline}</p>
                      <p>{item.text}</p>
                      <SiteLink
                        className="sol-cap-link"
                        href={`${localePath(lang, "/solutions")}#${id}`}
                      >
                        {copy.readMore}
                        <ArrowUpRight size={16} aria-hidden="true" />
                      </SiteLink>
                    </div>
                    <div className="sol-cap-art">
                      <CapabilityVignette id={id} lang={lang} />
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ) : null}

        <nav className="shell sol-others" aria-labelledby="other-teams-heading">
          <h2 id="other-teams-heading">{copy.otherTeams}</h2>
          <ul>
            {teams[lang]
              .filter((other) => other.id !== team.id)
              .map((other) => (
                <li key={other.id}>
                  <SiteLink href={localePath(lang, `/solutions/${other.id}`)}>
                    {other.label}
                  </SiteLink>
                </li>
              ))}
          </ul>
        </nav>

        <section className="about-cta">
          <div className="shell about-cta-inner">
            <h2>
              <span>{dict.solutionsPage.closing.heading}</span>{" "}
              {dict.solutionsPage.closing.text}
            </h2>
            <SiteLink
              className="pill pill-light"
              href={sectionHref(lang, "solutions", "#contact")}
            >
              {dict.header.demo} <ArrowUpRight size={18} aria-hidden="true" />
            </SiteLink>
          </div>
        </section>
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
