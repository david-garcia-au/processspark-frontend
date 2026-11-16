import { ArrowRight, Check, FileText, Flag } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";

/**
 * Home page approach: three steps on one path. Scrolling draws the line from
 * step to step (app/home.css). The pictures are illustrative and contain no
 * results or customer names.
 */
const copy = {
  en: {
    heading: "Start with one problem. Prove the value.",
    steps: [
      {
        title: "Choose the first use case",
        text: "Identify the problem, who it affects and what a better result would look like.",
      },
      {
        title: "Test with your examples",
        text: "Validate a focused solution against your information and agreed success measures.",
      },
      {
        title: "Put it to work",
        text: "Connect it to your systems and support your team through the change.",
      },
    ],
    pick: {
      options: [
        "Shift handovers",
        "Supplier invoice checks",
        "Quote follow-ups",
      ],
      chosen: 1,
      foot: "Affects: Finance · 1 team",
    },
    test: {
      fields: ["Supplier", "Items", "Total"],
      captured: "Captured",
      flagged: "Flagged for review",
      measure: "Agreed measure: time spent per invoice",
    },
    connect: {
      systems: ["ERP", "Email", "Spreadsheets"],
      hub: "ProcessSpark",
      foot: "Your team reviews the exceptions",
    },
  },
  es: {
    heading: "Empieza por un problema. Comprueba el valor.",
    steps: [
      {
        title: "Elige el primer caso de uso",
        text: "Identifica el problema, a quién afecta y qué resultado quieres conseguir.",
      },
      {
        title: "Prueba con tus ejemplos",
        text: "Valida una solución concreta con tu información y criterios de éxito acordados.",
      },
      {
        title: "Ponlo en marcha",
        text: "Conecta la solución a tus sistemas y acompaña al equipo durante el cambio.",
      },
    ],
    pick: {
      options: [
        "Relevo de turnos",
        "Revisión de facturas de proveedores",
        "Seguimiento de presupuestos",
      ],
      chosen: 1,
      foot: "A quién afecta: Finanzas · 1 equipo",
    },
    test: {
      fields: ["Proveedor", "Artículos", "Total"],
      captured: "Capturado",
      flagged: "Marcado para revisar",
      measure: "Medida acordada: tiempo dedicado a cada factura",
    },
    connect: {
      systems: ["ERP", "Correo", "Hojas de cálculo"],
      hub: "ProcessSpark",
      foot: "Tu equipo revisa las excepciones",
    },
  },
} as const;

export function ApproachJourney({ lang }: { lang: Locale }) {
  const c = copy[lang];
  return (
    <section
      className="home-section shell"
      id="approach"
      aria-labelledby="approach-title"
    >
      <h2 id="approach-title" className="home-heading">
        {c.heading}
      </h2>
      <ol className="journey">
        <li className="journey-step">
          <span className="journey-node" aria-hidden="true">
            1
          </span>
          <h3>{c.steps[0].title}</h3>
          <p>{c.steps[0].text}</p>
          <div className="journey-art" aria-hidden="true">
            <ul className="journey-pick">
              {c.pick.options.map((option, i) => (
                <li
                  key={option}
                  data-chosen={i === c.pick.chosen ? "true" : undefined}
                >
                  <span className="journey-radio" />
                  {option}
                </li>
              ))}
            </ul>
            <p className="journey-foot">{c.pick.foot}</p>
          </div>
        </li>
        <li className="journey-step">
          <span className="journey-node" aria-hidden="true">
            2
          </span>
          <h3>{c.steps[1].title}</h3>
          <p>{c.steps[1].text}</p>
          <div className="journey-art" aria-hidden="true">
            <div className="journey-test">
              <span className="journey-doc">
                <FileText size={18} />
                <i />
                <i />
                <i />
              </span>
              <ArrowRight size={18} className="journey-arrow" />
              <ul className="journey-fields">
                {c.test.fields.map((field) => (
                  <li key={field}>{field}</li>
                ))}
                <li data-status="ok">
                  <Check size={13} />
                  {c.test.captured}
                </li>
                <li data-status="flag">
                  <Flag size={13} />
                  {c.test.flagged}
                </li>
              </ul>
            </div>
            <p className="journey-foot">{c.test.measure}</p>
          </div>
        </li>
        <li className="journey-step">
          <span className="journey-node" aria-hidden="true">
            3
          </span>
          <h3>{c.steps[2].title}</h3>
          <p>{c.steps[2].text}</p>
          <div className="journey-art" aria-hidden="true">
            <ul className="journey-systems">
              {c.connect.systems.map((system) => (
                <li key={system}>{system}</li>
              ))}
            </ul>
            <span className="journey-links" />
            <span className="journey-hub">{c.connect.hub}</span>
            <p className="journey-foot">{c.connect.foot}</p>
          </div>
        </li>
      </ol>
    </section>
  );
}
