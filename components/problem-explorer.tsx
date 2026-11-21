"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { ArrowUpRight, ChevronDown, Pause, Play } from "lucide-react";
import { SiteLink } from "@/components/site-link";
import {
  prefersReducedMotion,
  reducedOnServer,
  subscribeMotion,
} from "@/components/team-explorer";

export type ExplorerItem = {
  id: string;
  /** Short title, shown for every item. */
  title: string;
  /** The pain, in the customer's words. */
  statement: string;
  /** What changes, one or two sentences. */
  change: string;
  products: { id: string; name: string; href: string }[];
};

export type ExplorerFilter = { id: string; label: string; href?: string };

type ProblemExplorerProps = {
  heading: string;
  /** Items for each filter id; the block shows the "all" view. */
  views: Record<string, ExplorerItem[]>;
  /** One server-rendered visual per item, same order as `views`. */
  visuals: Record<string, ReactNode[]>;
  copy: {
    listLabel: string;
    explore: string;
    pause: string;
    play: string;
  };
};

/**
 * Home page "Which of these sounds like you?", laid out after Mitti's
 * "One platform that fits in your pocket": heading top left, a ruled list
 * pinned to the bottom of the left column, a tall photo on the right. The
 * rule above the open item fills as the timer; when it is full the next item
 * opens (CSS animation end, app/problem-explorer.css). On phones each item
 * is a card and the open one carries its photo. Nothing moves for visitors
 * who prefer reduced motion, and the photo is decorative (aria-hidden).
 */
export function ProblemExplorer({
  heading,
  views,
  visuals,
  copy,
}: ProblemExplorerProps) {
  const items = views.all;
  const pictures = visuals.all;
  const [index, setIndex] = useState(0);
  const [restart, setRestart] = useState(0);
  const [userChoice, setUserChoice] = useState<boolean | null>(null);
  const [visible, setVisible] = useState(false);
  const [focusIn, setFocusIn] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useSyncExternalStore(
    subscribeMotion,
    prefersReducedMotion,
    reducedOnServer,
  );
  const playing = !reduceMotion && (userChoice ?? true);
  const running = playing && visible && !focusIn;

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const choose = useCallback((next: number) => {
    setIndex(next);
    setRestart((n) => n + 1);
  }, []);

  const advance = useCallback(() => {
    setIndex((current) => (current + 1) % items.length);
    setRestart((n) => n + 1);
  }, [items.length]);

  return (
    <div
      ref={rootRef}
      className="pe"
      data-running={running ? "true" : "false"}
    >
      <h2 id="problems-title" className="pe-heading">
        {heading}
      </h2>

      <ul
        className="pe-list"
        aria-label={copy.listLabel}
        onFocus={() => setFocusIn(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setFocusIn(false);
          }
        }}
      >
        {items.map((item, i) => {
          const open = i === index;
          return (
            <li key={item.id} data-active={open ? "true" : "false"}>
              <span className="pe-rule" aria-hidden="true">
                {open ? (
                  <span
                    key={`${index}-${restart}`}
                    className="pe-bar"
                    onAnimationEnd={advance}
                  />
                ) : null}
              </span>
              <h3 className="pe-title">
                <button
                  type="button"
                  id={`pe-btn-${item.id}`}
                  aria-expanded={open}
                  aria-controls={`pe-panel-${item.id}`}
                  onClick={() => choose(i)}
                >
                  <span className="pe-dot" aria-hidden="true" />
                  {item.title}
                  <ChevronDown
                    className="pe-chevron"
                    size={20}
                    aria-hidden="true"
                  />
                </button>
              </h3>
              <div
                id={`pe-panel-${item.id}`}
                role="region"
                aria-labelledby={`pe-btn-${item.id}`}
                className="pe-detail"
                data-open={open ? "true" : "false"}
                inert={!open}
              >
                <div className="pe-detail-inner">
                  <p className="pe-change">
                    <span className="pe-sr">{item.statement} </span>
                    {item.change}
                  </p>
                  <SiteLink className="pe-explore" href={item.products[0].href}>
                    {copy.explore}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </SiteLink>
                  <div className="pe-card-visual" aria-hidden="true">
                    {pictures[i]}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="pe-visual" aria-hidden="true">
        {pictures.map((node, i) => (
          <div
            key={items[i].id}
            className="pe-slide"
            data-active={i === index ? "true" : "false"}
          >
            {node}
          </div>
        ))}
      </div>

      {!reduceMotion ? (
        <button
          type="button"
          className="pe-toggle"
          onClick={() => setUserChoice(!playing)}
          aria-label={playing ? copy.pause : copy.play}
        >
          {playing ? (
            <Pause size={16} aria-hidden="true" />
          ) : (
            <Play size={16} aria-hidden="true" />
          )}
        </button>
      ) : null}
    </div>
  );
}
