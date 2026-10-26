/**
 * Media slots: every place on the site reserved for an image or a video.
 *
 * Until an asset exists a slot renders a labelled placeholder with the right
 * aspect ratio, so layouts are reviewable now. To go live, drop the file in
 * /public and set `src` (and `poster` for videos). Nothing else changes.
 *
 * Images: WebP/AVIF/JPEG, at least 1600px wide for 16:9 and 3:2 slots.
 * Videos: MP4 (H.264) under ~8 MB, 10 to 20 seconds, no audio needed.
 *
 * The visible text of each slot (placeholder label and alt text) lives in the
 * dictionary under `media`, keyed by slot name, in lib/i18n.
 */
export type MediaKind = "image" | "video";

export type MediaItem = {
  kind: MediaKind;
  /** CSS aspect-ratio value, for example "16 / 9". */
  ratio: string;
  /** Art direction for whoever creates the asset. Not rendered. */
  brief: string;
  /** Public path of the finished asset, for example "/images/foo.webp". */
  src?: string;
  /** Poster frame for videos. */
  poster?: string;
};

const R169 = "16 / 9";
const R32 = "3 / 2";
const R43 = "4 / 3";

export const media = {
  "capability-integrations": {
    kind: "image",
    ratio: R32,
    brief: "Connected operational data diagram",
  },
  // Pain points ------------------------------------------------------------
  "pain-operations": {
    kind: "image",
    ratio: R32,
    brief:
      "Operations lead on a busy warehouse or production floor, surrounded by work waiting to be done. Natural light, documentary feel.",
    src: "/images/warehouse-manager.webp",
  },
  "pain-quality-manufacturing": {
    kind: "image",
    ratio: R32,
    brief:
      "Quality inspector checking a product by eye with a paper record in hand. Close, tactile, shallow depth of field.",
    src: "/images/manufacturing-traveller.webp",
  },
  "pain-service-maintenance": {
    kind: "image",
    ratio: R32,
    brief:
      "Service technician beside equipment, writing notes after a job. Phone or tablet in hand, workshop or site setting.",
    src: "/images/boiler-room.webp",
  },

  // Process explorer (one per capability) -----------------------------------
  "capability-documents": {
    kind: "image",
    ratio: R169,
    brief:
      "Supplier certificate beside a structured on-screen table of extracted fields with one discrepancy highlighted.",
    src: "/images/paper-form-fields.webp",
  },
  "capability-tracking-work": {
    kind: "image",
    ratio: R169,
    brief:
      "Spreadsheets and business-system data brought together into a clear production or management report, with key changes highlighted.",
    src: "/images/dashboard.webp",
  },
  "capability-requests": {
    kind: "image",
    ratio: R169,
    brief:
      "Short loop: incoming customer emails and requests being read, classified and routed, with important details captured.",
    src: "/images/email-manager-wide.webp",
  },
  "capability-finding-answers": {
    kind: "image",
    ratio: R169,
    brief:
      "Engineer asking a question on a tablet in front of equipment, answer shown with source references.",
    src: "/images/contract-summary.webp",
  },
  "capability-closing-jobs": {
    kind: "image",
    ratio: R169,
    brief:
      "Completed job records checked for missing information and passed to finance, shown on an overview of open work.",
    src: "/images/dashboard.webp",
  },
  "capability-inspecting": {
    kind: "image",
    ratio: R169,
    brief:
      "Products moving along a bottling line under a machine-vision camera. Could be replaced later by a short loop with one product flagged for review.",
    src: "/images/bottle-inspection.webp",
  },

  // Use cases ---------------------------------------------------------------
  "use-case-document-processing": {
    kind: "image",
    ratio: R32,
    brief:
      "Purchase order or delivery note beside a screen showing the captured details, ready for review.",
  },
  "use-case-quality-documentation": {
    kind: "image",
    ratio: R32,
    brief: "Stack of quality certificates with one flagged as incomplete.",
  },
  "use-case-operational-reporting": {
    kind: "image",
    ratio: R32,
    brief:
      "Production, quality and management figures from spreadsheets and systems brought together into a clear report.",
  },
  "use-case-email-and-request-processing": {
    kind: "image",
    ratio: R32,
    brief:
      "Incoming customer emails and requests being sorted, with key details captured and a response prepared for approval.",
    src: "/images/email-manager.webp",
  },
  "use-case-find-answers-in-your-technical-documents": {
    kind: "image",
    ratio: R32,
    brief:
      "Maintenance engineer with a tablet next to a machine and a shelf of manuals.",
    src: "/images/error-code-machine.webp",
  },
  "use-case-quotation-preparation": {
    kind: "image",
    ratio: R32,
    brief:
      "Customer enquiry or RFQ beside a draft quotation on screen, drawn from existing product information and pricing, ready for review.",
  },

  // Approach timeline -------------------------------------------------------
  "approach-show-us-the-process": {
    kind: "image",
    ratio: R43,
    brief:
      "Two people on a factory floor, one explaining a process, one taking notes.",
    src: "/images/work-order.webp",
  },
  "approach-find-the-opportunity": {
    kind: "image",
    ratio: R43,
    brief: "Process map on a whiteboard with a few steps circled.",
    src: "/images/process-mapped.webp",
  },
  "approach-prove-it-works": {
    kind: "image",
    ratio: R43,
    brief:
      "Laptop showing a working prototype next to real documents or parts.",
    src: "/images/proof-value.webp",
  },
  "approach-measure-the-result": {
    kind: "image",
    ratio: R43,
    brief:
      "Team reviewing accuracy and time-saved results on a screen together.",
    src: "/images/measure-results.webp",
  },
  "approach-put-it-to-work": {
    kind: "image",
    ratio: R43,
    brief: "The finished solution in everyday use on the floor or at a desk.",
    src: "/images/to-work.webp",
  },

  // Contact -----------------------------------------------------------------
  "contact-team": {
    kind: "image",
    ratio: R169,
    brief:
      "Two or three people at a workbench or desk talking through a process, warm and unposed.",
    src: "/images/workflow.webp",
  },
} as const satisfies Record<string, MediaItem>;

export type MediaSlot = keyof typeof media;
