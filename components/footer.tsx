import { ArrowUp, ArrowUpRight } from "lucide-react";
import { Brand } from "@/components/header";
import { LanguageSwitcher } from "@/components/language-switcher";
import { SiteLink, sectionHref, type PageId } from "@/components/site-link";
import type { Dictionary } from "@/lib/i18n";
import { localePath, type Locale } from "@/lib/i18n/config";
import { PhoneCards } from "@/components/phone-cards";
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
  /** Page being rendered. Defaults to the landing page. */
  page?: PageId;
};

export function Footer({
  lang,
  copy,
  switcherCopy,
  brandLabel,
  page = "home",
}: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="shell site-footer-grid">
        <div className="site-footer-about">
          <h2 className="site-footer-title">{site.name}</h2>
          <Brand
            label={brandLabel}
            href={page === "home" ? "#" : localePath(lang)}
          />
          <p className="site-footer-lead">{copy.lead}</p>
          <p className="site-footer-tagline">{copy.tagline}</p>
        </div>
        <div>
          <h2 className="site-footer-title">{copy.exploreHeading}</h2>
          <nav aria-label={copy.navLabel}>
            <ul className="site-footer-links">
              {exploreLinks.map(([key, hash]) => (
                <li key={hash}>
                  <SiteLink href={sectionHref(lang, page, hash)}>
                    {copy.links[key]}
                  </SiteLink>
                </li>
              ))}
              <li>
                <SiteLink
                  href={localePath(lang, "/about")}
                  aria-current={page === "about" ? "page" : undefined}
                >
                  {copy.links.about}
                </SiteLink>
              </li>
              <li>
                <a href={site.demoUrl}>{copy.links.demo}</a>
              </li>
            </ul>
          </nav>
        </div>
        <div>
          <h2 className="site-footer-title">{copy.talkHeading}</h2>
          <SiteLink
            className="site-footer-cta"
            href={sectionHref(lang, page, "#contact")}
          >
            {copy.cta} <ArrowUpRight size={18} aria-hidden="true" />
          </SiteLink>
          <a className="site-footer-email" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <PhoneCards lang={lang} variant="dark" />
        </div>
      </div>
      <div className="shell">
        <div className="site-footer-bottom">
          <span>{copy.copyright}</span>
          <LanguageSwitcher
            lang={lang}
            copy={switcherCopy}
            path={page === "about" ? "/about" : "/"}
          />
          <a href="#top">
            {copy.backToTop} <ArrowUp size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
