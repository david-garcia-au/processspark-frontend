import type { Locale } from "@/lib/i18n/config";
/**
 * The home page "Where does your team need help?" scene (components/team-
 * explorer.tsx). Text is the production copy, unchanged. The team pages are
 * retired, so each "Explore these solutions" link goes to `href` below.
 */
export type HomeTeam = {
  id: "sales" | "finance" | "operations" | "engineering" | "people" | "leadership";
  label: string;
  summary: string;
  /** Illustrative question and reply shown in the scene. */
  prompt: { question: string; reply: string };
};
/** Where each team's link goes now (path after the language prefix). */
export const homeTeamLinks: Record<HomeTeam["id"], string> = {
  sales: "/solutions/quotes-rfqs",
  finance: "/solutions/invoice-bookkeeping",
  operations: "/solutions/digitise-paperwork",
  engineering: "/solutions/talk-to-your-documents",
  people: "/solutions/employee-service-desk",
  leadership: "/solutions/talk-to-your-data",
};
export const homeTeams: Record<Locale, HomeTeam[]> = {
  en: [
    {
      id: "sales",
      label: "Sales & customer service",
      summary:
        "Route incoming requests, automate quote generation and prevent missed follow-ups.",
      prompt: {
        question: "Which quote requests are still unanswered?",
        reply: "Open requests routed to the sales team",
      },
    },
    {
      id: "finance",
      label: "Finance & purchasing",
      summary:
        "Simplify invoice checks, purchase requests and approvals.",
      prompt: {
        question: "Which invoices don’t match their purchase order?",
        reply: "Discrepancies ready for review",
      },
    },
    {
      id: "operations",
      label: "Operations & production",
      summary:
        "Replace your paper travellers with electronic forms. Know what is on track, what is delayed and what needs attention.",
      prompt: {
        question: "Which jobs are at risk of running late today?",
        reply: "Jobs at risk flagged, each with an owner",
      },
    },
    {
      id: "engineering",
      label: "Engineering & quality",
      summary:
        "Find technical answers without searching all your documents, preserve know-how and check records.",
      prompt: {
        question: "What is an E530 error on the mechanical press and how can I fix it?",
        reply: "Cause and fix steps from the press manual",
      },
    },
    {
      id: "people",
      label: "People & HR",
      summary:
        "Answer policy questions and coordinate onboarding and training.",
      prompt: {
        question: "What is our process for requesting leave?",
        reply: "Answer from the approved policy",
      },
    },
    {
      id: "leadership",
      label: "Leadership & management",
      summary:
        "Connect information, prepare reports and deliver scheduled briefings.",
      prompt: {
        question: "Where has overtime increased this month?",
        reply: "Summary ready, by department",
      },
    },
  ],
  es: [
    {
      id: "sales",
      label: "Ventas y atención al cliente",
      summary:
        "Enruta y controla tus correos entrantes, automatiza la preparación de presupuestos y evita seguimientos olvidados.",
      prompt: {
        question: "¿Qué solicitudes de presupuesto siguen sin respuesta?",
        reply: "Solicitudes pendientes asignadas a ventas",
      },
    },
    {
      id: "finance",
      label: "Finanzas y compras",
      summary:
        "Simplifica la revisión de facturas, las solicitudes de compra y las aprobaciones.",
      prompt: {
        question: "¿Qué facturas no coinciden con su pedido?",
        reply: "Discrepancias listas para revisar",
      },
    },
    {
      id: "operations",
      label: "Operaciones y producción",
      summary:
        "Sustituye tus hojas de ruta en papel por formularios electrónicos. Conoce qué va en plazo, qué se retrasa y qué necesita atención.",
      prompt: {
        question: "¿Qué trabajos corren el riesgo de retrasarse hoy?",
        reply: "Trabajos en riesgo señalados, cada uno con su responsable",
      },
    },
    {
      id: "engineering",
      label: "Ingeniería y calidad",
      summary:
        "Encuentra respuestas técnicas sin buscar en todos tus documentos, conserva el conocimiento y revisa los registros.",
      prompt: {
        question: "¿Qué es el error E530 de la prensa mecánica y cómo lo soluciono?",
        reply: "Causa y pasos para solucionarlo, según el manual de la prensa",
      },
    },
    {
      id: "people",
      label: "Personas y RR. HH.",
      summary:
        "Responde preguntas sobre políticas y coordina incorporaciones y formación.",
      prompt: {
        question: "¿Cuál es el proceso para pedir vacaciones?",
        reply: "Respuesta basada en la política aprobada",
      },
    },
    {
      id: "leadership",
      label: "Dirección y gestión",
      summary:
        "Conecta la información, prepara informes y envía resúmenes programados.",
      prompt: {
        question: "¿Dónde han aumentado las horas extra este mes?",
        reply: "Resumen listo, por departamento",
      },
    },
  ],
};
