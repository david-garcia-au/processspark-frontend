import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/cta-band";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ResourcesGuides } from "@/components/resources-guides";
import { sectionHref } from "@/components/site-link";
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

const resourcesPath = "/resources";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(
  { params }: PageProps<"/[lang]/resources">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { resourcesPage } = getDictionary(lang);
  const url = localePath(lang, resourcesPath);
  const locale = ogLocale[lang];
  const { openGraph: parentOg, twitter: parentTwitter } = await parent;

  return {
    title: { absolute: resourcesPage.title },
    description: resourcesPage.description,
    alternates: {
      canonical: url,
      languages: languageAlternates(resourcesPath),
    },
    openGraph: {
      title: resourcesPage.title,
      description: resourcesPage.description,
      url,
      type: "website",
      siteName: site.name,
      ...(locale ? { locale } : {}),
      ...(parentOg?.images?.length ? { images: parentOg.images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: resourcesPage.title,
      description: resourcesPage.description,
      ...(parentTwitter?.images?.length
        ? { images: parentTwitter.images }
        : {}),
    },
  };
}

export default async function ResourcesPage({
  params,
}: PageProps<"/[lang]/resources">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

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
        page="resources"
      />
      <main id="main" className="res-page">
        <section
          className="home-hero about-hero"
          aria-labelledby="resources-title"
        >
          <div className="home-hero-glow" aria-hidden="true" />
          <div className="shell home-hero-inner">
            <h1 id="resources-title">{dict.resourcesPage.title}</h1>
            <div className="home-hero-side">
              <p>{dict.resourcesPage.intro}</p>
            </div>
          </div>
        </section>
        <section className="shell res-list">
          <ResourcesGuides copy={dict.resourcesPage} />
        </section>
        <CtaBand
          heading={dict.contact.signoff.strong}
          text={dict.contact.signoff.line1}
          button={dict.contact.discoveryButton}
          href={sectionHref(lang, "resources", "#contact")}
        />
      </main>
      <Footer
        lang={lang}
        copy={dict.footer}
        switcherCopy={dict.languageSwitcher}
        brandLabel={dict.common.brandLabel}
        page="resources"
      />
    </>
  );
}
