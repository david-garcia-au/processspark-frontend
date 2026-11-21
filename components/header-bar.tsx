"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Calculator,
  ChartColumn,
  ChevronDown,
  ClipboardCheck,
  ClipboardList,
  ClipboardPen,
  Database,
  EyeOff,
  Factory,
  FilePen,
  FileText,
  FileSpreadsheet,
  HardHat,
  Headset,
  Hourglass,
  IdCard,
  Keyboard,
  Lightbulb,
  LogOut,
  Mail,
  MapPin,
  Menu as MenuIcon,
  MessageCircleQuestionMark,
  Package,
  Phone,
  PhoneCall,
  Receipt,
  Repeat,
  Ruler,
  Search,
  ShieldCheck,
  TriangleAlert,
  Truck,
  UsersRound,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/language-switcher";
import type { Dictionary } from "@/lib/i18n";
import { SiteLink, pagePath, type PageId } from "@/components/site-link";
import { Brand } from "@/components/brand";
import { localePath, type Locale } from "@/lib/i18n/config";
import type { IconName, Menu, MenuColumn, MenuItem } from "@/lib/catalogue";
import { problemSelectEvent } from "@/lib/problem-select";

const icons: Record<IconName, LucideIcon> = {
  factory: Factory,
  wrench: Wrench,
  calculator: Calculator,
  "clipboard-pen": ClipboardPen,
  database: Database,
  "book-open": BookOpen,
  headset: Headset,
  "users-round": UsersRound,
  package: Package,
  "hard-hat": HardHat,
  "receipt-text": Receipt,
  ruler: Ruler,
  "file-spreadsheet": FileSpreadsheet,
  activity: Activity,
  keyboard: Keyboard,
  "chart-column": ChartColumn,
  lightbulb: Lightbulb,
  "clipboard-list": ClipboardList,
  mail: Mail,
  "triangle-alert": TriangleAlert,
  hourglass: Hourglass,
  phone: Phone,
  "phone-call": PhoneCall,
  repeat: Repeat,
  "log-out": LogOut,
  "map-pin": MapPin,
  "id-card": IdCard,
  "message-circle-question": MessageCircleQuestionMark,
  "eye-off": EyeOff,
  truck: Truck,
  "shield-check": ShieldCheck,
  "file-pen": FilePen,
  "clipboard-check": ClipboardCheck,
  search: Search,
  "file-text": FileText,
};

type MenuId = Menu["id"];

type HeaderProps = {
  lang: Locale;
  copy: Dictionary["header"];
  switcherCopy: Dictionary["languageSwitcher"];
  brandLabel: string;
  /** Page being rendered. */
  page?: PageId;
  /** Locale-less path of this exact page. */
  path?: string;
  menus: Menu[];
  /** Server-rendered promo cards, placed by each menu's `card` rule. */
  cards: Partial<Record<MenuId, ReactNode>>;
  /** Where the primary button goes. */
  contactHref: string;
};

export function HeaderBar({
  lang,
  copy,
  switcherCopy,
  brandLabel,
  page = "home",
  path,
  menus,
  cards,
  contactHref,
}: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuId | null>(null);
  const [expanded, setExpanded] = useState<Partial<Record<MenuId, boolean>>>({});
  const navRef = useRef<HTMLElement>(null);
  const toggleRefs = useRef<Partial<Record<MenuId, HTMLButtonElement | null>>>({});
  const closeTimer = useRef<number | undefined>(undefined);
  const switchTimer = useRef<number | undefined>(undefined);
  const openMenuRef = useRef<MenuId | null>(null);
  // A panel opened by hovering stays open when its chevron is then clicked.
  const hoverOpened = useRef(false);
  useEffect(() => {
    openMenuRef.current = openMenu;
    if (!openMenu) hoverOpened.current = false;
  });

  const clearTimers = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    window.clearTimeout(switchTimer.current);
  }, []);
  useEffect(() => clearTimers, [clearTimers]);

  // Escape, or a pointer press elsewhere, closes the open panel.
  useEffect(() => {
    if (!openMenu) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      const id = openMenuRef.current;
      const inside = navRef.current?.contains(document.activeElement);
      setOpenMenu(null);
      if (id && inside) toggleRefs.current[id]?.focus();
    };
    const onPointer = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [openMenu]);

  // Hover opens panels for a mouse only. A 200 ms delay on leaving keeps a
  // diagonal path to a far column from closing the panel; moving to the other
  // label opens it after 150 ms.
  const hoverEnter = (id: MenuId) => (event: React.PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    window.clearTimeout(closeTimer.current);
    if (openMenuRef.current === id) return;
    window.clearTimeout(switchTimer.current);
    hoverOpened.current = true;
    if (openMenuRef.current === null) setOpenMenu(id);
    else switchTimer.current = window.setTimeout(() => setOpenMenu(id), 150);
  };
  const hoverLeave = (event: React.PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    window.clearTimeout(switchTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 200);
  };

  const aboutHref = localePath(lang, "/about");
  const resourcesHref = localePath(lang, "/resources");
  const here = path ?? pagePath(page);
  const aboutCurrent = page === "about" ? ("page" as const) : undefined;

  const itemLink = (item: MenuItem, closed: boolean, onDone: () => void) => (
    <SiteLink
      href={item.href}
      aria-current={item.current ? "page" : undefined}
      tabIndex={closed ? -1 : undefined}
      onClick={() => {
        if (item.problem) {
          window.dispatchEvent(
            new CustomEvent(problemSelectEvent, { detail: item.id }),
          );
        }
        onDone();
      }}
    >
      {item.icon ? (
        <span className="nav-menu-icon" aria-hidden="true">
          {(() => {
            const Icon = icons[item.icon];
            return <Icon size={20} />;
          })()}
        </span>
      ) : null}
      <span className="nav-menu-text">
        <strong>{item.label}</strong>
        {item.hint ? <small>{item.hint}</small> : null}
      </span>
    </SiteLink>
  );

  const closeAll = () => {
    setOpenMenu(null);
    setOpen(false);
  };

  const renderColumn = (menu: Menu, column: MenuColumn, index: number) => {
    const closed = openMenu !== menu.id;
    const headingId = `menu-${menu.id}-col-${index}`;
    return (
      <div className="nav-mega-col" key={headingId}>
        <p className="nav-mega-heading" id={headingId}>
          {column.headingHref ? (
            <SiteLink
              href={column.headingHref}
              tabIndex={closed ? -1 : undefined}
              onClick={closeAll}
            >
              {column.heading}
            </SiteLink>
          ) : (
            column.heading
          )}
        </p>
        <ul
          aria-labelledby={headingId}
          className="nav-mega-list"
          data-two-up={column.twoUp ? "true" : undefined}
        >
          {column.items.map((item) => (
            <li key={item.id}>{itemLink(item, closed, closeAll)}</li>
          ))}
        </ul>
        {column.more ? (
          <SiteLink
            href={column.more.href}
            className="nav-mega-more"
            tabIndex={closed ? -1 : undefined}
            onClick={closeAll}
          >
            {column.more.label}
            <ArrowRight size={14} aria-hidden="true" />
          </SiteLink>
        ) : null}
        {menu.card?.placement === "afterColumn" &&
        menu.card.column === index &&
        cards[menu.id] ? (
          <div className="nav-card-slot">{cards[menu.id]}</div>
        ) : null}
      </div>
    );
  };

  return (
    <header className="header">
      <div className="shell nav">
        <Brand
          label={brandLabel}
          href={page === "home" ? "#" : localePath(lang)}
        />
        <nav
          aria-label={copy.mainNavLabel}
          className="desktop-nav"
          ref={navRef}
        >
          {menus.map((menu) => {
            const isOpen = openMenu === menu.id;
            const panelId = `menu-${menu.id}`;
            return (
              <div
                key={menu.id}
                className="nav-dropdown"
                data-open={isOpen ? "true" : "false"}
                data-menu={menu.id}
                onPointerEnter={hoverEnter(menu.id)}
                onPointerLeave={hoverLeave}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) {
                    setOpenMenu((value) => (value === menu.id ? null : value));
                  }
                }}
              >
                <SiteLink
                  href={menu.href}
                  aria-current={menu.current ? "page" : undefined}
                  onClick={() => setOpenMenu(null)}
                >
                  {menu.label}
                </SiteLink>
                <button
                  type="button"
                  className="nav-dropdown-toggle"
                  aria-label={menu.toggleLabel}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  ref={(node) => {
                    toggleRefs.current[menu.id] = node;
                  }}
                  onClick={() => {
                    if (isOpen && hoverOpened.current) {
                      hoverOpened.current = false;
                      return;
                    }
                    hoverOpened.current = false;
                    setOpenMenu(isOpen ? null : menu.id);
                  }}
                >
                  <ChevronDown size={16} aria-hidden="true" />
                </button>
                <div
                  id={panelId}
                  className="nav-menu nav-mega"
                  data-menu={menu.id}
                  inert={!isOpen}
                >
                  <div className="nav-mega-columns" data-count={menu.columns.length}>
                    {menu.columns.map((column, index) =>
                      renderColumn(menu, column, index),
                    )}
                  </div>
                  <div className="nav-mega-strip">
                    {menu.card?.placement === "strip" && cards[menu.id] ? (
                      <div className="nav-card-slot">{cards[menu.id]}</div>
                    ) : null}
                    <div className="nav-mega-links">
                      {menu.links.map((link) => (
                        <SiteLink
                          key={link.href + link.label}
                          href={link.href}
                          tabIndex={isOpen ? undefined : -1}
                          onClick={closeAll}
                        >
                          {link.label}
                          <ArrowRight size={15} aria-hidden="true" />
                        </SiteLink>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <SiteLink href={aboutHref} aria-current={aboutCurrent}>
            {copy.links.about}
          </SiteLink>
        </nav>
        <LanguageSwitcher lang={lang} copy={switcherCopy} path={here} />
        <SiteLink
          href={resourcesHref}
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
          {open ? <X /> : <MenuIcon />}
        </button>
      </div>
      <div className="mobile-nav-wrap" data-open={open ? "true" : "false"}>
        <nav
          id="mobile-nav"
          className="mobile-nav"
          aria-label={copy.mobileNavLabel}
          inert={!open}
        >
          {menus.map((menu) => {
            const isExpanded = !!expanded[menu.id];
            return (
              <div className="mobile-group" key={menu.id}>
                <div className="mobile-group-head">
                  <SiteLink
                    href={menu.href}
                    aria-current={menu.current ? "page" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {menu.label}
                  </SiteLink>
                  <button
                    type="button"
                    className="mobile-group-toggle"
                    aria-label={menu.toggleLabel}
                    aria-expanded={isExpanded}
                    aria-controls={`mobile-${menu.id}`}
                    onClick={() =>
                      setExpanded((value) => ({
                        ...value,
                        [menu.id]: !value[menu.id],
                      }))
                    }
                  >
                    <ChevronDown size={18} aria-hidden="true" />
                  </button>
                </div>
                {isExpanded ? (
                  <div className="mobile-subnav" id={`mobile-${menu.id}`}>
                    {menu.columns.map((column, index) => (
                      <div className="mobile-subnav-col" key={index}>
                        <p className="mobile-subnav-heading">
                          {column.headingHref ? (
                            <SiteLink
                              href={column.headingHref}
                              onClick={() => setOpen(false)}
                            >
                              {column.heading}
                            </SiteLink>
                          ) : (
                            column.heading
                          )}
                        </p>
                        <ul>
                          {column.items.map((item) => (
                            <li key={item.id}>
                              <SiteLink
                                href={item.href}
                                aria-current={item.current ? "page" : undefined}
                                onClick={() => {
                                  if (item.problem) {
                                    window.dispatchEvent(
                                      new CustomEvent(problemSelectEvent, {
                                        detail: item.id,
                                      }),
                                    );
                                  }
                                  setOpen(false);
                                }}
                              >
                                {item.icon ? (
                                  <span
                                    className="nav-menu-icon"
                                    aria-hidden="true"
                                  >
                                    {(() => {
                                      const Icon = icons[item.icon];
                                      return <Icon size={20} />;
                                    })()}
                                  </span>
                                ) : null}
                                <span className="nav-menu-text">
                                  <strong>{item.label}</strong>
                                  {item.hint ? (
                                    <small>{item.hint}</small>
                                  ) : null}
                                </span>
                              </SiteLink>
                            </li>
                          ))}
                          {column.more ? (
                            <li>
                              <SiteLink
                                href={column.more.href}
                                className="mobile-subnav-more"
                                onClick={() => setOpen(false)}
                              >
                                {column.more.label}
                              </SiteLink>
                            </li>
                          ) : null}
                        </ul>
                      </div>
                    ))}
                    <ul className="mobile-subnav-links">
                      {menu.links.map((link) => (
                        <li key={link.href + link.label}>
                          <SiteLink
                            href={link.href}
                            className="mobile-subnav-more"
                            onClick={() => setOpen(false)}
                          >
                            {link.label}
                          </SiteLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            );
          })}
          <SiteLink
            href={aboutHref}
            aria-current={aboutCurrent}
            onClick={() => setOpen(false)}
          >
            {copy.links.about}
            <ArrowUpRight size={16} />
          </SiteLink>
          <SiteLink
            href={resourcesHref}
            className="mobile-resources-link"
            aria-current={page === "resources" ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            {copy.resources}
            <ArrowUpRight size={16} />
          </SiteLink>
          <SiteLink href={contactHref} onClick={() => setOpen(false)}>
            {copy.demo}
            <ArrowUpRight size={16} />
          </SiteLink>
          <LanguageSwitcher lang={lang} copy={switcherCopy} path={here} />
        </nav>
      </div>
    </header>
  );
}
