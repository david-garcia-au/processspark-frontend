import type { CSSProperties } from "react";
import {
  ChartColumn,
  ClipboardCheck,
  FileText,
  Keyboard,
  ReceiptText,
  Search,
  type LucideIcon,
} from "lucide-react";
import { heroTags, type IconName } from "@/lib/catalogue";
import type { Locale } from "@/lib/i18n/config";
const icons: Partial<Record<IconName, LucideIcon>> = {
  keyboard: Keyboard,
  "clipboard-check": ClipboardCheck,
  "chart-column": ChartColumn,
  search: Search,
  "receipt-text": ReceiptText,
  "file-text": FileText,
};
/**
 * Loose slips scattered over the hero. Scrolling straightens them into an
 * ordered column on the grid (app/home.css): disorder becoming a system.
 * Text and icons come from the catalogue (`heroTags`, six, in that order);
 * the slots below keep the positions of the original production component.
 *
 * tag: index into the six catalogue tags. sx/sy: scattered position, % of the
 * hero. ex/ey: ordered position. r: tilt.
 */
const slots: {
  tag: number;
  sx: number;
  sy: number;
  ex: number;
  ey: number;
  r: number;
  /** Phone layout: same idea, inside the top of a narrow hero. */
  m: [sx: number, sy: number, ex: number, ey: number, r: number];
}[] = [
  { tag: 5, sx: 7, sy: 9, ex: 4, ey: 10, r: -5, m: [5, 2, 5, 2, -4] },
  { tag: 0, sx: 41, sy: 5, ex: 35, ey: 10, r: 4, m: [14, 19, 5, 19, 3] },
  { tag: 3, sx: 44, sy: 33, ex: 66, ey: 10, r: -3, m: [0, 0, 0, 0, 0] },
  { tag: 4, sx: 16, sy: 40, ex: 4, ey: 55, r: 6, m: [9, 36, 5, 36, 5] },
  { tag: 1, sx: 66, sy: 38, ex: 35, ey: 55, r: -6, m: [10, 53, 5, 53, -5] },
  { tag: 2, sx: 68, sy: 3, ex: 66, ey: 55, r: 5, m: [13, 70, 5, 70, 4] },
];
export function HeroTasks({ lang }: { lang: Locale }) {
  const tags = heroTags(lang);
  return (
    <ul className="hero-tasks" aria-hidden="true">
      {slots.map((t) => {
        const { icon, text } = tags[t.tag];
        const Icon = icons[icon];
        return (
          <li
            key={t.tag}
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
              {Icon ? <Icon size={16} /> : null}
            </span>
            {text}
          </li>
        );
      })}
    </ul>
  );
}
