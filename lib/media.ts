/**
 * Media slots: every place on the site reserved for an image or a video.
 *
 * Until an asset exists a slot renders a labelled placeholder with the right
 * aspect ratio, so layouts are reviewable now. To go live, drop the file in
 * /public and set `src` (and `poster` for videos). Nothing else changes.
 *
 * Images: WebP/AVIF/JPEG, at least 1600px wide for 16:9 and 3:2 slots.
 * Videos: MP4 (H.264) under ~8 MB, 10 to 20 seconds, no audio needed.
 */
export type MediaKind = "image" | "video";

export type MediaItem = {
  kind: MediaKind;
  /** CSS aspect-ratio value, for example "16 / 9". */
  ratio: string;
  /** Short name shown on the placeholder. */
  label: string;
  /** Art direction for whoever creates the asset. Not rendered. */
  brief: string;
  /** Alt text (images) or accessible label (videos) once an asset exists. */
  alt: string;
  /** Public path of the finished asset, for example "/images/foo.webp". */
  src?: string;
  /** Poster frame for videos. */
  poster?: string;
};

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const R169 = "16 / 9";
const R32 = "3 / 2";
const R43 = "4 / 3";

export const media: Record<string, MediaItem> = {
  // Pain points ------------------------------------------------------------
  "pain-operations": {
    kind: "image",
    ratio: R32,
    label: "Team under pressure on a busy floor",
    brief:
      "Operations lead on a busy warehouse or production floor, surrounded by work waiting to be done. Natural light, documentary feel.",
    alt: "Warehouse manager checking stock against a clipboard beside tall pallet racking",
    src: "/images/warehouse-manager.webp",
  },
  "pain-quality-manufacturing": {
    kind: "image",
    ratio: R32,
    label: "Inspector checking product and records",
    brief:
      "Quality inspector checking a product by eye with a paper record in hand. Close, tactile, shallow depth of field.",
    alt: "Quality inspector filling in a paper record beside machined parts on a production line",
    src: "/images/manufacturing-traveller.webp",
  },
  "pain-service-maintenance": {
    kind: "image",
    ratio: R32,
    label: "Technician writing up a job",
    brief:
      "Service technician beside equipment, writing notes after a job. Phone or tablet in hand, workshop or site setting.",
    alt: "Service technician with a multimeter reviewing a job sheet beside a boiler",
    src: "/images/boiler-room.webp",
  },

  // Process explorer (one per capability) -----------------------------------
  "capability-documents": {
    kind: "image",
    ratio: R169,
    label: "Documents read and checked automatically",
    brief:
      "Supplier certificate beside a structured on-screen table of extracted fields with one discrepancy highlighted.",
    alt: "A paper inspection record with its handwritten fields highlighted, next to a panel listing the extracted information: part number, description, date, batch number, measurements, visual inspection result, inspector and time",
    src: "/images/paper-form-fields.webp",
  },
  "capability-reporting": {
    kind: "image",
    ratio: R169,
    label: "Information brought together into a report",
    brief:
      "Spreadsheets and business-system data brought together into a clear production or management report, with key changes highlighted.",
    alt: "A person at a desk in a factory reviewing a production overview dashboard with output, quality by line, recent orders and open issues",
    src: "/images/dashboard.webp",
  },
  "capability-requests": {
    kind: "image",
    ratio: R169,
    label: "Emails and requests sorted and routed",
    brief:
      "Short loop: incoming customer emails and requests being read, classified and routed, with important details captured.",
    src: "/images/email-manager-wide.webp",
    alt: "Person reviewing a ProcessSpark inbox on a monitor, with an AI-drafted reply, extracted key details and an Approve and send button",
  },
  "capability-searching": {
    kind: "image",
    ratio: R169,
    label: "A question answered from company manuals",
    brief:
      "Engineer asking a question on a tablet in front of equipment, answer shown with source references.",
    alt: "A person at a desk asking an assistant to summarise a supply agreement, with the contract on one side and the key details listed on the other",
    src: "/images/contract-summary.webp",
  },
  "capability-writing": {
    kind: "image",
    ratio: R169,
    label: "A draft quotation prepared for review",
    brief:
      "Customer enquiry or RFQ beside a draft quotation on screen, with product information and pricing drawn from approved sources, ready for review.",
    alt: "A draft quotation prepared from a customer enquiry for review",
  },
  "capability-talking": {
    kind: "video",
    ratio: R169,
    label: "Voice notes and photos becoming a report",
    brief:
      "Short loop: a technician's voice notes and job photos turned into a structured service report ready for approval.",
    alt: "Voice notes and photos turned into a structured service report",
  },
  "capability-inspecting": {
    kind: "image",
    ratio: R169,
    label: "Camera inspecting products on a line",
    brief:
      "Products moving along a bottling line under a machine-vision camera. Could be replaced later by a short loop with one product flagged for review.",
    alt: "A machine-vision camera mounted above amber glass bottles moving along a bottling line",
    src: "/images/bottle-inspection.webp",
  },

  // Use cases ---------------------------------------------------------------
  "use-case-document-processing": {
    kind: "image",
    ratio: R32,
    label: "Document details captured automatically",
    brief: "Purchase order or delivery note beside a screen showing the captured details, ready for review.",
    alt: "Information captured from a purchase order or delivery note",
  },
  "use-case-quality-documentation": {
    kind: "image",
    ratio: R32,
    label: "Certificates reviewed for gaps",
    brief: "Stack of quality certificates with one flagged as incomplete.",
    alt: "Quality certificates being reviewed for incomplete information",
  },
  "use-case-operational-reporting": {
    kind: "image",
    ratio: R32,
    label: "Reports prepared from existing data",
    brief: "Production, quality and management figures from spreadsheets and systems brought together into a clear report.",
    alt: "Operational report prepared from spreadsheets and business systems",
  },
  "use-case-email-and-request-processing": {
    kind: "image",
    ratio: R32,
    label: "Enquiries sorted and prepared for the team",
    brief: "Incoming customer emails and requests being sorted, with key details captured and a response prepared for approval.",
    src: "/images/email-manager.webp",
    alt: "Person reviewing a ProcessSpark inbox on a monitor, with an AI-drafted reply, extracted key details and an Approve and send button",
  },
  "use-case-find-answers-in-your-technical-documents": {
    kind: "image",
    ratio: R32,
    label: "Answers from manuals and records",
    brief: "Maintenance engineer with a tablet next to a machine and a shelf of manuals.",
    src: "/images/error-code-machine.webp",
    alt: "Maintenance engineer asking the ProcessSpark Assistant about error code E-102 on a pump, with the answer and manual references on a tablet",
  },
  "use-case-quotation-preparation": {
    kind: "image",
    ratio: R32,
    label: "RFQ turned into a draft quotation",
    brief: "Customer enquiry or RFQ beside a draft quotation on screen, drawn from existing product information and pricing, ready for review.",
    alt: "Customer enquiry turned into a draft quotation for review",
  },

  // Approach (dark section) -------------------------------------------------
  "approach-show-us-the-process": {
    kind: "image",
    ratio: R43,
    label: "Walking the process on site",
    brief: "Two people on a factory floor, one explaining a process, one taking notes.",
    src: "/images/work-order.webp",
    alt: "A stack of handwritten work orders with three callouts: manual checks, repetitive data entry and multiple systems",
  },
  "approach-find-the-opportunity": {
    kind: "image",
    ratio: R43,
    label: "Process mapped on a whiteboard",
    brief: "Process map on a whiteboard with a few steps circled.",
    src: "/images/process-mapped.webp",
    alt: "A process analysis listing five manual steps with priority and time per request, and a highlighted biggest opportunity: automate data extraction from incoming requests",
  },
  "approach-prove-it-works": {
    kind: "image",
    ratio: R43,
    label: "Proof of value on real data",
    brief: "Laptop showing a working prototype next to real documents or parts.",
    src: "/images/proof-value.webp",
    alt: "A test of a solution using an email, a PDF and a form as input, with the capture, AI processing and send steps completed and a sample result, next to a five-step flow from incoming request to team notification",
  },
  "approach-measure-the-result": {
    kind: "image",
    ratio: R43,
    label: "Accuracy and time saved reviewed",
    brief: "Team reviewing accuracy and time-saved results on a screen together.",
    src: "/images/measure-results.webp",
    alt: "A results dashboard showing time per request falling from 52 to 7 minutes with AI, alongside 87% time saved, 99% accuracy and 70% fewer errors, and three additional benefits",
  },
  "approach-put-it-to-work": {
    kind: "image",
    ratio: R43,
    label: "Solution running in daily operations",
    brief: "The finished solution in everyday use on the floor or at a desk.",
    src: "/images/to-work.webp",
    alt: "A 'Put it to work' checklist showing the solution connected to your systems, ready for your team and delivering value every day, linked to ERP, MES, CMMS, files and documents, and email, all marked connected, with a 'Solution live' notice",
  },

  // Contact -----------------------------------------------------------------
  "contact-team": {
    kind: "image",
    ratio: R169,
    label: "People talking through a process",
    brief: "Two or three people at a workbench or desk talking through a process, warm and unposed.",
    src: "/images/workflow.webp",
    alt: "A team in a meeting room while one person points to a whiteboard comparing the current email-handling process with an improved process using AI",
  },
};
