import { defaultLocale, hasLocale, locales } from "@/lib/i18n";
import { renderSocialImage } from "@/lib/og";

// Social image for every locale except the default one, whose image stays at
// /opengraph-image (app/opengraph-image.tsx) so its URL never changes.
export const dynamicParams = false;

export function generateStaticParams() {
  return locales
    .filter((lang) => lang !== defaultLocale)
    .map((lang) => ({ lang }));
}

export async function GET(
  _request: Request,
  { params }: RouteContext<"/[lang]/social-image">,
) {
  const { lang } = await params;
  if (!hasLocale(lang) || lang === defaultLocale) {
    return new Response("Not found", { status: 404 });
  }
  return renderSocialImage(lang);
}
