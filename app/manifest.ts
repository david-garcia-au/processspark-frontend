import type { MetadataRoute } from "next";
import { getDictionary } from "@/lib/i18n";
import { site } from "@/lib/site";
import { palette } from "@/lib/theme";

export default function manifest(): MetadataRoute.Manifest {
  const { seo } = getDictionary("en");
  return {
    name: seo.title,
    short_name: site.name,
    description: seo.description,
    start_url: "/",
    display: "browser",
    background_color: palette.paper,
    theme_color: palette.paper,
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
