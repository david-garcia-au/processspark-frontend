"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  Cog,
  Factory,
  Handshake,
  Menu,
  Receipt,
  TrendingUp,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/language-switcher";
import type { Dictionary } from "@/lib/i18n";
import { SiteLink, sectionHref, type PageId } from "@/components/site-link";
import { Brand } from "@/components/brand";
import { localePath, type Locale } from "@/lib/i18n/config";

const sectionLinks = [["approach", "#approach"]] as const;

const teamIcons: Record<string, LucideIcon> = {
  sales: Handshake,
  finance: Receipt,
  operations: Factory,
  engineering: Cog,
  people: Users,
  leadership: TrendingUp,
};

export type HeaderMenuItem = { id: string; label: string; hint: string };

type HeaderProps = {
  lang: Locale;
  copy: Dictionary["header"];
  switcherCopy: Dictionary["languageSwitcher"];
  brandLabel: string;
  /** Page being rendered. Defaults to the landing page. */
  page?: PageId;
  /** Locale-less path of this exact page, when it is not the page's root (e.g. "/solutions/operations"). */
  path?: string;
  /** Teams listed under Solutions. */
  menu: HeaderMenuItem[];
  menuCopy: { toggle: string; all: string };
};

export function HeaderBar({
  lang,
  copy,
  switcherCopy,
  brandLabel,
  page = "home",
  path,
  menu,
  menuCopy,
}: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentTeam = path?.startsWith("/solutions/")
    ? path.slice("/solutions/".length)
    : undefined;

  // Close the menu on Escape or when the page is clicked elsewhere.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const onPointer = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [menuOpen]);
  const aboutHref = localePath(lang, "/about");
  const aboutCurrent = page === "about" ? ("page" as const) : undefined;
  const solutionsHref = localePath(lang, "/solutions");
  const switchPath =
    path ??
    (page === "about"
      ? "/about"
      : page === "resources"
        ? "/resources"
        : page === "solutions"
          ? "/solutions"
          : "/");
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
          <div
            ref={dropdownRef}
            className="nav-dropdown"
            data-open={menuOpen ? "true" : "false"}
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setMenuOpen(false);
              }
            }}
          >
            <SiteLink
              href={solutionsHref}
              aria-current={
                page === "solutions" && !currentTeam ? "page" : undefined
              }
            >
              {copy.solutions}
            </SiteLink>
            <button
              type="button"
              className="nav-dropdown-toggle"
              aria-label={menuCopy.toggle}
              aria-expanded={menuOpen}
              aria-controls="solutions-menu"
              onClick={() => setMenuOpen((value) => !value)}
            >
              <ChevronDown size={16} aria-hidden="true" />
            </button>
            <div id="solutions-menu" className="nav-menu">
              <ul>
                {menu.map((item) => (
                  <li key={item.id}>
                    <SiteLink
                      href={localePath(lang, `/solutions/${item.id}`)}
                      aria-current={
                        item.id === currentTeam ? "page" : undefined
                      }
                      onClick={() => setMenuOpen(false)}
                      tabIndex={menuOpen ? 0 : -1}
                    >
                      <span className="nav-menu-icon" aria-hidden="true">
                        {(() => {
                          const Icon = teamIcons[item.id] ?? Cog;
                          return <Icon size={20} />;
                        })()}
                      </span>
                      <span className="nav-menu-text">
                        <strong>{item.label}</strong>
                        <small>{item.hint}</small>
                      </span>
                    </SiteLink>
                  </li>
                ))}
              </ul>
              <SiteLink
                href={solutionsHref}
                className="nav-menu-all"
                onClick={() => setMenuOpen(false)}
                tabIndex={menuOpen ? 0 : -1}
              >
                {menuCopy.all}
                <ArrowUpRight size={16} aria-hidden="true" />
              </SiteLink>
            </div>
          </div>
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
            {copy.demo} <ArrowUpRight size={16} />
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
      <div className="mobile-nav-wrap" data-open={open ? "true" : "false"}>
        <nav
          id="mobile-nav"
          className="mobile-nav"
          aria-label={copy.mobileNavLabel}
          inert={!open}
        >
          {[
            ...sectionLinks.map(
              ([key, hash]) =>
                [copy.links[key], sectionHref(lang, page, hash)] as const,
            ),
            [copy.solutions, solutionsHref] as const,
            [copy.links.about, aboutHref] as const,
            [copy.demo, contactHref] as const,
          ].map(([label, href]) => (
            <Fragment key={href}>
              <SiteLink
                href={href}
                aria-current={
                  href === aboutHref
                    ? aboutCurrent
                    : href === solutionsHref && page === "solutions"
                      ? "page"
                      : undefined
                }
                onClick={() => setOpen(false)}
              >
                {label}
                <ArrowUpRight size={16} />
              </SiteLink>
              {href === solutionsHref ? (
                <ul className="mobile-subnav">
                  {menu.map((item) => (
                    <li key={item.id}>
                      <SiteLink
                        href={localePath(lang, `/solutions/${item.id}`)}
                        aria-current={
                          item.id === currentTeam ? "page" : undefined
                        }
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                      </SiteLink>
                    </li>
                  ))}
                </ul>
              ) : null}
            </Fragment>
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
      </div>
    </header>
  );
}
