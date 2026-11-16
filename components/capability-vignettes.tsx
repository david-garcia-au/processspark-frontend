import {
  ArrowRight,
  Bell,
  Check,
  Circle,
  FileText,
  Sparkles,
} from "lucide-react";
import type { CapabilityId } from "@/lib/capabilities";
import type { Locale } from "@/lib/i18n/config";

/**
 * Small, illustrative views of each capability at work, for the home page
 * tiles. Document names and figures are invented and contain no customer
 * names; the grid carries an "illustrative examples" note.
 */
const copy = {
  en: {
    note: "Examples are illustrative.",
    knowledge: {
      question: "What inspection is required before releasing this batch?",
      answer:
        "A visual and dimensional check on five samples, signed off by Quality before release.",
      sources: ["Release procedure QP-014 · p. 3", "Specification SP-220 · rev. C"],
    },
    reporting: {
      label: "Orders at risk",
      period: "This week",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      total: "12 orders",
    },
    briefings: {
      title: "07:00 · Morning briefing",
      rows: [
        ["Jobs behind schedule", "3"],
        ["Approvals waiting", "2"],
        ["Late supplier deliveries", "1"],
      ],
    },
    purchasing: {
      steps: ["Supplier quote", "Details captured", "Sent to approver"],
      fields: [
        ["Supplier", "Steel supplier"],
        ["Items", "4 lines"],
        ["Total", "8,420.00"],
        ["Delivery date", null],
      ],
      missing: "Missing",
    },
    onboarding: {
      title: "New starter · Week 1",
      progress: "3 of 5 done",
      tasks: [
        ["Safety induction", true],
        ["PPE issued", true],
        ["Systems access", true],
        ["Line training", false],
        ["Quality procedures", false],
      ],
    },
    requests: {
      rows: [
        ["Quote for 200 brackets", "Sales"],
        ["Damaged delivery", "Service"],
        ["Invoice INV-3381", "Finance"],
        ["Unclear request", "Review"],
      ],
    },
  },
  es: {
    note: "Los ejemplos son ilustrativos.",
    knowledge: {
      question: "¿Qué inspección hace falta antes de liberar este lote?",
      answer:
        "Una comprobación visual y dimensional de cinco muestras, firmada por Calidad antes de liberar el lote.",
      sources: [
        "Procedimiento de liberación QP-014 · p. 3",
        "Especificación SP-220 · rev. C",
      ],
    },
    reporting: {
      label: "Pedidos en riesgo",
      period: "Esta semana",
      days: ["Lun", "Mar", "Mié", "Jue", "Vie"],
      total: "12 pedidos",
    },
    briefings: {
      title: "07:00 · Resumen de la mañana",
      rows: [
        ["Trabajos retrasados", "3"],
        ["Aprobaciones pendientes", "2"],
        ["Entregas de proveedor tardías", "1"],
      ],
    },
    purchasing: {
      steps: ["Oferta del proveedor", "Datos capturados", "Enviada a aprobar"],
      fields: [
        ["Proveedor", "Proveedor de acero"],
        ["Artículos", "4 líneas"],
        ["Total", "8.420,00"],
        ["Fecha de entrega", null],
      ],
      missing: "Falta",
    },
    onboarding: {
      title: "Nueva incorporación · Semana 1",
      progress: "3 de 5 completadas",
      tasks: [
        ["Formación en seguridad", true],
        ["EPI entregado", true],
        ["Acceso a sistemas", true],
        ["Formación en línea", false],
        ["Procedimientos de calidad", false],
      ],
    },
    requests: {
      rows: [
        ["Presupuesto de 200 soportes", "Ventas"],
        ["Entrega dañada", "Atención"],
        ["Factura INV-3381", "Finanzas"],
        ["Solicitud poco clara", "Revisión"],
      ],
    },
  },
} as const;

export function vignetteNote(lang: Locale) {
  return copy[lang].note;
}

const bars = [38, 56, 44, 92, 60];

export function CapabilityVignette({
  id,
  lang,
}: {
  id: CapabilityId;
  lang: Locale;
}) {
  const c = copy[lang];
  switch (id) {
    case "knowledge":
      return (
        <div className="vig vig-knowledge" aria-hidden="true">
          <p className="vig-ask">{c.knowledge.question}</p>
          <div className="vig-panel">
            <p className="vig-answer">
              <Sparkles size={16} />
              {c.knowledge.answer}
            </p>
            <div className="vig-sources">
              {c.knowledge.sources.map((s) => (
                <span key={s}>
                  <FileText size={13} />
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      );
    case "reporting":
      return (
        <div className="vig vig-panel vig-reporting" aria-hidden="true">
          <div className="vig-head">
            <span className="vig-label">{c.reporting.label}</span>
            <span className="vig-muted">{c.reporting.period}</span>
          </div>
          <strong className="vig-figure">{c.reporting.total}</strong>
          <div className="vig-bars">
            {bars.map((h, i) => (
              <div key={c.reporting.days[i]} className="vig-bar">
                <span
                  style={{ height: `${h}%` }}
                  data-peak={i === 3 ? "true" : undefined}
                />
                <small>{c.reporting.days[i]}</small>
              </div>
            ))}
          </div>
        </div>
      );
    case "briefings":
      return (
        <div className="vig vig-panel vig-briefing" aria-hidden="true">
          <div className="vig-head">
            <span className="vig-label">
              <Bell size={14} />
              {c.briefings.title}
            </span>
          </div>
          <ul className="vig-rows">
            {c.briefings.rows.map(([label, count]) => (
              <li key={label}>
                <span>{label}</span>
                <span className="vig-count">{count}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    case "purchasing":
      return (
        <div className="vig vig-purchasing" aria-hidden="true">
          <ol className="vig-flow">
            {c.purchasing.steps.map((step, i) => (
              <li key={step} data-step={i}>
                {i === 2 ? <Check size={14} /> : null}
                {step}
                {i < 2 ? <ArrowRight size={14} className="vig-arrow" /> : null}
              </li>
            ))}
          </ol>
          <dl className="vig-panel vig-fields">
            {c.purchasing.fields.map(([term, value]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>
                  {value ?? (
                    <span className="vig-missing">{c.purchasing.missing}</span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      );
    case "onboarding":
      return (
        <div className="vig vig-panel vig-onboarding" aria-hidden="true">
          <div className="vig-head">
            <span className="vig-label">{c.onboarding.title}</span>
            <span className="vig-muted">{c.onboarding.progress}</span>
          </div>
          <div className="vig-progress">
            <span style={{ width: "60%" }} />
          </div>
          <ul className="vig-tasks">
            {c.onboarding.tasks.map(([task, done]) => (
              <li key={task} data-done={done ? "true" : "false"}>
                {done ? <Check size={14} /> : <Circle size={14} />}
                {task}
              </li>
            ))}
          </ul>
        </div>
      );
    case "requests":
      return (
        <ul className="vig vig-panel vig-requests" aria-hidden="true">
          {c.requests.rows.map(([subject, team], i) => (
            <li key={subject}>
              <span>{subject}</span>
              <span className="vig-tag" data-review={i === 3 ? "true" : undefined}>
                {team}
              </span>
            </li>
          ))}
        </ul>
      );
  }
}
