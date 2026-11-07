/**
 * Content structure: ids, icons and ordering. All human-readable text lives in
 * lib/i18n (keyed by these ids), so adding a locale never touches this file.
 */
export const capabilities = [
  {
    id: "documents",
    icon: "Files",
  },
  {
    id: "integrations",
    icon: "Network",
  },
  {
    id: "finding-answers",
    icon: "Search",
  },
  {
    id: "closing-jobs",
    icon: "ClipboardCheck",
  },
  {
    id: "tracking-work",
    icon: "Activity",
  },
] as const;

export type CapabilityId = (typeof capabilities)[number]["id"];

export const pains = [
  { id: "operations", capability: "tracking-work" },
  { id: "quality-manufacturing", capability: "documents" },
  { id: "service-maintenance", capability: "closing-jobs" },
] as const;

export type PainId = (typeof pains)[number]["id"];

export const useCases = [
  { id: "outstanding-work-visibility", capability: "tracking-work" },
  { id: "quality-documentation", capability: "documents" },
  { id: "job-completion-and-invoicing", capability: "closing-jobs" },
  { id: "email-and-request-processing", capability: "closing-jobs" },
  { id: "find-answers-in-technical-documents", capability: "finding-answers" },
  { id: "quotation-preparation", capability: "documents" },
] as const;

export type UseCaseId = (typeof useCases)[number]["id"];

/** Manufacturing solution cards, in sales-guide order (the card number). */
export const solutions = [
  "rfq-follow-up",
  "job-progress",
  "order-entry",
  "call-follow-through",
  "shop-floor-capture",
  "technical-answers",
  "incoming-goods",
  "visual-quality",
  "dispatch-verification",
  "nonconformance-triage",
  "shift-handovers",
  "engineering-changes",
  "invoice-checking",
  "order-portal",
] as const;

export type SolutionId = (typeof solutions)[number];

/** How the cards are grouped on /solutions. Titles live in lib/i18n. */
export const solutionGroups = [
  {
    id: "sales-orders",
    items: ["rfq-follow-up", "order-entry", "call-follow-through", "order-portal"],
  },
  {
    id: "production",
    items: [
      "job-progress",
      "shop-floor-capture",
      "visual-quality",
      "shift-handovers",
      "engineering-changes",
    ],
  },
  {
    id: "supply-finance",
    items: ["incoming-goods", "dispatch-verification", "invoice-checking"],
  },
  {
    id: "quality-service",
    items: ["technical-answers", "nonconformance-triage"],
  },
] as const satisfies readonly {
  id: string;
  items: readonly SolutionId[];
}[];

export type SolutionGroupId = (typeof solutionGroups)[number]["id"];

export const approachSteps = [
  "show-us-the-process",
  "find-the-opportunity",
  "prove-it-works",
  "measure-the-result",
  "put-it-to-work",
] as const;

export type ApproachStepId = (typeof approachSteps)[number];

/**
 * Contact form categories. `value` is what the API receives and what the team
 * reads, so it stays English in every locale; only the label is translated.
 */
export const categories = [
  { id: "documents", value: "Document processing and data entry" },
  { id: "reporting", value: "Reporting and spreadsheets" },
  { id: "emails", value: "Customer emails and requests" },
  { id: "finding-information", value: "Finding information in documents" },
  { id: "quotations", value: "Quotations and proposals" },
  { id: "quality", value: "Quality records and compliance" },
  { id: "service", value: "Service and maintenance reporting" },
  { id: "other", value: "Other / Not sure yet" },
] as const;

export const defaultCategoryValue = "Other / Not sure yet";
