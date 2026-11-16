import type { Locale } from "@/lib/i18n/config";

/**
 * Interface text for the home page's solutions sections, /solutions and the
 * per-team pages. Team and capability content lives in lib/teams.ts and
 * lib/capabilities.ts.
 */
export type SolutionsCopy = {
  teamsNavLabel: string;
  /** Home page */
  homeTeamsHeading: string;
  homeCapabilitiesHeading: string;
  homeCapabilitiesLink: string;
  /** /solutions */
  summary: string;
  teamsHeading: string;
  teamLink: string;
  capabilitiesHeading: string;
  capabilitiesIntro: string;
  usedBy: string;
  /** Team pages */
  breadcrumbLabel: string;
  casesHeading: string;
  readMore: string;
  otherTeams: string;
  cta: string;
  /** Header Solutions menu */
  menuToggle: string;
  allSolutions: string;
};

export const solutionsCopy: Record<Locale, SolutionsCopy> = {
  en: {
    teamsNavLabel: "Solutions by team",
    homeTeamsHeading: "Where does your team need help?",
    homeCapabilitiesHeading: "What ProcessSpark does",
    homeCapabilitiesLink: "See how each one works",
    summary:
      "Choose your team to see practical starting points. Each solution is scoped and validated against your systems and information.",
    teamsHeading: "Start with your team",
    teamLink: "See solutions for this team",
    capabilitiesHeading: "What it does across every team",
    capabilitiesIntro:
      "Each idea is explained once here. Team pages link back to it.",
    usedBy: "Used by",
    breadcrumbLabel: "Breadcrumb",
    casesHeading: "Where we can help",
    readMore: "How this works",
    otherTeams: "Other teams",
    cta: "Discuss your first use case",
    menuToggle: "Show solutions by team",
    allSolutions: "All solutions",
  },
  es: {
    teamsNavLabel: "Soluciones por equipo",
    homeTeamsHeading: "¿Dónde necesita ayuda tu equipo?",
    homeCapabilitiesHeading: "Qué hace ProcessSpark",
    homeCapabilitiesLink: "Ver cómo funciona cada una",
    summary:
      "Elige tu equipo y encuentra por dónde empezar. Cada solución se define y valida con tus sistemas y tu información.",
    teamsHeading: "Empieza por tu equipo",
    teamLink: "Ver las soluciones de este equipo",
    capabilitiesHeading: "Lo que hace por todos los equipos",
    capabilitiesIntro:
      "Cada idea se explica una sola vez aquí. Las páginas de cada equipo enlazan a esta explicación.",
    usedBy: "Lo usan",
    breadcrumbLabel: "Ruta de navegación",
    casesHeading: "En qué podemos ayudar",
    readMore: "Cómo funciona",
    otherTeams: "Otros equipos",
    cta: "Hablemos de tu primer caso de uso",
    menuToggle: "Mostrar soluciones por equipo",
    allSolutions: "Todas las soluciones",
  },
};
