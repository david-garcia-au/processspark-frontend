/**
 * Quote & RFQ Automation demo script (EN/ES). Played by components/quotes-demo.tsx
 * inside the same CRM-styled stage as the Talk to Your Documents demo.
 * Companies, people and figures are invented: Valvora Supply (the seller) and
 * Tandrel Packaging (the customer). No real vendor is named.
 */
import type { Locale } from "@/lib/i18n/config";
import type { Person } from "@/lib/crm-demo";

export type RfqStatus = "new" | "drafting" | "ready" | "sent" | "order";
type Brief = { label: string; text: string };

export type QuotesDemo = {
  heading: string;
  rep: Person;
  customer: Person;
  company: string;
  repIntro: { photo: string; alt: string; line: string };
  customerIntro: { photo: string; alt: string; line: string };
  resultPhoto: { src: string; alt: string };
  tabs: { rfqs: string; prices: string; customers: string };
  inbox: {
    title: string;
    subtitle: string;
    cols: { customer: string; request: string; received: string; status: string };
    back: string;
  };
  keyAccount: string;
  /** RFQs already in the dashboard before the new one lands. */
  rows: { customer: string; request: string; received: string; status: RfqStatus }[];
  newRow: { request: string; received: string };
  statuses: Record<RfqStatus, string>;
  /** The customer's email. */
  email: { subject: string; from: string; to: string; body: string[] };
  /** The draft reply the system prepares. */
  draft: {
    label: string;
    body: string[];
    cols: { item: string; qty: string; list: string; discount: string; net: string };
    line: { item: string; qty: string; list: string; discount: string; net: string };
    totals: { label: string; value: string }[];
    sources: string[];
    notePlaceholder: string;
    note: string;
    signature: string;
    send: string;
    sent: string;
  };
  toasts: { sent: string; order: string };
  briefs: {
    start: Brief;
    newRfq: Brief;
    drafting: Brief;
    task: Brief;
    received: Brief;
    result: Brief;
  };
};

export const quotesDemo: Record<Locale, QuotesDemo> = {
  en: {
    heading: "Receive an RFQ, review the draft quote, win the order",
    rep: { name: "Matt", role: "Account manager", initials: "M", tint: "emerald" },
    customer: { name: "Anna", role: "Purchasing manager", initials: "A", tint: "blue" },
    company: "Tandrel Packaging",
    repIntro: {
      photo: "/images/demo-matt.webp",
      alt: "Matt, an account manager, at his desk next to the warehouse",
      line: "Matt looks after Valvora Supply's key accounts, Tandrel Packaging among them.",
    },
    customerIntro: {
      photo: "/images/demo-anna.webp",
      alt: "Anna, a purchasing manager, at her desk",
      line: "Anna buys the parts and supplies for Tandrel's plant.",
    },
    resultPhoto: {
      src: "/images/demo-dispatch.webp",
      alt: "A pallet of stainless valves being loaded onto a truck at a loading dock",
    },
    tabs: { rfqs: "RFQs", prices: "Price list", customers: "Customers" },
    inbox: {
      title: "RFQs",
      subtitle: "Requests for quote received at sales@valvora.com",
      cols: { customer: "Customer", request: "Request", received: "Received", status: "Status" },
      back: "All RFQs",
    },
    keyAccount: "Key account",
    rows: [
      { customer: "Brookvale Foods", request: "Gate valves DN80 × 12", received: "2 h ago", status: "sent" },
      { customer: "Corrigan Mining", request: "Pressure gauges × 30", received: "Yesterday", status: "order" },
      { customer: "Hillcrest Water", request: "Check valves DN100 × 8", received: "Yesterday", status: "sent" },
    ],
    newRow: { request: "Stainless ball valves DN50 × 40", received: "Just now" },
    statuses: {
      new: "New",
      drafting: "Drafting",
      ready: "Draft ready",
      sent: "Quote sent",
      order: "Order received",
    },
    email: {
      subject: "RFQ: stainless ball valves DN50",
      from: "anna@tandrel.com",
      to: "sales@valvora.com",
      body: [
        "Hi Valvora team,",
        "We need 40 stainless ball valves, DN50, for the shutdown on line 3. John, our maintenance lead, needs them by 12 December.",
        "Can you confirm the pressure rating, your lead time and your best price?",
        "Thanks, Anna",
      ],
    },
    draft: {
      label: "Draft reply, ready for review",
      body: [
        "Hi Anna, thanks for your request.",
        "The VS-BV50 is rated to 63 bar (PN63). We have 60 in stock, so we can deliver within 3 business days, well before 12 December. Your quote, with your key-account discount, is below.",
      ],
      cols: { item: "Item", qty: "Qty", list: "List price", discount: "Discount", net: "Net" },
      line: {
        item: "VS-BV50 ball valve DN50",
        qty: "40",
        list: "A$186.00",
        discount: "−12%",
        net: "A$6,547.20",
      },
      totals: [
        { label: "Subtotal (ex GST)", value: "A$6,547.20" },
        { label: "GST", value: "A$654.72" },
        { label: "Total", value: "A$7,201.92" },
      ],
      sources: ["Price list 2026 · VS-BV50", "Tandrel terms · key account 12%", "Stock · 60 available"],
      notePlaceholder: "Add a personal note…",
      note: "Good luck with the shutdown, and say hi to John. I've put the stock aside for you.",
      signature: "Matt",
      send: "Send",
      sent: "Sent",
    },
    toasts: {
      sent: "Quote sent to Anna at Tandrel Packaging",
      order: "Purchase order PO-4471 received from Tandrel Packaging",
    },
    briefs: {
      start: {
        label: "Quote & RFQ Automation",
        text: "Requests for quote answered with a priced draft, from your price list and each customer's discounts. You review it and send.",
      },
      newRfq: {
        label: "New RFQ",
        text: "An email from Tandrel Packaging, one of Matt's key accounts, has just arrived at sales@valvora.com.",
      },
      drafting: {
        label: "Draft quote in progress",
        text: "The system reads the request, answers each question and prices the quote from the price list, with Tandrel's 12% discount.",
      },
      task: {
        label: "Matt's task",
        text: "Check the draft, add a personal note and send it to Anna.",
      },
      received: {
        label: "Quote received",
        text: "Anna gets a clear answer and a quote within minutes. It is just what she needs, so she sends a purchase order.",
      },
      result: {
        label: "The result",
        text: "Faster quotes. Happier customers. More business.",
      },
    },
  },
  es: {
    heading: "Recibe una solicitud de oferta, revisa el borrador y gana el pedido",
    rep: { name: "Matt", role: "Gestor de cuentas", initials: "M", tint: "emerald" },
    customer: { name: "Anna", role: "Responsable de compras", initials: "A", tint: "blue" },
    company: "Tandrel Packaging",
    repIntro: {
      photo: "/images/demo-matt.webp",
      alt: "Matt, gestor de cuentas, en su mesa junto al almacén",
      line: "Matt lleva las cuentas clave de Valvora Supply, entre ellas Tandrel Packaging.",
    },
    customerIntro: {
      photo: "/images/demo-anna.webp",
      alt: "Anna, responsable de compras, en su mesa",
      line: "Anna compra las piezas y los suministros de la planta de Tandrel.",
    },
    resultPhoto: {
      src: "/images/demo-dispatch.webp",
      alt: "Un palé de válvulas de acero inoxidable cargándose en un camión en el muelle",
    },
    tabs: { rfqs: "Solicitudes", prices: "Tarifa", customers: "Clientes" },
    inbox: {
      title: "Solicitudes de oferta",
      subtitle: "Solicitudes recibidas en sales@valvora.com",
      cols: { customer: "Cliente", request: "Solicitud", received: "Recibida", status: "Estado" },
      back: "Todas las solicitudes",
    },
    keyAccount: "Cuenta clave",
    rows: [
      { customer: "Brookvale Foods", request: "Válvulas de compuerta DN80 × 12", received: "Hace 2 h", status: "sent" },
      { customer: "Corrigan Mining", request: "Manómetros × 30", received: "Ayer", status: "order" },
      { customer: "Hillcrest Water", request: "Válvulas antirretorno DN100 × 8", received: "Ayer", status: "sent" },
    ],
    newRow: { request: "Válvulas de bola inox DN50 × 40", received: "Ahora mismo" },
    statuses: {
      new: "Nueva",
      drafting: "Redactando",
      ready: "Borrador listo",
      sent: "Oferta enviada",
      order: "Pedido recibido",
    },
    email: {
      subject: "Solicitud de oferta: válvulas de bola inox DN50",
      from: "anna@tandrel.com",
      to: "sales@valvora.com",
      body: [
        "Hola, equipo de Valvora:",
        "Necesitamos 40 válvulas de bola de acero inoxidable DN50 para la parada de la línea 3. John, nuestro jefe de mantenimiento, las necesita antes del 12 de diciembre.",
        "¿Nos confirmáis la presión nominal, el plazo de entrega y vuestro mejor precio?",
        "Gracias, Anna",
      ],
    },
    draft: {
      label: "Borrador de respuesta, listo para revisar",
      body: [
        "Hola, Anna. Gracias por tu solicitud.",
        "La VS-BV50 soporta 63 bar (PN63). Tenemos 60 en stock, así que podemos entregar en 3 días laborables, mucho antes del 12 de diciembre. Abajo tienes la oferta con tu descuento de cuenta clave.",
      ],
      cols: { item: "Artículo", qty: "Cant.", list: "Precio tarifa", discount: "Dto.", net: "Neto" },
      line: {
        item: "Válvula de bola VS-BV50 DN50",
        qty: "40",
        list: "186,00 €",
        discount: "−12 %",
        net: "6.547,20 €",
      },
      totals: [
        { label: "Base imponible", value: "6.547,20 €" },
        { label: "IVA (21 %)", value: "1.374,91 €" },
        { label: "Total", value: "7.922,11 €" },
      ],
      sources: ["Tarifa 2026 · VS-BV50", "Condiciones Tandrel · cuenta clave 12 %", "Stock · 60 disponibles"],
      notePlaceholder: "Añade una nota personal…",
      note: "Mucha suerte con la parada, y saluda a John de mi parte. Os he reservado el stock.",
      signature: "Matt",
      send: "Enviar",
      sent: "Enviado",
    },
    toasts: {
      sent: "Oferta enviada a Anna, de Tandrel Packaging",
      order: "Pedido PO-4471 recibido de Tandrel Packaging",
    },
    briefs: {
      start: {
        label: "Automatiza tus ofertas",
        text: "Las solicitudes de oferta se responden con un borrador con precios, sacados de tu tarifa y de los descuentos de cada cliente. Tú lo revisas y lo envías.",
      },
      newRfq: {
        label: "Nueva solicitud de oferta",
        text: "Acaba de llegar a sales@valvora.com un correo de Tandrel Packaging, una de las cuentas clave de Matt.",
      },
      drafting: {
        label: "Preparando el borrador",
        text: "El sistema lee la solicitud, responde a cada pregunta y calcula la oferta con la tarifa y el 12 % de descuento de Tandrel.",
      },
      task: {
        label: "La tarea de Matt",
        text: "Revisar el borrador, añadir una nota personal y enviárselo a Anna.",
      },
      received: {
        label: "Oferta recibida",
        text: "Anna recibe en minutos una respuesta clara y una oferta. Es justo lo que necesita, así que envía un pedido.",
      },
      result: {
        label: "El resultado",
        text: "Ofertas más rápidas. Clientes más contentos. Más negocio.",
      },
    },
  },
};
