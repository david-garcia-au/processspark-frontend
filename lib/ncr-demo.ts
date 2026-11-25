/**
 * Digitise Your Paperwork, second use case: a non-conformance report (NCR) on
 * an iPad instead of paper. Two valve bodies in a row come off line 3 with a
 * scratch on the sealing face (a leak risk). Maria, the quality engineer,
 * scans the traveller's barcode with the iPad camera, records the defect, links a similar past NCR and sends
 * it. Matt, operations manager, sees every NCR and its status in one register
 * and searches past issues. EN and ES. Names, dates and figures are invented.
 * No vendor is named. Played by components/ncr-demo.tsx.
 */
import type { Person } from "@/lib/crm-demo";
import type { Locale } from "@/lib/i18n/config";

type Brief = { label: string; text: string };
type Intro = { photo: string; alt: string; line: string };
export type NcrStage = "containment" | "root" | "action" | "closed";

export type NcrDemo = {
  heading: string;
  /** The payoff phrase at the end of the heading, shown in orange. */
  headingAccent?: string;
  qe: Person;
  manager: Person;
  qeIntro: Intro;
  managerIntro: Intro;
  resultPhoto: { src: string; alt: string };
  /** Stands in for the photo Maria takes of the scratch. */
  evidencePhoto: { src: string; alt: string };
  tablet: {
    app: string;
    formTitle: string;
    scan: { prompt: string; button: string; scanning: string };
    fields: { label: string; value: string; from: string }[];
    defect: { label: string; placeholder: string; options: string[]; pick: number };
    parts: { label: string; value: string };
    risk: { label: string; value: string };
    severity: { label: string; options: string[]; pick: number };
    containment: { label: string; options: string[]; pick: number };
    photo: { add: string };
    similar: {
      label: string;
      hint: string;
      items: { id: string; when: string; title: string; cause: string }[];
      link: string;
      linked: string;
    };
    send: string;
    sent: string;
  };
  register: {
    tabs: { ncrs: string; actions: string; reports: string };
    title: string;
    subtitle: string;
    stages: Record<NcrStage, string>;
    counts: Record<NcrStage, string>;
    overdue: string;
    cols: { id: string; issue: string; severity: string; owner: string; due: string; status: string };
    newRow: { id: string; issue: string; severity: string; owner: string; due: string; status: NcrStage };
    rows: { id: string; issue: string; severity: string; owner: string; due: string; status: NcrStage; overdue?: boolean }[];
    search: { placeholder: string; query: string; resultsLabel: string };
    results: { id: string; when: string; issue: string; cause: string }[];
  };
  toasts: { sent: string };
  briefs: {
    start: Brief;
    introQe: Brief;
    task: Brief;
    introManager: Brief;
    result: Brief;
  };
};

export const ncrDemo: Record<Locale, NcrDemo> = {
  en: {
    heading: "Raise a non-conformance on the line, track it until it's closed",
    headingAccent: "track it until it's closed",
    qe: { name: "Maria", role: "Quality engineer", initials: "M", tint: "violet" },
    manager: { name: "Matt", role: "Operations manager", initials: "M", tint: "emerald" },
    qeIntro: {
      photo: "/images/demo-maria.webp",
      alt: "Maria, quality engineer, with a tablet beside a rack of machined valve bodies",
      line: "Maria looks after quality on the valve lines.",
    },
    managerIntro: {
      photo: "/images/demo-matt.webp",
      alt: "Matt, operations manager, at his desk",
      line: "Matt runs operations at the plant and chairs the weekly quality review.",
    },
    resultPhoto: {
      // Stand-in until the closing photo arrives.
      src: "/images/demo-plc-green.webp",
      alt: "Press control panel with every status green",
    },
    evidencePhoto: {
      src: "/images/demo-john.webp",
      alt: "Photo of the scratch on the valve body's sealing face",
    },
    tablet: {
      app: "Forms",
      formTitle: "Non-conformance report",
      scan: {
        prompt: "Scan the barcode on the batch traveller",
        button: "Scan barcode",
        scanning: "Scanning…",
      },
      fields: [
        { label: "Part", value: "VB‑50 valve body", from: "From barcode" },
        { label: "Batch", value: "B-2611-03", from: "From barcode" },
        { label: "Machine", value: "CNC‑07, line 3", from: "From barcode" },
        { label: "Raised by", value: "Maria Reyes", from: "From your login" },
        { label: "Date and time", value: "Wed 26 Nov 2026, 10:14", from: "Automatic" },
      ],
      defect: {
        label: "Defect",
        placeholder: "Choose the defect",
        options: ["Dimension out of tolerance", "Scratch on sealing face", "Porosity", "Wrong material"],
        pick: 1,
      },
      parts: { label: "Parts affected", value: "2 in a row · serials 2214, 2215" },
      risk: { label: "Risk", value: "Leak (hermeticity)" },
      severity: { label: "Severity", options: ["Minor", "Major", "Critical"], pick: 1 },
      containment: {
        label: "Containment",
        options: ["Parts segregated", "Line paused, last 40 bodies held for leak test"],
        pick: 1,
      },
      photo: { add: "Add a photo" },
      similar: {
        label: "Similar issues",
        hint: "Found in past NCRs",
        items: [
          {
            id: "NCR-0412",
            when: "Mar 2026",
            title: "Scratch on sealing face, VB-40",
            cause: "Chip trapped in the fixture. Fixed with an air blast before each clamp.",
          },
          {
            id: "NCR-0371",
            when: "Jan 2026",
            title: "Sealing face damaged in handling, VB-50",
            cause: "Bodies stacked without caps. Caps added after machining.",
          },
        ],
        link: "Link",
        linked: "Linked",
      },
      send: "Raise NCR",
      sent: "Raised",
    },
    register: {
      tabs: { ncrs: "NCRs", actions: "Actions", reports: "Reports" },
      title: "Non-conformances",
      subtitle: "Every NCR on site, its owner and where it is",
      stages: {
        containment: "Containment",
        root: "Root cause",
        action: "Corrective action",
        closed: "Closed",
      },
      counts: { containment: "3", root: "4", action: "2", closed: "11 this month" },
      overdue: "Overdue",
      cols: { id: "NCR", issue: "Issue", severity: "Severity", owner: "Owner", due: "Due", status: "Status" },
      newRow: {
        id: "NCR-0587",
        issue: "VB-50 body · scratch on sealing face",
        severity: "Major",
        owner: "Production",
        due: "28 Nov",
        status: "containment",
      },
      rows: [
        { id: "NCR-0584", issue: "GK-12 gasket kit · wrong material cert", severity: "Minor", owner: "Purchasing", due: "21 Nov", status: "root", overdue: true },
        { id: "NCR-0579", issue: "Actuator bracket · hole out of tolerance", severity: "Major", owner: "Engineering", due: "3 Dec", status: "action" },
        { id: "NCR-0566", issue: "Stem seals · supplier batch rejected", severity: "Minor", owner: "Quality", due: "14 Nov", status: "closed" },
      ],
      search: { placeholder: "Search past NCRs", query: "scratch sealing", resultsLabel: "Past NCRs" },
      results: [
        { id: "NCR-0412", when: "Mar 2026", issue: "Scratch on sealing face, VB-40", cause: "Chip trapped in the fixture" },
        { id: "NCR-0371", when: "Jan 2026", issue: "Sealing face damaged in handling, VB-50", cause: "Bodies stacked without caps" },
        { id: "NCR-0233", when: "Aug 2025", issue: "Scratch on sealing face, VB-80", cause: "Worn clamp jaw" },
      ],
    },
    toasts: { sent: "NCR-0587 raised. Assigned to production for root cause, due 28 Nov." },
    briefs: {
      start: {
        label: "Digitise Your Paperwork",
        text: "Non-conformance reports filled in on a tablet, not on paper. Every one is searchable and tracked until it's closed.",
      },
      introQe: {
        label: "A quality issue on line 3",
        text: "Two valve bodies in a row have a scratch on the sealing face. That's a leak risk, so Maria needs to raise a non-conformance report.",
      },
      task: {
        label: "Maria's task",
        text: "Scan the batch, record the defect and contain it, check past issues and raise the NCR.",
      },
      introManager: {
        label: "Every NCR in one place",
        text: "Matt sees the new NCR as soon as it's raised, along with every open one, who owns it and what's overdue.",
      },
      result: {
        label: "The result",
        text: "No paper reports to chase. Past issues a search away. Every NCR tracked until it's closed.",
      },
    },
  },
  es: {
    heading: "Abre una no conformidad en la línea y síguela hasta cerrarla",
    headingAccent: "síguela hasta cerrarla",
    qe: { name: "Maria", role: "Ingeniera de calidad", initials: "M", tint: "violet" },
    manager: { name: "Matt", role: "Director de operaciones", initials: "M", tint: "emerald" },
    qeIntro: {
      photo: "/images/demo-maria.webp",
      alt: "Maria, ingeniera de calidad, con una tableta junto a un carro de cuerpos de válvula mecanizados",
      line: "Maria se encarga de la calidad en las líneas de válvulas.",
    },
    managerIntro: {
      photo: "/images/demo-matt.webp",
      alt: "Matt, director de operaciones, en su mesa",
      line: "Matt dirige las operaciones de la planta y preside la revisión semanal de calidad.",
    },
    resultPhoto: {
      src: "/images/demo-plc-green.webp",
      alt: "Panel de control de la prensa con todos los estados en verde",
    },
    evidencePhoto: {
      src: "/images/demo-john.webp",
      alt: "Foto del arañazo en la superficie de estanqueidad del cuerpo de válvula",
    },
    tablet: {
      app: "Formularios",
      formTitle: "Informe de no conformidad",
      scan: {
        prompt: "Escanea el código de barras de la hoja de ruta",
        button: "Escanear código de barras",
        scanning: "Escaneando…",
      },
      fields: [
        { label: "Pieza", value: "Cuerpo de válvula VB‑50", from: "Del código de barras" },
        { label: "Lote", value: "B-2611-03", from: "Del código de barras" },
        { label: "Máquina", value: "CNC‑07, línea 3", from: "Del código de barras" },
        { label: "Abierto por", value: "Maria Reyes", from: "De tu usuario" },
        { label: "Fecha y hora", value: "mié 26 nov 2026, 10:14", from: "Automático" },
      ],
      defect: {
        label: "Defecto",
        placeholder: "Elige el defecto",
        options: ["Cota fuera de tolerancia", "Arañazo en la superficie de estanqueidad", "Porosidad", "Material incorrecto"],
        pick: 1,
      },
      parts: { label: "Piezas afectadas", value: "2 seguidas · n.º de serie 2214 y 2215" },
      risk: { label: "Riesgo", value: "Fuga (estanqueidad)" },
      severity: { label: "Gravedad", options: ["Menor", "Mayor", "Crítica"], pick: 1 },
      containment: {
        label: "Contención",
        options: ["Piezas separadas", "Línea parada, 40 cuerpos retenidos para prueba de fugas"],
        pick: 1,
      },
      photo: { add: "Añadir una foto" },
      similar: {
        label: "Problemas parecidos",
        hint: "En no conformidades anteriores",
        items: [
          {
            id: "NCR-0412",
            when: "mar 2026",
            title: "Arañazo en la superficie de estanqueidad, VB-40",
            cause: "Viruta atrapada en el utillaje. Se resolvió soplando aire antes de cada amarre.",
          },
          {
            id: "NCR-0371",
            when: "ene 2026",
            title: "Superficie de estanqueidad dañada al manipular, VB-50",
            cause: "Cuerpos apilados sin tapones. Se añadieron tapones tras el mecanizado.",
          },
        ],
        link: "Vincular",
        linked: "Vinculada",
      },
      send: "Abrir no conformidad",
      sent: "Abierta",
    },
    register: {
      tabs: { ncrs: "No conformidades", actions: "Acciones", reports: "Informes" },
      title: "No conformidades",
      subtitle: "Todas las de la planta, su responsable y en qué punto están",
      stages: {
        containment: "Contención",
        root: "Causa raíz",
        action: "Acción correctiva",
        closed: "Cerrada",
      },
      counts: { containment: "3", root: "4", action: "2", closed: "11 este mes" },
      overdue: "Vencida",
      cols: { id: "NC", issue: "Problema", severity: "Gravedad", owner: "Responsable", due: "Fecha límite", status: "Estado" },
      newRow: {
        id: "NCR-0587",
        issue: "Cuerpo VB-50 · arañazo en la superficie de estanqueidad",
        severity: "Mayor",
        owner: "Producción",
        due: "28 nov",
        status: "containment",
      },
      rows: [
        { id: "NCR-0584", issue: "Kit de juntas GK-12 · certificado de material erróneo", severity: "Menor", owner: "Compras", due: "21 nov", status: "root", overdue: true },
        { id: "NCR-0579", issue: "Soporte del actuador · taladro fuera de tolerancia", severity: "Mayor", owner: "Ingeniería", due: "3 dic", status: "action" },
        { id: "NCR-0566", issue: "Juntas del eje · lote de proveedor rechazado", severity: "Menor", owner: "Calidad", due: "14 nov", status: "closed" },
      ],
      search: { placeholder: "Buscar no conformidades anteriores", query: "arañazo estanqueidad", resultsLabel: "No conformidades anteriores" },
      results: [
        { id: "NCR-0412", when: "mar 2026", issue: "Arañazo en la superficie de estanqueidad, VB-40", cause: "Viruta atrapada en el utillaje" },
        { id: "NCR-0371", when: "ene 2026", issue: "Superficie dañada al manipular, VB-50", cause: "Cuerpos apilados sin tapones" },
        { id: "NCR-0233", when: "ago 2025", issue: "Arañazo en la superficie de estanqueidad, VB-80", cause: "Mordaza de amarre desgastada" },
      ],
    },
    toasts: { sent: "NCR-0587 abierta. Asignada a producción para la causa raíz, fecha límite 28 nov." },
    briefs: {
      start: {
        label: "Digitaliza tu papeleo",
        text: "Informes de no conformidad en una tableta, no en papel. Todos se pueden buscar y se siguen hasta cerrarlos.",
      },
      introQe: {
        label: "Un problema de calidad en la línea 3",
        text: "Dos cuerpos de válvula seguidos tienen un arañazo en la superficie de estanqueidad. Hay riesgo de fuga, así que Maria tiene que abrir una no conformidad.",
      },
      task: {
        label: "La tarea de Maria",
        text: "Escanear el lote, registrar el defecto y contenerlo, revisar problemas anteriores y abrir la no conformidad.",
      },
      introManager: {
        label: "Todas las no conformidades en un sitio",
        text: "Matt ve la nueva no conformidad en cuanto se abre, junto con todas las abiertas, su responsable y lo que está vencido.",
      },
      result: {
        label: "El resultado",
        text: "Sin informes en papel que perseguir. Los problemas anteriores, a una búsqueda. Cada no conformidad seguida hasta cerrarla.",
      },
    },
  },
};
