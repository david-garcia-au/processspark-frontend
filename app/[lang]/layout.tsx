import type { Metadata, ResolvingMetadata, Viewport } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
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

// AWS CloudWatch RUM web client: measures traffic to the main site.
const rumSnippet = `(function (n, i, v, r, s, c, u, x, z) {
  x = window.AwsRumClient = { q: [], n: n, i: i, v: v, r: r, c: c, u: u };
  window[n] = function (c, p) { x.q.push({ c: c, p: p }); };
  z = document.createElement('script');
  z.async = true;
  z.src = s;
  document.head.insertBefore(z, document.getElementsByTagName('script')[0]);
})(
  'cwr',
  '24d6e5f0-6ad4-4460-9038-a5681c63ac23',
  '1.0.0',
  'ap-southeast-2',
  'https://client.rum.us-east-1.amazonaws.com/3.x/cwr.js',
  {
    "sessionSampleRate": 1,
    "identityPoolId": "ap-southeast-2:dba2b7a6-5a81-4a49-8875-f5dcd5361ec9",
    "endpoint": "https://dataplane.rum.ap-southeast-2.amazonaws.com",
    "telemetries": ["errors", "performance", "http"],
    "allowCookies": true
  }
);`;

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <html lang={htmlLang[lang]} data-scroll-behavior="smooth">
      <body id="top">
        {children}
        <Script id="aws-rum" strategy="afterInteractive">
          {rumSnippet}
        </Script>
      </body>
    </html>
  );
}
