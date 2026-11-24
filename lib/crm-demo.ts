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
  /** Which card icons to use. Defaults to the service (manuals) story. */
  story?: "service" | "contracts";
  /** How long each person's intro shows alone before its card. Defaults to 2000ms. */
  introDelayMs?: number;
  /** Who types in AI Chat. Defaults to the technician. */
  chatBy?: "admin" | "tech";
  admin: Person;
  tech: Person;
  /** Intro cards for the two people. */
  adminIntro: { photo: string; alt: string; line: string };
  techIntro: { photo: string; alt: string; line: string };
  /** The shop-floor fault photo (the PLC screen). Without it the beat is skipped. */
  faultPhoto?: { src: string; alt: string };
  /** Closing photo: the same panel, all green, back in production. */
  resolvedPhoto: { src: string; alt: string };
  /** Where the closing card sits. Defaults to the lower-right corner. */
  resolvedCardAt?: "corner" | "left";
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
    /** Keep the existing file's pill active after the upload (it is not replaced). */
    keepOld?: boolean;
    /** More files already in the folder, listed after the existing one. */
    others?: { name: string; size: string; date: string; tag?: string }[];
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
  /** The spinner shown while the upload is read. */
  uploading: string;
  /** The three-dots menu on the uploaded row (permissions + supersede). */
  permissions: {
    menuLabel: string;
    heading: string;
    /** Teams, with the one the admin grants marked. */
    teams: { label: string; granted: boolean }[];
    /** The "this version supersedes v1" toggle in the same menu. */
    supersedeLabel: string;
    confirm: string;
  };
  /** Larger square "situation" cards: on Anna's intro, and before her upload starts. */
  briefs: {
    /** Shown on the start screen, with the play button. */
    start: { label: string; text: string };
    introAdmin: { label: string; text: string };
    upload: { label: string; text: string };
    introTech: { label: string; text: string };
    fixed: { label: string; text: string };
    resolved: { label: string; text: string };
  };
  /** The AI Chat screen. */
  chat: {
    tabLabel: string;
    newChat: string;
    chatsLabel: string;
    threadTitle: string;
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
  run: string;
  replay: string;
  granted: string;
  meet: string;
  controlsLabel: string;
  pause: string;
  resume: string;
  back: string;
  forward: string;
  regionLabel: string;
};

export const crmDemoUi: Record<Locale, CrmDemoUi> = {
  en: {
    run: "Run the demo",
    replay: "Run it again",
    granted: "Granted",
    meet: "Meet",
    controlsLabel: "Demo playback",
    pause: "Pause",
    resume: "Resume",
    back: "Step back",
    forward: "Step forward",
    regionLabel: "Interactive demo",
  },
  es: {
    run: "Ver la demo",
    replay: "Verla otra vez",
    granted: "Concedido",
    meet: "Te presentamos a",
    controlsLabel: "Control de la demo",
    pause: "Pausar",
    resume: "Reanudar",
    back: "Paso atrás",
    forward: "Paso adelante",
    regionLabel: "Demo interactiva",
  },
};

export const docsDemo: Record<Locale, DocsDemo> = {
  en: {
    heading: "Upload a manual, define permissions, get the answers",
    introDelayMs: 4000,
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
    resolvedPhoto: {
      src: "/images/demo-plc-green.webp",
      alt: "Press control panel with every status back to green",
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
    uploading: "Uploading and extracting context…",
    permissions: {
      menuLabel: "More",
      heading: "Who can query this",
      teams: [
        { label: "Maintenance team", granted: true },
        { label: "Quality team", granted: false },
        { label: "Operations", granted: false },
      ],
      supersedeLabel: "Supersedes v1",
      confirm: "Maintenance team can now query this manual",
    },
    briefs: {
      start: {
        label: "Talk to Your Documents",
        text: "Use everyday language to find answers to your questions in the company documents, with full access control.",
      },
      introAdmin: {
        label: "New manual version",
        text: "The vendor has just published a new version of the manual for one of the presses. Anna needs to update the company records.",
      },
      upload: {
        label: "Anna's task",
        text: "She needs to upload the new manual, mark it as the current version and set who can access it.",
      },
      introTech: {
        label: "Alarm: press out of service",
        text: "John gets an alarm: the TR-200 press is out of service. It has to be back in production, urgently.",
      },
      fixed: {
        label: "Fault fixed",
        text: "John has fixed the fault. He also knows it keeps coming back, so it needs corrective maintenance.",
      },
      resolved: {
        label: "Back in production",
        text: "The plant is back to normal, and John has all the information to investigate and propose a long-term fix.",
      },
    },
    chat: {
      tabLabel: "AI Chat",
      newChat: "New chat",
      chatsLabel: "Chats",
      threadTitle: "TR-200 press fault",
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
    heading: "Sube un manual, define permisos y obtén las respuestas",
    introDelayMs: 4000,
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
    resolvedPhoto: {
      src: "/images/demo-plc-green.webp",
      alt: "Panel de control de la prensa con todos los estados de nuevo en verde",
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
    uploading: "Subiendo y extrayendo el contexto…",
    permissions: {
      menuLabel: "Más",
      heading: "Quién puede consultarlo",
      teams: [
        { label: "Equipo de mantenimiento", granted: true },
        { label: "Equipo de calidad", granted: false },
        { label: "Operaciones", granted: false },
      ],
      supersedeLabel: "Sustituye a la v1",
      confirm: "El equipo de mantenimiento ya puede consultar este manual",
    },
    briefs: {
      start: {
        label: "Habla con tus documentos",
        text: "Usa tu lenguaje de siempre para encontrar respuestas a tus preguntas en los documentos de la empresa, con control total de accesos.",
      },
      introAdmin: {
        label: "Nueva versión del manual",
        text: "El fabricante acaba de publicar una nueva versión del manual de una de las prensas. Anna tiene que actualizar los registros de la empresa.",
      },
      upload: {
        label: "La tarea de Anna",
        text: "Tiene que subir el nuevo manual, marcarlo como la versión vigente y decidir quién puede acceder a él.",
      },
      introTech: {
        label: "Alarma: prensa fuera de servicio",
        text: "John recibe una alarma: la prensa TR-200 está fuera de servicio. Tiene que volver a producción con urgencia.",
      },
      fixed: {
        label: "Fallo resuelto",
        text: "John ha resuelto el fallo. Además sabe que se repite, así que hace falta un mantenimiento correctivo.",
      },
      resolved: {
        label: "De nuevo en producción",
        text: "La planta vuelve a la normalidad, y John tiene toda la información para investigar y proponer una solución definitiva.",
      },
    },
    chat: {
      tabLabel: "Chat IA",
      newChat: "Nuevo chat",
      chatsLabel: "Chats",
      threadTitle: "Fallo de la prensa TR-200",
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

/**
 * Talk to Your Documents for contract managers. Same player and screens as the
 * manuals story; Anna is a contracts manager, Matt a project manager, and Anna
 * asks the documents on his behalf. No fault photo; it closes on Matt.
 */
export const contractsDemo: Record<Locale, DocsDemo> = {
  en: {
    heading: "Upload a contract, set access, get the answers",
    story: "contracts",
    chatBy: "admin",
    introDelayMs: 4000,
    admin: { name: "Anna", role: "Contracts manager", initials: "A", tint: "blue" },
    tech: { name: "Matt", role: "Project manager", initials: "M", tint: "emerald" },
    adminIntro: {
      photo: "/images/demo-anna.webp",
      alt: "Anna, contracts manager, at her desk",
      line: "Anna manages contracts with dozens of customers and suppliers: dates, variations, payment terms, inclusions and exclusions.",
    },
    techIntro: {
      photo: "/images/demo-matt.webp",
      alt: "Matt, project manager, at his desk",
      line: "Matt runs the Riverbend depot upgrade and works with Anna on its contracts.",
    },
    resolvedPhoto: {
      src: "/images/demo-matt.webp",
      alt: "Matt at his desk, ready for his call",
    },
    resolvedCardAt: "left",
    docs: {
      tabLabel: "Documents",
      title: "Documents",
      subtitle: "Store and manage files — PDFs, spreadsheets, documents and more",
      uploadLabel: "Upload files",
      folder: "Riverbend depot upgrade",
      folders: ["All files", "Riverbend depot upgrade", "Supplier contracts"],
      cols: { name: "Name", size: "Size", date: "Date" },
      existing: { name: "SC-204-Kestrin-subcontract.pdf", size: "3.6 MB", date: "10 Feb 2026" },
      others: [
        { name: "HC-118-Dunvale-contract.pdf", size: "2.8 MB", date: "3 Feb 2026", tag: "Contract" },
        { name: "HC-118-variation-1.pdf", size: "0.4 MB", date: "14 May 2026", tag: "V1" },
        { name: "HC-118-variation-2.pdf", size: "0.3 MB", date: "22 Aug 2026", tag: "V2" },
      ],
      uploaded: { name: "HC-118-variation-3.pdf", size: "0.4 MB", date: "Just now" },
      versionOld: "Subcontract",
      versionNew: "V3",
      versionNote: "Linked to contract HC-118 as Variation 3.",
      keepOld: true,
    },
    picker: {
      sidebar: ["Recents", "Downloads", "Desktop", "Documents"],
      location: "Downloads",
      cols: { name: "Name", kind: "Kind" },
      files: [
        { name: "site-diary-week-47.pdf", kind: "PDF document" },
        { name: "HC-118-variation-3.pdf", kind: "PDF document", pick: true },
        { name: "Riverbend-programme-rev4.xlsx", kind: "Excel workbook" },
        { name: "insurance-certificate-2026.pdf", kind: "PDF document" },
        { name: "meeting-minutes-18-nov.docx", kind: "Word document" },
      ],
      cancel: "Cancel",
      open: "Open",
    },
    uploading: "Uploading and extracting context…",
    permissions: {
      menuLabel: "More",
      heading: "Who can query this",
      teams: [
        { label: "Riverbend project team", granted: true },
        { label: "Finance", granted: false },
        { label: "Legal", granted: false },
      ],
      supersedeLabel: "Varies contract HC-118",
      confirm: "Riverbend project team can now query this variation",
    },
    briefs: {
      start: {
        label: "Talk to Your Documents",
        text: "Ask your contracts a question in plain words and get the answer, with the clause it comes from.",
      },
      introAdmin: {
        label: "New variation",
        text: "Dunvale Electrical has signed Variation 3 to contract HC-118. Anna adds it so the contract record is complete.",
      },
      upload: {
        label: "Anna's task",
        text: "Upload Variation 3, link it to the Dunvale contract and give the project team access.",
      },
      introTech: {
        label: "Urgent request",
        text: "Matt needs the Kestrin Civil payment terms and milestones, and the final Dunvale value with all variations, before a call with his boss about legal claims.",
      },
      fixed: {
        label: "Answered in under five minutes",
        text: "Anna sends Matt every figure, with the clause and page it comes from. He goes into his call with the full picture.",
      },
      resolved: {
        label: "The result",
        text: "Answers in minutes. Sources you can check. Confidence when it matters.",
      },
    },
    chat: {
      tabLabel: "AI Chat",
      newChat: "New chat",
      chatsLabel: "Chats",
      threadTitle: "Kestrin terms, Dunvale value",
      empty: "What can I help with?",
      placeholder: "Ask anything about your contracts",
      question:
        "What are the payment terms and milestones in the Kestrin Civil subcontract? And what is the final value of the Dunvale contract, including variations?",
      activity: "Searching your contracts and variations",
      answer:
        "Kestrin Civil (SC-204): monthly progress claims, paid 30 days after the end of the month. 5% retention, half released at practical completion. Milestones: mobilisation 10%, civil works 40%, structure 35%, practical completion 15%.\n\nDunvale Electrical (HC-118): original value A$1,240,000. Variation 1 +A$86,500, Variation 2 +A$42,300, Variation 3 −A$18,000. Final value A$1,350,800.",
      sources: [
        "SC-204 subcontract, clause 12, page 18",
        "HC-118 contract, schedule 2",
        "HC-118 variations 1–3",
      ],
      sourceButton: "Open the clause",
      source: {
        title: "SC-204 Kestrin Civil subcontract, clause 12.2, page 18",
        lines: [
          "12.2 Payment",
          "The Subcontractor may claim monthly for work done.",
          "Approved claims are paid 30 days after the end of the month.",
          "5% is retained; half is released at practical completion.",
        ],
        mark: 2,
      },
      footnote:
        "Answers come only from documents the person is allowed to query, with the source shown.",
    },
  },
  es: {
    heading: "Sube un contrato, define accesos y obtén las respuestas",
    story: "contracts",
    chatBy: "admin",
    introDelayMs: 4000,
    admin: { name: "Anna", role: "Gestora de contratos", initials: "A", tint: "blue" },
    tech: { name: "Matt", role: "Jefe de proyecto", initials: "M", tint: "emerald" },
    adminIntro: {
      photo: "/images/demo-anna.webp",
      alt: "Anna, gestora de contratos, en su mesa",
      line: "Anna gestiona los contratos con decenas de clientes y proveedores: fechas, modificaciones, condiciones de pago, inclusiones y exclusiones.",
    },
    techIntro: {
      photo: "/images/demo-matt.webp",
      alt: "Matt, jefe de proyecto, en su mesa",
      line: "Matt dirige la ampliación del almacén Riverbend y trabaja con Anna en sus contratos.",
    },
    resolvedPhoto: {
      src: "/images/demo-matt.webp",
      alt: "Matt en su mesa, listo para su llamada",
    },
    resolvedCardAt: "left",
    docs: {
      tabLabel: "Documentos",
      title: "Documentos",
      subtitle: "Guarda y gestiona archivos: PDF, hojas de cálculo, documentos y más",
      uploadLabel: "Subir archivos",
      folder: "Ampliación almacén Riverbend",
      folders: ["Todos los archivos", "Ampliación almacén Riverbend", "Contratos de proveedores"],
      cols: { name: "Nombre", size: "Tamaño", date: "Fecha" },
      existing: { name: "SC-204-subcontrato-Kestrin.pdf", size: "3,6 MB", date: "10 feb 2026" },
      others: [
        { name: "HC-118-contrato-Dunvale.pdf", size: "2,8 MB", date: "3 feb 2026", tag: "Contrato" },
        { name: "HC-118-modificacion-1.pdf", size: "0,4 MB", date: "14 may 2026", tag: "Mod. 1" },
        { name: "HC-118-modificacion-2.pdf", size: "0,3 MB", date: "22 ago 2026", tag: "Mod. 2" },
      ],
      uploaded: { name: "HC-118-modificacion-3.pdf", size: "0,4 MB", date: "Ahora mismo" },
      versionOld: "Subcontrato",
      versionNew: "Mod. 3",
      versionNote: "Vinculada al contrato HC-118 como modificación 3.",
      keepOld: true,
    },
    picker: {
      sidebar: ["Recientes", "Descargas", "Escritorio", "Documentos"],
      location: "Descargas",
      cols: { name: "Nombre", kind: "Tipo" },
      files: [
        { name: "diario-obra-semana-47.pdf", kind: "Documento PDF" },
        { name: "HC-118-modificacion-3.pdf", kind: "Documento PDF", pick: true },
        { name: "Riverbend-planning-rev4.xlsx", kind: "Libro de Excel" },
        { name: "certificado-seguro-2026.pdf", kind: "Documento PDF" },
        { name: "acta-reunion-18-nov.docx", kind: "Documento de Word" },
      ],
      cancel: "Cancelar",
      open: "Abrir",
    },
    uploading: "Subiendo y extrayendo el contexto…",
    permissions: {
      menuLabel: "Más",
      heading: "Quién puede consultarlo",
      teams: [
        { label: "Equipo del proyecto Riverbend", granted: true },
        { label: "Finanzas", granted: false },
        { label: "Legal", granted: false },
      ],
      supersedeLabel: "Modifica el contrato HC-118",
      confirm: "El equipo del proyecto Riverbend ya puede consultar esta modificación",
    },
    briefs: {
      start: {
        label: "Habla con tus documentos",
        text: "Pregunta a tus contratos con tus palabras y obtén la respuesta, con la cláusula de donde sale.",
      },
      introAdmin: {
        label: "Nueva modificación",
        text: "Dunvale Electrical ha firmado la modificación 3 del contrato HC-118. Anna la añade para que el contrato quede completo.",
      },
      upload: {
        label: "La tarea de Anna",
        text: "Subir la modificación 3, vincularla al contrato de Dunvale y dar acceso al equipo del proyecto.",
      },
      introTech: {
        label: "Petición urgente",
        text: "Antes de una llamada con su jefe por unas reclamaciones, Matt necesita los pagos e hitos de Kestrin Civil y el importe final de Dunvale.",
      },
      fixed: {
        label: "Respondido en menos de cinco minutos",
        text: "Anna le pasa a Matt cada cifra, con la cláusula y la página de donde sale. Llega a su llamada con toda la información.",
      },
      resolved: {
        label: "El resultado",
        text: "Respuestas en minutos. Fuentes que puedes comprobar. Confianza cuando más importa.",
      },
    },
    chat: {
      tabLabel: "Chat IA",
      newChat: "Nuevo chat",
      chatsLabel: "Chats",
      threadTitle: "Kestrin y Dunvale",
      empty: "¿En qué puedo ayudarte?",
      placeholder: "Pregunta lo que quieras sobre tus contratos",
      question:
        "¿Cuáles son las condiciones de pago y los hitos del subcontrato de Kestrin Civil? ¿Y cuál es el importe final del contrato de Dunvale, con las modificaciones?",
      activity: "Buscando en tus contratos y modificaciones",
      answer:
        "Kestrin Civil (SC-204): certificaciones mensuales, pagadas a 30 días desde fin de mes. Retención del 5 %, la mitad se libera en la recepción. Hitos: movilización 10 %, obra civil 40 %, estructura 35 %, recepción 15 %.\n\nDunvale Electrical (HC-118): importe original 1.240.000 €. Modificación 1 +86.500 €, modificación 2 +42.300 €, modificación 3 −18.000 €. Importe final 1.350.800 €.",
      sources: [
        "Subcontrato SC-204, cláusula 12, página 18",
        "Contrato HC-118, anexo 2",
        "Modificaciones 1–3 del HC-118",
      ],
      sourceButton: "Abrir la cláusula",
      source: {
        title: "Subcontrato SC-204 Kestrin Civil, cláusula 12.2, página 18",
        lines: [
          "12.2 Pagos",
          "El subcontratista puede certificar cada mes el trabajo hecho.",
          "Las certificaciones aprobadas se pagan a 30 días desde fin de mes.",
          "Se retiene un 5 %; la mitad se libera en la recepción.",
        ],
        mark: 2,
      },
      footnote:
        "Las respuestas salen solo de documentos que la persona puede consultar, con la fuente a la vista.",
    },
  },
};
