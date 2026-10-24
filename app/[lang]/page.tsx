import { notFound } from "next/navigation";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Check,
  Factory,
  Layers3,
  MoveUpRight,
  Truck,
  Wrench,
  Zap,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ProcessExplorer } from "@/components/process-explorer";
import { UseCaseTiles } from "@/components/use-case-tiles";
import {
  TransformationVisuals,
  VisionHero,
} from "@/components/transformation-visuals";
import { PhoneCards } from "@/components/phone-cards";
import { ProcessBrief } from "@/components/process-brief";
import { StructuredData } from "@/components/structured-data";
import { Media, type MediaText } from "@/components/media";
import {
  approachSteps,
  capabilities,
  pains,
  type CapabilityId,
} from "@/lib/content";
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
  const { hero, band, problems, capabilities: explorer, approach, contact } = dict;
  const explorerMedia = Object.fromEntries(
    capabilities.map((item) => [item.id, dict.media[`capability-${item.id}`]]),
  ) as Record<CapabilityId, MediaText>;
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
      <main id="main">
        <section className="hero">
          <div className="shell hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">
                <span className="orange-line" /> {hero.eyebrow}
              </p>
              <h1>
                <span>{hero.title.line1}</span>
                <span>{hero.title.line2}</span>
                <span className="orange">{hero.title.accent}</span>
              </h1>
              <p className="hero-description">{hero.description}</p>
              <div className="hero-actions">
                <Button asChild className="button-primary">
                  <a href="#contact">
                    {hero.ctaPrimary} <ArrowUpRight size={18} />
                  </a>
                </Button>
                <a className="text-link" href="https://demo.processspark.com/">
                  {hero.ctaSecondary} <ArrowDown size={16} />
                </a>
              </div>
              <p className="hero-reassurance">{hero.reassurance}</p>
            </div>
            <VisionHero copy={dict.transformation.hero} />
          </div>
        </section>
        <section className="business-band" aria-label={band.ariaLabel}>
          <div className="shell">
            <h2 className="business-promise">
              {band.promise.line1}
              <span>{band.promise.line2}</span>
            </h2>
            <div className="business-audience">
              <p className="business-intro">
                <span>{band.introLabel}</span>
                <strong>{band.introStrong}</strong>
              </p>
              <ul className="business-sectors" aria-label={band.sectorsLabel}>
                <li>
                  <Factory aria-hidden="true" />
                  <span className="sector-label">
                    {band.sectors.manufacturing}
                  </span>
                </li>
                <li>
                  <Layers3 aria-hidden="true" />
                  <span className="sector-label">
                    {band.sectors.engineering}
                  </span>
                </li>
                <li>
                  <Truck aria-hidden="true" />
                  <span className="sector-label">{band.sectors.logistics}</span>
                </li>
                <li>
                  <Boxes aria-hidden="true" />
                  <span className="sector-label">
                    {band.sectors.warehousing}
                  </span>
                </li>
                <li>
                  <Wrench aria-hidden="true" />
                  <span className="sector-label">
                    {band.sectors["industrial-services"]}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <TransformationVisuals copy={dict.transformation} />
        <section className="section shell" id="problems">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{problems.eyebrow}</p>
              <h2>{problems.heading}</h2>
            </div>
            <p>
              {problems.lead.line1} <br />
              {problems.lead.line2}
              <br className="desktop-break" /> {problems.lead.line3}
            </p>
          </div>
          <div className="pain-grid">
            {pains.map((pain, i) => {
              const text = problems.items[pain.id];
              return (
                <article className="pain-card" key={pain.id}>
                  <Media
                    slot={`pain-${pain.id}`}
                    text={dict.media[`pain-${pain.id}`]}
                    className="media-flush"
                    sizes="(max-width: 850px) 100vw, 33vw"
                  />
                  <div className="card-top">
                    <span className="eyebrow">{text.role}</span>
                    <span className="card-index">0{i + 1}</span>
                  </div>
                  <blockquote>{text.quote}</blockquote>
                  <p>{text.answer}</p>
                  <a href="#capabilities">
                    {text.tag}
                    <ArrowUpRight size={19} />
                  </a>
                </article>
              );
            })}
          </div>
          <div className="under-note">
            <span>{problems.underNote.lead}</span> {problems.underNote.text}
            <a href="#contact">
              {problems.underNote.link} <ArrowRight size={15} />
            </a>
          </div>
        </section>
        <section className="capabilities-section" id="capabilities">
          <div className="shell section">
            <div className="section-heading">
              <div>
                <p className="eyebrow">{explorer.eyebrow}</p>
                <h2>
                  {explorer.heading.line1} <br />
                  {explorer.heading.line2}
                </h2>
              </div>
              <p>{explorer.lead}</p>
            </div>
            <ProcessExplorer copy={explorer} mediaText={explorerMedia} />
          </div>
        </section>
        <section className="section shell" id="use-cases">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{dict.useCases.eyebrow}</p>
              <h2>{dict.useCases.heading}</h2>
            </div>
            <a className="text-link" href="#contact">
              {dict.useCases.link} <ArrowUpRight size={18} />
            </a>
          </div>
          <UseCaseTiles copy={dict.useCases} />
          <p className="section-note">{dict.useCases.note}</p>
        </section>
        <section className="approach-section" id="approach">
          <div className="shell section">
            <div className="approach-intro">
              <div>
                <p className="eyebrow">{approach.eyebrow}</p>
                <h2>
                  {approach.heading.line1} <br />
                  <span>{approach.heading.accent}</span>
                </h2>
              </div>
              <p>{approach.lead}</p>
            </div>
            <div className="approach-grid">
              {approachSteps.map((id, i) => (
                <article key={id}>
                  <Media
                    slot={`approach-${id}`}
                    text={dict.media[`approach-${id}`]}
                    tone="dark"
                    sizes="(max-width: 850px) 50vw, 20vw"
                  />
                  <span className="approach-number">0{i + 1}</span>
                  <h3>{approach.steps[id].title}</h3>
                  <p>{approach.steps[id].text}</p>
                </article>
              ))}
            </div>
            <div className="agnostic">
              <span>
                <Zap size={22} />
                <strong>{approach.agnostic.strong}</strong>
              </span>
              <p>{approach.agnostic.text}</p>
              <span className="agnostic-note">
                {approach.agnostic.note.line1} <br />
                {approach.agnostic.note.line2}
              </span>
            </div>
          </div>
        </section>
        <section id="contact" className="section shell contact-grid">
          <div className="contact-copy">
            <p className="eyebrow">{contact.eyebrow}</p>
            <h2>
              {contact.heading.line1} <br />
              {contact.heading.line2}{" "}
              <span className="orange">{contact.heading.accent}</span>
            </h2>
            <p>{contact.lead}</p>
            <div className="contact-photo">
              <Media
                slot="contact-team"
                text={dict.media["contact-team"]}
                className="contact-media"
              />
              <ul className="contact-photo-notes">
                <li>
                  <span className="vcheck">
                    <Check strokeWidth={3} />
                  </span>
                  {contact.notes.conversation}
                </li>
                <li>
                  <span className="vcheck">
                    <Check strokeWidth={3} />
                  </span>
                  {contact.notes.assessment}
                </li>
                <li>
                  <span className="vcheck">
                    <Check strokeWidth={3} />
                  </span>
                  {contact.notes.nextStep}
                </li>
              </ul>
            </div>
            <div className="contact-signoff">
              <MoveUpRight size={33} />
              <span>
                {contact.signoff.line1} <br />
                <strong>{contact.signoff.strong}</strong>
              </span>
            </div>
            <div className="contact-call">
              <p className="contact-call-label">{contact.phonePrompt}</p>
              <PhoneCards lang={lang} variant="light" />
            </div>
          </div>
          <ProcessBrief lang={lang} copy={contact.form} email={site.email} />
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
