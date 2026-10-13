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
    alt: "Operations team handling a busy shift on the factory floor",
  },
  "pain-quality-manufacturing": {
    kind: "image",
    ratio: R32,
    label: "Inspector checking product and records",
    brief:
      "Quality inspector checking a product by eye with a paper record in hand. Close, tactile, shallow depth of field.",
    alt: "Quality inspector checking a product against a paper record",
  },
  "pain-service-maintenance": {
    kind: "image",
    ratio: R32,
    label: "Technician writing up a job",
    brief:
      "Service technician beside equipment, writing notes after a job. Phone or tablet in hand, workshop or site setting.",
    alt: "Service technician writing up notes after a maintenance job",
  },

  // Process explorer (one per capability) -----------------------------------
  "capability-looking": {
    kind: "video",
    ratio: R169,
    label: "Camera inspecting products on a line",
    brief:
      "Short loop: products moving under a machine-vision camera, one flagged for review. Subtle, realistic.",
    alt: "Camera inspecting products on a production line",
  },
  "capability-reading": {
    kind: "image",
    ratio: R169,
    label: "Documents read and checked automatically",
    brief:
      "Supplier certificate beside a structured on-screen table of extracted fields with one discrepancy highlighted.",
    alt: "Certificate being read with extracted fields shown on screen",
  },
  "capability-typing": {
    kind: "video",
    ratio: R169,
    label: "Information entered once, used everywhere",
    brief:
      "Short loop: a job record captured once and appearing in connected systems. Screen capture style.",
    alt: "A job record captured once and updating connected systems",
  },
  "capability-searching": {
    kind: "image",
    ratio: R169,
    label: "A question answered from company manuals",
    brief:
      "Engineer asking a question on a tablet in front of equipment, answer shown with source references.",
    alt: "Engineer asking a technical question and receiving a sourced answer",
  },
  "capability-writing": {
    kind: "image",
    ratio: R169,
    label: "Photos and notes becoming a report",
    brief:
      "Phone showing job photos and a voice note, next to a structured service report draft ready for approval.",
    alt: "Job photos and notes turned into a structured service report",
  },
  "capability-talking": {
    kind: "video",
    ratio: R169,
    label: "A service request captured and routed",
    brief:
      "Short loop: a customer request being captured with equipment context and handed to a person.",
    alt: "A service request captured with context and handed to a person",
  },
  "capability-monitoring": {
    kind: "image",
    ratio: R169,
    label: "Equipment data flagging unusual behaviour",
    brief:
      "Plant equipment with a calm dashboard overlay showing a trend and a single early alert.",
    alt: "Equipment monitoring dashboard flagging unusual behaviour early",
  },

  // Use cases ---------------------------------------------------------------
  "use-case-visual-quality-inspection": {
    kind: "image",
    ratio: R32,
    label: "Product checked for defects",
    brief: "Close view of a product on a line under inspection lighting.",
    alt: "Product being checked for defects on a production line",
  },
  "use-case-quality-record-review": {
    kind: "image",
    ratio: R32,
    label: "Certificates reviewed for gaps",
    brief: "Stack of quality certificates with one flagged as incomplete.",
    alt: "Quality certificates being reviewed for incomplete information",
  },
  "use-case-field-service-reporting": {
    kind: "image",
    ratio: R32,
    label: "Photos and dictated notes on site",
    brief: "Technician photographing equipment on site and dictating notes.",
    alt: "Technician capturing photos and notes for a service report",
  },
  "use-case-shipment-document-processing": {
    kind: "image",
    ratio: R32,
    label: "Delivery documents captured once",
    brief: "Delivery notes and pallets at a dock, a scanner or phone capturing a document.",
    alt: "Delivery documents being captured at a loading dock",
  },
  "use-case-technical-knowledge-assistant": {
    kind: "image",
    ratio: R32,
    label: "Answers from manuals and records",
    brief: "Maintenance engineer with a tablet next to a machine and a shelf of manuals.",
    alt: "Maintenance engineer finding answers across manuals and service records",
  },
  "use-case-intelligent-service-intake": {
    kind: "image",
    ratio: R32,
    label: "Request captured before it reaches the team",
    brief: "Service desk or phone intake with equipment details appearing on screen.",
    alt: "Service request captured with equipment context at intake",
  },

  // Approach (dark section) -------------------------------------------------
  "approach-show-us-the-process": {
    kind: "image",
    ratio: R43,
    label: "Walking the process on site",
    brief: "Two people on a factory floor, one explaining a process, one taking notes.",
    alt: "Walking through a process on the factory floor",
  },
  "approach-find-the-opportunity": {
    kind: "image",
    ratio: R43,
    label: "Process mapped on a whiteboard",
    brief: "Process map on a whiteboard with a few steps circled.",
    alt: "Process mapped on a whiteboard with opportunities circled",
  },
  "approach-prove-it-works": {
    kind: "image",
    ratio: R43,
    label: "Proof of value on real data",
    brief: "Laptop showing a working prototype next to real documents or parts.",
    alt: "Prototype running on real documents and parts",
  },
  "approach-measure-the-result": {
    kind: "image",
    ratio: R43,
    label: "Accuracy and time saved reviewed",
    brief: "Team reviewing accuracy and time-saved results on a screen together.",
    alt: "Team reviewing accuracy and time saved results together",
  },
  "approach-put-it-to-work": {
    kind: "image",
    ratio: R43,
    label: "Solution running in daily operations",
    brief: "The finished solution in everyday use on the floor or at a desk.",
    alt: "Solution in everyday use in daily operations",
  },

  // Contact -----------------------------------------------------------------
  "contact-team": {
    kind: "image",
    ratio: R169,
    label: "People talking through a process",
    brief: "Two or three people at a workbench or desk talking through a process, warm and unposed.",
    alt: "People talking through a process together",
  },
};
