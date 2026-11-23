/**
 * The catalogue: ids, order, icons, media slots and the relations between
 * problems, products and industries. No copy lives here (it is in
 * lib/i18n/catalogue-en.ts and catalogue-es.ts, keyed by these ids).
 *
 * Every page, menu, sitemap entry, JSON-LD node and llms.txt line is generated
 * from this file through lib/catalogue/index.ts, and validate.ts rejects any
 * combination that disagrees with itself.
 *
 * Imports are types only, so this file can be loaded anywhere.
 */
import type { CategoryId } from "@/lib/content";
import type { MediaSlot } from "@/lib/media";

export const productGroupIds = [
  "capture",
  "self-service",
  "finance-sales",
  "monitor",
] as const;
export type ProductGroupId = (typeof productGroupIds)[number];

/** Array order is the menu order and the page order. */
export const productIds = [
  "digitise-paperwork",
  "talk-to-your-data",
  "talk-to-your-documents",
  "employee-service-desk",
  "customer-portal",
  "supplier-portal",
  "contractor-portal",
  "invoice-bookkeeping",
  "estimating-bids",
  "quotes-rfqs",
  "sensors-iot",
] as const;
export type ProductId = (typeof productIds)[number];

export const industryIds = [
  "manufacturing",
  "equipment-maintenance",
  "accounting-firms",
] as const;
export type IndustryId = (typeof industryIds)[number];

/** Table order is the hub order inside a group. */
export const problemIds = [
  "retyping-paper",
  "spreadsheet-few-people",
  "waiting-for-reports",
  "know-how-in-heads",
  "phoning-for-answers",
  "repeat-faults",
  "leaver-knowledge",
  "forms-not-filled",
  "site-issue-register",
  "workforce-records",
  "same-staff-questions",
  "customer-status-calls",
  "customers-in-the-dark",
  "chasing-suppliers",
  "contractor-checks",
  "invoice-mismatch",
  "slow-quotes",
  "bids-from-scratch",
  "machine-stops",
  "client-document-chasing",
] as const;
export type ProblemId = (typeof problemIds)[number];

export type ControlPattern =
  | "prepare-decide"
  | "answer-within-rules"
  | "check-alert";

export const controlPatterns = [
  "prepare-decide",
  "answer-within-rules",
  "check-alert",
] as const satisfies readonly ControlPattern[];

/**
 * Only the icons the catalogue uses. Client components map each name to a
 * named lucide-react import, so the whole icon set never ships to the browser.
 */
export type IconName =
  | "factory"
  | "wrench"
  | "calculator"
  | "clipboard-pen"
  | "database"
  | "book-open"
  | "headset"
  | "users-round"
  | "package"
  | "hard-hat"
  | "receipt-text"
  | "ruler"
  | "file-spreadsheet"
  | "activity"
  | "keyboard"
  | "chart-column"
  | "lightbulb"
  | "clipboard-list"
  | "mail"
  | "triangle-alert"
  | "hourglass"
  | "phone"
  | "phone-call"
  | "repeat"
  | "log-out"
  | "map-pin"
  | "id-card"
  | "message-circle-question"
  | "eye-off"
  | "truck"
  | "shield-check"
  | "file-pen"
  | "clipboard-check"
  | "search"
  | "file-text";
/**
 * Icons of the six floating tags on the home hero, in the order of the copy
 * (`heroTags` in each catalogue file). Decorative; all different.
 */
export const heroTagIcons = [
  "keyboard",
  "clipboard-check",
  "chart-column",
  "search",
  "receipt-text",
  "file-text",
] as const satisfies readonly IconName[];

export type ProductStructure = {
  group: ProductGroupId;
  icon: IconName;
  control: ControlPattern;
  media: MediaSlot;
  contactCategory: CategoryId;
  /** "Works with", ordered. */
  related: readonly ProductId[];
};

export const products = {
  "digitise-paperwork": {
    group: "capture",
    icon: "clipboard-pen",
    control: "prepare-decide",
    media: "product-digitise-paperwork",
    contactCategory: "paperwork",
    related: ["talk-to-your-documents", "talk-to-your-data"],
  },
  "talk-to-your-data": {
    group: "capture",
    icon: "database",
    control: "answer-within-rules",
    media: "product-talk-to-your-data",
    contactCategory: "data-questions",
    related: ["digitise-paperwork", "sensors-iot"],
  },
  "talk-to-your-documents": {
    group: "capture",
    icon: "book-open",
    control: "answer-within-rules",
    media: "product-talk-to-your-documents",
    contactCategory: "document-answers",
    related: ["digitise-paperwork", "employee-service-desk"],
  },
  "employee-service-desk": {
    group: "self-service",
    icon: "headset",
    control: "answer-within-rules",
    media: "product-employee-service-desk",
    contactCategory: "staff-questions",
    related: ["talk-to-your-documents"],
  },
  "customer-portal": {
    group: "self-service",
    icon: "users-round",
    control: "answer-within-rules",
    media: "product-customer-portal",
    contactCategory: "portals",
    related: ["digitise-paperwork", "invoice-bookkeeping"],
  },
  "supplier-portal": {
    group: "self-service",
    icon: "package",
    control: "answer-within-rules",
    media: "product-supplier-portal",
    contactCategory: "portals",
    related: ["invoice-bookkeeping", "digitise-paperwork"],
  },
  "contractor-portal": {
    group: "self-service",
    icon: "hard-hat",
    control: "check-alert",
    media: "product-contractor-portal",
    contactCategory: "portals",
    related: ["digitise-paperwork"],
  },
  "invoice-bookkeeping": {
    group: "finance-sales",
    icon: "receipt-text",
    control: "prepare-decide",
    media: "product-invoice-bookkeeping",
    contactCategory: "invoices",
    related: ["supplier-portal", "digitise-paperwork"],
  },
  "estimating-bids": {
    group: "finance-sales",
    icon: "ruler",
    control: "prepare-decide",
    media: "product-estimating-bids",
    contactCategory: "quotes",
    related: ["quotes-rfqs"],
  },
  "quotes-rfqs": {
    group: "finance-sales",
    icon: "file-spreadsheet",
    control: "prepare-decide",
    media: "product-quotes-rfqs",
    contactCategory: "quotes",
    related: ["estimating-bids", "customer-portal"],
  },
  "sensors-iot": {
    group: "monitor",
    icon: "activity",
    control: "check-alert",
    media: "product-sensors-iot",
    contactCategory: "monitoring",
    related: ["talk-to-your-data", "customer-portal"],
  },
} as const satisfies Record<ProductId, ProductStructure>;

export type ProblemStructure = {
  /** Depicts the pain, not the product. Headline problems must differ. */
  icon: IconName;
  /** At least one. products[0] is the problem's main product. */
  products: readonly [ProductId, ...ProductId[]];
  /** "all" means every published industry; may be empty (see Estimating). */
  industries: "all" | readonly IndustryId[];
};

export const problems = {
  "retyping-paper": {
    icon: "keyboard", products: ["digitise-paperwork"], industries: "all" },
  "spreadsheet-few-people": {
    icon: "chart-column",
    products: ["talk-to-your-data"],
    industries: "all",
  },
  "waiting-for-reports": {
    icon: "hourglass", products: ["talk-to-your-data"], industries: "all" },
  "know-how-in-heads": {
    icon: "lightbulb",
    products: ["talk-to-your-documents"],
    industries: "all",
  },
  "phoning-for-answers": {
    icon: "phone",
    products: ["talk-to-your-documents", "digitise-paperwork"],
    industries: ["manufacturing", "equipment-maintenance"],
  },
  "repeat-faults": {
    icon: "repeat",
    products: ["talk-to-your-data", "digitise-paperwork"],
    industries: ["manufacturing", "equipment-maintenance"],
  },
  "leaver-knowledge": {
    icon: "log-out",
    products: ["digitise-paperwork", "talk-to-your-documents"],
    industries: "all",
  },
  "forms-not-filled": {
    icon: "clipboard-list",
    products: ["digitise-paperwork"],
    industries: ["manufacturing", "equipment-maintenance"],
  },
  "site-issue-register": {
    icon: "map-pin",
    products: ["digitise-paperwork"],
    industries: ["equipment-maintenance"],
  },
  "workforce-records": {
    icon: "id-card",
    products: ["digitise-paperwork", "contractor-portal"],
    industries: ["equipment-maintenance"],
  },
  "same-staff-questions": {
    icon: "message-circle-question",
    products: ["employee-service-desk"],
    industries: "all",
  },
  "customer-status-calls": {
    icon: "phone-call",
    products: ["customer-portal"],
    industries: ["manufacturing"],
  },
  "customers-in-the-dark": {
    icon: "eye-off",
    products: ["customer-portal", "sensors-iot"],
    industries: ["equipment-maintenance"],
  },
  "chasing-suppliers": {
    icon: "truck",
    products: ["supplier-portal"],
    industries: ["manufacturing"],
  },
  "contractor-checks": {
    icon: "shield-check",
    products: ["contractor-portal"],
    industries: ["manufacturing"],
  },
  "invoice-mismatch": {
    icon: "receipt-text", products: ["invoice-bookkeeping"], industries: "all" },
  "slow-quotes": {
    icon: "calculator", products: ["quotes-rfqs"], industries: ["manufacturing"] },
  "bids-from-scratch": {
    icon: "file-pen", products: ["estimating-bids"], industries: [] },
  "machine-stops": {
    icon: "triangle-alert",
    products: ["sensors-iot"],
    industries: ["manufacturing", "equipment-maintenance"],
  },
  "client-document-chasing": {
    icon: "mail",
    products: [
      "customer-portal",
      "digitise-paperwork",
      "invoice-bookkeeping",
    ],
    industries: ["accounting-firms"],
  },
} as const satisfies Record<ProblemId, ProblemStructure>;

export type IndustryStructure = {
  icon: IconName;
  media: MediaSlot;
  /** Offered to this industry, lead products first. */
  products: readonly ProductId[];
  /** 3 to 6: what the page opens with. */
  featuredProblems: readonly ProblemId[];
  /** Exactly three steps of "how it fits together here". */
  story: readonly [ProductId, ProductId, ProductId];
  /** The one worked example on the page. */
  spotlight: ProductId;
};

export const industries = {
  manufacturing: {
    icon: "factory",
    media: "industry-manufacturing",
    products: [
      "customer-portal",
      "supplier-portal",
      "quotes-rfqs",
      "sensors-iot",
      "contractor-portal",
      "digitise-paperwork",
      "talk-to-your-data",
      "talk-to-your-documents",
      "employee-service-desk",
      "invoice-bookkeeping",
    ],
    featuredProblems: [
      "retyping-paper",
      "slow-quotes",
      "machine-stops",
      "know-how-in-heads",
      "customer-status-calls",
      "chasing-suppliers",
    ],
    story: ["digitise-paperwork", "talk-to-your-documents", "customer-portal"],
    spotlight: "talk-to-your-documents",
  },
  "equipment-maintenance": {
    icon: "wrench",
    media: "industry-equipment-maintenance",
    products: [
      "talk-to-your-documents",
      "digitise-paperwork",
      "customer-portal",
      "contractor-portal",
      "sensors-iot",
      "talk-to-your-data",
      "employee-service-desk",
      "invoice-bookkeeping",
    ],
    featuredProblems: [
      "phoning-for-answers",
      "forms-not-filled",
      "repeat-faults",
      "workforce-records",
      "customers-in-the-dark",
      "leaver-knowledge",
    ],
    story: ["digitise-paperwork", "talk-to-your-documents", "customer-portal"],
    spotlight: "digitise-paperwork",
  },
  "accounting-firms": {
    icon: "calculator",
    media: "industry-accounting-firms",
    products: [
      "invoice-bookkeeping",
      "customer-portal",
      "digitise-paperwork",
      "talk-to-your-data",
      "talk-to-your-documents",
      "employee-service-desk",
    ],
    featuredProblems: [
      "client-document-chasing",
      "invoice-mismatch",
      "retyping-paper",
      "spreadsheet-few-people",
      "know-how-in-heads",
      "same-staff-questions",
    ],
    story: ["customer-portal", "digitise-paperwork", "invoice-bookkeeping"],
    spotlight: "customer-portal",
  },
} as const satisfies Record<IndustryId, IndustryStructure>;

/** Products offered to an industry, as a union (drives the typed examples). */
export type IndustryProducts<I extends IndustryId> =
  (typeof industries)[I]["products"][number];
export type IndustryStory<I extends IndustryId> =
  (typeof industries)[I]["story"][number];

/**
 * 6 to 8, curated: the home selector's "All" view and the "Start from the
 * problem" column of the header menu. One list feeds both.
 */
export const headlineProblems = [
  "retyping-paper",
  "spreadsheet-few-people",
  "know-how-in-heads",
  "forms-not-filled",
  "invoice-mismatch",
  "client-document-chasing",
  "slow-quotes",
  "machine-stops",
] as const satisfies readonly ProblemId[];
export type HeadlineProblemId = (typeof headlineProblems)[number];
/**
 * The home page "Which of these sounds like you?" block, "All industries" view:
 * 5 to 7 problems, each led by a different product. The industry views use
 * each industry's featuredProblems.
 */
export const homeProblems = [
  "retyping-paper",
  "spreadsheet-few-people",
  "know-how-in-heads",
  "same-staff-questions",
  "invoice-mismatch",
  "slow-quotes",
] as const satisfies readonly ProblemId[];

export const comparisonIds = ["questions", "portals", "pricing"] as const;
export type ComparisonId = (typeof comparisonIds)[number];

export const comparisons: Record<ComparisonId, readonly ProductId[]> = {
  questions: [
    "talk-to-your-data",
    "talk-to-your-documents",
    "employee-service-desk",
  ],
  portals: ["customer-portal", "supplier-portal", "contractor-portal"],
  pricing: ["quotes-rfqs", "estimating-bids"],
};

/** Menu cards (3.4). */
export const navCardIds = ["demo"] as const;
export type NavCardId = (typeof navCardIds)[number];
export const navCardMedia: Record<NavCardId, MediaSlot> = {
  demo: "nav-demo",
};
/** Where "See it in action" goes: the Talk to Your Documents demo. */
export const demoPath = "/solutions/talk-to-your-documents#demo";

/**
 * Products hidden from the header's Solutions panel and the footer column
 * until an industry that needs them is published (owner decision 6). They
 * stay on the Solutions index, in the sitemap, in llms.txt and on the hub.
 */
export const hiddenFromMenus: readonly ProductId[] = ["estimating-bids"];
