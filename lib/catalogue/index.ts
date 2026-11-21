/**
 * The only query API pages, menus, the footer, the sitemap, JSON-LD and
 * llms.txt use. Nothing else reads structure.ts, so a mapping can never be
 * stated two different ways. The catalogue is validated once at load: a
 * disagreement fails the build with every problem listed.
 */
import { enCatalogue } from "@/lib/i18n/catalogue-en";
import { esCatalogue } from "@/lib/i18n/catalogue-es";
import { getDictionary, localePath, locales, type Locale } from "@/lib/i18n";
import type { CatalogueCopy, ProblemCopy } from "@/lib/catalogue/copy-types";
import * as legacy from "@/lib/catalogue/legacy";
import * as structure from "@/lib/catalogue/structure";
import {
  hiddenFromMenus,
  navCardMedia,
  type ComparisonId,
  type ControlPattern,
  type IconName,
  type IndustryId,
  type NavCardId,
  type ProblemId,
  type ProductGroupId,
  type ProductId,
  type ProductStructure,
} from "@/lib/catalogue/structure";
import { validateCatalogue } from "@/lib/catalogue/validate";
import type { MediaSlot } from "@/lib/media";

export {
  controlPatterns,
  headlineProblems,
  industryIds,
  problemIds,
  productGroupIds,
  productIds,
} from "@/lib/catalogue/structure";
export type {
  ComparisonId,
  ControlPattern,
  HeadlineProblemId,
  IconName,
  IndustryId,
  NavCardId,
  ProblemId,
  ProductGroupId,
  ProductId,
} from "@/lib/catalogue/structure";
export type { CatalogueCopy } from "@/lib/catalogue/copy-types";

const copies: Record<Locale, CatalogueCopy> = {
  en: enCatalogue,
  es: esCatalogue,
};

const pageSeo = Object.fromEntries(
  locales.map((lang) => {
    const dict = getDictionary(lang);
    return [
      lang,
      {
        home: dict.seo,
        problems: dict.problemsPage.seo,
        industries: dict.industriesPage.seo,
        solutions: dict.solutionsPage.seo,
      },
    ];
  }),
) as unknown as Parameters<typeof validateCatalogue>[3];

const problemsFound = validateCatalogue(
  structure,
  copies,
  legacy,
  pageSeo,
);
if (problemsFound.length) {
  throw new Error(
    `Catalogue is inconsistent:\n- ${problemsFound.join("\n- ")}`,
  );
}

// Types ---------------------------------------------------------------------

type LooseIndustryCopy = {
  name: string;
  shortName: string;
  menuHint: string;
  heroTitle: string;
  heroLead: string;
  whoFor: string;
  story: {
    heading: string;
    steps: Partial<Record<ProductId, { title: string; text: string }>>;
  };
  spotlight: { heading: string; paragraphs: string[] };
  examples: Partial<Record<ProductId, string>>;
  seo: { title: string; description: string };
};

export type ProductView = ProductStructure &
  CatalogueCopy["products"][ProductId] & {
    id: ProductId;
    href: string;
    groupName: string;
  };

export type IndustryView = {
  id: IndustryId;
  icon: IconName;
  media: MediaSlot;
  products: readonly ProductId[];
  featuredProblems: readonly ProblemId[];
  story: readonly [ProductId, ProductId, ProductId];
  spotlight: ProductId;
  href: string;
  copy: LooseIndustryCopy;
};

export type ProblemView = ProblemCopy & {
  id: ProblemId;
  icon: IconName;
  products: readonly ProductId[];
  industries: readonly IndustryId[];
};

// Hrefs ---------------------------------------------------------------------

export function productHref(lang: Locale, id: ProductId): string {
  return localePath(lang, `/solutions/${id}`);
}
export function industryHref(lang: Locale, id: IndustryId): string {
  return localePath(lang, `/industries/${id}`);
}

export function isProductId(value: string): value is ProductId {
  return (structure.productIds as readonly string[]).includes(value);
}
export function isIndustryId(value: string): value is IndustryId {
  return (structure.industryIds as readonly string[]).includes(value);
}
export function isProblemId(value: string): value is ProblemId {
  return (structure.problemIds as readonly string[]).includes(value);
}

// Products ------------------------------------------------------------------

export function product(lang: Locale, id: ProductId): ProductView {
  const s = structure.products[id];
  return {
    ...(s as ProductStructure),
    ...copies[lang].products[id],
    id,
    href: productHref(lang, id),
    groupName: copies[lang].groups[s.group].name,
  };
}

export function products(lang: Locale): ProductView[] {
  return structure.productIds.map((id) => product(lang, id));
}

export function groupCopy(lang: Locale, id: ProductGroupId) {
  return copies[lang].groups[id];
}

export function productsByGroup(lang: Locale) {
  return structure.productGroupIds.map((id) => ({
    id,
    ...copies[lang].groups[id],
    products: products(lang).filter((p) => p.group === id),
  }));
}

export function controlPattern(lang: Locale, id: ControlPattern) {
  return copies[lang].controlPatterns[id];
}
export function productsByControl(lang: Locale) {
  return structure.controlPatterns.map((id) => ({
    id,
    ...copies[lang].controlPatterns[id],
    products: products(lang).filter((p) => p.control === id),
  }));
}
export function comparisons(lang: Locale) {
  return (Object.keys(structure.comparisons) as ComparisonId[]).map((id) => ({
    id,
    ...copies[lang].comparisons[id],
    products: structure.comparisons[id].map((p) => product(lang, p)),
  }));
}

// Problems ------------------------------------------------------------------

function industriesOfProblem(id: ProblemId): readonly IndustryId[] {
  const value = structure.problems[id].industries;
  return value === "all" ? structure.industryIds : value;
}

export function problem(lang: Locale, id: ProblemId): ProblemView {
  return {
    ...copies[lang].problems[id],
    id,
    icon: structure.problems[id].icon,
    products: structure.problems[id].products,
    industries: industriesOfProblem(id),
  };
}

/** The first problem whose main product is this one. */
export function mainProblem(lang: Locale, id: ProductId): ProblemView {
  const found = structure.problemIds.find(
    (p) => structure.problems[p].products[0] === id,
  );
  if (!found) throw new Error(`No main problem for ${id}`);
  return problem(lang, found);
}

/** Problems that include the product, the main one first. */
export function problemsForProduct(lang: Locale, id: ProductId): ProblemView[] {
  const all = structure.problemIds.filter((p) =>
    structure.problems[p].products.some((x) => x === id),
  );
  const main = mainProblem(lang, id).id;
  return [main, ...all.filter((p) => p !== main)].map((p) => problem(lang, p));
}

export function problemMainProduct(id: ProblemId): ProductId {
  return structure.problems[id].products[0];
}

// Industries ----------------------------------------------------------------

export function industry(lang: Locale, id: IndustryId): IndustryView {
  const s = structure.industries[id];
  return {
    id,
    icon: s.icon,
    media: s.media,
    products: s.products,
    featuredProblems: s.featuredProblems,
    story: s.story,
    spotlight: s.spotlight,
    href: industryHref(lang, id),
    copy: copies[lang].industries[id] as unknown as LooseIndustryCopy,
  };
}

export function industries(lang: Locale): IndustryView[] {
  return structure.industryIds.map((id) => industry(lang, id));
}

export function industriesForProduct(lang: Locale, id: ProductId) {
  return industries(lang)
    .filter((i) => i.products.includes(id))
    .map((i) => ({ industry: i, example: i.copy.examples[id] ?? "" }));
}

export function productsForIndustry(lang: Locale, id: IndustryId) {
  const i = industry(lang, id);
  return i.products.map((p) => ({
    product: product(lang, p),
    example: i.copy.examples[p] ?? "",
  }));
}

export function problemsForIndustry(lang: Locale, id: IndustryId) {
  const featured = structure.industries[id].featuredProblems.map((p) =>
    problem(lang, p),
  );
  const featuredIds = new Set<ProblemId>(
    structure.industries[id].featuredProblems,
  );
  const more = structure.problemIds
    .filter((p) => industriesOfProblem(p).includes(id) && !featuredIds.has(p))
    .map((p) => problem(lang, p));
  return { featured, more };
}

// Hub and selector ----------------------------------------------------------

export type FilterId = "all" | IndustryId;

export function problemsByGroup(lang: Locale) {
  const groups = structure.productGroupIds
    .map((group) => ({
      id: group,
      heading: copies[lang].groups[group].problemHeading,
      problemIds: structure.problemIds.filter(
        (p) =>
          structure.products[structure.problems[p].products[0]].group ===
          group,
      ),
    }))
    .filter((g) => g.problemIds.length > 0);
  const members = {
    all: [...structure.problemIds],
    ...Object.fromEntries(
      structure.industryIds.map((i) => [
        i,
        structure.problemIds.filter((p) => industriesOfProblem(p).includes(i)),
      ]),
    ),
  } as Record<FilterId, ProblemId[]>;
  return { groups, members };
}

export function selectorLists(): Record<FilterId, readonly ProblemId[]> {
  return {
    all: structure.homeProblems,
    ...(Object.fromEntries(
      structure.industryIds.map((i) => [
        i,
        structure.industries[i].featuredProblems,
      ]),
    ) as unknown as Record<IndustryId, readonly ProblemId[]>),
  };
}

/** Problems that appear in any home selector view, headline views first. */
export function selectorProblemIds(): ProblemId[] {
  return [...new Set(Object.values(selectorLists()).flat())];
}

/** Short title of a problem in the home block. */
export function selectorTitle(lang: Locale, id: ProblemId): string {
  return copies[lang].selectorTitles[id] ?? copies[lang].problems[id].statement;
}
export function headlineProblemIds() {
  return structure.headlineProblems;
}

// Anchors -------------------------------------------------------------------

/** Old anchor ids grouped by the product card they sit before ("groups" = before the first group). */
export function anchorAliases(): Record<string, string[]> {
  const grouped: Record<string, string[]> = {};
  for (const [alias, target] of Object.entries(legacy.anchorAliases)) {
    (grouped[target] ??= []).push(alias);
  }
  return grouped;
}

// Menus ---------------------------------------------------------------------

export type MenuItem = {
  id: string;
  href: string;
  label: string;
  hint?: string;
  icon?: IconName;
  current?: boolean;
  /** A problem item: choosing it dispatches the hub's select event. */
  problem?: boolean;
};
export type MenuColumn = {
  heading: string;
  headingHref?: string;
  items: MenuItem[];
  /** Lay the items out in two sub-columns on wide panels. */
  twoUp?: boolean;
  more?: { href: string; label: string };
};
export type Menu = {
  id: "solve" | "solutions";
  label: string;
  href: string;
  toggleLabel: string;
  current: boolean;
  columns: MenuColumn[];
  links: { href: string; label: string }[];
  card?: { placement: "strip" } | { placement: "afterColumn"; column: number };
};

export type MenuCopy = {
  solveToggle: string;
  solutionsToggle: string;
  startProblem: string;
  startIndustry: string;
  allIndustries: string;
  seeAllProblems: string;
  notListed: string;
  whichOne: string;
  allSolutions: string;
};

export type NavCard = {
  id: NavCardId;
  media: MediaSlot;
  title: string;
  text: string;
  href: string;
};

/**
 * Header and mobile-menu data (option E). Problem items link to
 * /{lang}/problems#id everywhere, hub included; the header also dispatches a
 * select event so the hub reacts even when the URL does not change.
 */
export function menus(
  lang: Locale,
  path: string,
  copy: MenuCopy & { solve: string; solutions: string },
  contactHref: string,
): Menu[] {
  const c = copies[lang];
  const here = path;
  const hubPath = localePath(lang, "/problems");
  const problemItems: MenuItem[] = structure.headlineProblems.map((id) => ({
    id,
    href: `${hubPath}#${id}`,
    problem: true,
    icon: structure.problems[id].icon,
    label: c.menu.problemLabels[id],
    hint: c.products[structure.problems[id].products[0]].shortName,
  }));
  const industryItems: MenuItem[] = structure.industryIds.map((id) => ({
    id,
    href: industryHref(lang, id),
    label: c.industries[id].shortName,
    hint: c.industries[id].menuHint,
    icon: structure.industries[id].icon,
    current: here === `/industries/${id}`,
  }));
  const solve: Menu = {
    id: "solve",
    label: copy.solve,
    href: hubPath,
    toggleLabel: copy.solveToggle,
    current: here === "/problems",
    columns: [
      { heading: copy.startProblem, items: problemItems, twoUp: true },
      {
        heading: copy.startIndustry,
        headingHref: localePath(lang, "/industries"),
        items: industryItems,
        more: {
          href: localePath(lang, "/industries"),
          label: copy.allIndustries,
        },
      },
    ],
    links: [
      { href: hubPath, label: copy.seeAllProblems },
      { href: contactHref, label: copy.notListed },
    ],
    card: { placement: "strip" },
  };
  const solutions: Menu = {
    id: "solutions",
    label: copy.solutions,
    href: localePath(lang, "/solutions"),
    toggleLabel: copy.solutionsToggle,
    current: here === "/solutions",
    columns: structure.productGroupIds.map((group) => ({
      heading: c.groups[group].name,
      items: structure.productIds
        .filter(
          (p) =>
            structure.products[p].group === group &&
            !hiddenFromMenus.includes(p),
        )
        .map((p) => ({
          id: p,
          href: productHref(lang, p),
          label: c.products[p].shortName,
          hint: c.products[p].menuHint,
          icon: structure.products[p].icon,
          current: here === `/solutions/${p}`,
        })),
    })),
    links: [
      {
        href: `${localePath(lang, "/solutions")}#compare`,
        label: copy.whichOne,
      },
      { href: localePath(lang, "/solutions"), label: copy.allSolutions },
    ],
    card: { placement: "afterColumn", column: 3 },
  };
  return [solve, solutions];
}

export function navCards(lang: Locale, homeApproachHref: string): NavCard[] {
  const c = copies[lang].menu.cards;
  return structure.navCardIds.map((id) => ({
    id,
    media: navCardMedia[id],
    title: c[id].title,
    text: c[id].text,
    href:
      id === "first-project" ? homeApproachHref : localePath(lang, "/resources"),
  }));
}

/** Products in the footer's Solutions column. */
export function footerProducts(lang: Locale): ProductView[] {
  return products(lang).filter((p) => !hiddenFromMenus.includes(p.id));
}

/** The six decorative tags floating in the home hero. */
export function heroTags(lang: Locale): { icon: IconName; text: string }[] {
  return structure.heroTagIcons.map((icon, i) => ({
    icon,
    text: copies[lang].heroTags[i],
  }));
}
