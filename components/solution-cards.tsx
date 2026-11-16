import { ArrowUpRight } from "lucide-react";
import { SiteLink } from "@/components/site-link";
import { solutionsCopy } from "@/lib/solutions-copy";
import { teams } from "@/lib/teams";
import { localePath, type Locale } from "@/lib/i18n/config";

/** /solutions: one entry per team, each leading with its problem. */
export function SolutionCards({ lang }: { lang: Locale }) {
  const copy = solutionsCopy[lang];
  return (
    <section className="team-overview" aria-labelledby="teams-heading">
      <h2 id="teams-heading">{copy.teamsHeading}</h2>
      <ul>
        {teams[lang].map((team) => {
          const href = localePath(lang, `/solutions/${team.id}`);
          return (
            <li key={team.id} id={team.id}>
              <h3>
                <SiteLink href={href}>{team.label}</SiteLink>
              </h3>
              <p className="team-problem">{team.problem}</p>
              <ul className="team-examples">
                {team.examples.map((example) => (
                  <li key={example}>{example}</li>
                ))}
              </ul>
              <SiteLink className="text-link" href={href}>
                {copy.teamLink}
                <ArrowUpRight size={18} aria-hidden="true" />
              </SiteLink>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
