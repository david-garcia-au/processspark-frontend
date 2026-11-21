import type { CSSProperties } from "react";
import { Check } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";

/**
 * Home page trust panel. Each claim is shown working: where the data lives,
 * and an activity log with permissions. Names and times are invented.
 */
const copy = {
  en: {
    heading: "Your business information, always under control.",
    cta: "Request a demo",
    security: {
      title: "Data security and compliance",
      text: "Hosted where you decide. Never used to train AI models.",
      points: [
        "Follows your policies and compliance requirements",
        "Hosting and data handling agreed with you",
      ],
    },
    access: {
      title: "Access control and audit trail",
      text: "Each person sees only what their permissions allow. Every action is recorded.",
      points: [
        "Every action is recorded and traceable",
        "Approvals and changes are logged automatically",
      ],
    },
  },
  es: {
    heading: "Tu información empresarial, siempre bajo control.",
    cta: "Solicita una demo",
    security: {
      title: "Seguridad de los datos y cumplimiento normativo",
      text: "Alojada donde tú decidas. Nunca se usa para entrenar modelos de IA.",
      points: [
        "Cumple tus políticas y requisitos normativos",
        "Alojamiento y tratamiento de datos acordados contigo",
      ],
    },
    access: {
      title: "Control de acceso y trazabilidad",
      text: "Cada persona ve solo lo que sus permisos le permiten. Cada acción queda registrada.",
      points: [
        "Cada acción queda registrada y es trazable",
        "Las aprobaciones y los cambios se registran automáticamente",
      ],
    },
  },
} as const;

export function TrustPanel({ lang }: { lang: Locale }) {
  const c = copy[lang];
  return (
    <section className="shell home-trust" aria-labelledby="trust-title">
      <div className="trust">
        <h2 id="trust-title">
          {c.heading}
        </h2>
        <div className="trust-cols">
          <section aria-labelledby="trust-security">
            <h3 id="trust-security">{c.security.title}</h3>
            <p className="trust-sub">{c.security.text}</p>
            <ul className="trust-checks">
              {c.security.points.map((point, i) => (
                <li key={point} style={{ "--i": i } as CSSProperties}>
                  <Check size={16} aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="trust-access">
            <h3 id="trust-access">{c.access.title}</h3>
            <p className="trust-sub">{c.access.text}</p>
            <ul className="trust-checks">
              {c.access.points.map((point, i) => (
                <li key={point} style={{ "--i": i } as CSSProperties}>
                  <Check size={16} aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
}
