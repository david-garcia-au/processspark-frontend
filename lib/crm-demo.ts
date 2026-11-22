/**
 * Scripted CRM demos for the solution pages. Each one plays inside a stage that
 * looks like the real CRM window (adapted per demo), so the marketing site
 * shows exactly what the product does. The website visitor only presses run;
 * everything after is a scripted character acting in the CRM. Names, dates and
 * figures are invented and the card says so. No vendor or platform is named.
 *
 * This file holds the Talk to Your Documents script. Other demos are added the
 * same way, keyed by product id, in both languages.
 */
import type { Locale } from "@/lib/i18n/config";

export type Person = { name: string; role: string; initials: string; tint: string };

/** One turn of the typed/played timeline, interpreted by the component. */
export type DocsDemo = {
  heading: string;
  intro: string;
  admin: Person;
  tech: Person;
  /** Intro cards for the two people. */
  adminIntro: { photo: string; alt: string; line: string };
  techIntro: { photo: string; alt: string; line: string };
  /** The shop-floor fault photo (the PLC screen). */
  faultPhoto: { src: string; alt: string };
  /** Documents screen. */
  docs: {
    tabLabel: string;
    title: string;
    subtitle: string;
    uploadLabel: string;
    folder: string;
    folders: string[];
    cols: { name: string; size: string; date: string };
    /** The file that is already there before the upload. */
    existing: { name: string; size: string; date: string };
    /** The manual the admin uploads — a new version of the existing one. */
    uploaded: { name: string; size: string; date: string };
    /** Version labels: the existing file's, and the new one's. */
    versionOld: string;
    versionNew: string;
    versionNote: string;
  };
  /** The macOS-style file picker that opens when Upload is pressed. */
  picker: {
    sidebar: string[];
    location: string;
    cols: { name: string; kind: string };
    /** Decoy files plus the manual, in order; `pick: true` is selected. */
    files: { name: string; kind: string; pick?: boolean }[];
    cancel: string;
    open: string;
  };
  /** The three-dots permissions menu on the uploaded row. */
  permissions: {
    menuLabel: string;
    heading: string;
    /** Teams, with the one the admin grants marked. */
    teams: { label: string; granted: boolean }[];
    confirm: string;
  };
  /** The transition caption shown with the shop-floor fault photo. */
  fault: { caption: string };
  /** The AI Chat screen. */
  chat: {
    tabLabel: string;
    empty: string;
    placeholder: string;
    question: string;
    activity: string;
    answer: string;
    sources: string[];
    sourceButton: string;
    source: { title: string; lines: string[]; mark: number };
    footnote: string;
  };
};

export type CrmDemoUi = {
  illustrative: string;
  run: string;
  runHint: string;
  replay: string;
  granted: string;
  meet: string;
  controlsLabel: string;
  pause: string;
  resume: string;
  back: string;
  forward: string;
  ctaLead: string;
  ctaButton: string;
  regionLabel: string;
};

export const crmDemoUi: Record<Locale, CrmDemoUi> = {
  en: {
    illustrative: "Illustrative example. Names and figures are invented.",
    run: "Run the demo",
    runHint: "Upload a new version, set who can ask, get the answer.",
    replay: "Run it again",
    granted: "Granted",
    meet: "Meet",
    controlsLabel: "Demo playback",
    pause: "Pause",
    resume: "Resume",
    back: "Step back",
    forward: "Step forward",
    ctaLead: "Want to see this on your own documents?",
    ctaButton: "Request a personalised demo",
    regionLabel: "Interactive demo",
  },
  es: {
    illustrative: "Ejemplo ilustrativo. Los nombres y las cifras son inventados.",
    run: "Ver la demo",
    runHint: "Sube una nueva versión, define quién puede preguntar y obtén la respuesta.",
    replay: "Verla otra vez",
    granted: "Concedido",
    meet: "Te presentamos a",
    controlsLabel: "Control de la demo",
    pause: "Pausar",
    resume: "Reanudar",
    back: "Paso atrás",
    forward: "Paso adelante",
    ctaLead: "¿Quieres verlo con tus propios documentos?",
    ctaButton: "Solicita una demo personalizada",
    regionLabel: "Demo interactiva",
  },
};

export const docsDemo: Record<Locale, DocsDemo> = {
  en: {
    heading: "Upload a manual, set who can ask, get the answer",
    intro:
      "A new machine manual goes in, the maintenance team is allowed to query it, and a technician gets the fix with its source.",
    admin: { name: "Anna", role: "Service admin", initials: "A", tint: "blue" },
    tech: { name: "John", role: "Service technician", initials: "J", tint: "amber" },
    adminIntro: {
      photo: "/images/demo-anna.webp",
      alt: "Anna, service admin, at her desk in a manufacturing office",
      line: "Anna manages the documents that go in and keeps every version, so people always query the latest.",
    },
    techIntro: {
      photo: "/images/demo-john.webp",
      alt: "John, service technician, beside an industrial press",
      line: "John is on the floor when the press stops with a fault he has not seen before.",
    },
    faultPhoto: {
      src: "/images/demo-plc.webp",
      alt: "Press control panel showing an E530 clutch position fault",
    },
    docs: {
      tabLabel: "Documents",
      title: "Documents",
      subtitle: "Store and manage files — PDFs, spreadsheets, documents and more",
      uploadLabel: "Upload files",
      folder: "Equipment manuals",
      folders: ["All files", "Equipment manuals", "Quality records"],
      cols: { name: "Name", size: "Size", date: "Date" },
      existing: {
        name: "TR-200-press-manual.pdf",
        size: "4.1 MB",
        date: "12 Mar 2026",
      },
      uploaded: {
        name: "TR-200-press-manual.pdf",
        size: "4.4 MB",
        date: "Just now",
      },
      versionOld: "v1",
      versionNew: "v2",
      versionNote: "Kept as a new version. v1 stays in history.",
    },
    picker: {
      sidebar: ["Recents", "Downloads", "Desktop", "Documents"],
      location: "Downloads",
      cols: { name: "Name", kind: "Kind" },
      files: [
        { name: "warranty-claim-scan.pdf", kind: "PDF document" },
        { name: "TR-200-press-manual.pdf", kind: "PDF document", pick: true },
        { name: "site-photos-week-47.zip", kind: "ZIP archive" },
        { name: "delivery-note-4471.pdf", kind: "PDF document" },
        { name: "roster-november.xlsx", kind: "Excel workbook" },
      ],
      cancel: "Cancel",
      open: "Open",
    },
    permissions: {
      menuLabel: "More",
      heading: "Who can query this",
      teams: [
        { label: "Maintenance team", granted: true },
        { label: "Quality team", granted: false },
        { label: "Operations", granted: false },
      ],
      confirm: "Maintenance team can now query this manual",
    },
    fault: {
      caption: "The press stops with an E530 fault. John needs the fix, now.",
    },
    chat: {
      tabLabel: "AI Chat",
      empty: "What can I help with?",
      placeholder: "Ask anything about your manuals and past jobs",
      question:
        "What is an E530 error on the TR-200 press and how do I fix it?",
      activity: "Searching your manuals and past jobs",
      answer:
        "E530 is a clutch position fault. Switch off and lock out the press, check the position sensor and clear the guard area, then reset and run one test cycle. The same fault was fixed on 14 Aug by replacing the sensor.",
      sources: ["TR-200 press manual, page 84", "Job record 2291, 14 Aug"],
      sourceButton: "Open the manual page",
      source: {
        title: "TR-200 press manual, section 7.4, page 84",
        lines: [
          "E530: clutch position fault",
          "1. Switch off and lock out the press.",
          "2. Check the position sensor and clear the guard area.",
          "3. Reset the fault and run one test cycle.",
        ],
        mark: 2,
      },
      footnote:
        "Answers come only from documents the person is allowed to query, with the source shown.",
    },
  },
  es: {
    heading: "Sube un manual, define quién puede preguntar y obtén la respuesta",
    intro:
      "Entra el manual de una máquina nueva, el equipo de mantenimiento puede consultarlo y un técnico obtiene la solución con su fuente.",
    admin: { name: "Anna", role: "Admin de servicio", initials: "A", tint: "blue" },
    tech: { name: "John", role: "Técnico de servicio", initials: "J", tint: "amber" },
    adminIntro: {
      photo: "/images/demo-anna.webp",
      alt: "Anna, admin de servicio, en su mesa en una oficina de fábrica",
      line: "Anna gestiona los documentos que entran y conserva cada versión, para que siempre se consulte la última.",
    },
    techIntro: {
      photo: "/images/demo-john.webp",
      alt: "John, técnico de servicio, junto a una prensa industrial",
      line: "John está en planta cuando la prensa se detiene con un fallo que no había visto antes.",
    },
    faultPhoto: {
      src: "/images/demo-plc.webp",
      alt: "Panel de control de la prensa con un fallo E530 de posición del embrague",
    },
    docs: {
      tabLabel: "Documentos",
      title: "Documentos",
      subtitle: "Guarda y gestiona archivos: PDF, hojas de cálculo, documentos y más",
      uploadLabel: "Subir archivos",
      folder: "Manuales de equipos",
      folders: ["Todos los archivos", "Manuales de equipos", "Registros de calidad"],
      cols: { name: "Nombre", size: "Tamaño", date: "Fecha" },
      existing: {
        name: "TR-200-manual-prensa.pdf",
        size: "4,1 MB",
        date: "12 mar 2026",
      },
      uploaded: {
        name: "TR-200-manual-prensa.pdf",
        size: "4,4 MB",
        date: "Ahora mismo",
      },
      versionOld: "v1",
      versionNew: "v2",
      versionNote: "Guardado como nueva versión. La v1 queda en el historial.",
    },
    picker: {
      sidebar: ["Recientes", "Descargas", "Escritorio", "Documentos"],
      location: "Descargas",
      cols: { name: "Nombre", kind: "Tipo" },
      files: [
        { name: "reclamacion-garantia.pdf", kind: "Documento PDF" },
        { name: "TR-200-manual-prensa.pdf", kind: "Documento PDF", pick: true },
        { name: "fotos-obra-semana-47.zip", kind: "Archivo ZIP" },
        { name: "albaran-4471.pdf", kind: "Documento PDF" },
        { name: "turnos-noviembre.xlsx", kind: "Libro de Excel" },
      ],
      cancel: "Cancelar",
      open: "Abrir",
    },
    permissions: {
      menuLabel: "Más",
      heading: "Quién puede consultarlo",
      teams: [
        { label: "Equipo de mantenimiento", granted: true },
        { label: "Equipo de calidad", granted: false },
        { label: "Operaciones", granted: false },
      ],
      confirm: "El equipo de mantenimiento ya puede consultar este manual",
    },
    fault: {
      caption: "La prensa se detiene con un fallo E530. John necesita la solución, ya.",
    },
    chat: {
      tabLabel: "Chat IA",
      empty: "¿En qué puedo ayudarte?",
      placeholder: "Pregunta lo que quieras sobre tus manuales y trabajos anteriores",
      question:
        "¿Qué es un error E530 en la prensa TR-200 y cómo lo soluciono?",
      activity: "Buscando en tus manuales y trabajos anteriores",
      answer:
        "E530 es un fallo de posición del embrague. Apaga y bloquea la prensa, revisa el sensor de posición y despeja la zona de protección, luego reinicia y haz un ciclo de prueba. El mismo fallo se resolvió el 14 ago cambiando el sensor.",
      sources: ["Manual de la prensa TR-200, página 84", "Registro de trabajo 2291, 14 ago"],
      sourceButton: "Abrir la página del manual",
      source: {
        title: "Manual de la prensa TR-200, apartado 7.4, página 84",
        lines: [
          "E530: fallo de posición del embrague",
          "1. Apaga y bloquea la prensa.",
          "2. Revisa el sensor de posición y despeja la zona de protección.",
          "3. Reinicia el fallo y haz un ciclo de prueba.",
        ],
        mark: 2,
      },
      footnote:
        "Las respuestas salen solo de documentos que la persona puede consultar, con la fuente a la vista.",
    },
  },
};
