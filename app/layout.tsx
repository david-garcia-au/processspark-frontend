import type { Metadata, Viewport } from "next";
import { StructuredData } from "@/components/structured-data";
import { site, siteUrl } from "@/lib/site";
import { palette } from "@/lib/theme";
import "./globals.css";
import "./transformation.css";
import "./media.css";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [...site.keywords],
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: site.socialTitle,
    description: site.socialDescription,
    url: "/",
    type: "website",
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: site.socialTitle,
    description: site.socialDescription,
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
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: palette.paper,
  colorScheme: "light",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
