import { getDictionary } from "@/lib/i18n";
import { renderSocialImage } from "@/lib/og";

export const alt = getDictionary("en").seo.socialImage.alt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return renderSocialImage("en");
}
