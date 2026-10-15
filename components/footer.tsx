import { ArrowUp, ArrowUpRight } from "lucide-react";
import { Brand } from "@/components/header";
import { LanguageSwitcher } from "@/components/language-switcher";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";
import { site } from "@/lib/site";

const exploreLinks = [
  ["problems", "#problems"],
  ["capabilities", "#capabilities"],
  ["useCases", "#use-cases"],
  ["approach", "#approach"],
] as const;

type FooterProps = {
  lang: Locale;
  copy: Dictionary["footer"];
  switcherCopy: Dictionary["languageSwitcher"];
  brandLabel: string;
};

export function Footer({ lang, copy, switcherCopy, brandLabel }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="shell site-footer-grid">
        <div className="site-footer-about">
          <h2 className="site-footer-title">{site.name}</h2>
          <Brand label={brandLabel} />
          <p className="site-footer-lead">{copy.lead}</p>
          <p className="site-footer-tagline">{copy.tagline}</p>
        </div>
        <div>
          <h2 className="site-footer-title">{copy.exploreHeading}</h2>
          <nav aria-label={copy.navLabel}>
            <ul className="site-footer-links">
              {exploreLinks.map(([key, href]) => (
                <li key={href}>
                  <a href={href}>{copy.links[key]}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div>
          <h2 className="site-footer-title">{copy.talkHeading}</h2>
          <a className="site-footer-cta" href="#contact">
            {copy.cta} <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <a className="site-footer-email" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </div>
      </div>
      <div className="shell">
        <div className="site-footer-bottom">
          <span>{copy.copyright}</span>
          <LanguageSwitcher lang={lang} copy={switcherCopy} />
          <a href="#top">
            {copy.backToTop} <ArrowUp size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
