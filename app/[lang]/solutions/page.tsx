import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { SiteLink, sectionHref } from "@/components/site-link";
import { SolutionCards } from "@/components/solution-cards";
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
      <main id="main" className="solutions-page">
        <div className="shell">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1>
            <span>{copy.heading.line1}</span>{" "}
            <span className="orange">{copy.heading.line2}</span>
          </h1>
          <SolutionCards copy={copy} />
          <aside className="solutions-closing">
            <h2>{copy.closing.heading}</h2>
            <p>{copy.closing.text}</p>
            <SiteLink href={sectionHref(lang, "solutions", "#contact")}>
              {dict.header.cta} <ArrowUpRight size={16} aria-hidden="true" />
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
