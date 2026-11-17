import { ArrowUpRight } from "lucide-react";
import { SiteLink } from "@/components/site-link";

type CtaBandProps = {
  heading: string;
  text: string;
  button: string;
  /** Where the button goes (usually the contact form on the landing page). */
  href: string;
};

/** Blue call-to-action band: heading, one supporting line, one button. */
export function CtaBand({ heading, text, button, href }: CtaBandProps) {
  return (
    <section className="about-cta">
      <div className="shell about-cta-inner">
        <div className="about-cta-text">
          <h2>{heading}</h2>
          <p>{text}</p>
        </div>
        <SiteLink className="pill pill-light" href={href}>
          {button} <ArrowUpRight size={18} aria-hidden="true" />
        </SiteLink>
      </div>
    </section>
  );
}
