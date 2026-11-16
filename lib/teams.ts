import type { Locale } from "@/lib/i18n/config";
import type { CapabilityId } from "@/lib/capabilities";

export type TeamId =
  | "operations"
  | "engineering"
  | "sales"
  | "finance"
  | "people"
  | "leadership";

export const teamIds: TeamId[] = [
  "sales",
  "finance",
  "operations",
  "engineering",
  "people",
  "leadership",
];

export type TeamCase = {
  title: string;
  text: string;
  /** Links the case to the one shared explanation on /solutions. */
  capability?: CapabilityId;
};

export type Team = {
  id: TeamId;
  label: string;
  /** The problem this team leads with. One sentence, plain language. */
  problem: string;
  /** What we do for this team, as shown in the home page scene. */
  summary: string;
  /** Short examples for overview cards. */
  examples: string[];
  /** Illustrative question and reply shown on the home page scene. */
  prompt: { question: string; reply: string };
  /** Full list, shown on the team's own page. */
  cases: TeamCase[];
};

export const teams: Record<Locale, Team[]> = {
  en: [
    {
      id: "sales",
      label: "Sales & customer service",
      problem: "Keep enquiries moving from first request to follow-through.",
      summary:
        "Route incoming requests, automate quote generation and prevent missed follow-ups.",
      examples: [
        "Classify incoming emails",
        "Route complaints and RFQs",
        "Prepare quotations",
        "Track unanswered requests",
      ],
      prompt: {
        question: "Which quote requests are still unanswered?",
        reply: "Open requests routed to the sales team",
      },
      cases: [
        {
          title: "Route incoming requests",
          text: "Identify RFQs, complaints and other enquiries, capture key details and send them to the right team.",
          capability: "requests",
        },
        {
          title: "Prepare quotations",
          text: "Bring customer requirements, product information and pricing into a draft for review.",
        },
        {
          title: "Keep promises visible",
          text: "Track unanswered requests, customer calls and agreed follow-up actions.",
        },
        {
          title: "Share order updates",
          text: "Bring order status into a shared view so customers get answers without repeated calls.",
        },
      ],
    },
    {
      id: "finance",
      label: "Finance & purchasing",
      problem:
        "Move purchases and payments forward with less checking and chasing.",
      summary:
        "Simplify invoice checks, purchase requests and approvals.",
      examples: [
        "Invoice matching",
        "Expense checks",
        "Purchase requests from supplier quotes",
        "Approvals and completed-job handovers",
      ],
      prompt: {
        question: "Which invoices don’t match their purchase order?",
        reply: "Discrepancies ready for review",
      },
      cases: [
        {
          title: "Check supplier invoices",
          text: "Extract invoice details, compare them with orders and flag discrepancies for review.",
          capability: "requests",
        },
        {
          title: "Turn quotes into purchase requests",
          text: "Capture supplier details, items and totals, then route the request to the right approver.",
          capability: "purchasing",
        },
        {
          title: "Prepare jobs for invoicing",
          text: "Bring completed job records, approved reports and outstanding checks together for finance.",
        },
        {
          title: "Review expenses",
          text: "Check submitted details against agreed rules and highlight exceptions for approval.",
        },
        {
          title: "Find contract answers",
          text: "Ask about terms, obligations and renewal dates, with references to the relevant clauses.",
          capability: "knowledge",
        },
        {
          title: "Review the week’s approvals",
          text: "Receive a weekly summary of purchase approvals waiting and invoices that need a decision.",
          capability: "briefings",
        },
      ],
    },
    {
      id: "operations",
      label: "Operations & production",
      problem: "Know what is happening before a delay becomes a problem.",
      summary:
        "Replace your paper travellers with electronic forms. Know what is on track, what is delayed and what needs attention.",
      examples: [
        "Job progress",
        "Shift handovers",
        "Outstanding actions",
        "Daily production briefings and exceptions",
      ],
      prompt: {
        question: "Which jobs are at risk of running late today?",
        reply: "Jobs at risk flagged, each with an owner",
      },
      cases: [
        {
          title: "See job progress",
          text: "Connect order stages, materials and outstanding tasks so your team can identify delays.",
        },
        {
          title: "Keep shifts connected",
          text: "Record faults, handover notes and actions with a clear owner for the next shift.",
        },
        {
          title: "Capture once, at the source",
          text: "Replace paper logs with digital forms and capture equipment details from barcodes or nameplates.",
        },
        {
          title: "Check incoming goods",
          text: "Match deliveries to purchase orders and supplier certificates, flagging missing details before handover.",
        },
        {
          title: "Verify dispatch",
          text: "Check picked items and quantities against the order before goods leave the warehouse.",
        },
        {
          title: "Start the shift with a briefing",
          text: "Get a scheduled summary of late jobs, open actions and exceptions before the day begins.",
          capability: "briefings",
        },
      ],
    },
    {
      id: "engineering",
      label: "Engineering & quality",
      problem:
        "Find the right answer without searching every document, or interrupting the same expert.",
      summary:
        "Find technical answers without searching all your documents, preserve know-how and check records.",
      examples: [
        "Manuals and specifications",
        "Approved procedures",
        "Supplier certificates",
        "Inspection records",
        "Engineering changes",
      ],
      prompt: {
        question:
          "What is an E530 error on the mechanical press and how can I fix it?",
        reply: "Cause and fix steps from the press manual",
      },
      cases: [
        {
          title: "Search manuals and specifications",
          text: "Ask everyday questions across approved documents, with answers linked to their sources.",
          capability: "knowledge",
        },
        {
          title: "Make experience accessible",
          text: "Turn experienced staff’s know-how into searchable procedures and guided checks.",
        },
        {
          title: "Keep quality records together",
          text: "Link inspections, supplier certificates and nonconformances to the right batch or job.",
        },
        {
          title: "Share engineering changes",
          text: "Help teams find the current drawing and track outstanding acknowledgements.",
        },
        {
          title: "Support visual checks",
          text: "Identify visible defects for review, using checks validated against your products.",
        },
      ],
    },
    {
      id: "people",
      label: "People & HR",
      problem:
        "Spend less time answering repeated questions and coordinating routine tasks.",
      summary:
        "Answer policy questions and coordinate onboarding and training.",
      examples: [
        "Policy questions",
        "Onboarding checklists",
        "Training materials",
        "Recruitment administration",
        "Staffing visibility",
      ],
      prompt: {
        question: "What is our process for requesting leave?",
        reply: "Answer from the approved policy",
      },
      cases: [
        {
          title: "Answer policy questions",
          text: "Search approved company policies in everyday language, respecting access permissions.",
          capability: "knowledge",
        },
        {
          title: "Coordinate onboarding",
          text: "Track new-starter tasks, equipment requests and handovers between teams.",
          capability: "onboarding",
        },
        {
          title: "Reuse training knowledge",
          text: "Turn approved procedures and existing presentations into draft training materials for review.",
          capability: "onboarding",
        },
        {
          title: "Simplify recruitment administration",
          text: "Prepare role descriptions, organise applicant information and coordinate interview tasks.",
        },
        {
          title: "See staffing gaps",
          text: "Bring available attendance and roster data together to highlight coverage issues for managers.",
        },
        {
          title: "Know who starts next",
          text: "Receive a scheduled list of upcoming starters and the onboarding tasks still open for each.",
          capability: "briefings",
        },
      ],
    },
    {
      id: "leadership",
      label: "Leadership & management",
      problem: "Get a clear picture without waiting for someone to compile it.",
      summary:
        "Connect information, prepare reports and deliver scheduled briefings.",
      examples: [
        "Consolidated reports",
        "Questions across business data",
        "Scheduled briefings",
        "Alerts about emerging issues",
      ],
      prompt: {
        question: "Where has overtime increased this month?",
        reply: "Summary ready, by department",
      },
      cases: [
        {
          title: "Ask questions across your data",
          text: "Bring spreadsheets and business systems together to explore costs, workload and performance.",
          capability: "reporting",
        },
        {
          title: "Receive scheduled briefings",
          text: "Get a scheduled summary of delayed work, missing approvals and exceptions, linked to the records.",
          capability: "briefings",
        },
        {
          title: "Prepare management reports",
          text: "Consolidate information into reports and charts using agreed measures.",
          capability: "reporting",
        },
        {
          title: "Spot changes that need attention",
          text: "Track trends such as overtime, late orders or supplier issues and flag agreed thresholds.",
        },
      ],
    },
  ],
  es: [
    {
      id: "sales",
      label: "Ventas y atención al cliente",
      problem:
        "Haz que cada consulta avance desde la primera solicitud hasta el seguimiento.",
      summary:
        "Enruta y controla tus correos entrantes, automatiza la preparación de presupuestos y evita seguimientos olvidados.",
      examples: [
        "Clasificar los correos entrantes",
        "Dirigir reclamaciones y solicitudes de presupuesto",
        "Preparar presupuestos",
        "Seguir las solicitudes sin respuesta",
      ],
      prompt: {
        question: "¿Qué solicitudes de presupuesto siguen sin respuesta?",
        reply: "Solicitudes pendientes asignadas a ventas",
      },
      cases: [
        {
          title: "Dirige las solicitudes al equipo adecuado",
          text: "Identifica solicitudes de presupuesto, reclamaciones y consultas, extrae sus datos y asígnalas.",
          capability: "requests",
        },
        {
          title: "Prepara presupuestos",
          text: "Reúne requisitos, información de producto y precios en un borrador para revisar.",
        },
        {
          title: "Haz seguimiento de los compromisos",
          text: "Controla consultas sin respuesta, llamadas y acciones de seguimiento acordadas.",
        },
        {
          title: "Comparte el estado de los pedidos",
          text: "Reúne el estado de los pedidos para responder al cliente sin llamadas repetidas.",
        },
      ],
    },
    {
      id: "finance",
      label: "Finanzas y compras",
      problem:
        "Haz avanzar compras y pagos con menos comprobaciones y sin tener que ir detrás de nadie.",
      summary:
        "Simplifica la revisión de facturas, las solicitudes de compra y las aprobaciones.",
      examples: [
        "Cotejo de facturas",
        "Revisión de gastos",
        "Solicitudes de compra a partir de ofertas",
        "Aprobaciones y traspaso de trabajos terminados",
      ],
      prompt: {
        question: "¿Qué facturas no coinciden con su pedido?",
        reply: "Discrepancias listas para revisar",
      },
      cases: [
        {
          title: "Comprueba facturas de proveedores",
          text: "Extrae los datos, compáralos con los pedidos y señala discrepancias para revisar.",
          capability: "requests",
        },
        {
          title: "Convierte ofertas en solicitudes de compra",
          text: "Captura proveedor, artículos e importes y envía la solicitud al responsable de aprobarla.",
          capability: "purchasing",
        },
        {
          title: "Prepara trabajos para facturar",
          text: "Reúne partes de trabajo, informes aprobados y comprobaciones pendientes para finanzas.",
        },
        {
          title: "Revisa gastos",
          text: "Contrasta los datos con las reglas acordadas y destaca excepciones para su aprobación.",
        },
        {
          title: "Consulta contratos",
          text: "Pregunta por condiciones, obligaciones y renovaciones con referencias a las cláusulas.",
          capability: "knowledge",
        },
        {
          title: "Revisa las aprobaciones de la semana",
          text: "Recibe un resumen semanal de aprobaciones de compra pendientes y facturas que requieren una decisión.",
          capability: "briefings",
        },
      ],
    },
    {
      id: "operations",
      label: "Operaciones y producción",
      problem:
        "Detecta los retrasos antes de que se conviertan en un problema.",
      summary:
        "Sustituye tus hojas de ruta en papel por formularios electrónicos. Conoce qué va en plazo, qué se retrasa y qué necesita atención.",
      examples: [
        "Avance de los trabajos",
        "Relevo de turnos",
        "Acciones pendientes",
        "Resúmenes diarios de producción y excepciones",
      ],
      prompt: {
        question: "¿Qué trabajos corren el riesgo de retrasarse hoy?",
        reply: "Trabajos en riesgo señalados, cada uno con su responsable",
      },
      cases: [
        {
          title: "Consulta el avance de los trabajos",
          text: "Conecta las etapas de cada pedido, los materiales y las tareas pendientes para detectar retrasos.",
        },
        {
          title: "Conecta los turnos",
          text: "Registra incidencias, notas de relevo y acciones con un responsable para el siguiente turno.",
        },
        {
          title: "Captura los datos una sola vez",
          text: "Sustituye registros en papel por formularios digitales y captura datos de códigos de barras o placas.",
        },
        {
          title: "Comprueba las mercancías recibidas",
          text: "Contrasta entregas, pedidos y certificados, y señala datos pendientes antes del traspaso.",
        },
        {
          title: "Verifica las expediciones",
          text: "Comprueba los artículos y cantidades preparados frente al pedido antes de enviarlos.",
        },
        {
          title: "Empieza el turno con un resumen",
          text: "Recibe un resumen programado de trabajos retrasados, acciones abiertas y excepciones antes de empezar.",
          capability: "briefings",
        },
      ],
    },
    {
      id: "engineering",
      label: "Ingeniería y calidad",
      problem:
        "Encuentra la respuesta correcta sin revisar todos los documentos ni interrumpir siempre al mismo experto.",
      summary:
        "Encuentra respuestas técnicas sin buscar en todos tus documentos, conserva el conocimiento y revisa los registros.",
      examples: [
        "Manuales y especificaciones",
        "Procedimientos aprobados",
        "Certificados de proveedores",
        "Registros de inspección",
        "Cambios de ingeniería",
      ],
      prompt: {
        question:
          "¿Qué es el error E530 de la prensa mecánica y cómo lo soluciono?",
        reply: "Causa y pasos para solucionarlo, según el manual de la prensa",
      },
      cases: [
        {
          title: "Consulta manuales y especificaciones",
          text: "Haz preguntas sobre documentos aprobados y recibe respuestas con referencias a las fuentes.",
          capability: "knowledge",
        },
        {
          title: "Comparte la experiencia",
          text: "Convierte el conocimiento del personal experto en procedimientos consultables y comprobaciones guiadas.",
        },
        {
          title: "Reúne los registros de calidad",
          text: "Vincula inspecciones, certificados y no conformidades al lote o trabajo correspondiente.",
        },
        {
          title: "Comunica cambios de ingeniería",
          text: "Facilita el acceso al plano vigente y el seguimiento de las confirmaciones pendientes.",
        },
        {
          title: "Apoya las inspecciones visuales",
          text: "Identifica defectos visibles para su revisión mediante comprobaciones validadas con tus productos.",
        },
      ],
    },
    {
      id: "people",
      label: "Personas y RR. HH.",
      problem:
        "Dedica menos tiempo a responder las mismas preguntas y a coordinar tareas rutinarias.",
      summary:
        "Responde preguntas sobre políticas y coordina incorporaciones y formación.",
      examples: [
        "Preguntas sobre políticas",
        "Listas de incorporación",
        "Materiales de formación",
        "Administración de selección",
        "Visibilidad del personal",
      ],
      prompt: {
        question: "¿Cuál es el proceso para pedir vacaciones?",
        reply: "Respuesta basada en la política aprobada",
      },
      cases: [
        {
          title: "Responde preguntas sobre políticas",
          text: "Consulta políticas aprobadas con lenguaje natural y respetando los permisos de acceso.",
          capability: "knowledge",
        },
        {
          title: "Coordina incorporaciones",
          text: "Controla tareas, solicitudes de equipos y traspasos entre departamentos.",
          capability: "onboarding",
        },
        {
          title: "Reutiliza el conocimiento para formar",
          text: "Convierte procedimientos y presentaciones en borradores de formación para revisar.",
          capability: "onboarding",
        },
        {
          title: "Simplifica la administración de selección",
          text: "Prepara descripciones de puestos, organiza candidaturas y coordina entrevistas.",
        },
        {
          title: "Identifica necesidades de personal",
          text: "Reúne datos disponibles de asistencia y turnos para señalar problemas de cobertura.",
        },
        {
          title: "Sabe quién se incorpora",
          text: "Recibe una lista programada de las próximas incorporaciones y de las tareas pendientes de cada una.",
          capability: "briefings",
        },
      ],
    },
    {
      id: "leadership",
      label: "Dirección y gestión",
      problem: "Ten una visión clara sin esperar a que alguien la prepare.",
      summary:
        "Conecta la información, prepara informes y envía resúmenes programados.",
      examples: [
        "Informes consolidados",
        "Preguntas sobre los datos del negocio",
        "Resúmenes programados",
        "Avisos sobre problemas incipientes",
      ],
      prompt: {
        question: "¿Dónde han aumentado las horas extra este mes?",
        reply: "Resumen listo, por departamento",
      },
      cases: [
        {
          title: "Pregunta sobre los datos de tu negocio",
          text: "Conecta hojas de cálculo y sistemas para analizar costes, carga de trabajo y rendimiento.",
          capability: "reporting",
        },
        {
          title: "Recibe resúmenes programados",
          text: "Consulta retrasos, aprobaciones pendientes y excepciones con enlaces a los registros.",
          capability: "briefings",
        },
        {
          title: "Prepara informes de gestión",
          text: "Consolida información en informes y gráficos con indicadores acordados.",
          capability: "reporting",
        },
        {
          title: "Detecta cambios relevantes",
          text: "Sigue tendencias de horas extra, pedidos o proveedores y avisa al superar los umbrales acordados.",
        },
      ],
    },
  ],
};

export function getTeam(lang: Locale, id: string): Team | undefined {
  return teams[lang].find((team) => team.id === id);
}

/** Teams whose cases use a capability, in display order. */
export function teamsUsing(lang: Locale, capability: CapabilityId): Team[] {
  return teams[lang].filter((team) =>
    team.cases.some((item) => item.capability === capability),
  );
}
