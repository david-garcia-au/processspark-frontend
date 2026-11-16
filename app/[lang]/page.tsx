import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { TeamExplorer } from "@/components/team-explorer";
import { HeroTasks } from "@/components/hero-tasks";
import { TrustPanel } from "@/components/trust-panel";
import { ApproachJourney } from "@/components/approach-journey";
import { CapabilitySummary } from "@/components/capability-sections";
import { solutionsCopy } from "@/lib/solutions-copy";
import { teams } from "@/lib/teams";
import { ProcessBrief } from "@/components/process-brief";
import { StructuredData } from "@/components/structured-data";
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
  const { hero, contact } = dict;
  const english = lang === "en";
  const copy = solutionsCopy[lang];
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
      />
      <main id="main" className="home">
        <section className="home-hero" aria-labelledby="hero-title">
          <div className="home-hero-glow" aria-hidden="true" />
          <div className="shell home-hero-inner">
            <h1 id="hero-title">
              <span>{hero.title.line1}</span> <span>{hero.title.line2}</span>
            </h1>
            <div className="home-hero-side">
              <p>{hero.description}</p>
              <div className="home-hero-actions">
                <Button asChild className="pill pill-light">
                  <a href="#contact">
                    {hero.ctaPrimary} <ArrowUpRight size={18} aria-hidden="true" />
                  </a>
                </Button>
                <a className="pill pill-ghost" href={site.demoUrl}>
                  {hero.ctaSecondary}
                </a>
              </div>
            </div>
          </div>
          <HeroTasks lang={lang} />
        </section>

        <section className="home-statement shell" aria-labelledby="statement-title">
          <h2 id="statement-title">
            {english
              ? "We start from your process, not from the technology."
              : "Empezamos por tu proceso, no por la tecnología."}
          </h2>
          <p>
            {english
              ? "ProcessSpark comes from first-hand experience inside manufacturing businesses. We know the delays, the paperwork and the questions only one person can answer."
              : "ProcessSpark nace de la experiencia directa dentro de empresas de fabricación. Conocemos los retrasos, el papeleo y las preguntas que solo una persona sabe responder."}
          </p>
          <p className="home-sectors">
            {Object.values(dict.band.sectors).join(" · ")}
          </p>
        </section>

        <section className="home-section shell" id="problems" aria-labelledby="teams-title">
          <span id="use-cases" className="anchor-alias" />
          <h2 id="teams-title" className="home-heading">
            {copy.homeTeamsHeading}
          </h2>
          <TeamExplorer teams={teams[lang]} lang={lang} />
        </section>

        <section
          className="home-section shell"
          id="capabilities"
          aria-labelledby="capabilities-title"
        >
          <h2 id="capabilities-title" className="home-heading">
            {copy.homeCapabilitiesHeading}
          </h2>
          <CapabilitySummary lang={lang} />
        </section>

        <TrustPanel lang={lang} />

        <ApproachJourney lang={lang} />

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
