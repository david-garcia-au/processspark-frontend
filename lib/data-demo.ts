/**
 * Talk to Your Data demo script, EN and ES. Short on purpose: John asks when
 * the TR-200's hydraulic pump was last replaced and who did it (answered from
 * the maintenance records, with the records shown), then asks when a
 * colleague is back from leave, which he isn't allowed to see. Names, dates
 * and figures are invented. No vendor is named. Played by
 * components/data-demo.tsx.
 */
import type { Person } from "@/lib/crm-demo";
import type { Locale } from "@/lib/i18n/config";

type Brief = { label: string; text: string };

export type DataDemo = {
  heading: string;
  /** The payoff phrase at the end of the heading, shown in orange. */
  headingAccent?: string;
  tech: Person;
  techIntro: { photo: string; alt: string; line: string };
  chat: {
    tabLabel: string;
    newChat: string;
    chatsLabel: string;
    threadTitle: string;
    empty: string;
    placeholder: string;
    activity: string;
    first: {
      question: string;
      answer: string;
      sources: string[];
      records: {
        title: string;
        cols: string[];
        rows: string[][];
        /** Row the answer comes from. */
        mark: number;
      };
    };
    second: { question: string; answer: string };
  };
  briefs: { start: Brief; intro: Brief; result: Brief };
};

export const dataDemo: Record<Locale, DataDemo> = {
  en: {
    heading: "Ask your records a question, get the exact answer",
    headingAccent: "get the exact answer",
    tech: { name: "John", role: "Maintenance technician", initials: "J", tint: "amber" },
    techIntro: {
      photo: "/images/demo-john.webp",
      alt: "John, maintenance technician, holding a tablet beside an industrial press",
      line: "John keeps the presses running on the morning shift.",
    },
    chat: {
      tabLabel: "AI Chat",
      newChat: "New chat",
      chatsLabel: "Chats",
      threadTitle: "TR-200 hydraulic pump",
      empty: "What can I help with?",
      placeholder: "Ask anything about your equipment, jobs and records",
      activity: "Checking what you can see, then searching your records",
      first: {
        question: "When was the hydraulic pump on the TR-200 last replaced, and who did the job?",
        answer:
          "It was last replaced on 12 March 2019, work order WO-1147, by Leo Tran, service technician. The pump before it was fitted in June 2012.",
        sources: ["Maintenance records · work orders", "Asset TR-200"],
        records: {
          title: "Work orders · TR-200 · hydraulic pump",
          cols: ["Work order", "Date", "Job", "Technician"],
          rows: [
            ["WO-1147", "12 Mar 2019", "Hydraulic pump replaced", "Leo Tran"],
            ["WO-0388", "4 Jun 2012", "Hydraulic pump replaced", "Dan Kerr"],
          ],
          mark: 0,
        },
      },
      second: {
        question: "When is Leo back from leave? I'd like to ask him about it.",
        answer: "I can't answer that.",
      },
    },
    briefs: {
      start: {
        label: "Talk to Your Data",
        text: "Ask your systems a question in plain words and get the exact answer from your records.",
      },
      intro: {
        label: "A noisy pump",
        text: "The TR-200 press is making a grinding noise near the hydraulic pump. Before he opens it up, John wants to know when the pump was last replaced.",
      },
      result: {
        label: "Permissions first",
        text: "Every question is checked against what John is allowed to see before anything is answered.",
      },
    },
  },
  es: {
    heading: "Pregunta a tus registros y obtén la respuesta exacta",
    headingAccent: "obtén la respuesta exacta",
    tech: { name: "John", role: "Técnico de mantenimiento", initials: "J", tint: "amber" },
    techIntro: {
      photo: "/images/demo-john.webp",
      alt: "John, técnico de mantenimiento, con una tableta junto a una prensa industrial",
      line: "John mantiene las prensas en marcha en el turno de mañana.",
    },
    chat: {
      tabLabel: "Chat IA",
      newChat: "Nuevo chat",
      chatsLabel: "Chats",
      threadTitle: "Bomba hidráulica de la TR-200",
      empty: "¿En qué puedo ayudarte?",
      placeholder: "Pregunta lo que quieras sobre tus equipos, trabajos y registros",
      activity: "Comprobando lo que puedes ver y buscando en tus registros",
      first: {
        question: "¿Cuándo se cambió por última vez la bomba hidráulica de la TR-200 y quién hizo el trabajo?",
        answer:
          "Se cambió por última vez el 12 de marzo de 2019, orden de trabajo WO-1147, y lo hizo Leo Tran, técnico de servicio. La bomba anterior se montó en junio de 2012.",
        sources: ["Registros de mantenimiento · órdenes de trabajo", "Equipo TR-200"],
        records: {
          title: "Órdenes de trabajo · TR-200 · bomba hidráulica",
          cols: ["Orden", "Fecha", "Trabajo", "Técnico"],
          rows: [
            ["WO-1147", "12 mar 2019", "Cambio de bomba hidráulica", "Leo Tran"],
            ["WO-0388", "4 jun 2012", "Cambio de bomba hidráulica", "Dan Kerr"],
          ],
          mark: 0,
        },
      },
      second: {
        question: "¿Cuándo vuelve Leo de su permiso? Quiero preguntarle por esto.",
        answer: "No puedo responder a eso.",
      },
    },
    briefs: {
      start: {
        label: "Habla con tus datos",
        text: "Pregunta a tus sistemas con tus palabras y obtén la respuesta exacta de tus registros.",
      },
      intro: {
        label: "Una bomba con ruido",
        text: "La prensa TR-200 hace un ruido de roce cerca de la bomba hidráulica. Antes de abrirla, John quiere saber cuándo se cambió la bomba por última vez.",
      },
      result: {
        label: "Primero, los permisos",
        text: "Cada pregunta se comprueba con lo que John puede ver antes de responder nada.",
      },
    },
  },
};
