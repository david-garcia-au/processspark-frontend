import { ArrowUp, ArrowUpRight } from "lucide-react";
import { Brand } from "@/components/header";

const exploreLinks = [
  ["What we solve", "#problems"],
  ["What changes", "#capabilities"],
  ["Practical applications", "#use-cases"],
  ["How we work", "#approach"],
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer-grid">
        <div className="site-footer-about">
          <h2 className="site-footer-title">ProcessSpark</h2>
          <Brand />
          <p className="site-footer-lead">
            We help manufacturing, logistics and service businesses simplify
            processes, connect systems and reduce repetitive work.
          </p>
          <p className="site-footer-tagline">
            Less manual work. Smoother operations.
          </p>
        </div>
        <div>
          <h2 className="site-footer-title">Explore</h2>
          <nav aria-label="Footer">
            <ul className="site-footer-links">
              {exploreLinks.map(([label, href]) => (
                <li key={href}>
                  <a href={href}>{label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div>
          <h2 className="site-footer-title">Let’s talk</h2>
          <a className="site-footer-cta" href="#contact">
            Show us your process <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <a className="site-footer-email" href="mailto:Info@ProcessSpark.com">
            Info@ProcessSpark.com
          </a>
        </div>
      </div>
      <div className="shell">
        <div className="site-footer-bottom">
          <span>© 2026 ProcessSpark</span>
          <a href="#top">
            Back to top <ArrowUp size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
