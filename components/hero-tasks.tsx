import type { CSSProperties } from "react";
import {
  ClipboardCheck,
  FileText,
  Inbox,
  ReceiptText,
  Search,
  type LucideIcon,
} from "lucide-react";
import type { Locale } from "@/lib/i18n/config";

/**
 * The tasks ProcessSpark takes off a team's plate, scattered over the hero
 * like loose slips of paper. Scrolling straightens them into an ordered
 * column on the grid (app/home.css): disorder becoming a system.
 *
 * sx/sy: scattered position, % of the hero. ex/ey: ordered position. r: tilt.
 */
const tasks: {
  icon: LucideIcon;
  en: string;
  es: string;
  sx: number;
  sy: number;
  ex: number;
  ey: number;
  r: number;
  /** Phone layout: same idea, inside the top of a narrow hero. */
  m: [sx: number, sy: number, ex: number, ey: number, r: number];
}[] = [
  {
    icon: FileText,
    en: "Automate quote generation",
    es: "Automatiza la preparación de presupuestos",
    sx: 7,
    sy: 9,
    ex: 66,
    ey: 7,
    r: -5,
    m: [5, 5, 5, 4, -4],
  },
  {
    icon: Inbox,
    en: "Route incoming requests",
    es: "Enruta y controla tus correos entrantes",
    sx: 41,
    sy: 5,
    ex: 66,
    ey: 15.5,
    r: 4,
    m: [14, 13, 5, 11.5, 3],
  },
  {
    icon: Search,
    en: "Find technical answers without searching all your documents",
    es: "Encuentra respuestas técnicas sin buscar en todos tus documentos",
    sx: 50,
    sy: 27,
    ex: 66,
    ey: 24,
    r: -3,
    m: [0, 0, 0, 0, 0],
  },
  {
    icon: ReceiptText,
    en: "Simplify invoice checks",
    es: "Simplifica la revisión de facturas",
    sx: 16,
    sy: 30,
    ex: 66,
    ey: 35,
    r: 6,
    m: [9, 22, 5, 19, 5],
  },
  {
    icon: ClipboardCheck,
    en: "Replace paper with electronic forms",
    es: "Sustituye el papel por formularios electrónicos",
    sx: 75,
    sy: 15,
    ex: 66,
    ey: 43.5,
    r: -6,
    m: [10, 31, 5, 26.5, -5],
  },
];

export function HeroTasks({ lang }: { lang: Locale }) {
  return (
    <ul
      className="hero-tasks"
      aria-label={lang === "en" ? "What we take care of" : "De qué nos ocupamos"}
    >
      {tasks.map(({ icon: Icon, ...t }) => (
        <li
          key={t.en}
          style={
            {
              "--dsx": t.sx,
              "--dsy": t.sy,
              "--dex": t.ex,
              "--dey": t.ey,
              "--dr": `${t.r}deg`,
              "--msx": t.m[0],
              "--msy": t.m[1],
              "--mex": t.m[2],
              "--mey": t.m[3],
              "--mr": `${t.m[4]}deg`,
            } as CSSProperties
          }
        >
          <span className="hero-task-icon" aria-hidden="true">
            <Icon size={16} />
          </span>
          {t[lang]}
        </li>
      ))}
    </ul>
  );
}
