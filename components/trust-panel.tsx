import type { CSSProperties } from "react";
import {
  ArrowUpRight,
  Check,
  Cloud,
  Eye,
  Lock,
  Server,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
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
      label: "Where your data lives",
      onPrem: "On your own servers",
      cloud: "Cloud, in your region",
      region: "Your region",
      encrypted: "Encrypted in transit and at rest",
      points: [
        "Not used to train AI models",
        "Follows your policies and compliance requirements",
        "Hosting and data handling agreed with you",
      ],
    },
    access: {
      title: "Access control and audit trail",
      text: "Each person sees only what their permissions allow. Every action is recorded.",
      label: "Activity · Purchase request PR-1042",
      log: [
        ["MP", "Maria P. approved the request", "Finance · 09:42"],
        ["JL", "J. Lee changed the delivery date", "Purchasing · 09:15"],
        ["", "Details captured from the supplier quote", "Automatic · 08:58"],
      ],
      permsLabel: "Access · Quality team",
      perms: [
        ["Procedures", "View", true],
        ["Contracts", "No access", false],
      ],
    },
  },
  es: {
    heading: "Tu información empresarial, siempre bajo control.",
    cta: "Solicita una demo",
    security: {
      title: "Seguridad de los datos y cumplimiento normativo",
      text: "Alojada donde tú decidas. Nunca se usa para entrenar modelos de IA.",
      label: "Dónde se guardan tus datos",
      onPrem: "En tus propios servidores",
      cloud: "En la nube, en tu región",
      region: "Tu región",
      encrypted: "Cifrado en tránsito y en reposo",
      points: [
        "No se usa para entrenar modelos de IA",
        "Cumple tus políticas y requisitos normativos",
        "Alojamiento y tratamiento de datos acordados contigo",
      ],
    },
    access: {
      title: "Control de acceso y trazabilidad",
      text: "Cada persona ve solo lo que sus permisos le permiten. Cada acción queda registrada.",
      label: "Actividad · Solicitud de compra PR-1042",
      log: [
        ["MP", "María P. aprobó la solicitud", "Finanzas · 09:42"],
        ["JL", "J. Lee cambió la fecha de entrega", "Compras · 09:15"],
        ["", "Datos extraídos de la oferta del proveedor", "Automático · 08:58"],
      ],
      permsLabel: "Acceso · Equipo de calidad",
      perms: [
        ["Procedimientos", "Ver", true],
        ["Contratos", "Sin acceso", false],
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
          <ShieldCheck size={34} aria-hidden="true" />
          {c.heading}
        </h2>
        <div className="trust-cols">
          <section aria-labelledby="trust-security">
            <h3 id="trust-security">{c.security.title}</h3>
            <p className="trust-sub">{c.security.text}</p>
            <div className="trust-card">
              <p className="trust-label">{c.security.label}</p>
              <ul className="trust-options">
                <li>
                  <Server size={18} aria-hidden="true" />
                  {c.security.onPrem}
                </li>
                <li data-selected="true">
                  <Cloud size={18} aria-hidden="true" />
                  <span>
                    {c.security.cloud}
                    <small>
                      <Lock size={12} aria-hidden="true" />
                      {c.security.encrypted}
                    </small>
                  </span>
                  <span className="trust-region">{c.security.region}</span>
                </li>
              </ul>
              <ul className="trust-checks">
                {c.security.points.map((point, i) => (
                  <li key={point} style={{ "--i": i } as CSSProperties}>
                    <Check size={16} aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </section>
          <section aria-labelledby="trust-access">
            <h3 id="trust-access">{c.access.title}</h3>
            <p className="trust-sub">{c.access.text}</p>
            <div className="trust-card" aria-hidden="true">
              <p className="trust-label">{c.access.label}</p>
              <ol className="trust-log">
                {c.access.log.map(([initials, action, meta], i) => (
                  <li key={action} style={{ "--i": i } as CSSProperties}>
                    <span
                      className="trust-avatar"
                      data-auto={initials ? undefined : "true"}
                    >
                      {initials || <Sparkles size={14} />}
                    </span>
                    <span>
                      {action}
                      <small>{meta}</small>
                    </span>
                  </li>
                ))}
              </ol>
              <div className="trust-perms">
                <p className="trust-label">{c.access.permsLabel}</p>
                <ul>
                  {c.access.perms.map(([area, level, allowed], i) => (
                    <li key={area} style={{ "--i": i } as CSSProperties}>
                      {area}
                      <span data-allowed={allowed ? "true" : "false"}>
                        {allowed ? <Eye size={12} /> : <Lock size={12} />}
                        {level}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
        <div className="trust-cta">
          <a className="pill pill-light" href="#contact">
            {c.cta}
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
