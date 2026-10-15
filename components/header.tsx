"use client";
import { useState } from "react";
import { ArrowUpRight, Menu, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/language-switcher";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";

export function Brand({ label }: { label: string }) {
  return (
    <a href="#" className="brand" aria-label={label}>
      <span className="brand-icon">
        <Zap size={21} fill="currentColor" />
      </span>
      Process<span className="brand-light">Spark</span>
      <span className="brand-dot">.</span>
    </a>
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
};

export function Header({ lang, copy, switcherCopy, brandLabel }: HeaderProps) {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <div className="shell nav">
        <Brand label={brandLabel} />
        <nav aria-label={copy.mainNavLabel} className="desktop-nav">
          {sectionLinks.map(([key, href]) => (
            <a key={href} href={href}>
              {copy.links[key]}
            </a>
          ))}
        </nav>
        <LanguageSwitcher lang={lang} copy={switcherCopy} />
        <Button asChild className="nav-cta">
          <a href="#contact">
            {copy.cta} <ArrowUpRight size={16} />
          </a>
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
              ([key, href]) => [copy.links[key], href] as const,
            ),
            [copy.cta, "#contact"] as const,
          ].map(([label, href]) => (
            <a href={href} key={href} onClick={() => setOpen(false)}>
              {label}
              <ArrowUpRight size={16} />
            </a>
          ))}
          <LanguageSwitcher lang={lang} copy={switcherCopy} />
        </nav>
      )}
    </header>
  );
}
