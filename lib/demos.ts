/**
 * Interactive demos for the solution pages. Each one is a short, invented
 * scenario (about 45 seconds): what arrives, what ProcessSpark does step by
 * step, where a person decides, and what is logged. Names, dates and figures
 * are illustrative and say so on the card. No platform or vendor is named.
 *
 * Add a demo by adding an entry for the product id, in both languages. The
 * page shows the card only for products that have one.
 */
import type { Locale } from "@/lib/i18n/config";
import type { ProductId } from "@/lib/catalogue";

export type DemoField = { label: string; value: string; flag?: boolean };

export type DemoInput =
  | {
      kind: "document";
      title: string;
      meta: string;
      fields: DemoField[];
    }
  | {
      kind: "chat";
      /** Who is asking, and where. */
      asker: string;
      question: string;
    };

export type DemoResult =
  | {
      kind: "checks";
      title: string;
      rows: { label: string; value: string; flag?: boolean }[];
    }
  | {
      kind: "answer";
      text: string;
      sources: string[];
    };

export type DemoChoice = {
  label: string;
  /** What happens next, in one sentence. */
  outcome: string;
  /** The audit-log line. */
  log: string;
  /** Optional panel shown after the choice, for example the source page. */
  reveal?: { title: string; lines: string[]; mark?: number };
};

export type Demo = {
  heading: string;
  intro: string;
  input: DemoInput;
  steps: { title: string; detail: string }[];
  result: DemoResult;
  gate: {
    /** "review": a person must look at an exception. "info": optional check. */
    tone: "review" | "info";
    title: string;
    prompt: string;
    choices: DemoChoice[];
  };
};

export type DemoUi = {
  illustrative: string;
  arrives: string;
  does: string;
  idle: string;
  run: string;
  running: string;
  replay: string;
  logged: string;
  ctaLead: string;
  ctaButton: string;
  regionLabel: string;
};

export const demoUi: Record<Locale, DemoUi> = {
  en: {
    illustrative: "Illustrative example. Names and figures are invented.",
    arrives: "What arrives",
    does: "What ProcessSpark does",
    idle: "Press run to watch it work. It takes about 45 seconds.",
    run: "Run the demo",
    running: "Working",
    replay: "Run it again",
    logged: "Logged",
    ctaLead: "Want to see this on your own work?",
    ctaButton: "Request a personalised demo",
    regionLabel: "Interactive demo",
  },
  es: {
    illustrative: "Ejemplo ilustrativo. Los nombres y las cifras son inventados.",
    arrives: "Lo que llega",
    does: "Lo que hace ProcessSpark",
    idle: "Pulsa para verlo funcionar. Dura unos 45 segundos.",
    run: "Ver la demo",
    running: "Trabajando",
    replay: "Verla otra vez",
    logged: "Registrado",
    ctaLead: "¿Quieres verlo con tu propio trabajo?",
    ctaButton: "Solicita una demo personalizada",
    regionLabel: "Demo interactiva",
  },
};

type Demos = Partial<Record<ProductId, Record<Locale, Demo>>>;

export const demos: Demos = {
  "digitise-paperwork": {
    en: {
      heading: "Watch a supplier certificate get read and checked",
      intro:
        "A certificate arrives as a PDF. See what happens before anyone types anything.",
      input: {
        kind: "document",
        title: "Supplier certificate",
        meta: "PDF, 1 page",
        fields: [
          { label: "Supplier", value: "Northfield Castings Ltd" },
          { label: "Purchase order", value: "PO-45021" },
          { label: "Material", value: "2 in ball valve, 316 stainless" },
          { label: "Batch", value: "B2401", flag: true },
          { label: "Valid until", value: "12 Mar 2027" },
        ],
      },
      steps: [
        {
          title: "Reading the document",
          detail: "Supplier, order number, material, batch and date found.",
        },
        {
          title: "Checking against your records",
          detail: "Order PO-45021 found. Supplier and material match.",
        },
        {
          title: "Checking your rules",
          detail:
            "The certificate is in date. The batch does not match the delivery note.",
        },
        {
          title: "Preparing the record",
          detail: "Clean data is ready. One item needs a person.",
        },
      ],
      result: {
        kind: "checks",
        title: "Ready for review",
        rows: [
          { label: "Supplier", value: "Matches the order" },
          { label: "Material", value: "Matches the order" },
          { label: "In date", value: "Valid until 12 Mar 2027" },
          {
            label: "Batch",
            value: "Certificate B2401, delivery note B2410",
            flag: true,
          },
        ],
      },
      gate: {
        tone: "review",
        title: "A person decides",
        prompt: "The batch numbers differ. What should happen?",
        choices: [
          {
            label: "Ask the supplier to confirm",
            outcome:
              "A message goes to the supplier asking them to confirm the batch. Nothing is filed until they reply.",
            log: "Batch mismatch sent back to the supplier by Quality",
          },
          {
            label: "Accept and send on",
            outcome:
              "The data goes on to your system. The flag and the decision stay with the document.",
            log: "Batch mismatch accepted by Quality, then sent on",
          },
        ],
      },
    },
    es: {
      heading: "Mira cómo se lee y se comprueba un certificado de proveedor",
      intro:
        "Un certificado llega en PDF. Mira qué pasa antes de que nadie teclee nada.",
      input: {
        kind: "document",
        title: "Certificado de proveedor",
        meta: "PDF, 1 página",
        fields: [
          { label: "Proveedor", value: "Northfield Castings Ltd" },
          { label: "Pedido de compra", value: "PO-45021" },
          { label: "Material", value: "Válvula de bola 2 in, acero 316" },
          { label: "Lote", value: "B2401", flag: true },
          { label: "Válido hasta", value: "12 mar 2027" },
        ],
      },
      steps: [
        {
          title: "Leyendo el documento",
          detail: "Proveedor, pedido, material, lote y fecha encontrados.",
        },
        {
          title: "Comprobando con tus registros",
          detail: "Pedido PO-45021 encontrado. Proveedor y material coinciden.",
        },
        {
          title: "Comprobando tus reglas",
          detail:
            "El certificado está en vigor. El lote no coincide con el albarán.",
        },
        {
          title: "Preparando el registro",
          detail: "Los datos limpios están listos. Un punto necesita a una persona.",
        },
      ],
      result: {
        kind: "checks",
        title: "Listo para revisar",
        rows: [
          { label: "Proveedor", value: "Coincide con el pedido" },
          { label: "Material", value: "Coincide con el pedido" },
          { label: "En vigor", value: "Válido hasta 12 mar 2027" },
          {
            label: "Lote",
            value: "Certificado B2401, albarán B2410",
            flag: true,
          },
        ],
      },
      gate: {
        tone: "review",
        title: "Decide una persona",
        prompt: "Los lotes no coinciden. ¿Qué debe pasar?",
        choices: [
          {
            label: "Pedir al proveedor que lo confirme",
            outcome:
              "Se envía un mensaje al proveedor para que confirme el lote. No se archiva nada hasta que responda.",
            log: "Diferencia de lote devuelta al proveedor por Calidad",
          },
          {
            label: "Aceptar y enviar",
            outcome:
              "Los datos pasan a tu sistema. El aviso y la decisión quedan junto al documento.",
            log: "Diferencia de lote aceptada por Calidad y enviada",
          },
        ],
      },
    },
  },
  "supplier-portal": {
    en: {
      heading: "Watch a supplier get an answer without calling anyone",
      intro:
        "A supplier asks about an invoice. The answer comes from your own system, within what you choose to share.",
      input: {
        kind: "chat",
        asker: "Northfield Castings, in the supplier portal",
        question: "Has invoice INV-2041 arrived, and when will it be paid?",
      },
      steps: [
        {
          title: "Reading the question",
          detail: "The supplier wants the status and payment date of INV-2041.",
        },
        {
          title: "Checking your accounting system",
          detail:
            "Read-only. Invoice received 4 Nov and matched to the order. Last updated 09:12 today.",
        },
        {
          title: "Applying what suppliers may see",
          detail:
            "Status and payment date are shared. Internal notes are not.",
        },
        {
          title: "Checking what is outstanding",
          detail: "The quality certificate for batch B2401 is still missing.",
        },
      ],
      result: {
        kind: "answer",
        text: "Invoice INV-2041 was received on 4 Nov and is being processed. Payment is expected on 28 Nov. One document is missing: the quality certificate for batch B2401. You can upload it here.",
        sources: ["Accounting system, read-only, updated 09:12 today"],
      },
      gate: {
        tone: "info",
        title: "Your team stays in control",
        prompt:
          "The answer went out without anyone on your team being asked. See what they see.",
        choices: [
          {
            label: "See what your team sees",
            outcome:
              "Suppliers get answers straight away. Your team sees every exchange and handles anything outside the rules.",
            log: "Supplier question answered and logged for your team",
            reveal: {
              title: "Your team's view",
              lines: [
                "09:14  Question answered: invoice status and payment date",
                "Shared with the supplier: status, payment date",
                "Not shared: internal notes",
                "Outside the rules? It goes to Accounts payable",
              ],
            },
          },
        ],
      },
    },
    es: {
      heading: "Mira cómo un proveedor recibe respuesta sin llamar a nadie",
      intro:
        "Un proveedor pregunta por una factura. La respuesta sale de tu propio sistema y solo muestra lo que tú decides compartir.",
      input: {
        kind: "chat",
        asker: "Northfield Castings, en el portal de proveedores",
        question: "¿Ha llegado la factura INV-2041 y cuándo se pagará?",
      },
      steps: [
        {
          title: "Leyendo la pregunta",
          detail:
            "El proveedor quiere saber el estado y la fecha de pago de INV-2041.",
        },
        {
          title: "Consultando tu sistema contable",
          detail:
            "Solo lectura. Factura recibida el 4 nov y cruzada con el pedido. Actualizado hoy a las 09:12.",
        },
        {
          title: "Aplicando lo que un proveedor puede ver",
          detail:
            "El estado y la fecha de pago se comparten. Las notas internas no.",
        },
        {
          title: "Revisando lo que falta",
          detail: "Falta el certificado de calidad del lote B2401.",
        },
      ],
      result: {
        kind: "answer",
        text: "La factura INV-2041 se recibió el 4 nov y se está procesando. El pago está previsto para el 28 nov. Falta un documento: el certificado de calidad del lote B2401. Puedes subirlo aquí.",
        sources: ["Sistema contable, solo lectura, actualizado hoy a las 09:12"],
      },
      gate: {
        tone: "info",
        title: "Tu equipo mantiene el control",
        prompt:
          "La respuesta salió sin preguntar a nadie de tu equipo. Mira lo que ve tu equipo.",
        choices: [
          {
            label: "Ver lo que ve tu equipo",
            outcome:
              "Los proveedores reciben respuesta al momento. Tu equipo ve cada intercambio y atiende lo que queda fuera de las reglas.",
            log: "Pregunta del proveedor respondida y registrada para tu equipo",
            reveal: {
              title: "La vista de tu equipo",
              lines: [
                "09:14  Pregunta respondida: estado de factura y fecha de pago",
                "Compartido con el proveedor: estado, fecha de pago",
                "No compartido: notas internas",
                "¿Fuera de las reglas? Pasa a Cuentas a pagar",
              ],
            },
          },
        ],
      },
    },
  },
  "talk-to-your-documents": {
    en: {
      heading: "Watch it answer a question from your own manuals",
      intro:
        "A technician is stuck at the machine. The answer comes from your documents, with the page it came from.",
      input: {
        kind: "chat",
        asker: "Maintenance technician, on the shop floor",
        question:
          "What is an E530 error on the mechanical press and how can I fix it?",
      },
      steps: [
        {
          title: "Reading the question",
          detail: "Equipment: mechanical press. Error code: E530.",
        },
        {
          title: "Searching your manuals and past jobs",
          detail: "The press manual, section 7.4, and one past job record found.",
        },
        {
          title: "Checking the sources are current",
          detail: "Manual last updated 3 Mar. Job record from 14 Aug.",
        },
        {
          title: "Writing the answer from those sources only",
          detail: "Nothing is added that is not in your documents.",
        },
      ],
      result: {
        kind: "answer",
        text: "E530 is a clutch position fault. Check the position sensor, clear the guard area, then reset (manual, page 84). The same fault was fixed on 14 Aug by replacing the sensor (job record 2291).",
        sources: [
          "Press manual, page 84, updated 3 Mar",
          "Job record 2291, 14 Aug",
        ],
      },
      gate: {
        tone: "info",
        title: "Check it yourself",
        prompt: "Every answer shows where it came from. Open the source.",
        choices: [
          {
            label: "Open the manual page",
            outcome:
              "The question and both sources are kept for your team to review.",
            log: "Question and sources logged for your team",
            reveal: {
              title: "Press manual, section 7.4, page 84",
              lines: [
                "E530: clutch position fault",
                "1. Switch off and lock out the press.",
                "2. Check the position sensor and clear the guard area.",
                "3. Reset the fault and run one test cycle.",
              ],
              mark: 2,
            },
          },
        ],
      },
    },
    es: {
      heading: "Mira cómo responde una pregunta con tus propios manuales",
      intro:
        "Un técnico se queda parado ante la máquina. La respuesta sale de tus documentos, con la página de donde viene.",
      input: {
        kind: "chat",
        asker: "Técnico de mantenimiento, en planta",
        question:
          "¿Qué es un error E530 en la prensa mecánica y cómo se soluciona?",
      },
      steps: [
        {
          title: "Leyendo la pregunta",
          detail: "Equipo: prensa mecánica. Código de error: E530.",
        },
        {
          title: "Buscando en tus manuales y trabajos anteriores",
          detail:
            "Encontrados el manual de la prensa, apartado 7.4, y un registro de trabajo anterior.",
        },
        {
          title: "Comprobando que las fuentes están al día",
          detail:
            "Manual actualizado el 3 mar. Registro de trabajo del 14 ago.",
        },
        {
          title: "Redactando la respuesta solo con esas fuentes",
          detail: "No se añade nada que no esté en tus documentos.",
        },
      ],
      result: {
        kind: "answer",
        text: "E530 es un fallo de posición del embrague. Revisa el sensor de posición, despeja la zona de protección y reinicia (manual, página 84). El mismo fallo se resolvió el 14 ago cambiando el sensor (registro de trabajo 2291).",
        sources: [
          "Manual de la prensa, página 84, actualizado el 3 mar",
          "Registro de trabajo 2291, 14 ago",
        ],
      },
      gate: {
        tone: "info",
        title: "Compruébalo tú",
        prompt: "Cada respuesta muestra de dónde sale. Abre la fuente.",
        choices: [
          {
            label: "Abrir la página del manual",
            outcome:
              "La pregunta y las dos fuentes se guardan para que tu equipo las revise.",
            log: "Pregunta y fuentes registradas para tu equipo",
            reveal: {
              title: "Manual de la prensa, apartado 7.4, página 84",
              lines: [
                "E530: fallo de posición del embrague",
                "1. Apaga y bloquea la prensa.",
                "2. Revisa el sensor de posición y despeja la zona de protección.",
                "3. Reinicia el fallo y haz un ciclo de prueba.",
              ],
              mark: 2,
            },
          },
        ],
      },
    },
  },
};

// While we refine the stage, only Digitise Your Paperwork shows a demo.
const liveDemos: ProductId[] = ["digitise-paperwork"];
export function demoFor(lang: Locale, id: ProductId): Demo | undefined {
  if (!liveDemos.includes(id)) return undefined;
  return demos[id]?.[lang];
}
