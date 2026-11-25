/**
 * The demo page: every scripted demo in one place, filterable by product and
 * by team. Each demo lists the products it shows and the teams it is for; a
 * demo can sit under more than one of each. The demos themselves (scripts,
 * EN/ES) live in lib/crm-demo.ts and lib/quotes-demo.ts and can also appear on
 * their solution page.
 */
import type { ProductId } from "@/lib/catalogue";
import type { Locale } from "@/lib/i18n/config";

export const demoTeamIds = ["service", "quality", "contracts", "projects", "finance", "people", "sales"] as const;
export type DemoTeamId = (typeof demoTeamIds)[number];

/** Which player renders the demo, and with which script. */
export type DemoKind = "docs-manuals" | "docs-contracts" | "quotes" | "desk" | "invoices" | "forms" | "ncr";

export type DemoEntry = {
  id: string;
  kind: DemoKind;
  products: readonly ProductId[];
  teams: readonly DemoTeamId[];
};

/** Display order on the page. */
export const demoEntries: readonly DemoEntry[] = [
  {
    id: "manuals",
    kind: "docs-manuals",
    products: ["talk-to-your-documents"],
    teams: ["service"],
  },
  {
    id: "contracts",
    kind: "docs-contracts",
    products: ["talk-to-your-documents"],
    teams: ["contracts", "projects", "finance"],
  },
  {
    id: "quotes",
    kind: "quotes",
    products: ["quotes-rfqs"],
    teams: ["sales"],
  },
  {
    id: "service-desk",
    kind: "desk",
    products: ["employee-service-desk"],
    teams: ["people"],
  },
  {
    id: "invoices",
    kind: "invoices",
    products: ["invoice-bookkeeping"],
    teams: ["finance", "projects"],
  },
  {
    id: "non-conformance",
    kind: "ncr",
    products: ["digitise-paperwork"],
    teams: ["quality"],
  },
  {
    id: "inspection-form",
    kind: "forms",
    products: ["digitise-paperwork"],
    teams: ["service"],
  },
];

export type DemoGalleryCopy = {
  title: string;
  description: string;
  heading: { line1: string; line2: string };
  lead: string;
  filters: {
    label: string;
    product: string;
    team: string;
    all: string;
  };
  empty: string;
  showAll: string;
  teams: Record<DemoTeamId, string>;
};

export const demoGalleryCopy: Record<Locale, DemoGalleryCopy> = {
  en: {
    title: "See it in action: interactive demos",
    description:
      "Short interactive demos of ProcessSpark solutions: talk to your manuals and contracts, answer requests for quote with a priced draft, and answer staff questions and requests.",
    heading: { line1: "See it", line2: "in action" },
    lead: "Short scripted demos of real tasks. Pick a product or a team, then press Run the demo.",
    filters: {
      label: "Filter the demos",
      product: "Product",
      team: "Team",
      all: "All",
    },
    empty: "There is no demo for this combination yet.",
    showAll: "Show all demos",
    teams: {
      service: "Service & maintenance",
      quality: "Quality",
      contracts: "Contracts",
      projects: "Project management",
      finance: "Finance",
      people: "People & HR",
      sales: "Sales",
    },
  },
  es: {
    title: "Míralo en acción: demos interactivas",
    description:
      "Demos interactivas y breves de las soluciones de ProcessSpark: habla con tus manuales y contratos, responde solicitudes de oferta con un borrador con precios y atiende las preguntas y solicitudes de la plantilla.",
    heading: { line1: "Míralo", line2: "en acción" },
    lead: "Demos breves de tareas reales. Elige un producto o un equipo y pulsa Ver la demo.",
    filters: {
      label: "Filtrar las demos",
      product: "Producto",
      team: "Equipo",
      all: "Todas",
    },
    empty: "Todavía no hay una demo para esta combinación.",
    showAll: "Ver todas las demos",
    teams: {
      service: "Servicio y mantenimiento",
      quality: "Calidad",
      contracts: "Contratos",
      projects: "Gestión de proyectos",
      finance: "Finanzas",
      people: "Personas y RR. HH.",
      sales: "Ventas",
    },
  },
};
