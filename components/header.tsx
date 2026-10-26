"use client";
import { useState } from "react";
import { ArrowUpRight, Menu, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/language-switcher";
import type { Dictionary } from "@/lib/i18n";
import { SiteLink, sectionHref, type PageId } from "@/components/site-link";
import { localePath, type Locale } from "@/lib/i18n/config";

export function Brand({ label, href = "#" }: { label: string; href?: string }) {
  return (
    <SiteLink href={href} className="brand" aria-label={label}>
      <span className="brand-icon">
        <Zap size={21} fill="currentColor" />
      </span>
      Process<span className="brand-light">Spark</span>
      <span className="brand-dot">.</span>
    </SiteLink>
  );
}

const sectionLinks = [
  ["problems", "#problems"],
  ["capabilities", "#capabilities"],
  ["useCases", "#use-cases"],
  ["approach", "#approach"],
] as const;

type HeaderProps = {
  lang: Locale;
  copy: Dictionary["header"];
  switcherCopy: Dictionary["languageSwitcher"];
  brandLabel: string;
  /** Page being rendered. Defaults to the landing page. */
  page?: PageId;
};

export function Header({
  lang,
  copy,
  switcherCopy,
  brandLabel,
  page = "home",
}: HeaderProps) {
  const [open, setOpen] = useState(false);
  const aboutHref = localePath(lang, "/about");
  const aboutCurrent = page === "about" ? ("page" as const) : undefined;
  const switchPath =
    page === "about" ? "/about" : page === "resources" ? "/resources" : "/";
  const contactHref = sectionHref(lang, page, "#contact");
  return (
    <header className="header">
      <div className="shell nav">
        <Brand
          label={brandLabel}
          href={page === "home" ? "#" : localePath(lang)}
        />
        <nav aria-label={copy.mainNavLabel} className="desktop-nav">
          {sectionLinks.map(([key, hash]) => (
            <SiteLink key={hash} href={sectionHref(lang, page, hash)}>
              {copy.links[key]}
            </SiteLink>
          ))}
          <SiteLink href={aboutHref} aria-current={aboutCurrent}>
            {copy.links.about}
          </SiteLink>
        </nav>
        <LanguageSwitcher lang={lang} copy={switcherCopy} path={switchPath} />
        <SiteLink
          href={localePath(lang, "/resources")}
          className="nav-resources-link"
          aria-current={page === "resources" ? "page" : undefined}
        >
          {copy.resources}
        </SiteLink>
        <Button asChild className="nav-cta">
          <SiteLink href={contactHref}>
            {copy.cta} <ArrowUpRight size={16} />
          </SiteLink>
        </Button>
        <button
          className="mobile-toggle"
          aria-label={open ? copy.closeNav : copy.openNav}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-nav"
          className="mobile-nav"
          aria-label={copy.mobileNavLabel}
        >
          {[
            ...sectionLinks.map(
              ([key, hash]) =>
                [copy.links[key], sectionHref(lang, page, hash)] as const,
            ),
            [copy.links.about, aboutHref] as const,
            [copy.cta, contactHref] as const,
          ].map(([label, href]) => (
            <SiteLink
              href={href}
              key={href}
              aria-current={href === aboutHref ? aboutCurrent : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
              <ArrowUpRight size={16} />
            </SiteLink>
          ))}
          <LanguageSwitcher lang={lang} copy={switcherCopy} path={switchPath} />
          <SiteLink
            href={localePath(lang, "/resources")}
            className="mobile-resources-link"
            aria-current={page === "resources" ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            {copy.resources}
            <ArrowUpRight size={16} />
          </SiteLink>
        </nav>
      )}
    </header>
  );
}
