/**
 * Employee Service Desk demo script, EN and ES. John (employee) asks how to take
 * leave to look after his sick son, fills in the prefilled leave form, Matt
 * (his manager) approves it, and Anna (HR) finds it recorded, with one question
 * the desk could not answer handed to her. Names, dates and figures are
 * invented. No vendor is named. Played by components/desk-demo.tsx.
 */
import type { Person } from "@/lib/crm-demo";
import type { Locale } from "@/lib/i18n/config";

type Brief = { label: string; text: string };
type Intro = { photo: string; alt: string; line: string };
export type ApprovalStatus = "waiting" | "approved";

export type DeskDemo = {
  heading: string;
  /** The payoff phrase at the end of the heading, shown in orange. */
  headingAccent?: string;
  employee: Person;
  manager: Person;
  hr: Person;
  employeeIntro: Intro;
  managerIntro: Intro;
  hrIntro: Intro;
  resultPhoto: { src: string; alt: string };
  tabs: { ask: string; requests: string; approvals: string; hrDesk: string };
  chat: {
    newChat: string;
    chatsLabel: string;
    threadTitle: string;
    empty: string;
    placeholder: string;
    question: string;
    activity: string;
    answer: string;
    sources: string[];
    source: { title: string; lines: string[]; mark: number };
    action: string;
  };
  form: {
    title: string;
    subtitle: string;
    prefilled: string;
    fields: { label: string; value: string }[];
    type: { label: string; placeholder: string; options: string[]; pick: number };
    dates: { label: string; placeholder: string; value: string };
    balance: { before: string; after: string };
    note: { label: string; placeholder: string; text: string };
    send: string;
    sent: string;
  };
  approvals: {
    title: string;
    subtitle: string;
    cols: { person: string; request: string; dates: string; status: string };
    /** John's request first; the others are already in the queue. */
    rows: { name: string; initials: string; request: string; dates: string; status: ApprovalStatus }[];
    detail: {
      back: string;
      checks: string[];
      noteLabel: string;
      approve: string;
      decline: string;
    };
  };
  hrDesk: {
    title: string;
    subtitle: string;
    recordedLabel: string;
    recorded: { name: string; initials: string; text: string; status: string }[];
    handoffLabel: string;
    handoff: { name: string; initials: string; question: string; reason: string; reply: string };
  };
  statuses: Record<ApprovalStatus, string>;
  toasts: { sent: string; approved: string };
  briefs: {
    start: Brief;
    introEmployee: Brief;
    task: Brief;
    introManager: Brief;
    introHr: Brief;
    result: Brief;
  };
};

export const deskDemo: Record<Locale, DeskDemo> = {
  en: {
    heading: "Ask a question, send a request, get it approved",
    headingAccent: "get it approved",
    employee: { name: "John", role: "Maintenance technician", initials: "J", tint: "amber" },
    manager: { name: "Matt", role: "Maintenance manager", initials: "M", tint: "emerald" },
    hr: { name: "Anna", role: "HR manager", initials: "A", tint: "blue" },
    employeeIntro: {
      photo: "/images/demo-john.webp",
      alt: "John, maintenance technician, beside an industrial press",
      line: "John keeps the presses running on the morning shift.",
    },
    managerIntro: {
      photo: "/images/demo-matt.webp",
      alt: "Matt, maintenance manager, at his desk",
      line: "Matt runs the maintenance team and approves its leave.",
    },
    hrIntro: {
      photo: "/images/demo-anna.webp",
      alt: "Anna, HR manager, at her desk",
      line: "Anna looks after HR and payroll for the whole site.",
    },
    resultPhoto: {
      src: "/images/demo-john-home.webp",
      alt: "John at home on the sofa, looking after his son",
    },
    tabs: { ask: "Ask", requests: "My requests", approvals: "Approvals", hrDesk: "HR desk" },
    chat: {
      newChat: "New chat",
      chatsLabel: "Chats",
      threadTitle: "Leave to look after my son",
      empty: "What can I help with?",
      placeholder: "Ask about leave, pay, IT or how things work here",
      question: "My son is sick. How do I take two days off to look after him?",
      activity: "Searching your policies",
      answer:
        "You can take personal leave (carer's) to look after a sick family member. You have 8 of 10 days left this year. Fill in the leave form and it goes to your manager, Matt, to approve. A medical certificate is only needed for more than two days in a row.",
      sources: ["Leave policy, section 4.2", "Your leave balance"],
      source: {
        title: "Leave policy, section 4.2: Personal leave (carer's)",
        lines: [
          "Staff can take personal leave to care for a sick family member.",
          "Each employee has 10 days a year.",
          "Request it in the leave form. Your manager approves it.",
          "A medical certificate is needed for more than two days in a row.",
        ],
        mark: 0,
      },
      action: "Open the leave form",
    },
    form: {
      title: "Leave request",
      subtitle: "Prefilled from your employee record. Choose the type and add the details.",
      prefilled: "Prefilled",
      fields: [
        { label: "Name", value: "John Hale" },
        { label: "Employee ID", value: "E-2047" },
        { label: "Team", value: "Maintenance" },
        { label: "Manager", value: "Matt Rowe" },
      ],
      type: {
        label: "Type of leave",
        placeholder: "Choose a type",
        options: ["Annual leave", "Personal leave (sick)", "Personal leave (carer's)", "Unpaid leave"],
        pick: 2,
      },
      dates: {
        label: "Dates",
        placeholder: "Choose dates",
        value: "Thu 26 – Fri 27 Nov 2026 · 2 days",
      },
      balance: { before: "8 of 10 days left", after: "6 of 10 days left after this request" },
      note: {
        label: "Details for your manager",
        placeholder: "Add a note…",
        text: "My son is sick and I need to look after him.",
      },
      send: "Send request",
      sent: "Sent",
    },
    approvals: {
      title: "Approvals",
      subtitle: "Requests waiting for you",
      cols: { person: "Person", request: "Request", dates: "Dates", status: "Status" },
      rows: [
        { name: "John Hale", initials: "J", request: "Personal leave (carer's)", dates: "26–27 Nov", status: "waiting" },
        { name: "Priya Nand", initials: "P", request: "Annual leave", dates: "15–19 Dec", status: "waiting" },
        { name: "Leo Tran", initials: "L", request: "Overtime", dates: "Sat 22 Nov", status: "approved" },
      ],
      detail: {
        back: "All requests",
        checks: ["Within balance: 8 of 10 days left", "Leave policy 4.2: no certificate needed for 2 days"],
        noteLabel: "John's note",
        approve: "Approve",
        decline: "Decline",
      },
    },
    hrDesk: {
      title: "HR desk",
      subtitle: "This week: 42 questions answered from your policies, 9 requests routed.",
      recordedLabel: "Recorded for payroll",
      recorded: [
        { name: "John Hale", initials: "J", text: "Personal leave (carer's) · 26–27 Nov", status: "Approved by Matt" },
        { name: "Leo Tran", initials: "L", text: "Overtime · Sat 22 Nov", status: "Approved by Matt" },
      ],
      handoffLabel: "Needs you",
      handoff: {
        name: "Sam Ortiz, Warehouse",
        initials: "S",
        question: "Can I swap a public holiday for another day?",
        reason: "The leave policy doesn't cover this, so the desk passed it to you instead of guessing.",
        reply: "Reply",
      },
    },
    statuses: { waiting: "Waiting", approved: "Approved" },
    toasts: {
      sent: "Sent to Matt for approval",
      approved: "Approved. John and HR are notified.",
    },
    briefs: {
      start: {
        label: "Employee Service Desk",
        text: "Staff ask in plain words and get the answer from your own policies, with the source. Requests go to the right person.",
      },
      introEmployee: {
        label: "A call from school",
        text: "The school just called: John's son is sick. He needs two days off to look after him, and he isn't sure how to ask.",
      },
      task: {
        label: "John's task",
        text: "Choose the type of leave, add the details and send the request.",
      },
      introManager: {
        label: "Request to approve",
        text: "John's leave lands in Matt's queue, with his balance and the policy already checked.",
      },
      introHr: {
        label: "Fewer interruptions",
        text: "Anna didn't answer the question or chase the form. The leave is already recorded for payroll.",
      },
      result: {
        label: "The result",
        text: "Answers when your people need them. Fewer interruptions for your team. More time for the work that matters.",
      },
    },
  },
  es: {
    heading: "Haz una pregunta, envía una solicitud y que te la aprueben",
    headingAccent: "que te la aprueben",
    employee: { name: "John", role: "Técnico de mantenimiento", initials: "J", tint: "amber" },
    manager: { name: "Matt", role: "Jefe de mantenimiento", initials: "M", tint: "emerald" },
    hr: { name: "Anna", role: "Responsable de RR. HH.", initials: "A", tint: "blue" },
    employeeIntro: {
      photo: "/images/demo-john.webp",
      alt: "John, técnico de mantenimiento, junto a una prensa industrial",
      line: "John mantiene las prensas en marcha en el turno de mañana.",
    },
    managerIntro: {
      photo: "/images/demo-matt.webp",
      alt: "Matt, jefe de mantenimiento, en su mesa",
      line: "Matt dirige el equipo de mantenimiento y aprueba sus permisos.",
    },
    hrIntro: {
      photo: "/images/demo-anna.webp",
      alt: "Anna, responsable de RR. HH., en su mesa",
      line: "Anna lleva los recursos humanos y las nóminas de toda la planta.",
    },
    resultPhoto: {
      src: "/images/demo-john-home.webp",
      alt: "John en casa, en el sofá, cuidando de su hijo",
    },
    tabs: { ask: "Preguntar", requests: "Mis solicitudes", approvals: "Aprobaciones", hrDesk: "RR. HH." },
    chat: {
      newChat: "Nuevo chat",
      chatsLabel: "Chats",
      threadTitle: "Permiso para cuidar de mi hijo",
      empty: "¿En qué puedo ayudarte?",
      placeholder: "Pregunta por permisos, nóminas, informática o cómo funcionan las cosas aquí",
      question: "Mi hijo está enfermo. ¿Cómo pido dos días para cuidarlo?",
      activity: "Buscando en tus políticas",
      answer:
        "Puedes pedir un permiso para cuidar de un familiar enfermo. Te quedan 8 de 10 días este año. Rellena el formulario de permisos y le llegará a tu jefe, Matt, para que lo apruebe. Solo hace falta justificante médico para más de dos días seguidos.",
      sources: ["Política de permisos, apartado 4.2", "Tus días disponibles"],
      source: {
        title: "Política de permisos, apartado 4.2: permiso para cuidar de un familiar",
        lines: [
          "La plantilla puede pedir un permiso para cuidar de un familiar enfermo.",
          "Cada persona tiene 10 días al año.",
          "Se pide en el formulario de permisos y lo aprueba tu jefe.",
          "Hace falta justificante médico para más de dos días seguidos.",
        ],
        mark: 0,
      },
      action: "Abrir el formulario de permisos",
    },
    form: {
      title: "Solicitud de permiso",
      subtitle: "Rellenada con tus datos de empleado. Elige el tipo y añade los detalles.",
      prefilled: "Rellenado",
      fields: [
        { label: "Nombre", value: "John Hale" },
        { label: "N.º de empleado", value: "E-2047" },
        { label: "Equipo", value: "Mantenimiento" },
        { label: "Responsable", value: "Matt Rowe" },
      ],
      type: {
        label: "Tipo de permiso",
        placeholder: "Elige un tipo",
        options: ["Vacaciones", "Baja por enfermedad", "Permiso para cuidar de un familiar", "Permiso sin sueldo"],
        pick: 2,
      },
      dates: {
        label: "Fechas",
        placeholder: "Elige las fechas",
        value: "jue 26 – vie 27 nov 2026 · 2 días",
      },
      balance: { before: "8 de 10 días disponibles", after: "6 de 10 días disponibles tras esta solicitud" },
      note: {
        label: "Detalles para tu responsable",
        placeholder: "Añade una nota…",
        text: "Mi hijo está enfermo y tengo que cuidarlo.",
      },
      send: "Enviar solicitud",
      sent: "Enviada",
    },
    approvals: {
      title: "Aprobaciones",
      subtitle: "Solicitudes pendientes de ti",
      cols: { person: "Persona", request: "Solicitud", dates: "Fechas", status: "Estado" },
      rows: [
        { name: "John Hale", initials: "J", request: "Cuidado de un familiar", dates: "26–27 nov", status: "waiting" },
        { name: "Priya Nand", initials: "P", request: "Vacaciones", dates: "15–19 dic", status: "waiting" },
        { name: "Leo Tran", initials: "L", request: "Horas extra", dates: "sáb 22 nov", status: "approved" },
      ],
      detail: {
        back: "Todas las solicitudes",
        checks: [
          "Dentro de sus días: le quedan 8 de 10",
          "Política de permisos 4.2: sin justificante para 2 días",
        ],
        noteLabel: "Nota de John",
        approve: "Aprobar",
        decline: "Rechazar",
      },
    },
    hrDesk: {
      title: "RR. HH.",
      subtitle: "Esta semana: 42 preguntas respondidas con tus políticas y 9 solicitudes encaminadas.",
      recordedLabel: "Registrado para nóminas",
      recorded: [
        { name: "John Hale", initials: "J", text: "Cuidado de un familiar · 26–27 nov", status: "Aprobado por Matt" },
        { name: "Leo Tran", initials: "L", text: "Horas extra · sáb 22 nov", status: "Aprobado por Matt" },
      ],
      handoffLabel: "Te necesita",
      handoff: {
        name: "Sam Ortiz, Almacén",
        initials: "S",
        question: "¿Puedo cambiar un festivo por otro día?",
        reason: "La política de permisos no lo cubre, así que el sistema te lo ha pasado en vez de adivinar.",
        reply: "Responder",
      },
    },
    statuses: { waiting: "Pendiente", approved: "Aprobada" },
    toasts: {
      sent: "Enviada a Matt para su aprobación",
      approved: "Aprobada. Se ha avisado a John y a RR. HH.",
    },
    briefs: {
      start: {
        label: "Mesa de servicio para empleados",
        text: "La plantilla pregunta con sus palabras y recibe la respuesta de tus propias políticas, con la fuente. Las solicitudes llegan a quien toca.",
      },
      introEmployee: {
        label: "Llaman del colegio",
        text: "Acaban de llamar del colegio: el hijo de John está enfermo. Necesita dos días para cuidarlo y no sabe bien cómo pedirlos.",
      },
      task: {
        label: "La tarea de John",
        text: "Elegir el tipo de permiso, añadir los detalles y enviar la solicitud.",
      },
      introManager: {
        label: "Solicitud por aprobar",
        text: "El permiso de John llega a la bandeja de Matt, con sus días disponibles y la política ya comprobados.",
      },
      introHr: {
        label: "Menos interrupciones",
        text: "Anna no ha tenido que responder la pregunta ni perseguir el formulario. El permiso ya está registrado para nóminas.",
      },
      result: {
        label: "El resultado",
        text: "Respuestas cuando tu gente las necesita. Menos interrupciones para tu equipo. Más tiempo para lo que importa.",
      },
    },
  },
};
