import { ArrowUp, Instagram, Linkedin } from "lucide-react";
import { Brand } from "@/components/header";
import { CookieSettingsButton } from "@/components/cookie-settings-button";
import { LanguageSwitcher } from "@/components/language-switcher";
import {
  SiteLink,
  pagePath,
  sectionHref,
  type PageId,
} from "@/components/site-link";
import type { Dictionary } from "@/lib/i18n";
import { localePath, type Locale } from "@/lib/i18n/config";
import { PhoneCards } from "@/components/phone-cards";
import { footerProducts, industries } from "@/lib/catalogue";
import { site, socialLinks } from "@/lib/site";

const socialIcons = { linkedin: Linkedin, instagram: Instagram } as const;

type FooterProps = {
  lang: Locale;
  copy: Dictionary["footer"];
  switcherCopy: Dictionary["languageSwitcher"];
  brandLabel: string;
  /** Page being rendered. Defaults to the landing page. */
  page?: PageId;
  /** Locale-less path of this exact page, when it is not the page's root. */
  path?: string;
};

export function Footer({
  lang,
  copy,
  switcherCopy,
  brandLabel,
  page = "home",
  path,
}: FooterProps) {
  const here = path ?? pagePath(page);
  const current = (href: string) =>
    href === localePath(lang, here) ? ("page" as const) : undefined;
  return (
    <footer className="site-footer">
      <div className="shell site-footer-grid">
        <div className="site-footer-about">
          <h2 className="site-footer-title">{site.name}</h2>
          <Brand
            label={brandLabel}
            href={page === "home" ? "#" : localePath(lang)}
          />
          <p className="site-footer-lead">{copy.slogan}</p>
          <p className="site-footer-kicker">{copy.sloganKicker}</p>
          <div className="site-footer-follow">
            <h2 className="site-footer-follow-title">{copy.followLabel}</h2>
            <ul className="site-footer-social">
              {socialLinks.map(({ id, label, url }) => {
                const Icon = socialIcons[id];
                return (
                  <li key={id}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      title={label}
                    >
                      <Icon size={20} aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <nav aria-label={copy.navLabel} className="site-footer-nav">
          <div>
            <h2 className="site-footer-title">{copy.exploreHeading}</h2>
            <ul className="site-footer-links">
              <li>
                <SiteLink
                  href={localePath(lang, "/demos")}
                  aria-current={current(localePath(lang, "/demos"))}
                >
                  {copy.links.seeItInAction}
                </SiteLink>
              </li>
              <li>
                <SiteLink
                  href={localePath(lang, "/problems")}
                  aria-current={current(localePath(lang, "/problems"))}
                >
                  {copy.links.problems}
                </SiteLink>
              </li>
              <li>
                <SiteLink href={sectionHref(lang, page, "#approach")}>
                  {copy.links.approach}
                </SiteLink>
              </li>
              <li>
                <SiteLink
                  href={localePath(lang, "/about")}
                  aria-current={current(localePath(lang, "/about"))}
                >
                  {copy.links.about}
                </SiteLink>
              </li>
              <li>
                <SiteLink
                  href={localePath(lang, "/resources")}
                  aria-current={current(localePath(lang, "/resources"))}
                >
                  {copy.links.resources}
                </SiteLink>
              </li>
              <li>
                <a href={site.demoUrl}>{copy.links.demo}</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="site-footer-title">
              <SiteLink href={localePath(lang, "/industries")}>
                {copy.industriesHeading}
              </SiteLink>
            </h2>
            <ul className="site-footer-links">
              {industries(lang).map((industry) => (
                <li key={industry.id}>
                  <SiteLink
                    href={industry.href}
                    aria-current={current(industry.href)}
                  >
                    {industry.copy.shortName}
                  </SiteLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="site-footer-title">
              <SiteLink href={localePath(lang, "/solutions")}>
                {copy.solutionsHeading}
              </SiteLink>
            </h2>
            <ul className="site-footer-links site-footer-solutions">
              {footerProducts(lang).map((item) => (
                <li key={item.id}>
                  <SiteLink href={item.href} aria-current={current(item.href)}>
                    {item.shortName}
                  </SiteLink>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        <div>
          <h2 className="site-footer-title">{copy.talkHeading}</h2>
          <a className="site-footer-email" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <PhoneCards lang={lang} />
        </div>
      </div>
      <div className="shell">
        <div className="site-footer-bottom">
          <span>{copy.copyright}</span>
          <LanguageSwitcher lang={lang} copy={switcherCopy} path={here} />
          <span className="site-footer-legal">
            <SiteLink
              href={localePath(lang, "/privacy")}
              aria-current={page === "privacy" ? "page" : undefined}
            >
              {copy.links.privacy}
            </SiteLink>
            <CookieSettingsButton label={copy.cookieSettings} />
          </span>
          <a href="#top">
            {copy.backToTop} <ArrowUp size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
