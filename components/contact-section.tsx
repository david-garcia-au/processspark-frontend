import { ProcessBrief } from "@/components/process-brief";
import type { CategoryId } from "@/lib/content";
import type { Dictionary, Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

type ContactSectionProps = {
  lang: Locale;
  contact: Dictionary["contact"];
  heading: string;
  text: string;
  defaultCategory?: CategoryId;
};

/** The #contact form with its own heading, for pages other than the home page. */
export function ContactSection({
  lang,
  contact,
  heading,
  text,
  defaultCategory,
}: ContactSectionProps) {
  return (
    <section
      id="contact"
      className="home-contact catalogue-contact"
      aria-labelledby="contact-title"
    >
      <div className="shell home-contact-panel">
        <div className="home-contact-copy">
          <h2 id="contact-title">{heading}</h2>
          <p>{text}</p>
        </div>
        <ProcessBrief
          lang={lang}
          copy={contact.form}
          email={site.email}
          defaultCategory={defaultCategory}
        />
      </div>
    </section>
  );
}
