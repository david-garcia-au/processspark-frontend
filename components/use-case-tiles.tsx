import {
  ArrowRight,
  FilePenLine,
  LayoutDashboard,
  Mail,
  ReceiptText,
  Search,
  ShieldCheck,
} from "lucide-react";
import { useCases } from "@/lib/content";
import type { Dictionary } from "@/lib/i18n";

// Icons follow the order of `useCases` in lib/content.ts.
const icons = [
  LayoutDashboard,
  ShieldCheck,
  ReceiptText,
  Mail,
  Search,
  FilePenLine,
];

export function UseCaseTiles({ copy }: { copy: Dictionary["useCases"] }) {
  return (
    <ul className="use-tiles">
      {useCases.map((item, i) => {
        const Icon = icons[i];
        const text = copy.items[item.id];
        return (
          <li className={`use-tile use-tile-${i + 1}`} key={item.id}>
            <Icon className="use-tile-ghost" aria-hidden="true" />
            <div className="use-tile-top">
              <span className="use-tile-icon">
                <Icon aria-hidden="true" />
              </span>
              <p className="use-tile-sector">{text.sector}</p>
            </div>
            <div className="use-tile-body">
              <h3>{text.title}</h3>
              <p className="use-tile-text">{text.text}</p>
            </div>
            <a className="use-tile-link" href="#contact">
              {copy.cta} <ArrowRight size={15} aria-hidden="true" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
