import { ArrowUpRight } from "lucide-react";
import { SiteLink } from "@/components/site-link";
import {
  CapabilityVignette,
  vignetteNote,
} from "@/components/capability-vignettes";
import { capabilities } from "@/lib/capabilities";
import { solutionsCopy } from "@/lib/solutions-copy";
import { teamsUsing } from "@/lib/teams";
import { localePath, type Locale } from "@/lib/i18n/config";

/**
 * /solutions: the full, single explanation of each idea. Team pages and the
 * home page link here (/solutions#knowledge and so on).
 */
export function CapabilitySections({ lang }: { lang: Locale }) {
  const copy = solutionsCopy[lang];
  return (
    <section
      id="capabilities"
      className="shell sol-caps"
      aria-labelledby="capabilities-heading"
    >
      <h2 id="capabilities-heading">{copy.capabilitiesHeading}</h2>
      <p className="sol-caps-intro">{copy.capabilitiesIntro}</p>
      <div className="sol-cap-list">
        {capabilities[lang].map((item) => (
          <article
            id={item.id}
            key={item.id}
            className="sol-cap"
            data-cap={item.id}
            aria-labelledby={`${item.id}-title`}
          >
            <div className="sol-cap-text">
              <h3 id={`${item.id}-title`}>{item.title}</h3>
              <p className="sol-cap-headline">{item.headline}</p>
              <p>{item.text}</p>
              <h4>{item.pointsLabel}</h4>
              <ul>
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <p className="sol-cap-teams">
                <span>{copy.usedBy}</span>
                {teamsUsing(lang, item.id).map((team) => (
                  <SiteLink
                    key={team.id}
                    href={localePath(lang, `/solutions/${team.id}`)}
                  >
                    {team.label}
                  </SiteLink>
                ))}
              </p>
            </div>
            <div className="sol-cap-art">
              <CapabilityVignette id={item.id} lang={lang} />
            </div>
          </article>
        ))}
      </div>
      <p className="capability-note">{vignetteNote(lang)}</p>
    </section>
  );
}

/** Home page: the same six ideas as one line each, linking to the detail. */
export function CapabilitySummary({ lang }: { lang: Locale }) {
  const copy = solutionsCopy[lang];
  return (
    <>
      <ul className="capability-summary">
        {capabilities[lang].map((item) => (
          <li key={item.id} data-capability={item.id}>
            <SiteLink href={`${localePath(lang, "/solutions")}#${item.id}`}>
              <strong>{item.title}</strong>
              <span className="capability-headline-short">{item.headline}</span>
              <CapabilityVignette id={item.id} lang={lang} />
            </SiteLink>
          </li>
        ))}
      </ul>
      <p className="capability-note">{vignetteNote(lang)}</p>
      <SiteLink
        className="text-link"
        href={`${localePath(lang, "/solutions")}#capabilities`}
      >
        {copy.homeCapabilitiesLink}
        <ArrowUpRight size={18} aria-hidden="true" />
      </SiteLink>
    </>
  );
}
