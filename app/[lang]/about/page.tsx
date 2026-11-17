import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowUpRight,
  Cloud,
  Factory,
  ScanEye,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { SiteLink, sectionHref } from "@/components/site-link";
import { AboutStructuredData } from "@/components/structured-data";
import { languageAlternates } from "@/lib/alternates";
import {
  getDictionary,
  hasLocale,
  localePath,
  locales,
  ogLocale,
} from "@/lib/i18n";
import { WorldMap } from "@/components/world-map";
import { phones, site } from "@/lib/site";

export const dynamicParams = false;

const aboutPath = "/about";

/** Pin positions for the world map: Madrid and Sydney. Labels come from `phones`. */
const mapPlaces = [
  { id: "ES", lat: 40.4, lon: -3.7 },
  { id: "AU", lat: -33.9, lon: 151.2 },
] as const;

const pillars = [
  ["manufacturing", Factory],
  ["medical", Stethoscope],
  ["critical", ShieldCheck],
  ["vision", ScanEye],
  ["cloud", Cloud],
] as const;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(
  { params }: PageProps<"/[lang]/about">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { aboutPage, footer } = getDictionary(lang);
  const url = localePath(lang, aboutPath);
  const locale = ogLocale[lang];
  // An `openGraph` or `twitter` object here replaces the layout's, so carry
  // over the share images the layout already resolved.
  const { openGraph: parentOg, twitter: parentTwitter } = await parent;
  return {
    // Absolute: the layout template would append " | ProcessSpark" to a title
    // that already names the company.
    title: { absolute: aboutPage.title },
    description: footer.lead,
    alternates: {
      canonical: url,
      languages: languageAlternates(aboutPath),
    },
    openGraph: {
      title: aboutPage.title,
      description: footer.lead,
      url,
      type: "website",
      siteName: site.name,
      ...(locale ? { locale } : {}),
      ...(parentOg?.images?.length ? { images: parentOg.images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: aboutPage.title,
      description: footer.lead,
      ...(parentTwitter?.images?.length
        ? { images: parentTwitter.images }
        : {}),
    },
  };
}

export default async function AboutPage({
  params,
}: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const { aboutPage, contact } = dict;
  return (
    <>
      <AboutStructuredData lang={lang} dict={dict} />
      <a className="skip-link" href="#main">
        {dict.common.skipLink}
      </a>
      <Header
        lang={lang}
        copy={dict.header}
        switcherCopy={dict.languageSwitcher}
        brandLabel={dict.common.brandLabel}
        page="about"
      />
      <main id="main" className="about-page">
        <section
          className="home-hero about-hero"
          aria-labelledby="about-title"
        >
          <div className="home-hero-glow" aria-hidden="true" />
          <div className="shell home-hero-inner">
            <h1 id="about-title">
              <span>{aboutPage.heading.line1}</span>{" "}
              <span>{aboutPage.heading.line2}</span>
            </h1>
            <div className="home-hero-side">
              <p>{aboutPage.text}</p>
            </div>
          </div>
        </section>
        <section
          className="shell about-statement"
          aria-labelledby="about-statement-title"
        >
          <h2 id="about-statement-title">
            {aboutPage.pillarsIntro.lead}{" "}
            <span className="about-accent">
              {aboutPage.pillarsIntro.accent}
            </span>
          </h2>
        </section>
        <section className="shell about-areas">
          <ul aria-label={aboutPage.pillarsLabel}>
            {pillars.map(([key, Icon]) => (
              <li key={key} data-area={key}>
                <span className="about-area-icon">
                  <Icon aria-hidden="true" />
                </span>
                <span className="about-area-title">
                  {aboutPage.pillars[key]}
                </span>
              </li>
            ))}
          </ul>
        </section>
        <section className="shell about-map" aria-labelledby="about-map-title">
          <h2 id="about-map-title">{aboutPage.mapHeading}</h2>
          <WorldMap
            label={aboutPage.mapLabel}
            places={mapPlaces.map((place) => ({
              ...place,
              label:
                phones.find((p) => p.region === place.id)?.label[lang] ??
                place.id,
            }))}
          />
        </section>
        <section className="about-cta">
          <div className="shell about-cta-inner">
            <div className="about-cta-text">
              <h2>{contact.signoff.strong}</h2>
              <p>{contact.signoff.line1}</p>
            </div>
            <SiteLink
              className="pill pill-light"
              href={sectionHref(lang, "about", "#contact")}
            >
              {contact.discoveryButton}{" "}
              <ArrowUpRight size={18} aria-hidden="true" />
            </SiteLink>
          </div>
        </section>
      </main>
      <Footer
        lang={lang}
        copy={dict.footer}
        switcherCopy={dict.languageSwitcher}
        brandLabel={dict.common.brandLabel}
        page="about"
      />
    </>
  );
}
