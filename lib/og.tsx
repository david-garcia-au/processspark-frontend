import { ImageResponse } from "next/og";
import { getDictionary, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { palette } from "@/lib/theme";

export const socialImageSize = { width: 1200, height: 630 };

/** Brand mark for generated images (ImageResponse): the app/icon.svg bolt. */
export function BrandMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <rect width="64" height="64" rx="14" fill={palette.orange} />
      <path d="M35 9 15 35h15l-2 20 21-29H34z" fill={palette.forestDeep} />
    </svg>
  );
}

/** Open Graph / Twitter card artwork, with copy from the dictionary. */
export function renderSocialImage(locale: Locale) {
  const copy = getDictionary(locale).seo.socialImage;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: palette.forest,
          color: palette.onDark,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <BrandMark size={64} />
          <div style={{ display: "flex", fontSize: 44, fontWeight: 700 }}>
            {site.name}
            <span style={{ color: palette.orange }}>.</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              lineHeight: 1.08,
              fontWeight: 700,
              letterSpacing: -3,
            }}
          >
            {copy.line1}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              lineHeight: 1.08,
              fontWeight: 700,
              letterSpacing: -3,
              color: palette.orange,
            }}
          >
            {copy.line2}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 32,
              fontSize: 32,
              color: palette.onDarkSoft,
            }}
          >
            {copy.sub}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 3,
            color: palette.lime,
          }}
        >
          {copy.tagline}
        </div>
      </div>
    ),
    { ...socialImageSize },
  );
}
