import type { Metadata } from "next";
import { getDictionary, htmlLang } from "@/lib/i18n";
import { site, siteUrl } from "@/lib/site";
import "./globals.css";

// Used for every unmatched URL. The root layout sits under the [lang] segment,
// so a regular not-found page has no layout to render inside.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: getDictionary("en").seo.title,
  description: getDictionary("en").seo.description,
  applicationName: site.name,
  robots: { index: false },
};

export default function GlobalNotFound() {
  const copy = getDictionary("en").notFound;
  return (
    <html lang={htmlLang.en}>
      <body>
        <main
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: 24, fontWeight: 500, margin: 0 }}>
            {copy.title}
          </h1>
          <p style={{ marginTop: 12 }}>{copy.text}</p>
        </main>
      </body>
    </html>
  );
}
