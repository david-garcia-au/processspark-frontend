import type { CategoryId } from "@/lib/content";
import type { ProductId } from "@/lib/catalogue";
import type { Locale } from "@/lib/i18n";

/**
 * Strings of the ad landing pages (/[lang]/lp/[product]). Product wording
 * (name, lead, covers, first step) comes from the catalogue, so only the page
 * furniture lives here. Spanish is a draft for native review.
 */
export const landingCopy = {
  en: {
    cta: "Book a free discovery call",
    formHeading: "Book a free discovery call",
    closeHeading: "Ready to see it on your own work?",
    ctaShort: "Book a call",
    note: "Free 15-minute call. No commitment.",
    seeDemo: "See it working",
    seeHow: "See how it works",
    heroListLabel: "What you get",
    whatHeading: "What it does",
    startHeading: "How we start",
    exampleLabel: "Example",
    contactHeading: "Tell us about your work",
    contactText:
      "Bring us one example and we will suggest a practical first step.",
    privacy: "Privacy Policy",
  },
  es: {
    cta: "Reserva una llamada gratuita",
    formHeading: "Reserva una llamada gratuita",
    closeHeading: "¿Quieres verlo con tu propio trabajo?",
    ctaShort: "Reserva una llamada",
    note: "Llamada gratuita de 15 minutos. Sin compromiso.",
    seeDemo: "Míralo en acción",
    seeHow: "Cómo funciona",
    heroListLabel: "Qué obtienes",
    whatHeading: "Qué hace",
    startHeading: "Cómo empezamos",
    exampleLabel: "Ejemplo",
    contactHeading: "Cuéntanos tu caso",
    contactText:
      "Tráenos un ejemplo y te sugeriremos un primer paso práctico.",
    privacy: "Política de privacidad",
  },
} satisfies Record<Locale, Record<string, string>>;

/** Contact form category preselected for each product. */
export const landingCategory: Record<ProductId, CategoryId> = {
  "digitise-paperwork": "paperwork",
  "talk-to-your-data": "data-questions",
  "talk-to-your-documents": "document-answers",
  "employee-service-desk": "staff-questions",
  "customer-portal": "portals",
  "supplier-portal": "portals",
  "contractor-portal": "portals",
  "invoice-bookkeeping": "invoices",
  "estimating-bids": "quotes",
  "quotes-rfqs": "quotes",
  "sensors-iot": "monitoring",
};
