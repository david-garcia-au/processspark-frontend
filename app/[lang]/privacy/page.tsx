import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { CookieSettingsButton } from "@/components/cookie-settings-button";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
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

const privacyPath = "/privacy";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(
  { params }: PageProps<"/[lang]/privacy">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { privacyPage } = getDictionary(lang);
  const url = localePath(lang, privacyPath);
  const locale = ogLocale[lang];
  // An `openGraph` or `twitter` object here replaces the layout's, so carry
  // over the share images the layout already resolved.
  const { openGraph: parentOg, twitter: parentTwitter } = await parent;
  return {
    title: privacyPage.title,
    description: privacyPage.intro,
    alternates: {
      canonical: url,
      languages: languageAlternates(privacyPath),
    },
    openGraph: {
      title: privacyPage.title,
      description: privacyPage.intro,
      url,
      type: "website",
      siteName: site.name,
      ...(locale ? { locale } : {}),
      ...(parentOg?.images?.length ? { images: parentOg.images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: privacyPage.title,
      description: privacyPage.intro,
      ...(parentTwitter?.images?.length
        ? { images: parentTwitter.images }
        : {}),
    },
  };
}

export default async function PrivacyPage({
  params,
}: PageProps<"/[lang]/privacy">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const { privacyPage: page, footer } = dict;
  const { cookieTable: table } = page;
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
        page="privacy"
        path={privacyPath}
      />
      <main id="main" className="shell privacy-page">
        <h1>{page.heading}</h1>
        <p className="privacy-meta">
          {page.updatedLabel}: {page.updated}
        </p>
        <p className="privacy-meta">{page.intro}</p>
        {page.sections.map((section) => (
          <section key={section.id} aria-labelledby={`privacy-${section.id}`}>
            <h2 id={`privacy-${section.id}`}>{section.heading}</h2>
            {section.paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
            {section.id === "cookies" && (
              <>
                <div
                  className="privacy-table-wrap"
                  role="region"
                  aria-label={table.label}
                  tabIndex={0}
                >
                  <table className="privacy-table">
                    <caption className="sr-only">{table.label}</caption>
                    <thead>
                      <tr>
                        <th scope="col">{table.columns.name}</th>
                        <th scope="col">{table.columns.purpose}</th>
                        <th scope="col">{table.columns.type}</th>
                        <th scope="col">{table.columns.duration}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {table.rows.map((row) => (
                        <tr key={row.name}>
                          <th scope="row">{row.name}</th>
                          <td>{row.purpose}</td>
                          <td>
                            {row.optional ? table.optional : table.necessary}
                          </td>
                          <td>{row.duration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <CookieSettingsButton label={footer.cookieSettings} />
              </>
            )}
            {section.id === "who" && (
              <p>
                {page.contactLabel}:{" "}
                <a className="text-link" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </p>
            )}
          </section>
        ))}
      </main>
      <Footer
        lang={lang}
        copy={footer}
        switcherCopy={dict.languageSwitcher}
        brandLabel={dict.common.brandLabel}
        page="privacy"
      />
    </>
  );
}
