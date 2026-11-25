/**
 * Digitise Your Paperwork demo script, EN and ES. One use case only: John does
 * the monthly safety inspection of a press on a tablet instead of a paper
 * checklist. The QR code fills in the asset and site, his login and the clock
 * fill in the rest; he answers yes/no, adds a photo and a note for the one
 * failed item, and sends it. Matt sees it in the office minutes later, with a
 * maintenance job already raised. Names, dates and figures are invented. No
 * vendor is named. Played by components/forms-demo.tsx.
 */
import type { Person } from "@/lib/crm-demo";
import type { Locale } from "@/lib/i18n/config";

type Brief = { label: string; text: string };
type Intro = { photo: string; alt: string; line: string };

export type FormsDemo = {
  heading: string;
  /** The payoff phrase at the end of the heading, shown in orange. */
  headingAccent?: string;
  tech: Person;
  manager: Person;
  techIntro: Intro;
  managerIntro: Intro;
  resultPhoto: { src: string; alt: string };
  /** A crop of this photo stands in for the picture John takes. */
  evidencePhoto: { src: string; alt: string };
  tablet: {
    app: string;
    formTitle: string;
    scan: { prompt: string; button: string; scanning: string };
    /** Filled in from the QR code, the login and the clock. */
    fields: { label: string; value: string; from: string }[];
    yes: string;
    no: string;
    /** Checklist items, in order; the second one fails. */
    items: string[];
    photo: { add: string; added: string };
    note: { placeholder: string; text: string };
    send: string;
    sent: string;
  };
  office: {
    tabs: { inspections: string; jobs: string; assets: string };
    title: string;
    subtitle: string;
    cols: { asset: string; inspection: string; by: string; when: string; result: string };
    newRow: { asset: string; inspection: string; by: string; when: string; result: string };
    rows: { asset: string; inspection: string; by: string; when: string; result: string }[];
    detail: {
      back: string;
      title: string;
      answersLabel: string;
      job: { label: string; title: string; meta: string };
      synced: string;
    };
  };
  toasts: { sent: string };
  briefs: {
    start: Brief;
    introTech: Brief;
    task: Brief;
    introManager: Brief;
    result: Brief;
  };
};

export const formsDemo: Record<Locale, FormsDemo> = {
  en: {
    heading: "Scan the machine, answer the checklist, skip the typing",
    headingAccent: "skip the typing",
    tech: { name: "John", role: "Maintenance technician", initials: "J", tint: "amber" },
    manager: { name: "Matt", role: "Maintenance manager", initials: "M", tint: "emerald" },
    techIntro: {
      photo: "/images/demo-john.webp",
      alt: "John, maintenance technician, holding a tablet beside an industrial press",
      line: "John keeps the presses running on the morning shift.",
    },
    managerIntro: {
      photo: "/images/demo-matt.webp",
      alt: "Matt, maintenance manager, at his desk",
      line: "Matt runs the maintenance team and signs off its inspections.",
    },
    resultPhoto: {
      src: "/images/demo-plc-green.webp",
      alt: "Press control panel with every status green",
    },
    evidencePhoto: {
      src: "/images/demo-john.webp",
      alt: "Photo of the press guard",
    },
    tablet: {
      app: "Forms",
      formTitle: "Monthly press safety inspection",
      scan: {
        prompt: "Scan the QR code on the machine",
        button: "Scan QR code",
        scanning: "Scanning…",
      },
      fields: [
        { label: "Asset", value: "TR-200 press", from: "From QR code" },
        { label: "Site", value: "Plant 2, line 3", from: "From QR code" },
        { label: "Inspector", value: "John Hale", from: "From your login" },
        { label: "Date and time", value: "Mon 24 Nov 2026, 07:42", from: "Automatic" },
      ],
      yes: "Yes",
      no: "No",
      items: [
        "Emergency stop works",
        "Guards in place and secure",
        "No hydraulic leaks",
        "Floor around the press clear",
      ],
      photo: { add: "Add a photo", added: "Photo added" },
      note: {
        placeholder: "What did you find?",
        text: "Light curtain bracket loose on the left side.",
      },
      send: "Send inspection",
      sent: "Sent",
    },
    office: {
      tabs: { inspections: "Inspections", jobs: "Maintenance jobs", assets: "Assets" },
      title: "Inspections",
      subtitle: "Every inspection as it is done, from any device",
      cols: { asset: "Asset", inspection: "Inspection", by: "By", when: "When", result: "Result" },
      newRow: {
        asset: "TR-200 press",
        inspection: "Monthly safety",
        by: "John Hale",
        when: "2 min ago",
        result: "1 issue",
      },
      rows: [
        { asset: "TR-150 press", inspection: "Monthly safety", by: "Leo Tran", when: "Yesterday", result: "All clear" },
        { asset: "Forklift FL-07", inspection: "Pre-start check", by: "Priya Nand", when: "Yesterday", result: "All clear" },
        { asset: "Compressor C-2", inspection: "Weekly check", by: "Leo Tran", when: "Fri 21 Nov", result: "All clear" },
      ],
      detail: {
        back: "All inspections",
        title: "TR-200 press · Monthly safety",
        answersLabel: "Answers",
        job: {
          label: "Maintenance job raised",
          title: "MJ-1182 · Fix light curtain bracket on TR-200",
          meta: "Assigned to maintenance · Due today · Photo and note attached",
        },
        synced: "Saved as data in your maintenance system. Nothing to type in.",
      },
    },
    toasts: { sent: "Inspection sent. A maintenance job was raised for the guard." },
    briefs: {
      start: {
        label: "Digitise Your Paperwork",
        text: "Electronic web forms on any device replace paper at the source. What's filled in arrives as clean data, ready to use.",
      },
      introTech: {
        label: "Monthly safety check",
        text: "John's next job is the monthly safety inspection of press TR-200. It used to be a paper checklist, typed in days later.",
      },
      task: {
        label: "John's task",
        text: "Scan the press, answer the checklist and send it.",
      },
      introManager: {
        label: "Straight to the office",
        text: "Matt sees John's inspection minutes after it was done, with the issue already turned into a job.",
      },
      result: {
        label: "The result",
        text: "No paper to type in. Issues raised the moment they're found. Records you can trust.",
      },
    },
  },
  es: {
    heading: "Escanea la máquina, responde la lista y olvídate de teclear",
    headingAccent: "olvídate de teclear",
    tech: { name: "John", role: "Técnico de mantenimiento", initials: "J", tint: "amber" },
    manager: { name: "Matt", role: "Jefe de mantenimiento", initials: "M", tint: "emerald" },
    techIntro: {
      photo: "/images/demo-john.webp",
      alt: "John, técnico de mantenimiento, con una tableta junto a una prensa industrial",
      line: "John mantiene las prensas en marcha en el turno de mañana.",
    },
    managerIntro: {
      photo: "/images/demo-matt.webp",
      alt: "Matt, jefe de mantenimiento, en su mesa",
      line: "Matt dirige el equipo de mantenimiento y firma sus inspecciones.",
    },
    resultPhoto: {
      src: "/images/demo-plc-green.webp",
      alt: "Panel de control de la prensa con todos los estados en verde",
    },
    evidencePhoto: {
      src: "/images/demo-john.webp",
      alt: "Foto de la protección de la prensa",
    },
    tablet: {
      app: "Formularios",
      formTitle: "Inspección mensual de seguridad de la prensa",
      scan: {
        prompt: "Escanea el código QR de la máquina",
        button: "Escanear código QR",
        scanning: "Escaneando…",
      },
      fields: [
        { label: "Equipo", value: "Prensa TR-200", from: "Del código QR" },
        { label: "Ubicación", value: "Planta 2, línea 3", from: "Del código QR" },
        { label: "Inspector", value: "John Hale", from: "De tu usuario" },
        { label: "Fecha y hora", value: "lun 24 nov 2026, 07:42", from: "Automático" },
      ],
      yes: "Sí",
      no: "No",
      items: [
        "La parada de emergencia funciona",
        "Protecciones colocadas y firmes",
        "Sin fugas hidráulicas",
        "Suelo alrededor de la prensa despejado",
      ],
      photo: { add: "Añadir una foto", added: "Foto añadida" },
      note: {
        placeholder: "¿Qué has encontrado?",
        text: "Soporte de la barrera óptica suelto en el lado izquierdo.",
      },
      send: "Enviar inspección",
      sent: "Enviada",
    },
    office: {
      tabs: { inspections: "Inspecciones", jobs: "Trabajos de mantenimiento", assets: "Equipos" },
      title: "Inspecciones",
      subtitle: "Cada inspección en cuanto se hace, desde cualquier dispositivo",
      cols: { asset: "Equipo", inspection: "Inspección", by: "Por", when: "Cuándo", result: "Resultado" },
      newRow: {
        asset: "Prensa TR-200",
        inspection: "Seguridad mensual",
        by: "John Hale",
        when: "Hace 2 min",
        result: "1 incidencia",
      },
      rows: [
        { asset: "Prensa TR-150", inspection: "Seguridad mensual", by: "Leo Tran", when: "Ayer", result: "Todo bien" },
        { asset: "Carretilla FL-07", inspection: "Revisión previa", by: "Priya Nand", when: "Ayer", result: "Todo bien" },
        { asset: "Compresor C-2", inspection: "Revisión semanal", by: "Leo Tran", when: "vie 21 nov", result: "Todo bien" },
      ],
      detail: {
        back: "Todas las inspecciones",
        title: "Prensa TR-200 · Seguridad mensual",
        answersLabel: "Respuestas",
        job: {
          label: "Trabajo de mantenimiento creado",
          title: "MJ-1182 · Fijar el soporte de la barrera óptica de la TR-200",
          meta: "Asignado a mantenimiento · Para hoy · Con la foto y la nota",
        },
        synced: "Guardado como datos en tu sistema de mantenimiento. Nada que teclear.",
      },
    },
    toasts: { sent: "Inspección enviada. Se ha creado un trabajo de mantenimiento para la protección." },
    briefs: {
      start: {
        label: "Digitaliza tu papeleo",
        text: "Formularios electrónicos en cualquier dispositivo sustituyen al papel desde el origen. Lo que se rellena llega como datos limpios, listos para usar.",
      },
      introTech: {
        label: "Revisión mensual de seguridad",
        text: "El próximo trabajo de John es la inspección mensual de seguridad de la prensa TR-200. Antes era una lista en papel que se pasaba a limpio días después.",
      },
      task: {
        label: "La tarea de John",
        text: "Escanear la prensa, responder la lista y enviarla.",
      },
      introManager: {
        label: "Directo a la oficina",
        text: "Matt ve la inspección de John minutos después de hacerla, con la incidencia ya convertida en un trabajo.",
      },
      result: {
        label: "El resultado",
        text: "Sin papeles que pasar a limpio. Incidencias avisadas al momento. Registros fiables.",
      },
    },
  },
};
