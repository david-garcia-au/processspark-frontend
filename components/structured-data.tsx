import { capabilities, useCases } from "@/lib/content";
import { absoluteUrl, site } from "@/lib/site";

const organizationId = absoluteUrl("/#organization");
const websiteId = absoluteUrl("/#website");
const webpageId = absoluteUrl("/#webpage");

/**
 * schema.org graph describing the organisation, the website and the home
 * page. Every value is derived from existing site copy in lib/content.ts and
 * lib/site.ts so structured data cannot drift from what visitors read.
 */
const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: site.name,
      url: absoluteUrl("/"),
      description: site.description,
      slogan: site.tagline,
      email: site.email,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/icon.svg"),
      },
      image: absoluteUrl("/opengraph-image"),
      knowsAbout: site.knowsAbout,
      audience: {
        "@type": "BusinessAudience",
        audienceType: site.sectors.join(", "),
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: site.email,
        availableLanguage: "en",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Practical AI use cases",
        itemListElement: useCases.map((item) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: item.title,
            description: item.text,
            serviceType: item.capability,
            category: item.sector,
            provider: { "@id": organizationId },
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: absoluteUrl("/"),
      name: site.name,
      description: site.description,
      inLanguage: "en",
      publisher: { "@id": organizationId },
    },
    {
      "@type": "WebPage",
      "@id": webpageId,
      url: absoluteUrl("/"),
      name: site.title,
      description: site.description,
      inLanguage: "en",
      isPartOf: { "@id": websiteId },
      about: { "@id": organizationId },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: absoluteUrl(site.images[0].path),
        caption: site.images[0].alt,
      },
      mainEntity: {
        "@type": "ItemList",
        name: "Kinds of manual work ProcessSpark helps automate",
        itemListElement: capabilities.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          description: `${item.question} ${item.detail} ${item.outcome}`,
        })),
      },
    },
  ],
};

export function StructuredData() {
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
