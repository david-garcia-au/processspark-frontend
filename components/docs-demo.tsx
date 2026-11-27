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
  BellRing,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  FilePlus2,
  FileText,
  FolderClosed,
  ListChecks,
  MessageSquareText,
  MoreVertical,
  MousePointer2,
  Pause,
  PhoneCall,
  Play,
  RotateCcw,
  ShieldCheck,
  SquarePen,
  Timer,
  TriangleAlert,
  Upload,
  Wrench,
} from "lucide-react";
import {
  prefersReducedMotion,
  reducedOnServer,
  subscribeMotion,
} from "@/components/team-explorer";
import { useBeatClock, useFollowLatest } from "@/components/demo-clock";
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
  | "answer"
  | "resolved";

const ALL_BEATS: Beat[] = [
  "intro-admin",
  "upload",
  "permissions",
  "intro-tech",
  "fault",
  "question",
  "answer",
  "resolved",
];
/** How long each beat plays before auto-advancing (ms). Last beat holds. */
const BEAT_MS: Record<Beat, number> = {
  "intro-admin": 8000,
  upload: 17000,
  permissions: 9600,
  "intro-tech": 8000,
  fault: 5600,
  question: 8000,
  answer: 14500,
  resolved: 9000,
};

/** Card icons per story: the service story (manuals) and the contracts one. */
const ICONS = {
  service: { introAdmin: BellRing, introTech: TriangleAlert, fixed: Wrench, resolved: CircleCheck },
  contracts: { introAdmin: FilePlus2, introTech: PhoneCall, fixed: Timer, resolved: ShieldCheck },
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
  // The square narration card (Anna's intro after 2s; start of the upload beat).
  const [brief, setBrief] = useState(false);
  // Pausable clock: Pause freezes every step of the beat, Play resumes it.
  const clock = useBeatClock(playing);
  const followChat = useFollowLatest();
  const at = clock.at;
  const stageRef = useRef<HTMLDivElement>(null);
  const uploadRef = useRef<HTMLSpanElement>(null);
  const pickerFileRef = useRef<HTMLSpanElement>(null);
  const openRef = useRef<HTMLSpanElement>(null);
  const dotsRef = useRef<HTMLButtonElement>(null);
  const menuItemRef = useRef<HTMLSpanElement>(null);
  const supersedeRef = useRef<HTMLSpanElement>(null);
  const [cursor, setCursor] = useState<{ x: number; y: number; click: boolean } | null>(null);
  const cursorRef = useRef(cursor);
  useEffect(() => {
    cursorRef.current = cursor;
  }, [cursor]);

  // A story without a fault photo skips that beat.
  const BEATS = demo.faultPhoto ? ALL_BEATS : ALL_BEATS.filter((b) => b !== "fault");
  const icons = ICONS[demo.story ?? "service"];
  const IntroAdminIcon = icons.introAdmin;
  const IntroTechIcon = icons.introTech;
  const FixedIcon = icons.fixed;
  const ResolvedIcon = icons.resolved;
  const beat = BEATS[index];
  // Long questions type a little faster, and the beat waits for the typing.
  const perChar = Math.min(110, Math.round(9000 / demo.chat.question.length));
  // How long each person's intro shows alone before its card; the beat grows to match.
  const introDelay = demo.introDelayMs ?? 2000;
  const beatMs = (b: Beat) =>
    b === "question"
      ? Math.max(BEAT_MS.question, 1500 + demo.chat.question.length * perChar + 1800)
      : b === "intro-admin" || b === "intro-tech"
        ? BEAT_MS[b] + introDelay - 2000
        : BEAT_MS[b];

  const clearTimers = clock.reset;

  // Point the cursor at a real element, in stage coordinates.
  const pointAt = useCallback(
    (ref: React.RefObject<HTMLElement | null>, click: boolean) => {
      const stage = stageRef.current;
      const el = ref.current;
      if (!stage || !el) return;
      const s = stage.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      const target = {
        x: r.left + r.width / 2 - s.left,
        y: r.top + r.height / 2 - s.top,
        click,
      };
      if (cursorRef.current) {
        setCursor(target);
        return;
      }
      // No cursor on screen yet: enter from the middle, then travel, so it
      // never just pops up on its target.
      setCursor({ x: s.width * 0.5, y: s.height * 0.55, click: false });
      requestAnimationFrame(() => requestAnimationFrame(() => setCursor(target)));
    },
    [],
  );

  // Reset sub-state and schedule the micro-animations for the current beat.
  useEffect(() => {
    if (!started) return;
    clearTimers();
    setMicro(0);
    setBrief(beat === "upload");
    if (beat !== "question") setTyped("");

    if (beat === "intro-admin") {
      // Her intro first, then the situation card (2s later by default).
      at(introDelay, () => setBrief(true));
    } else if (beat === "intro-tech") {
      // John's (or Matt's) intro first, then the card.
      at(introDelay, () => setBrief(true));
    } else if (beat === "upload") {
      // Square brief first; the cursor only starts once it has gone.
      const B = 6000;
      at(B - 600, () => setBrief(false));
      // cursor -> Upload (click) -> picker opens -> cursor to file (select)
      // -> cursor to Open (click) -> spinner (uploading) -> row lands as v2
      at(B + 700, () => pointAt(uploadRef, false));
      at(B + 2200, () => setCursor((c) => (c ? { ...c, click: true } : c)));
      at(B + 2800, () => setMicro(1)); // picker open
      at(B + 3800, () => pointAt(pickerFileRef, false));
      at(B + 5000, () => setMicro(2)); // file selected
      at(B + 5800, () => pointAt(openRef, false));
      at(B + 6800, () => setCursor((c) => (c ? { ...c, click: true } : c)));
      at(B + 7100, () => {
        setCursor(null);
        setMicro(3); // picker closes, spinner "uploading and extracting context"
      });
      at(B + 9300, () => setMicro(4)); // row lands as v2
    } else if (beat === "permissions") {
      at(800, () => pointAt(dotsRef, false));
      at(2200, () => setCursor((c) => (c ? { ...c, click: true } : c)));
      at(2800, () => setMicro(1)); // menu open
      at(3800, () => pointAt(menuItemRef, false));
      at(5000, () => setCursor((c) => (c ? { ...c, click: true } : c)));
      at(5600, () => setMicro(2)); // team granted
      at(6400, () => pointAt(supersedeRef, false));
      at(7400, () => setCursor((c) => (c ? { ...c, click: true } : c)));
      at(8000, () => {
        setCursor(null);
        setMicro(3); // supersede ticked, menu closes
      });
    } else if (beat === "question") {
      setCursor(null);
      const q = demo.chat.question;
      at(700, () => setMicro(1)); // show composer
      const start = 1500;
      for (let i = 1; i <= q.length; i++) {
        at(start + i * perChar, () => setTyped(q.slice(0, i)));
      }
    } else if (beat === "answer") {
      setCursor(null);
      setMicro(0); // thinking
      at(2600, () => setMicro(1)); // answer arrives
      at(4200, () => setMicro(2)); // source opens
      at(7500, () => setBrief(true)); // "fault fixed" card
    } else if (beat === "resolved") {
      setCursor(null);
      at(1800, () => setBrief(true)); // "back in production" card
    } else {
      setCursor(null);
    }
    if (reduce) {
      // Reduced motion: show the beat's end state at once, no timers.
      clock.flush();
      return;
    }
    // The advance to the next beat is a step like any other, so it pauses
    // too. After the last beat, go back to the start screen.
    at(beatMs(beat), () => {
      if (index < BEATS.length - 1) {
        setIndex((i) => Math.min(i + 1, BEATS.length - 1));
        return;
      }
      clearTimers();
      setStarted(false);
      setIndex(0);
      setPlaying(false);
      setTyped("");
      setCursor(null);
      setMicro(0);
      setBrief(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beat, started]);

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
  }, [reduce, demo.chat.question, BEATS.length]);

  const replay = useCallback(() => {
    clearTimers();
    setStarted(false);
    setIndex(0);
    setPlaying(false);
    setTyped("");
    setCursor(null);
    setMicro(0);
    setBrief(false);
  }, [clearTimers]);

  // Back/Forward jump to the start of that beat and play from there.
  const goTo = useCallback(
    (i: number) => {
      setIndex(Math.max(0, Math.min(i, BEATS.length - 1)));
      setPlaying(true);
    },
    [BEATS.length],
  );

  const atEnd = index === BEATS.length - 1;

  // Derived view flags
  const onDocs = beat === "upload" || beat === "permissions";
  const onChat = beat === "question" || beat === "answer";
  const introAdmin = beat === "intro-admin";
  const introTech = beat === "intro-tech";
  const onFault = beat === "fault";
  const onResolved = beat === "resolved";
  // One window per screen: steps on the same screen (upload -> permissions,
  // question -> answer) keep it mounted, so it doesn't blink or replay rows.
  const screenKey = onDocs ? "docs" : onChat ? "chat" : beat;
  // Who is at the keyboard in AI Chat: the technician, or (contracts) Anna.
  const chatUser = demo.chatBy === "admin" ? demo.admin : demo.tech;
  const who = onChat ? chatUser : introTech ? demo.tech : demo.admin;
  const person = introAdmin ? demo.admin : introTech ? demo.tech : who;
  const intro = introAdmin ? demo.adminIntro : demo.techIntro;

  const uploadDone =
    beat === "permissions" || (beat === "upload" && micro >= 4);
  const pickerOpen = beat === "upload" && micro >= 1 && micro < 3;
  const fileSelected = beat === "upload" && micro >= 2 && micro < 3;
  const uploadingSpinner = beat === "upload" && micro === 3;
  const menuOpen = beat === "permissions" && micro >= 1 && micro < 3;
  const granted = beat === "permissions" && micro >= 2;
  const superseded = beat === "permissions" && micro >= 3;
  const thinking = beat === "answer" && micro < 1;
  const answered = beat === "answer" && micro >= 1;
  const sourceOpen = beat === "answer" && micro >= 2;
  const grantedTeam = demo.permissions.teams.find((t) => t.granted)?.label;

  // Keep the cursor glued to a moving target after layout settles.
  useLayoutEffect(() => {
    if (!cursor) return;
    // no-op: cursor is set from measured rects at each step
  }, [cursor, micro]);

  // The uploaded file: last in a short list (manuals), first in a long one
  // (contracts) so it and its menu are in view without scrolling.
  const newRowFirst = (demo.docs.others?.length ?? 0) > 0;
  const newRow = (
                  <div className="crm-tr crm-tr-new" data-grant={granted ? "true" : undefined}>
                    <span className="crm-file">
                      <FileText className="size-4 text-blue-600" />
                      {demo.docs.uploaded.name}
                      <span className="crm-ver crm-ver-new">{demo.docs.versionNew}</span>
                      {superseded ? (
                        <span className="crm-super-pill">{demo.permissions.supersedeLabel}</span>
                      ) : null}
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
                        <div
                          className="crm-menu"
                          role="menu"
                          data-down={newRowFirst ? "true" : undefined}
                        >
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
                          <span className="crm-menu-sep" />
                          <span
                            ref={supersedeRef}
                            className="crm-menu-item"
                            data-on={superseded ? "true" : undefined}
                            role="menuitemcheckbox"
                            aria-checked={superseded}
                          >
                            <span className="crm-menu-box" aria-hidden="true">
                              {superseded ? <Check className="size-3" /> : null}
                            </span>
                            {demo.permissions.supersedeLabel}
                          </span>
                        </div>
                      ) : null}
                    </span>
                  </div>
  );
  return (
    <div className="crm-stage" data-beat={beat} ref={stageRef}>
      {/* Crossfade key: a new wrapper per screen fades in over the previous. */}
      <div className="crm-win" key={`win-${screenKey}`}>
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
            introAdmin || introTech ? "intro" : onFault || onResolved ? "fault" : onChat ? "chat" : "docs"
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
                  {uploadDone && newRowFirst ? newRow : null}
                  <div className="crm-tr">
                    <span className="crm-file">
                      <FileText className="size-4 text-gray-500" />
                      {demo.docs.existing.name}
                      <span
                        className="crm-ver"
                        data-old={uploadDone && !demo.docs.keepOld ? "true" : undefined}
                      >
                        {demo.docs.versionOld}
                      </span>
                    </span>
                    <span className="crm-dim">{demo.docs.existing.size}</span>
                    <span className="crm-dim">{demo.docs.existing.date}</span>
                    <span />
                  </div>
                  {(demo.docs.others ?? []).map((row) => (
                    <div className="crm-tr" key={row.name}>
                      <span className="crm-file">
                        <FileText className="size-4 text-gray-500" />
                        {row.name}
                        {row.tag ? <span className="crm-ver">{row.tag}</span> : null}
                      </span>
                      <span className="crm-dim">{row.size}</span>
                      <span className="crm-dim">{row.date}</span>
                      <span />
                    </div>
                  ))}
                  {uploadDone && !newRowFirst ? newRow : null}
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

              {uploadingSpinner ? (
                <div className="crm-uploading">
                  <span className="crm-spin" aria-hidden="true" />
                  {demo.uploading}
                </div>
              ) : null}
            </div>
          ) : null}

          {/* Shop-floor fault photo */}
          {onFault && demo.faultPhoto ? (
            <div className="crm-fault">
              <Image
                src={demo.faultPhoto.src}
                alt={demo.faultPhoto.alt}
                fill
                sizes="(max-width: 1000px) 100vw, 900px"
                className="crm-fault-img"
              />
            </div>
          ) : null}

          {/* Closing photo: the panel all green again */}
          {onResolved ? (
            <div className="crm-fault">
              <Image
                src={demo.resolvedPhoto.src}
                alt={demo.resolvedPhoto.alt}
                fill
                sizes="(max-width: 1000px) 100vw, 900px"
                className="crm-fault-img"
              />
            </div>
          ) : null}
          {/* AI Chat screen — the full window: conversation list + the chat. */}
          {onChat ? (
            <div className="crm-chatwin">
              <aside className="crm-chat-side">
                <span className="crm-chat-new">
                  <SquarePen className="size-4" />
                  {demo.chat.newChat}
                </span>
                <p className="crm-chat-sidelabel">{demo.chat.chatsLabel}</p>
                <span className="crm-chat-thread-item" data-active="true">
                  {beat === "answer" ? demo.chat.threadTitle : demo.chat.empty}
                </span>
              </aside>
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
                  <div className="crm-chat-thread" ref={followChat}>
                    <div className="crm-turn-user">
                      <p>{demo.chat.question}</p>
                    </div>
                    <div className="crm-turn-ai">
                      {thinking ? (
                        <p className="crm-activity">
                          <span className="crm-spin" aria-hidden="true" />
                          {demo.chat.activity}
                        </p>
                      ) : (
                        <>
                          {demo.chat.answer.split("\n\n").map((part) => (
                            <p className="crm-answer" key={part}>
                              {part}
                            </p>
                          ))}
                          <ul className="crm-sources">
                            {demo.chat.sources.map((s) => (
                              <li key={s}>{s}</li>
                            ))}
                          </ul>
                          {sourceOpen ? (
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
                          ) : null}
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* Narration: square cards are the only way the story is told. */}
      {started && beat === "intro-admin" && brief ? (
        <div className="crm-brief" data-at="intro" key="brief-intro">
          <p className="crm-brief-label">
            <IntroAdminIcon className="size-4" />
            {demo.briefs.introAdmin.label}
          </p>
          <p className="crm-brief-text">{demo.briefs.introAdmin.text}</p>
        </div>
      ) : null}
      {started && beat === "intro-tech" && brief ? (
        <div className="crm-brief" data-at="intro" key="brief-tech">
          <p className="crm-brief-label">
            <IntroTechIcon className="size-4" />
            {demo.briefs.introTech.label}
          </p>
          <p className="crm-brief-text">{demo.briefs.introTech.text}</p>
        </div>
      ) : null}
      {started && beat === "answer" && brief ? (
        <div className="crm-brief-scrim" key="brief-fixed">
          <div className="crm-brief" data-at="center">
            <p className="crm-brief-label">
              <FixedIcon className="size-4" />
              {demo.briefs.fixed.label}
            </p>
            <p className="crm-brief-text">{demo.briefs.fixed.text}</p>
          </div>
        </div>
      ) : null}
      {started && beat === "resolved" && brief ? (
        <div className="crm-brief" data-at={demo.resolvedCardAt ?? "corner"} key="brief-resolved">
          <p className="crm-brief-label">
            <ResolvedIcon className="size-4" />
            {demo.briefs.resolved.label}
          </p>
          <p className="crm-brief-text">{demo.briefs.resolved.text}</p>
        </div>
      ) : null}
      {started && beat === "upload" && brief ? (
        <div className="crm-brief-scrim" key="brief-upload">
          <div className="crm-brief" data-at="center">
            <p className="crm-brief-label">
              <ListChecks className="size-4" />
              {demo.briefs.upload.label}
            </p>
            <p className="crm-brief-text">{demo.briefs.upload.text}</p>
          </div>
        </div>
      ) : null}

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
          <div className="crm-brief crm-brief-start">
            <p className="crm-brief-label">
              <MessageSquareText className="size-4" />
              {demo.briefs.start.label}
            </p>
            <p className="crm-brief-text">{demo.briefs.start.text}</p>
            <button type="button" className="crm-run" onClick={start}>
              <Play className="size-4" />
              {ui.run}
            </button>
          </div>
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
