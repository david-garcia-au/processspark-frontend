import type { Locale } from "@/lib/i18n/config";

/**
 * The six ideas that cut across teams. Each has ONE shared explanation, shown
 * on /solutions. Team pages and the home page link to it instead of repeating
 * it. Which teams use an idea is derived from lib/teams.ts (cases that carry a
 * `capability` id), so there is a single source of truth.
 */
export type CapabilityId =
  | "knowledge"
  | "reporting"
  | "briefings"
  | "purchasing"
  | "onboarding"
  | "requests";

export type Capability = {
  id: CapabilityId;
  /** Short name, used as a label and link text. */
  title: string;
  /** One sentence that says the value. */
  headline: string;
  text: string;
  pointsLabel: string;
  points: string[];
};

export const capabilityIds: CapabilityId[] = [
  "knowledge",
  "reporting",
  "briefings",
  "purchasing",
  "onboarding",
  "requests",
];

export const capabilities: Record<Locale, Capability[]> = {
  en: [
    {
      id: "knowledge",
      title: "Company knowledge",
      headline: "Answers shouldn’t depend on who is available.",
      text: "Ask questions across approved manuals, contracts and company policies. Get answers linked to their sources, with access based on each person’s permissions.",
      pointsLabel: "Example questions",
      points: [
        "What inspection is required before releasing this batch?",
        "What does this supplier contract say about warranty?",
        "What is our process for requesting leave?",
      ],
    },
    {
      id: "reporting",
      title: "Management reporting",
      headline: "Ask the question. Get the picture.",
      text: "Bring information from spreadsheets and business systems together to answer management questions and prepare reports.",
      pointsLabel: "Example questions",
      points: [
        "Which orders are at risk of missing their delivery date?",
        "Where has overtime increased this month?",
        "Which suppliers account for the most delivery exceptions?",
      ],
    },
    {
      id: "briefings",
      title: "Scheduled briefings",
      headline: "Start the day knowing what needs attention.",
      text: "Receive a scheduled summary of overdue work, missing approvals and exceptions, with links to the underlying records. The information comes to you, so nobody has to chase it.",
      pointsLabel: "Examples",
      points: [
        "A morning briefing for an operations manager.",
        "Weekly purchasing approvals for finance.",
        "Upcoming starters and incomplete onboarding tasks for HR.",
      ],
    },
    {
      id: "purchasing",
      title: "Purchasing",
      headline: "Turn supplier quotes into purchase requests.",
      text: "Follow a purchase from the incoming document to the action, not just the extracted data.",
      pointsLabel: "How it works",
      points: [
        "Capture the supplier, items and totals from the quote.",
        "Flag missing details before anyone has to ask.",
        "Route the request to the right approver.",
      ],
    },
    {
      id: "onboarding",
      title: "Onboarding and training",
      headline: "Help new starters find their feet.",
      text: "Turn approved procedures and existing training materials into clear onboarding steps. Track outstanding tasks and give staff a place to find answers. What experienced employees know becomes something everyone can use.",
      pointsLabel: "Examples",
      points: [
        "Onboarding checklists built from approved procedures.",
        "Training material drafted from existing presentations, for review.",
        "A single view of each starter’s outstanding tasks.",
      ],
    },
    {
      id: "requests",
      title: "Incoming requests",
      headline: "Get every request to the right team.",
      text: "Identify quote requests, complaints and supplier invoices, capture the important details and route them for action. Uncertain cases go to a person for review.",
      pointsLabel: "Examples",
      points: [
        "Quote requests (RFQs) sent to sales.",
        "Complaints sent to customer service with the key details.",
        "Supplier invoices sent to finance for checking.",
      ],
    },
  ],
  es: [
    {
      id: "knowledge",
      title: "Conocimiento de la empresa",
      headline: "Las respuestas no deberían depender de quién esté disponible.",
      text: "Haz preguntas sobre manuales, contratos y políticas aprobados. Recibe respuestas con enlace a sus fuentes y con acceso según los permisos de cada persona.",
      pointsLabel: "Ejemplos de preguntas",
      points: [
        "¿Qué inspección hace falta antes de liberar este lote?",
        "¿Qué dice el contrato con este proveedor sobre la garantía?",
        "¿Cuál es el proceso para pedir vacaciones?",
      ],
    },
    {
      id: "reporting",
      title: "Informes de gestión",
      headline: "Haz la pregunta. Obtén la imagen completa.",
      text: "Reúne información de hojas de cálculo y sistemas de la empresa para responder preguntas de gestión y preparar informes.",
      pointsLabel: "Ejemplos de preguntas",
      points: [
        "¿Qué pedidos corren el riesgo de no llegar a tiempo?",
        "¿Dónde han aumentado las horas extra este mes?",
        "¿Qué proveedores acumulan más incidencias de entrega?",
      ],
    },
    {
      id: "briefings",
      title: "Resúmenes programados",
      headline: "Empieza el día sabiendo qué necesita atención.",
      text: "Recibe un resumen programado de trabajos retrasados, aprobaciones pendientes y excepciones, con enlaces a los registros. La información llega a ti, sin que nadie tenga que reclamarla.",
      pointsLabel: "Ejemplos",
      points: [
        "Un resumen matinal para el responsable de operaciones.",
        "Las aprobaciones de compras de la semana para finanzas.",
        "Próximas incorporaciones y tareas de incorporación pendientes para RR. HH.",
      ],
    },
    {
      id: "purchasing",
      title: "Compras",
      headline: "Convierte ofertas de proveedores en solicitudes de compra.",
      text: "Sigue una compra desde el documento recibido hasta la acción, no solo hasta la extracción de datos.",
      pointsLabel: "Cómo funciona",
      points: [
        "Captura proveedor, artículos e importes de la oferta.",
        "Señala los datos que faltan antes de que alguien tenga que preguntar.",
        "Envía la solicitud a la persona que debe aprobarla.",
      ],
    },
    {
      id: "onboarding",
      title: "Incorporación y formación",
      headline: "Ayuda a quien llega a situarse desde el primer día.",
      text: "Convierte procedimientos aprobados y materiales de formación existentes en pasos de incorporación claros. Controla las tareas pendientes y ofrece a las personas un lugar donde encontrar respuestas. Lo que sabe el personal con experiencia pasa a estar al alcance de todos.",
      pointsLabel: "Ejemplos",
      points: [
        "Listas de incorporación creadas a partir de procedimientos aprobados.",
        "Borradores de formación a partir de presentaciones existentes, para revisar.",
        "Una vista única de las tareas pendientes de cada persona que llega.",
      ],
    },
    {
      id: "requests",
      title: "Solicitudes entrantes",
      headline: "Lleva cada solicitud al equipo adecuado.",
      text: "Identifica solicitudes de presupuesto, reclamaciones y facturas de proveedores, captura los datos importantes y envíalos para su gestión. Los casos dudosos pasan a una persona para revisarlos.",
      pointsLabel: "Ejemplos",
      points: [
        "Solicitudes de presupuesto dirigidas a ventas.",
        "Reclamaciones dirigidas a atención al cliente con los datos clave.",
        "Facturas de proveedores dirigidas a finanzas para su revisión.",
      ],
    },
  ],
};
