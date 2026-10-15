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

// Icons follow the order of `useCases` in lib/content.ts.
const icons = [
  LayoutDashboard,
  ShieldCheck,
  ReceiptText,
  Mail,
  Search,
  FilePenLine,
];

export function UseCaseTiles() {
  return (
    <ul className="use-tiles">
      {useCases.map((item, i) => {
        const Icon = icons[i];
        return (
          <li className={`use-tile use-tile-${i + 1}`} key={item.title}>
            <Icon className="use-tile-ghost" aria-hidden="true" />
            <div className="use-tile-top">
              <span className="use-tile-icon">
                <Icon aria-hidden="true" />
              </span>
              <p className="use-tile-sector">{item.sector}</p>
            </div>
            <div className="use-tile-body">
              <h3>{item.title}</h3>
              <p className="use-tile-text">{item.text}</p>
            </div>
            <a className="use-tile-link" href="#contact">
              Explore the opportunity{" "}
              <ArrowRight size={15} aria-hidden="true" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
