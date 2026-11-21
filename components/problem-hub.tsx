"use client";

import {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { SiteLink } from "@/components/site-link";
import type { FilterId, ProblemId } from "@/lib/catalogue";
import { problemSelectEvent } from "@/lib/problem-select";

export type HubProblem = {
  id: ProblemId;
  statement: string;
  change: string;
  links: { name: string; href: string }[];
  where: string;
};

export type HubGroup = {
  id: string;
  heading: string;
  intro: string;
  problems: HubProblem[];
  /** Server-rendered photo for the group. */
  visual: ReactNode;
};

type ProblemHubProps = {
  groups: HubGroup[];
  /** Server-rendered call-to-action bands: one after each group but the last. */
  ctas: ReactNode[];
  filters: { id: FilterId; label: string; href?: string }[];
  members: Record<FilterId, readonly ProblemId[]>;
  copy: {
    filterLabel: string;
    liveAll: string;
    liveIndustry: string;
    seeIndustry: string;
    whatChanges: string;
    seeSolution: string;
    industries: string;
  };
};

/**
 * The problems page. Each group is a band with its heading, one sentence and a
 * photo on the left, and a list of collapsed problems on the right: the
 * customer's sentence is the title, and "what changes" and the solution links
 * open under it. Filtering is by rendering, so the visual order is the DOM and
 * tab order. A link such as /problems#invoice-mismatch opens that problem.
 */
export function ProblemHub({
  groups,
  ctas,
  filters,
  members,
  copy,
}: ProblemHubProps) {
  const [active, setActive] = useState<FilterId>("all");
  const [open, setOpen] = useState<Set<string>>(
    () =>
      new Set(groups.map((g) => g.problems[0]?.id).filter(Boolean) as string[]),
  );
  const [highlight, setHighlight] = useState<string | null>(null);
  const activeRef = useRef<FilterId>("all");
  useEffect(() => {
    activeRef.current = active;
  });

  const known = useRef(
    new Set(groups.flatMap((g) => g.problems.map((p) => p.id))),
  );

  const reveal = useCallback(
    (raw: string | null | undefined, userAction: boolean) => {
      let id: string | null = null;
      if (raw) {
        try {
          id = decodeURIComponent(raw.replace(/^#/, ""));
        } catch {
          id = null;
        }
      }
      if (!id || !known.current.has(id as ProblemId)) {
        setHighlight(null);
        return;
      }
      const hidden = !members[activeRef.current].includes(id as ProblemId);
      flushSync(() => {
        if (hidden) setActive("all");
        setOpen((current) => new Set(current).add(id));
        setHighlight(id);
      });
      if (!userAction) return;
      const el = document.getElementById(id);
      if (!el) return;
      const calm = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      el.scrollIntoView({
        block: "center",
        behavior: calm ? "auto" : "smooth",
      });
      el.focus({ preventScroll: true });
    },
    [members],
  );

  useEffect(() => {
    const onHash = () => reveal(window.location.hash, true);
    const onSelect = (event: Event) =>
      reveal((event as CustomEvent<string>).detail, true);
    // First read, after hydration: the browser has already scrolled.
    reveal(window.location.hash, false);
    window.addEventListener("hashchange", onHash);
    window.addEventListener(problemSelectEvent, onSelect);
    return () => {
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener(problemSelectEvent, onSelect);
    };
  }, [reveal]);

  const toggle = (id: string) =>
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const shownIds = members[active];
  const activeFilter = filters.find((f) => f.id === active);
  const live =
    active === "all"
      ? copy.liveAll.replace("{count}", String(shownIds.length))
      : copy.liveIndustry
          .replace("{count}", String(shownIds.length))
          .replace("{industry}", activeFilter?.label ?? "");

  const visible = groups
    .map((group, original) => ({
      group,
      original,
      shown: group.problems.filter((p) => shownIds.includes(p.id)),
    }))
    .filter((entry) => entry.shown.length > 0)
    .map((entry, position) => ({ ...entry, position }));

  return (
    <div className="ph">
      <div className="ph-bar">
        <div className="shell ph-bar-inner">
          <div
            className="ph-filters"
            role="group"
            aria-label={copy.filterLabel}
          >
            {filters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                className="problem-filter"
                aria-pressed={active === filter.id}
                onClick={() => {
                  setActive(filter.id);
                  setHighlight(null);
                }}
              >
                {filter.label}
                <span className="problem-filter-count">
                  {members[filter.id].length}
                </span>
              </button>
            ))}
          </div>
          {active !== "all" && activeFilter?.href ? (
            <SiteLink className="ph-industry-link" href={activeFilter.href}>
              {copy.seeIndustry.replace("{industry}", activeFilter.label)}
              <ArrowUpRight size={16} aria-hidden="true" />
            </SiteLink>
          ) : null}
        </div>
      </div>
      <p className="problem-live" role="status" aria-live="polite">
        {live}
      </p>
      {visible.map(({ group, shown, position, original }) => {
        return (
          <Fragment key={group.id}>
            <section
              className="ph-group"
              data-alt={position % 2 === 1 ? "true" : undefined}
              data-first={position === 0 ? "true" : undefined}
              data-single={shown.length === 1 ? "true" : undefined}
              aria-labelledby={`group-${group.id}`}
            >
              <div className="shell ph-group-inner">
                <div className="ph-aside">
                  <h2 className="ph-heading" id={`group-${group.id}`}>
                    {group.heading}
                  </h2>
                  <p className="ph-intro">{group.intro}</p>
                  <div className="ph-visual" aria-hidden="true">
                    {group.visual}
                  </div>
                </div>
                <ul className="ph-list">
                  {shown.map((problem) => {
                    const isOpen = open.has(problem.id);
                    return (
                      <li
                        key={problem.id}
                        id={problem.id}
                        className="ph-row"
                        tabIndex={-1}
                        data-open={isOpen ? "true" : "false"}
                        data-problem-id={problem.id}
                        data-highlight={
                          highlight === problem.id ? "true" : undefined
                        }
                      >
                        <h3 className="ph-q">
                          <button
                            type="button"
                            id={`${problem.id}-q`}
                            aria-expanded={isOpen}
                            aria-controls={`${problem.id}-a`}
                            onClick={() => toggle(problem.id)}
                          >
                            <span>{problem.statement}</span>
                            <ChevronDown
                              className="ph-chevron"
                              size={22}
                              aria-hidden="true"
                            />
                          </button>
                        </h3>
                        <div
                          id={`${problem.id}-a`}
                          role="region"
                          aria-labelledby={`${problem.id}-q`}
                          className="ph-a"
                          data-open={isOpen ? "true" : "false"}
                          inert={!isOpen}
                        >
                          <div className="ph-a-inner">
                            <p className="ph-change">
                              <strong>{copy.whatChanges}</strong>
                              {problem.change}
                            </p>
                            <ul className="ph-links">
                              {problem.links.map((link) => (
                                <li key={link.href}>
                                  <SiteLink href={link.href}>
                                    {copy.seeSolution.replace(
                                      "{name}",
                                      link.name,
                                    )}
                                    <ArrowUpRight
                                      size={16}
                                      aria-hidden="true"
                                    />
                                  </SiteLink>
                                </li>
                              ))}
                            </ul>
                            <p className="ph-where">
                              <span>{copy.industries}</span> {problem.where}
                            </p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </section>
            {position < visible.length - 1 && ctas[original]
              ? ctas[original]
              : null}
          </Fragment>
        );
      })}
    </div>
  );
}
