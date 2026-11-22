"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import {
  ArrowUp,
  Check,
  ChevronLeft,
  ChevronRight,
  FileText,
  FolderClosed,
  MoreVertical,
  MousePointer2,
  Pause,
  Play,
  RotateCcw,
  Upload,
} from "lucide-react";
import {
  prefersReducedMotion,
  reducedOnServer,
  subscribeMotion,
} from "@/components/team-explorer";
import type { CrmDemoUi, DocsDemo, Person } from "@/lib/crm-demo";

/**
 * Talk to Your Documents, played inside a CRM-looking stage.
 *
 * The story is a list of BEATS. Auto-play advances through them on a timer
 * (every beat rests at least ~2.4s), each change crossfades, and the visitor
 * can Pause/Resume and step Back/Forward on a bar. Within the upload and
 * permissions beats an on-screen cursor moves to the real element (measured,
 * not guessed) and clicks. Reduced-motion shows the answered end and no timer.
 * The website visitor only drives playback; the people acting are scripted.
 * No vendor is named.
 */
type Beat =
  | "intro-admin"
  | "upload"
  | "permissions"
  | "intro-tech"
  | "fault"
  | "question"
  | "answer";

const BEATS: Beat[] = [
  "intro-admin",
  "upload",
  "permissions",
  "intro-tech",
  "fault",
  "question",
  "answer",
];
/** How long each beat plays before auto-advancing (ms). Last beat holds. */
const BEAT_MS: Record<Beat, number> = {
  "intro-admin": 5200,
  upload: 8400,
  permissions: 7200,
  "intro-tech": 5200,
  fault: 5600,
  question: 8000,
  answer: 11000,
};

type DocsDemoProps = { demo: DocsDemo; ui: CrmDemoUi };

const AVATAR_TINT: Record<string, string> = {
  blue: "bg-blue-500",
  amber: "bg-amber-500",
  emerald: "bg-emerald-500",
};

function Avatar({ person }: { person: Person }) {
  return (
    <span
      className={`crm-avatar ${AVATAR_TINT[person.tint] ?? "bg-gray-500"}`}
      aria-hidden="true"
    >
      {person.initials}
    </span>
  );
}

export function DocsDemo({ demo, ui }: DocsDemoProps) {
  const reduce = useSyncExternalStore(
    subscribeMotion,
    prefersReducedMotion,
    reducedOnServer,
  );
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  // Sub-steps inside a beat (cursor moves, typing). Reset when the beat changes.
  const [micro, setMicro] = useState(0);
  const [typed, setTyped] = useState("");
  const timers = useRef<number[]>([]);
  const stageRef = useRef<HTMLDivElement>(null);
  const uploadRef = useRef<HTMLSpanElement>(null);
  const pickerFileRef = useRef<HTMLSpanElement>(null);
  const openRef = useRef<HTMLSpanElement>(null);
  const dotsRef = useRef<HTMLButtonElement>(null);
  const menuItemRef = useRef<HTMLSpanElement>(null);
  const [cursor, setCursor] = useState<{ x: number; y: number; click: boolean } | null>(null);

  const beat = BEATS[index];

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }, []);
  const at = useCallback((ms: number, fn: () => void) => {
    timers.current.push(window.setTimeout(fn, ms));
  }, []);
  useEffect(() => () => clearTimers(), [clearTimers]);

  // Point the cursor at a real element, in stage coordinates.
  const pointAt = useCallback(
    (ref: React.RefObject<HTMLElement | null>, click: boolean) => {
      const stage = stageRef.current;
      const el = ref.current;
      if (!stage || !el) return;
      const s = stage.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      setCursor({
        x: r.left + r.width / 2 - s.left,
        y: r.top + r.height / 2 - s.top,
        click,
      });
    },
    [],
  );

  // Reset sub-state and schedule the micro-animations for the current beat.
  useEffect(() => {
    if (!started) return;
    clearTimers();
    setMicro(0);
    if (beat !== "question") setTyped("");

    if (beat === "upload") {
      // cursor -> Upload (click) -> picker opens -> cursor to file (select)
      // -> cursor to Open (click) -> row lands as v2
      at(700, () => pointAt(uploadRef, false));
      at(2200, () => setCursor((c) => (c ? { ...c, click: true } : c)));
      at(2800, () => setMicro(1)); // picker open
      at(3800, () => pointAt(pickerFileRef, false));
      at(5000, () => setMicro(2)); // file selected
      at(5800, () => pointAt(openRef, false));
      at(6800, () => setCursor((c) => (c ? { ...c, click: true } : c)));
      at(7400, () => setMicro(3)); // picker closes, row lands
    } else if (beat === "permissions") {
      at(800, () => pointAt(dotsRef, false));
      at(2200, () => setCursor((c) => (c ? { ...c, click: true } : c)));
      at(2800, () => setMicro(1)); // menu open
      at(3800, () => pointAt(menuItemRef, false));
      at(5000, () => setCursor((c) => (c ? { ...c, click: true } : c)));
      at(5600, () => setMicro(2)); // granted
    } else if (beat === "question") {
      setCursor(null);
      const q = demo.chat.question;
      at(700, () => setMicro(1)); // show composer
      const perChar = 110;
      const start = 1500;
      for (let i = 1; i <= q.length; i++) {
        at(start + i * perChar, () => setTyped(q.slice(0, i)));
      }
    } else {
      setCursor(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beat, started]);

  // The auto-play timer: advance to the next beat when playing.
  useEffect(() => {
    if (!started || !playing) return;
    if (index >= BEATS.length - 1) return;
    const id = window.setTimeout(
      () => setIndex((i) => Math.min(i + 1, BEATS.length - 1)),
      BEAT_MS[beat],
    );
    return () => window.clearTimeout(id);
  }, [started, playing, index, beat]);

  const start = useCallback(() => {
    if (reduce) {
      setStarted(true);
      setIndex(BEATS.length - 1);
      setTyped(demo.chat.question);
      setPlaying(false);
      return;
    }
    setStarted(true);
    setIndex(0);
    setPlaying(true);
  }, [reduce, demo.chat.question]);

  const replay = useCallback(() => {
    clearTimers();
    setStarted(false);
    setIndex(0);
    setPlaying(false);
    setTyped("");
    setCursor(null);
    setMicro(0);
  }, [clearTimers]);

  const goTo = useCallback((i: number) => {
    setIndex(Math.max(0, Math.min(i, BEATS.length - 1)));
  }, []);

  const atEnd = index === BEATS.length - 1;

  // Derived view flags
  const onDocs = beat === "upload" || beat === "permissions";
  const onChat = beat === "question" || beat === "answer";
  const introAdmin = beat === "intro-admin";
  const introTech = beat === "intro-tech";
  const onFault = beat === "fault";
  const who = onChat || introTech ? demo.tech : demo.admin;
  const person = introAdmin ? demo.admin : introTech ? demo.tech : who;
  const intro = introAdmin ? demo.adminIntro : demo.techIntro;

  const uploadDone =
    beat === "permissions" || (beat === "upload" && micro >= 3);
  const pickerOpen = beat === "upload" && micro >= 1 && micro < 3;
  const fileSelected = beat === "upload" && micro >= 2 && micro < 3;
  const menuOpen = beat === "permissions" && micro >= 1;
  const granted = beat === "permissions" && micro >= 2;
  const answered = beat === "answer";
  const grantedTeam = demo.permissions.teams.find((t) => t.granted)?.label;

  // Keep the cursor glued to a moving target after layout settles.
  useLayoutEffect(() => {
    if (!cursor) return;
    // no-op: cursor is set from measured rects at each step
  }, [cursor, micro]);

  return (
    <div className="crm-stage" data-beat={beat} ref={stageRef}>
      {/* Crossfade key: a new wrapper per beat fades in over the previous. */}
      <div className="crm-win" key={beat}>
        {onDocs || onChat ? (
          <>
            <div className="crm-tabs" aria-hidden="true">
              <span className="crm-tab" data-active={onDocs ? "true" : undefined}>
                <FolderClosed className="size-3.5" />
                {demo.docs.tabLabel}
              </span>
              <span className="crm-tab" data-active={onChat ? "true" : undefined}>
                {demo.chat.tabLabel}
              </span>
            </div>
            <div className="crm-userbar">
              <span className="crm-user">
                <Avatar person={who} />
                <span className="crm-user-text">
                  <strong>{who.name}</strong>
                  <small>{who.role}</small>
                </span>
              </span>
            </div>
          </>
        ) : null}

        <div
          className="crm-body"
          data-variant={
            introAdmin || introTech ? "intro" : onFault ? "fault" : onChat ? "chat" : "docs"
          }
        >
          {/* Intro cards — keyed to the beat so John never shows Anna. */}
          {introAdmin || introTech ? (
            <div className="crm-intro">
              <div className="crm-intro-photo">
                <Image
                  src={intro.photo}
                  alt={intro.alt}
                  width={1536}
                  height={1024}
                  sizes="(max-width: 1000px) 100vw, 900px"
                  priority={introAdmin}
                />
              </div>
              <div className="crm-intro-text">
                <p className="crm-intro-meet">{ui.meet}</p>
                <h3>
                  {person.name}
                  <span>{person.role}</span>
                </h3>
                <p className="crm-intro-line">{intro.line}</p>
              </div>
            </div>
          ) : null}

          {/* Documents screen */}
          {onDocs ? (
            <div className="crm-docs">
              <div className="crm-docs-head">
                <div>
                  <h3>{demo.docs.title}</h3>
                  <p>{demo.docs.subtitle}</p>
                </div>
                <span
                  className="crm-upload"
                  ref={uploadRef}
                  data-press={beat === "upload" && micro === 0 && cursor?.click ? "true" : undefined}
                >
                  <Upload className="size-4" />
                  {demo.docs.uploadLabel}
                </span>
              </div>
              <div className="crm-docs-grid">
                <aside className="crm-folders">
                  {demo.docs.folders.map((f, i) => (
                    <span key={f} className="crm-folder" data-active={i === 1 ? "true" : undefined}>
                      <FolderClosed className="size-4" />
                      {f}
                    </span>
                  ))}
                </aside>
                <div className="crm-table">
                  <div className="crm-tr crm-th">
                    <span>{demo.docs.cols.name}</span>
                    <span>{demo.docs.cols.size}</span>
                    <span>{demo.docs.cols.date}</span>
                    <span />
                  </div>
                  <div className="crm-tr">
                    <span className="crm-file">
                      <FileText className="size-4 text-gray-500" />
                      {demo.docs.existing.name}
                      <span className="crm-ver" data-old={uploadDone ? "true" : undefined}>
                        {uploadDone ? demo.docs.versionOld : demo.docs.versionNew}
                      </span>
                    </span>
                    <span className="crm-dim">{demo.docs.existing.size}</span>
                    <span className="crm-dim">{demo.docs.existing.date}</span>
                    <span />
                  </div>
                  {uploadDone ? (
                    <div className="crm-tr crm-tr-new" data-grant={granted ? "true" : undefined}>
                      <span className="crm-file">
                        <FileText className="size-4 text-blue-600" />
                        {demo.docs.uploaded.name}
                        <span className="crm-ver crm-ver-new">{demo.docs.versionNew}</span>
                        {granted ? (
                          <span className="crm-grant-pill">
                            <Check className="size-3" />
                            {grantedTeam}
                          </span>
                        ) : null}
                      </span>
                      <span className="crm-dim">{demo.docs.uploaded.size}</span>
                      <span className="crm-dim">{demo.docs.uploaded.date}</span>
                      <span className="crm-rowaction">
                        <button
                          type="button"
                          className="crm-dots"
                          ref={dotsRef}
                          aria-label={demo.permissions.menuLabel}
                          data-open={menuOpen ? "true" : undefined}
                        >
                          <MoreVertical className="size-4" />
                        </button>
                        {menuOpen ? (
                          <div className="crm-menu" role="menu">
                            <p className="crm-menu-head">{demo.permissions.heading}</p>
                            {demo.permissions.teams.map((team, i) => (
                              <span
                                key={team.label}
                                ref={i === 0 ? menuItemRef : undefined}
                                className="crm-menu-item"
                                data-on={team.granted && granted ? "true" : undefined}
                                role="menuitemcheckbox"
                                aria-checked={team.granted && granted}
                              >
                                <span className="crm-menu-box" aria-hidden="true">
                                  {team.granted && granted ? <Check className="size-3" /> : null}
                                </span>
                                {team.label}
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </span>
                    </div>
                  ) : null}
                </div>
              </div>
              {uploadDone ? <p className="crm-vernote">{demo.docs.versionNote}</p> : null}
              {granted ? (
                <p className="crm-toast">
                  <Check className="size-4" />
                  {demo.permissions.confirm}
                </p>
              ) : null}

              {pickerOpen ? (
                <div className="crm-picker-scrim">
                  <div className="crm-picker" role="dialog" aria-label={demo.docs.uploadLabel}>
                    <div className="crm-picker-bar">
                      <span className="crm-picker-dot" data-c="r" />
                      <span className="crm-picker-dot" data-c="y" />
                      <span className="crm-picker-dot" data-c="g" />
                      <span className="crm-picker-loc">{demo.picker.location}</span>
                    </div>
                    <div className="crm-picker-body">
                      <aside className="crm-picker-side">
                        {demo.picker.sidebar.map((s, i) => (
                          <span key={s} data-active={i === 1 ? "true" : undefined}>
                            {s}
                          </span>
                        ))}
                      </aside>
                      <div className="crm-picker-list">
                        {demo.picker.files.map((f) => (
                          <span
                            key={f.name}
                            ref={f.pick ? pickerFileRef : undefined}
                            className="crm-picker-file"
                            data-sel={f.pick && fileSelected ? "true" : undefined}
                          >
                            <FileText className="size-4" />
                            <span className="crm-picker-name">{f.name}</span>
                            <span className="crm-picker-kind">{f.kind}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="crm-picker-foot">
                      <span className="crm-picker-cancel">{demo.picker.cancel}</span>
                      <span className="crm-picker-open" ref={openRef} data-ready={fileSelected ? "true" : undefined}>
                        {demo.picker.open}
                      </span>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}

          {/* Shop-floor fault photo */}
          {onFault ? (
            <div className="crm-fault">
              <Image
                src={demo.faultPhoto.src}
                alt={demo.faultPhoto.alt}
                fill
                sizes="(max-width: 1000px) 100vw, 900px"
                className="crm-fault-img"
              />
              <p className="crm-fault-caption">{demo.fault.caption}</p>
            </div>
          ) : null}

          {/* AI Chat screen */}
          {onChat ? (
            <div className="crm-chat">
              {beat === "question" ? (
                <div className="crm-chat-empty">
                  <h3>{demo.chat.empty}</h3>
                  <div className="crm-composer" data-typing={micro >= 1 ? "true" : undefined}>
                    <span className="crm-composer-text" data-filled={typed ? "true" : undefined}>
                      {typed || demo.chat.placeholder}
                      <i className="crm-caret" aria-hidden="true" />
                    </span>
                    <span className="crm-send" aria-hidden="true">
                      <ArrowUp className="size-4" />
                    </span>
                  </div>
                </div>
              ) : (
                <div className="crm-chat-thread">
                  <div className="crm-turn-user">
                    <p>{demo.chat.question}</p>
                  </div>
                  <div className="crm-turn-ai">
                    <p className="crm-answer">{demo.chat.answer}</p>
                    <ul className="crm-sources">
                      {demo.chat.sources.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                    <div className="crm-source">
                      <p className="crm-source-head">{demo.chat.source.title}</p>
                      <ul>
                        {demo.chat.source.lines.map((line, i) => (
                          <li key={line} data-mark={demo.chat.source.mark === i ? "true" : undefined}>
                            {line}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <p className="crm-chat-foot">{demo.chat.footnote}</p>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>

      {/* Scripted cursor */}
      {cursor ? (
        <span
          className="crm-cursor"
          style={{ left: `${cursor.x}px`, top: `${cursor.y}px` }}
          data-click={cursor.click ? "true" : undefined}
          aria-hidden="true"
        >
          <MousePointer2 className="size-5" />
        </span>
      ) : null}

      {/* Start overlay */}
      {!started ? (
        <div className="crm-overlay">
          <button type="button" className="crm-run" onClick={start}>
            <Play className="size-4" />
            {ui.run}
          </button>
          <p className="crm-run-hint">{ui.runHint}</p>
        </div>
      ) : null}

      {/* Playback controls */}
      {started && !reduce ? (
        <div className="crm-controls" role="group" aria-label={ui.controlsLabel}>
          <button
            type="button"
            className="crm-ctl"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            aria-label={ui.back}
          >
            <ChevronLeft className="size-4" />
          </button>
          {atEnd ? (
            <button type="button" className="crm-ctl crm-ctl-main" onClick={replay} aria-label={ui.replay}>
              <RotateCcw className="size-4" />
            </button>
          ) : (
            <button
              type="button"
              className="crm-ctl crm-ctl-main"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? ui.pause : ui.resume}
            >
              {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
            </button>
          )}
          <button
            type="button"
            className="crm-ctl"
            onClick={() => goTo(index + 1)}
            disabled={atEnd}
            aria-label={ui.forward}
          >
            <ChevronRight className="size-4" />
          </button>
          <ol className="crm-dotsnav" aria-hidden="true">
            {BEATS.map((b, i) => (
              <li key={b} data-on={i <= index ? "true" : undefined} data-now={i === index ? "true" : undefined} />
            ))}
          </ol>
        </div>
      ) : null}
    </div>
  );
}
