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
import { ArrowUpRight } from "lucide-react";
import { SiteLink } from "@/components/site-link";
import type { FilterId, ProblemId, ProductGroupId } from "@/lib/catalogue";
import { problemSelectEvent } from "@/lib/problem-select";

type Layout =
  | { kind: "list"; views: Record<FilterId, readonly ProblemId[]> }
  | {
      kind: "groups";
      groups: {
        id: ProductGroupId;
        heading: ReactNode;
        ids: readonly ProblemId[];
      }[];
      members: Record<FilterId, readonly ProblemId[]>;
    };

function visibleIds(layout: Layout, filter: FilterId): readonly ProblemId[] {
  return layout.kind === "list" ? layout.views[filter] : layout.members[filter];
}

type ProblemSelectorProps = {
  /** Absent: no filter buttons. */
  filters?: { id: FilterId; label: string; href?: string }[];
  /** Server-rendered ProblemCard elements, one per problem. */
  cards: Partial<Record<ProblemId, ReactNode>>;
  layout: Layout;
  copy: {
    groupLabel: string;
    liveAll: string;
    liveIndustry: string;
    seeIndustry?: string;
  };
  /** A permanent link under the grid, for example to the hub. */
  seeAll?: { href: string; label: string };
  /** Hub only: highlight and scroll to the card named by the URL fragment. */
  followHash?: boolean;
};

/**
 * Filters server-rendered problem cards by rendering, not by CSS, so the
 * visual order always equals the DOM and tab order. It never renders or
 * imports ProblemCard: the page passes the finished elements in `cards`.
 */
export function ProblemSelector({
  filters,
  cards,
  layout,
  copy,
  seeAll,
  followHash = false,
}: ProblemSelectorProps) {
  const [active, setActive] = useState<FilterId>("all");
  const [highlight, setHighlight] = useState<string | null>(null);
  const activeRef = useRef<FilterId>("all");
  const cardsRef = useRef(cards);
  const layoutRef = useRef(layout);
  useEffect(() => {
    activeRef.current = active;
    cardsRef.current = cards;
    layoutRef.current = layout;
  });


  const apply = useCallback(
    (raw: string | null | undefined, userAction: boolean) => {
      let id: string | null = null;
      if (raw) {
        try {
          id = decodeURIComponent(raw.replace(/^#/, ""));
        } catch {
          id = null;
        }
      }
      if (!id || !Object.prototype.hasOwnProperty.call(cardsRef.current, id)) {
        setHighlight(null);
        return;
      }
      const hidden = !visibleIds(layoutRef.current, activeRef.current).includes(
        id as ProblemId,
      );
      if (!userAction && !hidden) {
        setHighlight(id);
        return;
      }
      // Render the change first, then scroll to and focus the card.
      flushSync(() => {
        if (hidden) setActive("all");
        setHighlight(id);
      });
      const el = document.getElementById(id);
      if (!el) return;
      const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ block: "start", behavior: calm ? "auto" : "smooth" });
      el.focus({ preventScroll: true });
    },
    [],
  );

  useEffect(() => {
    if (!followHash) return;
    const onHash = () => apply(window.location.hash, true);
    const onSelect = (event: Event) =>
      apply((event as CustomEvent<string>).detail, true);
    // Initial read, after hydration: the browser or Next has already scrolled.
    apply(window.location.hash, false);
    window.addEventListener("hashchange", onHash);
    window.addEventListener(problemSelectEvent, onSelect);
    return () => {
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener(problemSelectEvent, onSelect);
    };
  }, [followHash, apply]);

  const slot = (id: ProblemId) => (
    <Fragment key={id}>
      <div
        className="problem-slot"
        data-highlight={highlight === id ? "true" : undefined}
      >
        {cards[id]}
      </div>
    </Fragment>
  );

  const ids = visibleIds(layout, active);
  const activeFilter = filters?.find((f) => f.id === active);
  const live = !filters
    ? ""
    : active === "all"
      ? copy.liveAll.replace("{count}", String(ids.length))
      : copy.liveIndustry
          .replace("{count}", String(ids.length))
          .replace("{industry}", activeFilter?.label ?? "");

  return (
    <div className="problem-selector">
      {filters ? (
        <div className="problem-filters" role="group" aria-label={copy.groupLabel}>
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
            </button>
          ))}
        </div>
      ) : null}
      {layout.kind === "list" ? (
        <div className="problem-grid">{ids.map((id) => slot(id))}</div>
      ) : (
        layout.groups.map((group) => {
          const shown = group.ids.filter((id) => ids.includes(id));
          if (shown.length === 0) return null;
          return (
            <section
              key={group.id}
              className="hub-group"
              aria-labelledby={`group-${group.id}`}
            >
              {group.heading}
              <div className="problem-grid">{shown.map((id) => slot(id))}</div>
            </section>
          );
        })
      )}
      {filters ? (
        <p className="sr-only" role="status" aria-live="polite">
          {live}
        </p>
      ) : null}
      <div className="problem-more">
        {active !== "all" && activeFilter?.href && copy.seeIndustry ? (
          <SiteLink href={activeFilter.href}>
            {copy.seeIndustry.replace("{industry}", activeFilter.label)}
            <ArrowUpRight size={16} aria-hidden="true" />
          </SiteLink>
        ) : null}
        {seeAll ? (
          <SiteLink href={seeAll.href}>
            {seeAll.label}
            <ArrowUpRight size={16} aria-hidden="true" />
          </SiteLink>
        ) : null}
      </div>
    </div>
  );
}
