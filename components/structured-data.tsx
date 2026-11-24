import {
  industries,
  industriesForProduct,
  problem,
  problemIds,
  productsByGroup,
  products,
  type IndustryId,
  type ProductId,
} from "@/lib/catalogue";
import type { Dictionary, Locale } from "@/lib/i18n";
import { productFaq } from "@/lib/faq";
import { hreflang, localePath, socialImagePath } from "@/lib/i18n";
import { absoluteUrl, defaultPhone, readyPhones, site, socialLinks } from "@/lib/site";

const organizationId = absoluteUrl("/#organization");

/** Page-level ids are built from the page URL, so they are unique per page. */
function pageNodes(lang: Locale, path: string) {
  const url = absoluteUrl(localePath(lang, path));
  return {
    url,
    websiteId: absoluteUrl(`${localePath(lang)}#website`),
    webpageId: `${url}#webpage`,
  };
}

function serviceNode(lang: Locale, id: ProductId) {
  const item = products(lang).find((p) => p.id === id)!;
  const url = absoluteUrl(item.href);
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name: item.name,
    description: item.oneLine,
    serviceType: item.groupName,
    provider: { "@id": organizationId },
    url,
  };
}

function breadcrumb(lang: Locale, trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: absoluteUrl(localePath(lang, entry.path)),
    })),
  };
}

/**
 * schema.org graph describing the organisation, the website and the home
 * page. Every value is derived from the catalogue and the dictionary, so
 * structured data cannot drift from what visitors read.
 */
function buildGraph(lang: Locale, dict: Dictionary) {
  const { seo } = dict;
  const homeUrl = absoluteUrl(localePath(lang));
  const { websiteId, webpageId } = pageNodes(lang, "/");
  const industryNames = industries(lang).map((i) => i.copy.name);
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
        sameAs: socialLinks.map((link) => link.url),
        telephone: defaultPhone().e164Dashed,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/icon.svg"),
        },
        image: absoluteUrl(socialImagePath(lang)),
        knowsAbout: products(lang).map((p) => p.name),
        audience: {
          "@type": "BusinessAudience",
          audienceType: industryNames.join(", "),
        },
        // One per ready number. areaServed only for region-specific numbers.
        contactPoint: readyPhones().map((phone) => ({
          "@type": "ContactPoint",
          contactType: "customer service",
          email: site.email,
          telephone: phone.e164Dashed,
          ...(phone.default ? {} : { areaServed: phone.region }),
          availableLanguage: ["en", "es"],
        })),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: seo.jsonLd.offerCatalogName,
          itemListElement: productsByGroup(lang).map((group) => ({
            "@type": "OfferCatalog",
            name: group.name,
            itemListElement: group.products.map((item) => ({
              "@type": "Offer",
              itemOffered: serviceNode(lang, item.id),
            })),
          })),
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
        mainEntity: {
          "@type": "ItemList",
          name: seo.jsonLd.itemListName,
          itemListElement: products(lang).map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            description: item.oneLine,
            url: absoluteUrl(item.href),
          })),
        },
      },
    ],
  };
}

function buildProductGraph(lang: Locale, dict: Dictionary, id: ProductId) {
  const item = products(lang).find((p) => p.id === id)!;
  const path = `/solutions/${id}`;
  const { url, websiteId, webpageId } = pageNodes(lang, path);
  const audience = industriesForProduct(lang, id).map((e) => e.industry.copy.name);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": webpageId,
        url,
        name: item.seo.title,
        description: item.seo.description,
        inLanguage: hreflang[lang],
        isPartOf: { "@id": websiteId },
        about: { "@id": `${url}#service` },
      },
      {
        ...serviceNode(lang, id),
        ...(audience.length
          ? {
              audience: {
                "@type": "BusinessAudience",
                audienceType: audience.join(", "),
              },
            }
          : {}),
      },
      breadcrumb(lang, [
        { name: dict.common.homeLabel, path: "/" },
        { name: dict.productPage.breadcrumbRoot, path: "/solutions" },
        { name: item.shortName, path },
      ]),
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        url,
        inLanguage: hreflang[lang],
        isPartOf: { "@id": webpageId },
        mainEntity: productFaq(dict.productPage.faq, item).map((entry) => ({
          "@type": "Question",
          name: entry.question,
          acceptedAnswer: { "@type": "Answer", text: entry.answer },
        })),
      },
    ],
  };
}

function buildIndustryGraph(lang: Locale, dict: Dictionary, id: IndustryId) {
  const item = industries(lang).find((i) => i.id === id)!;
  const path = `/industries/${id}`;
  const { url, websiteId, webpageId } = pageNodes(lang, path);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": webpageId,
        url,
        name: item.copy.seo.title,
        description: item.copy.seo.description,
        inLanguage: hreflang[lang],
        isPartOf: { "@id": websiteId },
        about: { "@type": "Thing", name: item.copy.name },
        mentions: item.products.map((p) => ({
          "@id": `${absoluteUrl(localePath(lang, `/solutions/${p}`))}#service`,
        })),
      },
      breadcrumb(lang, [
        { name: dict.common.homeLabel, path: "/" },
        { name: dict.industryPage.breadcrumbRoot, path: "/industries" },
        { name: item.copy.shortName, path },
      ]),
    ],
  };
}

type CollectionKind = "problems" | "industries" | "solutions";

function buildCollectionGraph(
  lang: Locale,
  dict: Dictionary,
  kind: CollectionKind,
) {
  const path = `/${kind}`;
  const { url, websiteId, webpageId } = pageNodes(lang, path);
  const page = {
    problems: dict.problemsPage,
    industries: dict.industriesPage,
    solutions: dict.solutionsPage,
  }[kind];
  const items =
    kind === "solutions"
      ? products(lang).map((p) => ({
          name: p.name,
          description: p.oneLine,
          url: absoluteUrl(p.href),
        }))
      : kind === "industries"
        ? industries(lang).map((i) => ({
            name: i.copy.name,
            description: i.copy.seo.description,
            url: absoluteUrl(i.href),
          }))
        : problemIds.map((id) => {
            const item = problem(lang, id);
            return {
              name: item.statement,
              description: item.change,
              url: absoluteUrl(
                localePath(lang, `/solutions/${item.products[0]}`),
              ),
            };
          });
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": webpageId,
        url,
        name: page.seo.title,
        description: page.seo.description,
        inLanguage: hreflang[lang],
        isPartOf: { "@id": websiteId },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            ...item,
          })),
        },
      },
      breadcrumb(lang, [
        { name: dict.common.homeLabel, path: "/" },
        { name: page.seo.title, path },
      ]),
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
        description: dict.aboutPage.description,
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

export function ProductStructuredData({
  lang,
  dict,
  id,
}: {
  lang: Locale;
  dict: Dictionary;
  id: ProductId;
}) {
  return <JsonLd graph={buildProductGraph(lang, dict, id)} />;
}

export function IndustryStructuredData({
  lang,
  dict,
  id,
}: {
  lang: Locale;
  dict: Dictionary;
  id: IndustryId;
}) {
  return <JsonLd graph={buildIndustryGraph(lang, dict, id)} />;
}

export function CollectionStructuredData({
  lang,
  dict,
  kind,
}: {
  lang: Locale;
  dict: Dictionary;
  kind: CollectionKind;
}) {
  return <JsonLd graph={buildCollectionGraph(lang, dict, kind)} />;
}
