"use client";
import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { ArrowUpRight, Check, Pause, Play, Sparkles } from "lucide-react";
import type { Team } from "@/lib/teams";
import { teamImageSrc } from "@/lib/team-images";
import { localePath, type Locale } from "@/lib/i18n/config";

const motionQuery = "(prefers-reduced-motion: reduce)";
function subscribeMotion(onChange: () => void) {
  const query = window.matchMedia(motionQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}
const prefersReducedMotion = () => window.matchMedia(motionQuery).matches;
// On the server, assume reduced motion so nothing starts before hydration.
const reducedOnServer = () => true;

/*
 * Sequence for each department while the scene plays:
 *   left text opens  ->  1 s  ->  right text appears  ->  1 s  ->  next one.
 * The pauses count from the moment each animation finishes (see app/home.css).
 */
const LEFT_IN_MS = 1250; // .team-stage-detail open transition
const RIGHT_IN_MS = 1150; // question, then reply (.team-stage-chat p)
const PAUSE_MS = 1000;
const REVEAL_RIGHT_AFTER = LEFT_IN_MS + PAUSE_MS;
const NEXT_AFTER_RIGHT = RIGHT_IN_MS + PAUSE_MS;

const labels = {
  en: {
    group: "Departments",
    pause: "Pause the rotation",
    play: "Play the rotation",
    link: "Explore these solutions",
  },
  es: {
    group: "Departamentos",
    pause: "Pausar la rotación",
    play: "Reanudar la rotación",
    link: "Explora estas soluciones",
  },
} as const;

/**
 * Home page scene: one department at a time over a full-bleed photo. It moves
 * on by itself every few seconds; picking a department stops it there. The
 * rotation never starts for visitors who prefer reduced motion, pauses while
 * the scene is off screen, and has a visible pause control (WCAG 2.2.2).
 */
export function TeamExplorer({ teams, lang }: { teams: Team[]; lang: Locale }) {
  const copy = labels[lang];
  const [index, setIndex] = useState(0);
  // null until the visitor presses pause/play or picks a department.
  const [userChoice, setUserChoice] = useState<boolean | null>(null);
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useSyncExternalStore(
    subscribeMotion,
    prefersReducedMotion,
    reducedOnServer,
  );
  const playing = userChoice ?? !reduceMotion;

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

  // Index of the department whose right-hand text has appeared. Comparing it
  // with `index` avoids resetting state when the department changes.
  const [chatFor, setChatFor] = useState<number | null>(null);
  const chatShown = reduceMotion || chatFor === index;

  // Step 2: once the left text has had its second, show the right text.
  useEffect(() => {
    if (!visible || chatShown) return;
    const timer = window.setTimeout(
      () => setChatFor(index),
      REVEAL_RIGHT_AFTER,
    );
    return () => window.clearTimeout(timer);
  }, [visible, chatShown, index]);

  // Step 3: a second after the right text, move to the next department.
  const running = playing && visible;
  useEffect(() => {
    if (!running || !chatShown) return;
    const timer = window.setTimeout(
      () => setIndex((current) => (current + 1) % teams.length),
      NEXT_AFTER_RIGHT,
    );
    return () => window.clearTimeout(timer);
  }, [running, chatShown, index, teams.length]);

  const choose = useCallback((next: number) => {
    setIndex(next);
    setUserChoice(false);
  }, []);

  const team = teams[index];

  return (
    <div
      ref={rootRef}
      className="team-stage"
      data-running={running ? "true" : "false"}
    >
      <div className="team-stage-photos" aria-hidden="true">
        {teams.map((t, i) => (
          <div
            key={t.id}
            className="team-stage-photo"
            data-active={i === index ? "true" : "false"}
          >
            <Image
              src={teamImageSrc(t.id)}
              alt=""
              fill
              sizes="(max-width: 850px) 100vw, 1200px"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      <ul className="team-stage-roles" aria-label={copy.group}>
        {teams.map((t, i) => {
          const active = i === index;
          return (
            <li key={t.id} data-active={active ? "true" : "false"}>
              <button
                type="button"
                aria-expanded={active}
                aria-controls={`team-role-${t.id}`}
                onClick={() => choose(i)}
              >
                <span className="team-stage-dot" aria-hidden="true" />
                {t.label}
              </button>
              {/* Always rendered so opening can transition; closed ones are inert. */}
              <div
                id={`team-role-${t.id}`}
                className="team-stage-detail"
                data-open={active ? "true" : "false"}
                aria-hidden={!active}
                inert={!active}
              >
                <div className="team-stage-detail-inner">
                  <p>{t.summary}</p>
                  <Link
                    className="team-stage-link"
                    href={localePath(lang, `/solutions/${t.id}`)}
                  >
                    {copy.link}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Illustrative exchange for the department on screen. It mounts once the
          left text has settled, so its entrance plays as step two. */}
      {chatShown ? (
        <div className="team-stage-chat" key={team.id} aria-hidden="true">
          <p className="team-stage-ask">
            <Sparkles size={18} />
            {team.prompt.question}
          </p>
          <p className="team-stage-reply">
            <Check size={16} />
            {team.prompt.reply}
          </p>
        </div>
      ) : null}

      <button
        type="button"
        className="team-stage-toggle"
        onClick={() => setUserChoice(!playing)}
        aria-label={playing ? copy.pause : copy.play}
      >
        {playing ? (
          <Pause size={16} aria-hidden="true" />
        ) : (
          <Play size={16} aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
