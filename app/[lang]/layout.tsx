import type { Metadata, ResolvingMetadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Manrope } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ConsentBanner } from "@/components/consent-banner";
import { RumScript } from "@/components/rum-script";
import {
  defaultLocale,
  getDictionary,
  hasLocale,
  hreflang,
  htmlLang,
  localePath,
  locales,
  ogLocale,
  socialImagePath,
} from "@/lib/i18n";
import { absoluteUrl, site, siteUrl } from "@/lib/site";
import { palette } from "@/lib/theme";
import "../globals.css";
import "../transformation.css";
import "../media.css";
import "../footer.css";
import "../language-switcher.css";
import "../about.css";
import "../solutions.css";
import "../focused.css";
import "../home.css";
import "../journey.css";
import "../about-page.css";
import "../solutions-page.css";
import "../home-rhythm.css";
import "../resources-page.css";
import "../consent.css";
import "../catalogue.css";
import "../problem-explorer.css";
import "../solution-demo.css";
import "../crm-demo.css";
import "../quotes-demo.css";
import "../demo-gallery.css";
import "../problems-hub.css";
import "../home-type.css";
import "../product-page.css";

// Self-hosted at build time by next/font, no runtime request to Google.
const sans = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-brand",
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

type SocialImage = string | { url: string | URL };

function rerootImages(images: SocialImage[]): SocialImage[] {
  if (process.env.NODE_ENV !== "production") return images;
  const relative = (value: string | URL) => {
    const url = new URL(value);
    return url.pathname + url.search;
  };
  return images.map((image) =>
    typeof image === "string"
      ? relative(image)
      : { ...image, url: relative(image.url) },
  );
}

export async function generateMetadata(
  { params }: LayoutProps<"/[lang]">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { seo } = getDictionary(lang);
  // app/opengraph-image.tsx and app/twitter-image.tsx sit above this layout,
  // so they are already in `parent`. Returning an `openGraph` or `twitter`
  // object without `images` would drop them, so carry them over. They were
  // resolved without our metadataBase (hence a localhost origin); in
  // production, re-root them on metadataBase like Next does for file images.
  // Other locales have their own image (app/[lang]/social-image/route.tsx).
  const { openGraph: parentOg, twitter: parentTwitter } = await parent;
  const ownImage = [
    {
      url: absoluteUrl(socialImagePath(lang)),
      width: 1200,
      height: 630,
      alt: seo.socialImage.alt,
      type: "image/png",
    },
  ];
  const ogImages =
    lang !== defaultLocale
      ? { images: ownImage }
      : parentOg?.images?.length
        ? { images: rerootImages(parentOg.images) }
        : {};
  const twitterImages =
    lang !== defaultLocale
      ? { images: ownImage }
      : parentTwitter?.images?.length
        ? { images: rerootImages(parentTwitter.images) }
        : {};
  const locale = ogLocale[lang];
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: seo.title,
      template: `%s | ${site.name}`,
    },
    description: seo.description,
    applicationName: site.name,
    keywords: [...seo.keywords],
    authors: [{ name: site.name, url: siteUrl }],
    creator: site.name,
    publisher: site.name,
    category: "technology",
    alternates: {
      canonical: localePath(lang),
      // Every page lists all its language versions, itself included.
      languages: {
        ...Object.fromEntries(
          locales.map((l) => [hreflang[l], absoluteUrl(localePath(l))]),
        ),
        "x-default": absoluteUrl(localePath(defaultLocale)),
      },
    },
    openGraph: {
      title: seo.socialTitle,
      description: seo.socialDescription,
      url: localePath(lang),
      type: "website",
      siteName: site.name,
      ...(locale ? { locale } : {}),
      ...ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.socialTitle,
      description: seo.socialDescription,
      ...twitterImages,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    // Set GOOGLE_SITE_VERIFICATION / BING_SITE_VERIFICATION to emit the tags.
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
      other: process.env.BING_SITE_VERIFICATION
        ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
        : undefined,
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: palette.paper,
  colorScheme: "light",
};

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  return (
    <html
      lang={htmlLang[lang]}
      data-scroll-behavior="smooth"
      className={`${sans.variable} ${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body id="top">
        {/* First in the DOM so keyboard and screen-reader users meet the
            choice first; it is fixed to the bottom of the viewport by CSS. */}
        <ConsentBanner
          lang={lang}
          copy={dict.consent}
          brandLabel={dict.common.brandLabel}
        />
        {children}
        <RumScript />
      </body>
    </html>
  );
}
