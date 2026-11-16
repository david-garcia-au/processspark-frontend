import Image from "next/image";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import { SiteLink } from "@/components/site-link";
import { capabilities } from "@/lib/capabilities";
import { solutionsCopy } from "@/lib/solutions-copy";
import { teamImageSrc } from "@/lib/team-images";
import { teams } from "@/lib/teams";
import { localePath, type Locale } from "@/lib/i18n/config";

/** /solutions: a quick index, then one section per team with all its problems. */
export function SolutionCards({ lang }: { lang: Locale }) {
  const copy = solutionsCopy[lang];
  const capabilityTitle = Object.fromEntries(
    capabilities[lang].map((item) => [item.id, item.title]),
  );
  return (
    <>
      <nav className="sol-nav" aria-label={copy.teamsNavLabel}>
        <div className="shell">
          <ul>
            {teams[lang].map((team) => (
              <li key={team.id}>
                <a href={`#${team.id}`}>{team.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      {teams[lang].map((team, i) => {
        const href = localePath(lang, `/solutions/${team.id}`);
        return (
          <section
            id={team.id}
            key={team.id}
            className="sol-team"
            data-flip={i % 2 === 1 ? "true" : undefined}
            aria-labelledby={`${team.id}-title`}
          >
            <div className="shell sol-team-grid">
              <div className="sol-team-photo" aria-hidden="true">
                <Image
                  src={teamImageSrc(team.id)}
                  alt=""
                  fill
                  sizes="(max-width: 900px) 100vw, 520px"
                  priority={i === 0}
                />
                <div className="sol-chat">
                  <p>
                    <Sparkles size={16} />
                    {team.prompt.question}
                  </p>
                  <p>
                    <Check size={14} />
                    {team.prompt.reply}
                  </p>
                </div>
              </div>
              <div className="sol-team-body">
                <h2 id={`${team.id}-title`}>{team.label}</h2>
                <p className="sol-problem">{team.problem}</p>
                <ul className="sol-cases">
                  {team.cases.map((item) => (
                    <li key={item.title}>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                      {item.capability ? (
                        <SiteLink
                          className="sol-chip"
                          href={`#${item.capability}`}
                        >
                          {capabilityTitle[item.capability]}
                        </SiteLink>
                      ) : null}
                    </li>
                  ))}
                </ul>
                <SiteLink className="text-link" href={href}>
                  {copy.teamLink}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </SiteLink>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
