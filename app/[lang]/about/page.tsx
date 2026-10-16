import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowUpRight,
  Cloud,
  Database,
  Factory,
  Ruler,
} from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { SiteLink, sectionHref } from "@/components/site-link";
import { AboutStructuredData } from "@/components/structured-data";
import { Button } from "@/components/ui/button";
import { languageAlternates } from "@/lib/alternates";
import {
  getDictionary,
  hasLocale,
  localePath,
  locales,
  ogLocale,
} from "@/lib/i18n";
import { site } from "@/lib/site";

export const dynamicParams = false;

const aboutPath = "/about";

const pillars = [
  ["manufacturing", Factory],
  ["engineering", Ruler],
  ["systems", Database],
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
      ...(parentTwitter?.images?.length ? { images: parentTwitter.images } : {}),
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
        <section className="shell about-intro">
          <div className="about-heading">
            <p className="eyebrow">{aboutPage.eyebrow}</p>
            <h1>{aboutPage.heading}</h1>
            <p className="about-lead">{dict.footer.lead}</p>
          </div>
          <p className="about-text">{aboutPage.text}</p>
        </section>
        <section className="shell about-pillars">
          <ul className="about-pillar-list" aria-label={aboutPage.pillarsLabel}>
            {pillars.map(([key, Icon]) => (
              <li className="about-pillar" key={key}>
                <span className="about-pillar-icon">
                  <Icon aria-hidden="true" />
                </span>
                <span className="about-pillar-title">
                  {aboutPage.pillars[key]}
                </span>
              </li>
            ))}
          </ul>
        </section>
        <section className="about-cta">
          <div className="shell about-cta-inner">
            <h2>
              <span>{contact.signoff.line1}</span>{" "}
              {contact.signoff.strong}
            </h2>
            <Button asChild className="button-primary">
              <SiteLink href={sectionHref(lang, "about", "#contact")}>
                {dict.header.cta} <ArrowUpRight size={18} />
              </SiteLink>
            </Button>
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
