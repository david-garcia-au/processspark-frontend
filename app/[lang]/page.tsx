import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  ProblemExplorer,
  type ExplorerItem,
} from "@/components/problem-explorer";
import { ProblemVisual } from "@/components/problem-visual";
import { TrustPanel } from "@/components/trust-panel";
import { ApproachJourney } from "@/components/approach-journey";
import { ProcessBrief } from "@/components/process-brief";
import { StructuredData } from "@/components/structured-data";
import { TeamExplorer } from "@/components/team-explorer";
import { homeTeams } from "@/lib/home-teams";
import { HeroTasks } from "@/components/hero-tasks";
import {
  industries,
  problem,
  product,
  productHref,
  selectorLists,
  selectorTitle,
  type FilterId,
  type ProductId,
} from "@/lib/catalogue";
import { getDictionary, hasLocale, locales } from "@/lib/i18n";
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
  const filterIds = ["all", ...list.map((i) => i.id)] as FilterId[];
  const lists = selectorLists();
  const views: Record<string, ExplorerItem[]> = {};
  const visuals: Record<string, ReactNode[]> = {};
  for (const filterId of filterIds) {
    // Within one view, show each product once where the problem allows it.
    const used = new Set<ProductId>();
    views[filterId] = [];
    visuals[filterId] = [];
    for (const id of lists[filterId]) {
      const p = problem(lang, id);
      const lead = p.products.find((x) => !used.has(x)) ?? p.products[0];
      used.add(lead);
      views[filterId].push({
        id: `${filterId}-${id}`,
        title: selectorTitle(lang, id),
        statement: p.statement,
        change: p.change,
        products: p.products.map((x) => ({
          id: x,
          name: product(lang, x).shortName,
          href: productHref(lang, x),
        })),
      });
      visuals[filterId].push(
        <ProblemVisual
          key={`${filterId}-${id}`}
          product={product(lang, lead)}
          question={p.statement}
          priority={filterId === "all" && visuals[filterId].length === 0}
        />,
      );
    }
  }
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
            <p className="home-hero-kicker">{hero.kicker}</p>
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
            <div className="home-hero-aside">
              <p className="home-hero-subhead">{hero.subtitle}</p>
              <p className="home-hero-sub">{hero.description}</p>
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
          <ProblemExplorer
            heading={homePage.selector.heading}
            views={views}
            visuals={visuals}
            copy={{
              listLabel: homePage.selector.listLabel,
              explore: homePage.selector.explore,
              pause: homePage.selector.pause,
              play: homePage.selector.play,
            }}
          />
        </section>
        <section
          className="home-statement shell"
          aria-labelledby="statement-title"
        >
          <h2 id="statement-title">
            <span className="statement-line">{homePage.statement.title.line1}</span>{" "}
            <span className="statement-line spark-text">{homePage.statement.title.line2}</span>
          </h2>
          <p>{homePage.statement.text}</p>
          <a className="pill button-primary home-statement-cta" href="#contact">
            {homePage.statement.cta}{" "}
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
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
        <div className="home-assure">
          <section className="about-cta" aria-labelledby="assure-cta-title">
            <div className="shell about-cta-inner">
              <div className="about-cta-text">
                <h2 id="assure-cta-title">{homePage.assureCta.heading}</h2>
                <p>{homePage.assureCta.text}</p>
              </div>
              <a className="pill pill-light" href="#contact">
                {contact.discoveryButton}{" "}
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
          </section>
          <TrustPanel lang={lang} />
        </div>
        <ApproachJourney copy={homePage.how} />
        <section id="contact" className="home-contact" aria-labelledby="contact-title">
          <div className="shell home-contact-panel">
            <div className="home-contact-copy">
              <h2 id="contact-title">{dict.header.cta}.</h2>
              <p>
                {english
                  ? "Where is repeated work costing you time, margin or opportunities? Bring us one example. We’ll explore what could improve and how to measure the difference."
                  : "¿Dónde te está costando tiempo, margen u oportunidades el trabajo repetido? Tráenos un ejemplo. Veremos qué se podría mejorar y cómo medir la diferencia."}
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
