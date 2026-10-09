import type { MetadataRoute } from "next";
import { absoluteUrl, site } from "@/lib/site";

// Evaluated at build time, so lastModified is the date of the latest deploy.
const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      images: site.images.map((image) => absoluteUrl(image.path)),
    },
  ];
}
