import { capabilities, useCases } from "@/lib/content";
import type { Dictionary, Locale } from "@/lib/i18n";
import { hreflang, localePath, socialImagePath } from "@/lib/i18n";
import { absoluteUrl, site } from "@/lib/site";

const organizationId = absoluteUrl("/#organization");

/**
 * schema.org graph describing the organisation, the website and the home
 * page. Every value is derived from the dictionary and lib/content.ts so
 * structured data cannot drift from what visitors read.
 */
function buildGraph(lang: Locale, dict: Dictionary) {
  const { seo } = dict;
  const homeUrl = absoluteUrl(localePath(lang));
  // One id per language version of the site and page. The organisation is shared.
  const websiteId = absoluteUrl(`${localePath(lang)}#website`);
  const webpageId = absoluteUrl(`${localePath(lang)}#webpage`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: site.name,
        url: absoluteUrl("/"),
        description: seo.description,
        slogan: seo.tagline,
        email: site.email,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/icon.svg"),
        },
        image: absoluteUrl(socialImagePath(lang)),
        knowsAbout: seo.knowsAbout,
        audience: {
          "@type": "BusinessAudience",
          audienceType: seo.sectors.join(", "),
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: site.email,
          availableLanguage: ["en", "es"],
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: seo.jsonLd.offerCatalogName,
          itemListElement: useCases.map((item) => {
            const text = dict.useCases.items[item.id];
            return {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: text.title,
                description: text.text,
                serviceType: dict.capabilities.items[item.capability].name,
                category: text.sector,
                provider: { "@id": organizationId },
              },
            };
          }),
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: homeUrl,
        name: site.name,
        description: seo.description,
        inLanguage: hreflang[lang],
        publisher: { "@id": organizationId },
      },
      {
        "@type": "WebPage",
        "@id": webpageId,
        url: homeUrl,
        name: seo.title,
        description: seo.description,
        inLanguage: hreflang[lang],
        isPartOf: { "@id": websiteId },
        about: { "@id": organizationId },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: absoluteUrl(site.images[0].path),
          caption: seo.imageAlts[site.images[0].id],
        },
        mainEntity: {
          "@type": "ItemList",
          name: seo.jsonLd.itemListName,
          itemListElement: capabilities.map((item, index) => {
            const text = dict.capabilities.items[item.id];
            return {
              "@type": "ListItem",
              position: index + 1,
              name: text.name,
              description: `${text.question} ${text.detail} ${text.outcome}`,
            };
          }),
        },
      },
    ],
  };
}

/** The About page only; the organisation node lives in the home page graph. */
function buildAboutGraph(lang: Locale, dict: Dictionary) {
  const aboutUrl = absoluteUrl(localePath(lang, "/about"));
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${aboutUrl}#webpage`,
        url: aboutUrl,
        name: dict.aboutPage.title,
        description: dict.footer.lead,
        inLanguage: hreflang[lang],
        isPartOf: { "@id": absoluteUrl(`${localePath(lang)}#website`) },
        about: { "@id": organizationId },
      },
    ],
  };
}

function JsonLd({ graph }: { graph: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        // Escape "<" so content can never close the script tag.
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function StructuredData({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  return <JsonLd graph={buildGraph(lang, dict)} />;
}

export function AboutStructuredData({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  return <JsonLd graph={buildAboutGraph(lang, dict)} />;
}
