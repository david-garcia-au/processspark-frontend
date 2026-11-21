import type {
  ComparisonId,
  ControlPattern,
  HeadlineProblemId,
  IndustryId,
  IndustryProducts,
  IndustryStory,
  NavCardId,
  ProblemId,
  ProductGroupId,
  ProductId,
} from "@/lib/catalogue/structure";

export type ProductCopy = {
  name: string;
  /** Used in menus and cards, at most 30 characters. */
  shortName: string;
  /** Menu hint, at most 60 characters. */
  menuHint: string;
  oneLine: string;
  /** Hero paragraph: what it does. */
  lead: string;
  /** 3 to 6 points. */
  covers: string[];
  /** Who decides, in this product's terms. */
  controlText: string;
  firstStep: string;
  whoFor: string;
  /** Honest limits; may be empty. */
  goodToKnow: string[];
  /** One sentence on how it combines with the others. */
  worksWith: string;
  /** Illustrative exchange shown on the hero image. */
  prompt: { question: string; reply: string };
  seo: { title: string; description: string };
};

export type ProblemCopy = {
  /** At most 140 characters, in the customer's words. */
  statement: string;
  change: string;
};

export type IndustryCopy<I extends IndustryId> = {
  name: string;
  shortName: string;
  /** Three short examples joined by " · ", at most 60 characters. */
  menuHint: string;
  heroTitle: string;
  heroLead: string;
  whoFor: string;
  story: {
    heading: string;
    steps: Record<IndustryStory<I>, { title: string; text: string }>;
  };
  spotlight: { heading: string; paragraphs: string[] };
  /** One per product offered to the industry. */
  examples: Record<IndustryProducts<I>, string>;
  seo: { title: string; description: string };
};

export type CatalogueCopy = {
  groups: Record<
    ProductGroupId,
    { name: string; problemHeading: string; intro: string }
  >;
  controlPatterns: Record<ControlPattern, { title: string; text: string }>;
  comparisons: Record<ComparisonId, { heading: string; text: string }>;
  products: Record<ProductId, ProductCopy>;
  problems: Record<ProblemId, ProblemCopy>;
  industries: { [I in IndustryId]: IndustryCopy<I> };
  /** Six floating tags on the home hero, one line each, at most 60 characters. */
  heroTags: string[];
  /**
   * Short title (at most 40 characters) of each problem the home block can
   * show: the "All industries" list and every industry's featured problems.
   */
  selectorTitles: Partial<Record<ProblemId, string>>;
  menu: {
    /** At most 42 characters each. */
    problemLabels: Record<HeadlineProblemId, string>;
    /** One plain outcome line per problem, at most 40 characters each. */
    problemHints: Record<HeadlineProblemId, string>;
    /** Title at most 40 characters, text at most 90. */
    cards: Record<NavCardId, { title: string; text: string }>;
  };
};
