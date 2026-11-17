import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/cta-band";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { sectionHref } from "@/components/site-link";
import { CapabilitySections } from "@/components/capability-sections";
import { SolutionCards } from "@/components/solution-cards";
import { solutionsCopy } from "@/lib/solutions-copy";
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

const solutionsPath = "/solutions";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(
  { params }: PageProps<"/[lang]/solutions">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { solutionsPage } = getDictionary(lang);
  const url = localePath(lang, solutionsPath);
  const locale = ogLocale[lang];
  const { openGraph: parentOg, twitter: parentTwitter } = await parent;

  return {
    title: { absolute: solutionsPage.title },
    description: solutionsPage.description,
    alternates: {
      canonical: url,
      languages: languageAlternates(solutionsPath),
    },
    openGraph: {
      title: solutionsPage.title,
      description: solutionsPage.description,
      url,
      type: "website",
      siteName: site.name,
      ...(locale ? { locale } : {}),
      ...(parentOg?.images?.length ? { images: parentOg.images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: solutionsPage.title,
      description: solutionsPage.description,
      ...(parentTwitter?.images?.length
        ? { images: parentTwitter.images }
        : {}),
    },
  };
}

export default async function SolutionsPage({
  params,
}: PageProps<"/[lang]/solutions">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const copy = dict.solutionsPage;
  const contactHref = sectionHref(lang, "solutions", "#contact");

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
      />
      <main id="main" className="sol-page">
        <section
          className="home-hero about-hero"
          aria-labelledby="solutions-title"
        >
          <div className="home-hero-glow" aria-hidden="true" />
          <div className="shell home-hero-inner">
            <h1 id="solutions-title">
              <span>{copy.heading.line1}</span>{" "}
              <span>{copy.heading.line2}</span>
            </h1>
            <div className="home-hero-side">
              <p>{solutionsCopy[lang].summary}</p>
            </div>
          </div>
        </section>
        <SolutionCards
          lang={lang}
          bands={copy.bands}
          button={dict.contact.discoveryButton}
          contactHref={contactHref}
        />
        <CapabilitySections lang={lang} />
        <CtaBand
          heading={dict.contact.signoff.ask}
          text={dict.contact.signoff.line1}
          button={dict.contact.discoveryButton}
          href={contactHref}
        />
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
