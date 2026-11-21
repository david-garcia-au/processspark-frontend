import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ProblemCard } from "@/components/problem-card";
import { ProblemSelector } from "@/components/problem-selector";
import { SiteLink } from "@/components/site-link";
import { TrustPanel } from "@/components/trust-panel";
import { ApproachJourney } from "@/components/approach-journey";
import { ProcessBrief } from "@/components/process-brief";
import { StructuredData } from "@/components/structured-data";
import { TeamExplorer } from "@/components/team-explorer";
import { homeTeams } from "@/lib/home-teams";
import { HeroTasks } from "@/components/hero-tasks";
import { IndustryIcon } from "@/components/industry-icon";
import {
  industries,
  problem,
  productsByGroup,
  selectorLists,
  selectorProblemIds,
  type ProblemId,
} from "@/lib/catalogue";
import { getDictionary, hasLocale, localePath, locales } from "@/lib/i18n";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const { hero, contact, homePage } = dict;
  const english = lang === "en";
  const list = industries(lang);
  const cards: Partial<Record<ProblemId, ReactNode>> = Object.fromEntries(
    selectorProblemIds().map((id) => [
      id,
      <ProblemCard
        key={id}
        lang={lang}
        problem={problem(lang, id)}
        copy={dict.problemCard}
      />,
    ]),
  );
  return (
    <>
      <StructuredData lang={lang} dict={dict} />
      <a className="skip-link" href="#main">
        {dict.common.skipLink}
      </a>
      <Header
        lang={lang}
        copy={dict.header}
        switcherCopy={dict.languageSwitcher}
        brandLabel={dict.common.brandLabel}
        mediaCopy={dict.media}
      />
      <main id="main" className="home">
        <section
          className="home-hero home-hero-landing"
          aria-labelledby="hero-title"
        >
          <div className="home-hero-glow" aria-hidden="true" />
          <div className="shell home-hero-inner">
            <h1 id="hero-title">{hero.title}</h1>
            <p className="home-hero-subhead">{hero.subtitle}</p>
            <p className="home-hero-sub">{hero.description}</p>
            <div className="home-picker">
              <h2 className="home-picker-label">{hero.pickerLabel}</h2>
              <ul>
                {list.map((industry) => (
                  <li key={industry.id}>
                    <SiteLink href={industry.href} className="home-picker-card">
                      <span className="home-picker-icon" aria-hidden="true">
                        <IndustryIcon name={industry.icon} size={22} />
                      </span>
                      <span className="home-picker-text">
                        <strong>{industry.copy.shortName}</strong>
                        <small>{industry.copy.menuHint}</small>
                      </span>
                      <ArrowUpRight size={18} aria-hidden="true" />
                    </SiteLink>
                  </li>
                ))}
              </ul>
              <a className="home-picker-else" href="#problems">
                {hero.pickerElse} <span aria-hidden="true">↓</span>
              </a>
            </div>
            <div className="home-hero-actions">
              <Button asChild className="pill pill-light">
                <a href="#problems">
                  {hero.ctaPrimary}{" "}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              </Button>
              <a className="pill pill-ghost" href={site.demoUrl}>
                {hero.ctaSecondary}
              </a>
            </div>
          </div>
          <HeroTasks lang={lang} />
        </section>
        <section
          className="home-section shell home-selector"
          id="problems"
          aria-labelledby="problems-title"
        >
          <span id="use-cases" className="anchor-alias" />
          <h2 id="problems-title" className="home-heading">
            {homePage.selector.heading}
          </h2>
          <p className="home-selector-intro">{homePage.selector.intro}</p>
          <ProblemSelector
            filters={[
              { id: "all", label: homePage.selector.filterAll },
              ...list.map((industry) => ({
                id: industry.id,
                label: industry.copy.shortName,
                href: industry.href,
              })),
            ]}
            cards={cards}
            layout={{ kind: "list", views: selectorLists() }}
            copy={{
              groupLabel: homePage.selector.filterLabel,
              liveAll: homePage.selector.liveAll,
              liveIndustry: homePage.selector.liveIndustry,
              seeIndustry: homePage.selector.seeIndustry,
            }}
            seeAll={{
              href: localePath(lang, "/problems"),
              label: homePage.selector.seeAll,
            }}
          />
        </section>
        <section
          className="home-section shell home-pieces"
          id="capabilities"
          aria-labelledby="capabilities-title"
        >
          <h2 id="capabilities-title" className="home-heading">
            {homePage.pieces.heading}
          </h2>
          <p className="home-selector-intro">{homePage.pieces.intro}</p>
          <ol className="pieces-groups">
            {productsByGroup(lang).map((group) => (
              <li key={group.id}>
                <h3>{group.name}</h3>
                <p>{group.intro}</p>
                <ul>
                  {group.products.map((item) => (
                    <li key={item.id}>
                      <SiteLink href={item.href}>
                        {item.shortName}
                        <ArrowUpRight size={15} aria-hidden="true" />
                      </SiteLink>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          <SiteLink
            className="text-link"
            href={localePath(lang, "/solutions")}
          >
            {homePage.pieces.seeAll}
            <ArrowUpRight size={16} aria-hidden="true" />
          </SiteLink>
        </section>
        <section
          className="home-statement shell"
          aria-labelledby="statement-title"
        >
          <h2 id="statement-title">{homePage.statement.title}</h2>
          <p>{homePage.statement.text}</p>
          <p className="home-sectors">
            {list.map((industry) => industry.copy.name).join(" · ")}
          </p>
        </section>
        <section
          className="home-section shell"
          id="teams"
          aria-labelledby="teams-title"
        >
          <h2 id="teams-title" className="home-heading">
            {homePage.teamsHeading}
          </h2>
          <TeamExplorer teams={homeTeams[lang]} lang={lang} />
        </section>
        <TrustPanel lang={lang} />
        <ApproachJourney copy={homePage.how} />
        <section className="about-cta">
          <div className="shell about-cta-inner">
            <div className="about-cta-text">
              <h2>{contact.signoff.strong}</h2>
              <p>{contact.signoff.line1}</p>
            </div>
            <a className="pill pill-light" href="#contact">
              {contact.discoveryButton}{" "}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </section>
        <section id="contact" className="home-contact" aria-labelledby="contact-title">
          <div className="shell home-contact-panel">
            <div className="home-contact-copy">
              <h2 id="contact-title">{dict.header.cta}.</h2>
              <p>
                {english
                  ? "Bring us one process that creates delays, repeated work or unanswered questions. We’ll identify a suitable first use case, the information it needs and how success could be measured."
                  : "Cuéntanos un proceso que genere retrasos, trabajo repetido o preguntas sin respuesta. Identificaremos un primer caso de uso, la información necesaria y cómo medir el éxito."}
              </p>
            </div>
            <ProcessBrief lang={lang} copy={contact.form} email={site.email} />
          </div>
        </section>
      </main>
      <Footer
        lang={lang}
        copy={dict.footer}
        switcherCopy={dict.languageSwitcher}
        brandLabel={dict.common.brandLabel}
      />
    </>
  );
}
