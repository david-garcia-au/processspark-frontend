import { ArrowUpRight, Check } from "lucide-react";
import { CatalogueIcon } from "@/components/catalogue-icon";
import { SiteLink } from "@/components/site-link";
import {
  industries,
  product,
  productHref,
  type ProblemView,
} from "@/lib/catalogue";
import type { Dictionary, Locale } from "@/lib/i18n";

type ProblemCardProps = {
  lang: Locale;
  problem: ProblemView;
  copy: Dictionary["problemCard"];
  /** On the hub the card is a link target: it carries its problem id. */
  hub?: boolean;
  /** Show the industries where the problem comes up. */
  showIndustries?: boolean;
};

/**
 * One problem, in the customer's words: what changes, and a link to each
 * solution that fixes it. A server component, rendered once per problem and
 * handed to the client selector as a prop. data-problem-id feeds the
 * mapping-consistency check.
 */
export function ProblemCard({
  lang,
  problem,
  copy,
  hub = false,
  showIndustries = false,
}: ProblemCardProps) {
  const every = industries(lang);
  const where =
    problem.industries.length === every.length
      ? [copy.allIndustries]
      : every
          .filter((i) => problem.industries.includes(i.id))
          .map((i) => i.copy.shortName);
  return (
    <article
      className="problem-card"
      data-problem-id={problem.id}
      id={hub ? problem.id : undefined}
      tabIndex={hub ? -1 : undefined}
      aria-labelledby={`${problem.id}-statement`}
    >
      <span className="problem-icon" aria-hidden="true">
        <CatalogueIcon name={problem.icon} size={24} />
      </span>
      <h3 className="problem-statement" id={`${problem.id}-statement`}>
        {problem.statement}
      </h3>
      <div className="problem-change">
        <span className="problem-change-label">
          <Check size={14} aria-hidden="true" />
          {copy.whatChanges}
        </span>
        <p>{problem.change}</p>
      </div>
      <ul className="problem-links">
        {problem.products.map((id) => (
          <li key={id}>
            <SiteLink href={productHref(lang, id)}>
              {copy.seeSolution.replace("{name}", product(lang, id).shortName)}
              <ArrowUpRight size={16} aria-hidden="true" />
            </SiteLink>
          </li>
        ))}
      </ul>
      {showIndustries && where.length > 0 ? (
        <p className="problem-industries">
          <span>{copy.industries}</span> {where.join(" · ")}
        </p>
      ) : null}
    </article>
  );
}
