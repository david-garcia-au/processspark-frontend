"use client";
import { useState } from "react";
import { ArrowUpRight, Menu, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
export function Brand() {
  return (
    <a href="#" className="brand" aria-label="ProcessSpark home">
      <span className="brand-icon">
        <Zap size={21} fill="currentColor" />
      </span>
      Process<span className="brand-light">Spark</span>
      <span className="brand-dot">.</span>
    </a>
  );
}
const links = [
  ["What we solve", "#problems"],
  ["What changes", "#capabilities"],
  ["Use cases", "#use-cases"],
  ["How we work", "#approach"],
];
export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <div className="shell nav">
        <Brand />
        <nav aria-label="Main navigation" className="desktop-nav">
          {links.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <Button asChild className="nav-cta">
          <a href="#contact">
            Show us your process <ArrowUpRight size={16} />
          </a>
        </Button>
        <button
          className="mobile-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
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
          aria-label="Mobile navigation"
        >
          {[...links, ["Show us your process", "#contact"]].map(
            ([label, href]) => (
              <a href={href} key={href} onClick={() => setOpen(false)}>
                {label}
                <ArrowUpRight size={16} />
              </a>
            ),
          )}
        </nav>
      )}
    </header>
  );
}
