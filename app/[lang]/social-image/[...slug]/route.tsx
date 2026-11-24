import {
  industries,
  industryIds,
  isIndustryId,
  isProductId,
  mainProblem,
  product as getProduct,
  productIds,
} from "@/lib/catalogue";
import { getDictionary, hasLocale, locales, type Locale } from "@/lib/i18n";
import { renderPageImage, type PageImageCopy } from "@/lib/og";

// One share card per catalogue page, in each language. The path after
// /social-image mirrors the page path: /en/social-image/solutions/quotes-rfqs
// is the card for /en/solutions/quotes-rfqs. lib/page-metadata.ts points the
// pages here.
export const dynamicParams = false;

const indexPages = ["problems", "industries", "solutions"] as const;

export function generateStaticParams() {
  return locales.flatMap((lang) => [
    ...indexPages.map((page) => ({ lang, slug: [page] })),
    ...productIds.map((id) => ({ lang, slug: ["solutions", id] })),
    ...industryIds.map((id) => ({ lang, slug: ["industries", id] })),
  ]);
}

function copyFor(lang: Locale, slug: string[]): PageImageCopy | null {
  const dict = getDictionary(lang);
  const [section, id] = slug;
  if (slug.length === 1) {
    if (section === "problems") {
      const { heading, seo } = dict.problemsPage;
      return { eyebrow: dict.header.links.problems, title: heading, line: seo.description };
    }
    if (section === "industries") {
      const { heading, seo } = dict.industriesPage;
      return { eyebrow: dict.header.links.problems, title: heading, line: seo.description };
    }
    if (section === "solutions") {
      const { heading, seo } = dict.solutionsPage;
      return { eyebrow: dict.header.solutions, title: heading, line: seo.description };
    }
  }
  if (slug.length === 2 && section === "solutions" && isProductId(id)) {
    const item = getProduct(lang, id);
    return {
      eyebrow: item.groupName,
      title: item.name,
      line: mainProblem(lang, id).statement,
    };
  }
  if (slug.length === 2 && section === "industries" && isIndustryId(id)) {
    const item = industries(lang).find((i) => i.id === id)!;
    return {
      eyebrow: dict.industriesPage.heading,
      title: item.copy.name,
      line: item.copy.whoFor,
    };
  }
  return null;
}

export async function GET(
  _request: Request,
  { params }: RouteContext<"/[lang]/social-image/[...slug]">,
) {
  const { lang, slug } = await params;
  const copy = hasLocale(lang) ? copyFor(lang, slug) : null;
  if (!copy) return new Response("Not found", { status: 404 });
  return renderPageImage(copy);
}
