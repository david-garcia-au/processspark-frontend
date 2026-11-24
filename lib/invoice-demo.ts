/**
 * Check Your Invoices demo script, EN and ES. Supplier invoices are read and
 * checked against their purchase order. Dunvale Electrical's invoice for the
 * Riverbend project doesn't match, so the system holds it (not sent for
 * payment) and asks Matt, the project manager, for advice and documents.
 * Marta (accounts payable) reviews why; Matt rejects it and an email asks the
 * supplier for a credit note. Names, dates and figures are invented. No vendor
 * is named. Played by components/invoice-demo.tsx.
 */
import type { Person } from "@/lib/crm-demo";
import type { Locale } from "@/lib/i18n/config";

type Brief = { label: string; text: string };
type Intro = { photo: string; alt: string; line: string };
export type InvoiceStatus = "reading" | "matched" | "held" | "rejected";

export type InvoiceDemo = {
  heading: string;
  /** The payoff phrase at the end of the heading, shown in orange. */
  headingAccent?: string;
  ap: Person;
  pm: Person;
  apIntro: Intro;
  pmIntro: Intro;
  resultPhoto: { src: string; alt: string };
  tabs: { invoices: string; orders: string; suppliers: string; inbox: string; projects: string };
  inbox: {
    title: string;
    subtitle: string;
    summary: string;
    cols: { supplier: string; invoice: string; order: string; amount: string; status: string };
    /** Dunvale's invoice first; it is the one that gets held. */
    rows: { supplier: string; invoice: string; order: string; amount: string }[];
  };
  detail: {
    back: string;
    title: string;
    project: string;
    cols: { item: string; order: string; invoice: string; check: string };
    lines: { item: string; order: string; invoice: string; check: string; ok: boolean }[];
    totals: { label: string; value: string }[];
    difference: string;
    hold: string;
    notified: string;
  };
  advice: {
    title: string;
    from: string;
    text: string;
    differencesLabel: string;
    differences: string[];
    attach: string;
    approve: string;
    reject: string;
    email: {
      label: string;
      to: string;
      subject: string;
      body: string[];
      sending: string;
      sent: string;
    };
  };
  statuses: Record<InvoiceStatus, string>;
  toasts: { held: string; sent: string };
  briefs: {
    start: Brief;
    introAp: Brief;
    task: Brief;
    introPm: Brief;
    result: Brief;
  };
};

export const invoiceDemo: Record<Locale, InvoiceDemo> = {
  en: {
    heading: "Check every invoice against the order, pay only what's approved",
    headingAccent: "pay only what's approved",
    ap: { name: "Marta", role: "Accounts payable", initials: "M", tint: "violet" },
    pm: { name: "Matt", role: "Project manager", initials: "M", tint: "emerald" },
    apIntro: {
      photo: "/images/employee-service-desk.webp",
      alt: "Marta, accounts payable, at her desk in an office beside the factory floor",
      line: "Marta checks and pays the supplier invoices for the whole business.",
    },
    pmIntro: {
      photo: "/images/demo-matt.webp",
      alt: "Matt, project manager, at his desk",
      line: "Matt runs the Riverbend depot upgrade and approves what it buys.",
    },
    resultPhoto: {
      src: "/images/demo-marta-done.webp",
      alt: "Marta at her desk in the late afternoon, relaxed, her work done",
    },
    tabs: {
      invoices: "Invoices",
      orders: "Purchase orders",
      suppliers: "Suppliers",
      inbox: "Inbox",
      projects: "Projects",
    },
    inbox: {
      title: "Supplier invoices",
      subtitle: "Read and checked against their purchase order before payment",
      summary: "38 invoices this weekend · 37 match their PO · 1 on hold",
      cols: { supplier: "Supplier", invoice: "Invoice", order: "PO", amount: "Amount", status: "Status" },
      rows: [
        { supplier: "Dunvale Electrical", invoice: "INV-88213", order: "PO-3318", amount: "A$13,206.60" },
        { supplier: "Kestrin Civil", invoice: "KC-20417", order: "PO-3302", amount: "A$48,950.00" },
        { supplier: "Corvex Steel", invoice: "CX-1190", order: "PO-3297", amount: "A$21,474.50" },
        { supplier: "Tamsin Hire", invoice: "TH-5521", order: "PO-3311", amount: "A$2,860.00" },
        { supplier: "Pellow Office Supplies", invoice: "PO-77104", order: "PO-3320", amount: "A$412.30" },
      ],
    },
    detail: {
      back: "All invoices",
      title: "INV-88213 · Dunvale Electrical",
      project: "Riverbend depot upgrade · PO-3318",
      cols: { item: "Item", order: "On the PO", invoice: "Invoiced", check: "Check" },
      lines: [
        {
          item: "Cable tray 300 mm",
          order: "120 m × A$38.50",
          invoice: "120 m × A$38.50",
          check: "Matches",
          ok: true,
        },
        {
          item: "LED high-bay light 150 W",
          order: "20 × A$289.00",
          invoice: "24 × A$289.00",
          check: "4 more than ordered · A$1,156.00",
          ok: false,
        },
        {
          item: "Site call-out fee",
          order: "Not ordered",
          invoice: "1 × A$450.00",
          check: "Not on the PO · A$450.00",
          ok: false,
        },
      ],
      totals: [
        { label: "PO (ex GST)", value: "A$10,400.00" },
        { label: "Invoice (ex GST)", value: "A$12,006.00" },
      ],
      difference: "A$1,606.00 more than the PO",
      hold: "On hold: not sent for payment",
      notified: "Matt Rowe, project manager, has been asked for advice and supporting documents.",
    },
    advice: {
      title: "Needs your advice",
      from: "From accounts payable · Marta",
      text: "Dunvale's invoice INV-88213 for Riverbend doesn't match PO-3318. Do you have documents that support the extra items?",
      differencesLabel: "Differences",
      differences: [
        "LED high-bay lights: 24 invoiced, 20 ordered (A$1,156.00)",
        "Site call-out fee: not on the PO (A$450.00)",
      ],
      attach: "Attach documents",
      approve: "Approve as invoiced",
      reject: "Reject: request a credit note",
      email: {
        label: "Email to Dunvale Electrical",
        to: "accounts@dunvale.com",
        subject: "Credit note needed for INV-88213",
        body: [
          "Hello Dunvale team,",
          "Invoice INV-88213 doesn't match our purchase order PO-3318. It bills 4 more LED high-bay lights than we ordered (A$1,156.00) and a site call-out fee that wasn't agreed (A$450.00).",
          "Please send a credit note for A$1,766.60 (A$1,606.00 plus GST). We will process the payment once we receive it.",
        ],
        sending: "Sending…",
        sent: "Sent",
      },
    },
    statuses: {
      reading: "Reading…",
      matched: "Matches PO",
      held: "On hold",
      rejected: "Waiting for credit note",
    },
    toasts: {
      held: "Held, not sent for payment. Matt has been asked for advice.",
      sent: "Invoice rejected. Credit note requested from Dunvale Electrical.",
    },
    briefs: {
      start: {
        label: "Check Your Invoices",
        text: "Every supplier invoice is read and checked against the purchase order before it can be paid. A person decides what doesn't match.",
      },
      introAp: {
        label: "Monday morning",
        text: "38 supplier invoices came in over the weekend. Each one is read and checked against its purchase order.",
      },
      task: {
        label: "Marta's task",
        text: "Check why Dunvale's invoice was held, before anything is paid.",
      },
      introPm: {
        label: "A question from accounts",
        text: "Dunvale's invoice for Riverbend doesn't match the PO. Marta needs Matt's advice and any supporting documents.",
      },
      result: {
        label: "The result",
        text: "Catch discrepancies before they become payments. Resolve them with the right people. Pay only what's approved.",
      },
    },
  },
  es: {
    heading: "Revisa cada factura contra el pedido y paga solo lo aprobado",
    headingAccent: "paga solo lo aprobado",
    ap: { name: "Marta", role: "Contabilidad", initials: "M", tint: "violet" },
    pm: { name: "Matt", role: "Jefe de proyecto", initials: "M", tint: "emerald" },
    apIntro: {
      photo: "/images/employee-service-desk.webp",
      alt: "Marta, de contabilidad, en su mesa en una oficina junto a la planta",
      line: "Marta revisa y paga las facturas de proveedores de toda la empresa.",
    },
    pmIntro: {
      photo: "/images/demo-matt.webp",
      alt: "Matt, jefe de proyecto, en su mesa",
      line: "Matt dirige la ampliación del almacén Riverbend y aprueba sus compras.",
    },
    resultPhoto: {
      src: "/images/demo-marta-done.webp",
      alt: "Marta en su mesa a última hora de la tarde, tranquila, con el trabajo hecho",
    },
    tabs: {
      invoices: "Facturas",
      orders: "Pedidos",
      suppliers: "Proveedores",
      inbox: "Bandeja",
      projects: "Proyectos",
    },
    inbox: {
      title: "Facturas de proveedores",
      subtitle: "Leídas y revisadas contra su pedido antes del pago",
      summary: "38 facturas este fin de semana · 37 coinciden con su pedido · 1 retenida",
      cols: { supplier: "Proveedor", invoice: "Factura", order: "Pedido", amount: "Importe", status: "Estado" },
      rows: [
        { supplier: "Dunvale Electrical", invoice: "INV-88213", order: "PO-3318", amount: "14.527,26 €" },
        { supplier: "Kestrin Civil", invoice: "KC-20417", order: "PO-3302", amount: "48.950,00 €" },
        { supplier: "Corvex Steel", invoice: "CX-1190", order: "PO-3297", amount: "21.474,50 €" },
        { supplier: "Tamsin Hire", invoice: "TH-5521", order: "PO-3311", amount: "2.860,00 €" },
        { supplier: "Pellow Office Supplies", invoice: "PO-77104", order: "PO-3320", amount: "412,30 €" },
      ],
    },
    detail: {
      back: "Todas las facturas",
      title: "INV-88213 · Dunvale Electrical",
      project: "Ampliación almacén Riverbend · PO-3318",
      cols: { item: "Artículo", order: "En el pedido", invoice: "Facturado", check: "Revisión" },
      lines: [
        {
          item: "Bandeja portacables 300 mm",
          order: "120 m × 38,50 €",
          invoice: "120 m × 38,50 €",
          check: "Coincide",
          ok: true,
        },
        {
          item: "Campana LED 150 W",
          order: "20 × 289,00 €",
          invoice: "24 × 289,00 €",
          check: "4 más de lo pedido · 1.156,00 €",
          ok: false,
        },
        {
          item: "Desplazamiento a obra",
          order: "No pedido",
          invoice: "1 × 450,00 €",
          check: "No está en el pedido · 450,00 €",
          ok: false,
        },
      ],
      totals: [
        { label: "Pedido (sin IVA)", value: "10.400,00 €" },
        { label: "Factura (sin IVA)", value: "12.006,00 €" },
      ],
      difference: "1.606,00 € más que el pedido",
      hold: "Retenida: no se envía a pago",
      notified: "Se ha pedido consejo y documentación a Matt Rowe, jefe de proyecto.",
    },
    advice: {
      title: "Necesita tu opinión",
      from: "De contabilidad · Marta",
      text: "La factura INV-88213 de Dunvale para Riverbend no coincide con el pedido PO-3318. ¿Tienes documentos que justifiquen lo que sobra?",
      differencesLabel: "Diferencias",
      differences: [
        "Campanas LED: 24 facturadas, 20 pedidas (1.156,00 €)",
        "Desplazamiento a obra: no está en el pedido (450,00 €)",
      ],
      attach: "Adjuntar documentos",
      approve: "Aprobar tal cual",
      reject: "Rechazar: pedir un abono",
      email: {
        label: "Correo a Dunvale Electrical",
        to: "accounts@dunvale.com",
        subject: "Abono necesario para la factura INV-88213",
        body: [
          "Hola, equipo de Dunvale:",
          "La factura INV-88213 no coincide con nuestro pedido PO-3318. Factura 4 campanas LED más de las pedidas (1.156,00 €) y un desplazamiento a obra que no estaba acordado (450,00 €).",
          "Por favor, enviadnos un abono de 1.943,26 € (1.606,00 € más IVA). Tramitaremos el pago en cuanto lo recibamos.",
        ],
        sending: "Enviando…",
        sent: "Enviado",
      },
    },
    statuses: {
      reading: "Leyendo…",
      matched: "Coincide",
      held: "Retenida",
      rejected: "Pendiente de abono",
    },
    toasts: {
      held: "Retenida, no se envía a pago. Se ha pedido consejo a Matt.",
      sent: "Factura rechazada. Se ha pedido un abono a Dunvale Electrical.",
    },
    briefs: {
      start: {
        label: "Comprueba tus facturas",
        text: "Cada factura de proveedor se lee y se revisa contra su pedido antes de pagarla. Una persona decide lo que no coincide.",
      },
      introAp: {
        label: "Lunes por la mañana",
        text: "Han llegado 38 facturas de proveedores durante el fin de semana. Cada una se lee y se revisa contra su pedido.",
      },
      task: {
        label: "La tarea de Marta",
        text: "Ver por qué se ha retenido la factura de Dunvale, antes de pagar nada.",
      },
      introPm: {
        label: "Una pregunta de contabilidad",
        text: "La factura de Dunvale para Riverbend no coincide con el pedido. Marta necesita la opinión de Matt y cualquier documento que la respalde.",
      },
      result: {
        label: "El resultado",
        text: "Detecta diferencias antes de pagar. Resuélvelas con los responsables. Paga solo lo aprobado.",
      },
    },
  },
};
