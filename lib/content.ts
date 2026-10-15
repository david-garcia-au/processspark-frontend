/**
 * Content structure: ids, icons and ordering. All human-readable text lives in
 * lib/i18n (keyed by these ids), so adding a locale never touches this file.
 */
export const capabilities = [
  { id: "tracking-work", icon: "Activity" },
  { id: "closing-jobs", icon: "ClipboardCheck" },
  { id: "documents", icon: "Files" },
  { id: "requests", icon: "Mail" },
  { id: "finding-answers", icon: "Search" },
  { id: "inspecting", icon: "ScanLine" },
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
  { id: "email-and-request-processing", capability: "requests" },
  { id: "find-answers-in-technical-documents", capability: "finding-answers" },
  { id: "quotation-preparation", capability: "requests" },
] as const;

export type UseCaseId = (typeof useCases)[number]["id"];

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
