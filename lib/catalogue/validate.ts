import type { Locale } from "@/lib/i18n/config";
import type { CatalogueCopy } from "@/lib/catalogue/copy-types";
import type {
  ComparisonId,
  IconName,
  IndustryId,
  IndustryStructure,
  ProblemId,
  ProblemStructure,
  ProductGroupId,
  ProductId,
  ProductStructure,
} from "@/lib/catalogue/structure";

export type CatalogueStructure = {
  productIds: readonly ProductId[];
  productGroupIds: readonly ProductGroupId[];
  industryIds: readonly IndustryId[];
  problemIds: readonly ProblemId[];
  products: Record<ProductId, ProductStructure>;
  problems: Record<ProblemId, ProblemStructure>;
  industries: Record<IndustryId, IndustryStructure>;
  headlineProblems: readonly ProblemId[];
  homeProblems: readonly ProblemId[];
  heroTagIcons: readonly IconName[];
  comparisons: Record<ComparisonId, readonly ProductId[]>;
};

export type LegacyData = {
  teamRedirects: Record<string, string>;
  anchorAliases: Record<string, string>;
  reservedProductSlugs: readonly string[];
};

export type PageSeo = Record<
  Locale,
  Record<
    "home" | "problems" | "industries" | "solutions",
    { title: string; description: string }
  >
>;

/** Ids used on the Solutions page that an anchor alias must not collide with. */
const solutionsSectionIds = ["compare", "control", "industries-link"];
/** Ids used on the hub besides problem cards. */
const hubSectionIds = ["problems-hub", "hub-filter"];

function dupes<T>(items: readonly T[]): T[] {
  return items.filter((item, index) => items.indexOf(item) !== index);
}

/**
 * Pure function of the catalogue structure, its copy, the legacy maps and the
 * page-level SEO strings. Returns one message per problem found.
 */
export function validateCatalogue(
  s: CatalogueStructure,
  copies: Record<Locale, CatalogueCopy>,
  legacy: LegacyData,
  pageSeo: PageSeo,
): string[] {
  const out: string[] = [];
  const bad = (message: string) => out.push(message);
  const allIndustries = s.industryIds;
  const industriesOf = (problem: ProblemId): readonly IndustryId[] => {
    const value = s.problems[problem].industries;
    return value === "all" ? allIndustries : value;
  };

  // Relations ---------------------------------------------------------------
  for (const id of s.problemIds) {
    const problem = s.problems[id];
    if (dupes(problem.products).length) bad(`problem ${id}: repeated product`);
    for (const industry of industriesOf(id)) {
      for (const product of problem.products) {
        if (!s.industries[industry].products.includes(product)) {
          bad(
            `problem ${id} lists ${industry}, but ${product} is not offered to ${industry}`,
          );
        }
      }
    }
  }
  for (const id of s.industryIds) {
    const industry = s.industries[id];
    const applicable = s.problemIds.filter((p) => industriesOf(p).includes(id));
    if (applicable.length < 3) bad(`industry ${id}: fewer than 3 problems`);
    const featured = industry.featuredProblems;
    if (featured.length < 3 || featured.length > 6) {
      bad(`industry ${id}: featuredProblems must be 3 to 6`);
    }
    if (dupes(featured).length) bad(`industry ${id}: repeated featured problem`);
    for (const p of featured) {
      if (!industriesOf(p).includes(id)) {
        bad(`industry ${id}: featured problem ${p} does not apply to it`);
      }
    }
    if (dupes(industry.products).length) bad(`industry ${id}: repeated product`);
    if (dupes(industry.story).length) bad(`industry ${id}: repeated story step`);
    for (const p of industry.story) {
      if (!industry.products.includes(p)) {
        bad(`industry ${id}: story product ${p} is not offered to it`);
      }
    }
    if (!industry.products.includes(industry.spotlight)) {
      bad(`industry ${id}: spotlight ${industry.spotlight} is not offered`);
    }
  }
  const mains = new Set(s.problemIds.map((p) => s.problems[p].products[0]));
  for (const id of s.productIds) {
    if (!s.problemIds.some((p) => s.problems[p].products.includes(id))) {
      bad(`product ${id}: no problem maps to it`);
    }
    if (!mains.has(id)) bad(`product ${id}: not the main product of any problem`);
    const { related } = s.products[id];
    if (related.includes(id)) bad(`product ${id}: related to itself`);
    if (dupes(related).length) bad(`product ${id}: repeated related product`);
  }
  const headline = s.headlineProblems;
  if (headline.length < 6 || headline.length > 8) {
    bad("headlineProblems must have 6 to 8 entries");
  }
  if (dupes(headline).length) bad("headlineProblems has duplicates");
  for (const id of s.problemIds) {
    if (!s.problems[id].icon) bad(`problem ${id}: no icon`);
  }
  if (s.homeProblems.length < 5 || s.homeProblems.length > 7) {
    bad("homeProblems must have 5 to 7 entries");
  }
  if (dupes(s.homeProblems).length) bad("homeProblems has duplicates");
  const headlineIcons = headline.map((id) => s.problems[id]?.icon);
  if (dupes(headlineIcons).length) bad("headline problems share an icon");
  for (const [id, list] of Object.entries(s.comparisons)) {
    if (new Set(list).size !== list.length || list.length < 2) {
      bad(`comparison ${id}: needs 2 or more different products`);
    }
  }

  // Hero tags: exactly six, each with an icon and text in every language -----
  if (s.heroTagIcons.length !== 6) bad("hero tags: need exactly 6 icons");
  if (dupes(s.heroTagIcons).length) bad("hero tags share an icon");
  for (const [lang, copy] of Object.entries(copies) as [Locale, CatalogueCopy][]) {
    if (copy.heroTags.length !== 6) bad(`${lang} hero tags: need exactly 6`);
    copy.heroTags.forEach((text, i) => {
      if (!text.trim()) bad(`${lang} hero tag ${i + 1}: empty text`);
      if (text.length > 60) bad(`${lang} hero tag ${i + 1}: ${text.length} characters, max 60`);
    });
  }
  // Ids on shared pages -------------------------------------------------------
  const hubIds = [...s.problemIds, ...s.productGroupIds, ...hubSectionIds];
  for (const id of dupes(hubIds)) bad(`hub id collision: ${id}`);
  const solutionIds = [
    ...s.productIds,
    ...s.productGroupIds,
    ...solutionsSectionIds,
  ];
  for (const id of dupes(solutionIds)) bad(`solutions id collision: ${id}`);

  // Legacy --------------------------------------------------------------------
  const productSet = new Set<string>(s.productIds);
  for (const slug of legacy.reservedProductSlugs) {
    if (productSet.has(slug)) bad(`reserved slug ${slug} is a product id`);
  }
  for (const [team, target] of Object.entries(legacy.teamRedirects)) {
    if (productSet.has(team)) bad(`redirect source ${team} is a live product`);
    if (!productSet.has(target)) bad(`redirect ${team}: unknown target ${target}`);
  }
  for (const [alias, target] of Object.entries(legacy.anchorAliases)) {
    if (target !== "groups" && !productSet.has(target)) {
      bad(`anchor alias ${alias}: unknown target ${target}`);
    }
    if (solutionIds.includes(alias)) bad(`anchor alias ${alias} collides`);
  }

  // Copy lengths --------------------------------------------------------------
  const max = (where: string, text: string, limit: number) => {
    if (text.length > limit) bad(`${where}: ${text.length} characters, max ${limit}`);
  };
  const range = (where: string, text: string, lo: number, hi: number) => {
    if (text.length < lo || text.length > hi) {
      bad(`${where}: ${text.length} characters, must be ${lo} to ${hi}`);
    }
  };
  for (const [lang, copy] of Object.entries(copies) as [
    Locale,
    CatalogueCopy,
  ][]) {
    for (const id of s.productIds) {
      const c = copy.products[id];
      const at = `${lang} product ${id}`;
      max(`${at} shortName`, c.shortName, 30);
      max(`${at} menuHint`, c.menuHint, 60);
      max(`${at} seo.title`, c.seo.title, 45);
      range(`${at} seo.description`, c.seo.description, 70, 160);
      if (c.covers.length < 3 || c.covers.length > 6) {
        bad(`${at}: covers must have 3 to 6 points`);
      }
    }
    for (const id of s.problemIds) {
      max(`${lang} problem ${id} statement`, copy.problems[id].statement, 140);
    }
    for (const id of s.industryIds) {
      const c = copy.industries[id];
      const at = `${lang} industry ${id}`;
      max(`${at} shortName`, c.shortName, 30);
      max(`${at} menuHint`, c.menuHint, 60);
      max(`${at} seo.title`, c.seo.title, 45);
      range(`${at} seo.description`, c.seo.description, 70, 160);
    }
    for (const id of s.headlineProblems as readonly (keyof CatalogueCopy["menu"]["problemLabels"])[]) {
      max(`${lang} menu label ${id}`, copy.menu.problemLabels[id], 42);
      max(`${lang} menu hint ${id}`, copy.menu.problemHints[id], 40);
    }
    // Every problem the home block can show needs a short title.
    const shown = new Set<ProblemId>(s.homeProblems);
    for (const i of s.industryIds) {
      for (const p of s.industries[i].featuredProblems) shown.add(p);
    }
    for (const id of shown) {
      const title = copy.selectorTitles[id];
      if (!title) bad(`${lang} home block title missing for ${id}`);
      else max(`${lang} home block title ${id}`, title, 42);
    }
    for (const [id, card] of Object.entries(copy.menu.cards)) {
      max(`${lang} menu card ${id} title`, card.title, 40);
      max(`${lang} menu card ${id} text`, card.text, 90);
    }
    const seo = pageSeo[lang];
    range(`${lang} home seo.description`, seo.home.description, 70, 160);
    max(`${lang} home seo.title`, seo.home.title, 60);
    for (const key of ["problems", "industries", "solutions"] as const) {
      max(`${lang} ${key} seo.title`, seo[key].title, 45);
      range(`${lang} ${key} seo.description`, seo[key].description, 70, 160);
    }
  }
  return out;
}
