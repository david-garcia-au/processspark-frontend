"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  ArrowLeft,
  Boxes,
  Camera,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  CircleCheck,
  ClipboardCheck,
  ClipboardList,
  Database,
  FileCheck2,
  ListChecks,
  MousePointer2,
  Pause,
  Play,
  QrCode,
  RotateCcw,
  Send,
  Sparkles,
  Wrench,
  X,
} from "lucide-react";
import {
  prefersReducedMotion,
  reducedOnServer,
  subscribeMotion,
} from "@/components/team-explorer";
import { useBeatClock } from "@/components/demo-clock";
import type { CrmDemoUi, Person } from "@/lib/crm-demo";
import type { FormsDemo as FormsDemoData } from "@/lib/forms-demo";

/**
 * Digitise Your Paperwork, played in the same stage as the other demos (see
 * the solution-demo-video skill). John scans press TR-200 on a tablet, the
 * form fills in what it can, he answers the checklist with a photo and a note
 * for the one failed item, and sends it. Matt sees it in the office with a
 * maintenance job already raised. Narration is the square cards.
 */
type Beat = "intro-tech" | "scan" | "checklist" | "intro-manager" | "office" | "result";
const BEATS: Beat[] = ["intro-tech", "scan", "checklist", "intro-manager", "office", "result"];
/** How long each beat plays (ms). */
const BEAT_MS: Record<Beat, number> = {
  "intro-tech": 10000,
  scan: 14000,
  checklist: 23000,
  "intro-manager": 10000,
  office: 14000,
  result: 9000,
};
/** Each person shows alone for this long before their card. */
const INTRO_DELAY = 4000;
/** The checklist item that fails (gets the photo and the note). */
const FAILED = 1;

const AVATAR_TINT: Record<string, string> = {
  blue: "bg-blue-500",
  amber: "bg-amber-500",
  emerald: "bg-emerald-500",
};
function Avatar({ person }: { person: Person }) {
  return (
    <span className={`crm-avatar ${AVATAR_TINT[person.tint] ?? "bg-gray-500"}`} aria-hidden="true">
      {person.initials}
    </span>
  );
}
function Brief({ icon, label, text, at }: { icon: React.ReactNode; label: string; text: string; at: string }) {
  return (
    <div className="crm-brief" data-at={at}>
      <p className="crm-brief-label">
        {icon}
        {label}
      </p>
      <p className="crm-brief-text">{text}</p>
    </div>
  );
}
/** A drawn QR code: fixed pattern, three finder squares. Decorative only. */
function QrArt() {
  const cells: [number, number][] = [];
  for (let y = 0; y < 21; y++) {
    for (let x = 0; x < 21; x++) {
      const finder = (x < 8 && y < 8) || (x > 12 && y < 8) || (x < 8 && y > 12);
      if (finder) continue;
      if ((x * 7 + y * 13 + x * y) % 5 < 2) cells.push([x, y]);
    }
  }
  const finder = (x: number, y: number) => (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y} width="7" height="7" fill="currentColor" />
      <rect x={x + 1} y={y + 1} width="5" height="5" fill="#fff" />
      <rect x={x + 2} y={y + 2} width="3" height="3" fill="currentColor" />
    </g>
  );
  return (
    <svg viewBox="-1 -1 23 23" className="fd-qr" aria-hidden="true">
      <rect x="-1" y="-1" width="23" height="23" fill="#fff" />
      {cells.map(([x, y]) => (
        <rect key={`${x}.${y}`} x={x} y={y} width="1" height="1" fill="currentColor" />
      ))}
      {finder(0, 0)}
      {finder(14, 0)}
      {finder(0, 14)}
    </svg>
  );
}

type FormsDemoProps = { demo: FormsDemoData; ui: CrmDemoUi };

export function FormsDemo({ demo, ui }: FormsDemoProps) {
  const reduce = useSyncExternalStore(subscribeMotion, prefersReducedMotion, reducedOnServer);
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [micro, setMicro] = useState(0);
  const [typed, setTyped] = useState("");
  const [brief, setBrief] = useState(false);
  const [cursor, setCursor] = useState<{ x: number; y: number; click: boolean } | null>(null);
  const cursorRef = useRef(cursor);
  useEffect(() => {
    cursorRef.current = cursor;
  }, [cursor]);
  // Pausable clock: Pause freezes every step of the beat, Play resumes it.
  const clock = useBeatClock(playing);
  const at = clock.at;
  const stageRef = useRef<HTMLDivElement>(null);
  const scanRef = useRef<HTMLSpanElement>(null);
  const answerRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const photoRef = useRef<HTMLSpanElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);
  const sendRef = useRef<HTMLSpanElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  const beat = BEATS[index];
  const items = demo.tablet.items;
  const note = demo.tablet.note.text;

  // Point the cursor at a real element; enter from the middle the first time.
  const pointAtEl = useCallback((el: HTMLElement | null) => {
    const stage = stageRef.current;
    if (!stage || !el) return;
    const s = stage.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    const target = { x: r.left + r.width / 2 - s.left, y: r.top + r.height / 2 - s.top, click: false };
    if (cursorRef.current) {
      setCursor(target);
      return;
    }
    setCursor({ x: s.width * 0.5, y: s.height * 0.55, click: false });
    requestAnimationFrame(() => requestAnimationFrame(() => setCursor(target)));
  }, []);
  const pointAt = useCallback(
    (ref: React.RefObject<HTMLElement | null>) => pointAtEl(ref.current),
    [pointAtEl],
  );
  const click = useCallback(() => setCursor((c) => (c ? { ...c, click: true } : c)), []);

  const reset = useCallback(() => {
    clock.reset();
    setStarted(false);
    setIndex(0);
    setPlaying(false);
    setTyped("");
    setCursor(null);
    setMicro(0);
    setBrief(false);
  }, [clock]);

  // Schedule each beat's steps on the clock, ending with the advance.
  useEffect(() => {
    if (!started) return;
    clock.reset();
    setMicro(0);
    setCursor(null);
    setBrief(beat === "scan");
    if (beat !== "checklist") setTyped("");

    if (beat === "intro-tech" || beat === "intro-manager") {
      at(INTRO_DELAY, () => setBrief(true));
    } else if (beat === "scan") {
      // Task card first; the cursor starts once it has gone.
      const B = 6000;
      at(B - 600, () => setBrief(false));
      at(B + 700, () => pointAt(scanRef));
      at(B + 2000, click);
      at(B + 2400, () => {
        setCursor(null);
        setMicro(1); // camera scanning
      });
      at(B + 4400, () => setMicro(2)); // form filled in from the QR code
    } else if (beat === "checklist") {
      setTyped("");
      // Step n answers item n-1, except the failed item's photo and note.
      // micro: 1 yes, 2 no (failed item opens), 3 photo, 4 note active,
      // 5 yes, 6 yes, 7 sent.
      const tap = (t: number, el: () => HTMLElement | null, step: number) => {
        at(t, () => pointAtEl(el()));
        at(t + 1000, click);
        at(t + 1300, () => setMicro(step));
      };
      tap(1000, () => answerRefs.current[0], 1);
      tap(3000, () => answerRefs.current[FAILED * 2 + 1], 2);
      tap(5200, () => photoRef.current, 3);
      tap(7400, () => noteRef.current, 4);
      const start = 9000;
      const perChar = 55;
      for (let i = 1; i <= note.length; i++) {
        at(start + i * perChar, () => setTyped(note.slice(0, i)));
      }
      const done = start + note.length * perChar;
      tap(done + 600, () => answerRefs.current[4], 5);
      tap(done + 2400, () => answerRefs.current[6], 6);
      tap(done + 4200, () => sendRef.current, 7);
      at(done + 5600, () => setCursor(null));
    } else if (beat === "office") {
      at(1000, () => setMicro(1)); // the inspection lands
      at(2600, () => pointAt(rowRef));
      at(3800, click);
      at(4200, () => {
        setCursor(null);
        setMicro(2); // detail open
      });
      at(6000, () => setMicro(3)); // the job that was raised
    } else if (beat === "result") {
      at(1800, () => setBrief(true));
    }
    if (reduce) {
      // Reduced motion: show the beat's end state at once, no timers.
      clock.flush();
      setCursor(null);
      return;
    }
    at(BEAT_MS[beat], () => {
      if (index >= BEATS.length - 1) reset();
      else setIndex((i) => i + 1);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beat, started]);

  const start = useCallback(() => {
    setStarted(true);
    if (reduce) {
      setIndex(BEATS.length - 1);
      setPlaying(false);
      return;
    }
    setIndex(0);
    setPlaying(true);
  }, [reduce]);
  // Back/Forward jump to the start of that beat and play from there.
  const goTo = useCallback((i: number) => {
    setIndex(Math.max(0, Math.min(i, BEATS.length - 1)));
    setPlaying(true);
  }, []);
  const atEnd = index === BEATS.length - 1;

  // Derived view state
  const onIntro = beat === "intro-tech" || beat === "intro-manager";
  const onTablet = beat === "scan" || beat === "checklist";
  const screenKey = onTablet ? "tablet" : beat;
  const intro = beat === "intro-manager" ? demo.managerIntro : demo.techIntro;
  const introPerson = beat === "intro-manager" ? demo.manager : demo.tech;
  const scanning = beat === "scan" && micro === 1;
  const filled = beat === "checklist" || (beat === "scan" && micro >= 2);
  // Answers so far: index -> "yes" | "no".
  const c = beat === "checklist" ? micro : 0;
  const answers: ("yes" | "no" | null)[] = [
    c >= 1 ? "yes" : null,
    c >= 2 ? "no" : null,
    c >= 5 ? "yes" : null,
    c >= 6 ? "yes" : null,
  ];
  const photoAdded = c >= 3;
  const noteActive = c === 4;
  const sent = c >= 7;
  const landed = beat === "office" && micro >= 1;
  const detail = beat === "office" && micro >= 2;
  const jobShown = beat === "office" && micro >= 3;

  const answerButtons = (i: number) => (
    <span className="fd-yesno">
      <span
        className="fd-yn"
        data-on={answers[i] === "yes" ? "yes" : undefined}
        ref={(el) => {
          answerRefs.current[i * 2] = el;
        }}
      >
        <Check className="size-3.5" />
        {demo.tablet.yes}
      </span>
      <span
        className="fd-yn"
        data-on={answers[i] === "no" ? "no" : undefined}
        ref={(el) => {
          answerRefs.current[i * 2 + 1] = el;
        }}
      >
        <X className="size-3.5" />
        {demo.tablet.no}
      </span>
    </span>
  );

  return (
    <div className="crm-stage fd-stage" data-beat={beat} ref={stageRef}>
      <div className="crm-win" key={`win-${screenKey}`}>
        {beat === "office" ? (
          <>
            <div className="crm-tabs" aria-hidden="true">
              <span className="crm-tab" data-active="true">
                <ClipboardCheck className="size-3.5" />
                {demo.office.tabs.inspections}
              </span>
              <span className="crm-tab">
                <Wrench className="size-3.5" />
                {demo.office.tabs.jobs}
              </span>
              <span className="crm-tab">
                <Boxes className="size-3.5" />
                {demo.office.tabs.assets}
              </span>
            </div>
            <div className="crm-userbar">
              <span className="crm-user">
                <Avatar person={demo.manager} />
                <span className="crm-user-text">
                  <strong>{demo.manager.name}</strong>
                  <small>{demo.manager.role}</small>
                </span>
              </span>
            </div>
          </>
        ) : null}
        <div
          className="crm-body"
          data-variant={onIntro ? "intro" : beat === "result" ? "fault" : onTablet ? "device" : "docs"}
        >
          {onIntro ? (
            <div className="crm-intro">
              <div className="crm-intro-photo">
                <Image
                  src={intro.photo}
                  alt={intro.alt}
                  width={1536}
                  height={1024}
                  sizes="(max-width: 1000px) 100vw, 900px"
                  priority={beat === "intro-tech"}
                />
              </div>
              <div className="crm-intro-text">
                <p className="crm-intro-meet">{ui.meet}</p>
                <h3>
                  {introPerson.name}
                  <span>{introPerson.role}</span>
                </h3>
                <p className="crm-intro-line">{intro.line}</p>
              </div>
            </div>
          ) : null}

          {beat === "result" ? (
            <div className="crm-fault">
              <Image
                src={demo.resultPhoto.src}
                alt={demo.resultPhoto.alt}
                fill
                sizes="(max-width: 1000px) 100vw, 900px"
                className="crm-fault-img"
              />
            </div>
          ) : null}

          {/* John's tablet: scan, then the checklist. */}
          {onTablet ? (
            <div className="fd-device-wrap">
              <div className="fd-tablet">
                <div className="fd-tablet-bar">
                  <span className="fd-app">
                    <ClipboardList className="size-4" />
                    {demo.tablet.app}
                  </span>
                  <strong>{demo.tablet.formTitle}</strong>
                  <span className="crm-user fd-user">
                    <Avatar person={demo.tech} />
                    <span className="crm-user-text">
                      <strong>{demo.tech.name}</strong>
                    </span>
                  </span>
                </div>
                {!filled ? (
                  <div className="fd-scan">
                    <div className="fd-camera" data-scanning={scanning ? "true" : undefined}>
                      <QrArt />
                      {scanning ? <span className="fd-scanline" aria-hidden="true" /> : null}
                    </div>
                    <p>{scanning ? demo.tablet.scan.scanning : demo.tablet.scan.prompt}</p>
                    <span
                      className="fd-scan-btn"
                      ref={scanRef}
                      data-press={micro === 0 && cursor?.click ? "true" : undefined}
                    >
                      <QrCode className="size-4" />
                      {demo.tablet.scan.button}
                    </span>
                  </div>
                ) : (
                  <div className="fd-form">
                    <aside className="fd-fields">
                      {demo.tablet.fields.map((f) => (
                        <p key={f.label} className="fd-fieldrow">
                          <small>{f.label}</small>
                          <strong>{f.value}</strong>
                          <span className="fd-from">
                            <Sparkles className="size-3" />
                            {f.from}
                          </span>
                        </p>
                      ))}
                    </aside>
                    <div className="fd-check">
                      {items.map((item, i) => (
                        <div className="fd-item" key={item} data-failed={answers[i] === "no" ? "true" : undefined}>
                          <div className="fd-item-row">
                            <span className="fd-item-text">{item}</span>
                            {answerButtons(i)}
                          </div>
                          {i === FAILED && answers[i] === "no" ? (
                            <div className="fd-evidence">
                              <span
                                className="fd-photo"
                                ref={photoRef}
                                data-added={photoAdded ? "true" : undefined}
                              >
                                {photoAdded ? (
                                  <Image
                                    src={demo.evidencePhoto.src}
                                    alt={demo.evidencePhoto.alt}
                                    width={120}
                                    height={80}
                                    className="fd-photo-img"
                                  />
                                ) : (
                                  <>
                                    <Camera className="size-4" />
                                    {demo.tablet.photo.add}
                                  </>
                                )}
                              </span>
                              <div
                                className="fd-note"
                                ref={noteRef}
                                data-active={noteActive ? "true" : undefined}
                                data-filled={typed ? "true" : undefined}
                              >
                                {typed || demo.tablet.note.placeholder}
                                {noteActive ? <i className="crm-caret" aria-hidden="true" /> : null}
                              </div>
                            </div>
                          ) : null}
                        </div>
                      ))}
                      <div className="fd-foot">
                        <span
                          className="qd-send"
                          ref={sendRef}
                          data-press={c === 6 && cursor?.click ? "true" : undefined}
                          data-sent={sent ? "true" : undefined}
                        >
                          {sent ? <Check className="size-4" /> : <Send className="size-4" />}
                          {sent ? demo.tablet.sent : demo.tablet.send}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                {sent ? (
                  <p className="qd-toast fd-toast" key="sent">
                    <CircleCheck className="size-4" />
                    {demo.toasts.sent}
                  </p>
                ) : null}
              </div>
            </div>
          ) : null}

          {/* Matt's office screen: the inspection list, then the details. */}
          {beat === "office" ? (
            <div className="fd-screen" key={detail ? "detail" : "list"}>
              {detail ? (
                <div className="fd-detail">
                  <div className="qd-detail-head">
                    <span className="qd-back">
                      <ArrowLeft className="size-4" />
                      {demo.office.detail.back}
                    </span>
                    <h3>{demo.office.detail.title}</h3>
                    <span className="fd-result" data-issue="true">
                      <CircleAlert className="size-3.5" />
                      {demo.office.newRow.result}
                    </span>
                  </div>
                  <div className="fd-detail-grid">
                    <article className="dd-card">
                      <p className="dd-card-label">
                        <ListChecks className="size-4" />
                        {demo.office.detail.answersLabel}
                      </p>
                      <ul className="fd-answers">
                        {items.map((item, i) => (
                          <li key={item} data-failed={i === FAILED ? "true" : undefined}>
                            {i === FAILED ? <X className="size-4" /> : <Check className="size-4" />}
                            <span>{item}</span>
                            <strong>{i === FAILED ? demo.tablet.no : demo.tablet.yes}</strong>
                          </li>
                        ))}
                      </ul>
                      <div className="fd-evidence fd-evidence-office">
                        <span className="fd-photo" data-added="true">
                          <Image
                            src={demo.evidencePhoto.src}
                            alt={demo.evidencePhoto.alt}
                            width={120}
                            height={80}
                            className="fd-photo-img"
                          />
                        </span>
                        <p className="fd-note-read">{note}</p>
                      </div>
                    </article>
                    <div className="fd-side">
                      {jobShown ? (
                        <article className="dd-card fd-job">
                          <p className="dd-card-label">
                            <Wrench className="size-4" />
                            {demo.office.detail.job.label}
                          </p>
                          <p className="fd-job-title">{demo.office.detail.job.title}</p>
                          <p className="fd-job-meta">{demo.office.detail.job.meta}</p>
                        </article>
                      ) : null}
                      {jobShown ? (
                        <p className="fd-synced">
                          <Database className="size-4" />
                          {demo.office.detail.synced}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="crm-docs">
                  <div className="crm-docs-head">
                    <div>
                      <h3>{demo.office.title}</h3>
                      <p>{demo.office.subtitle}</p>
                    </div>
                  </div>
                  <div className="crm-table qd-table fd-table">
                    <div className="crm-tr crm-th">
                      <span>{demo.office.cols.asset}</span>
                      <span>{demo.office.cols.inspection}</span>
                      <span>{demo.office.cols.by}</span>
                      <span>{demo.office.cols.when}</span>
                      <span>{demo.office.cols.result}</span>
                    </div>
                    {landed ? (
                      <div className="crm-tr qd-tr-new" ref={rowRef}>
                        <span className="qd-cust">
                          <FileCheck2 className="size-4 text-blue-600" />
                          <strong>{demo.office.newRow.asset}</strong>
                        </span>
                        <span>{demo.office.newRow.inspection}</span>
                        <span className="crm-dim">{demo.office.newRow.by}</span>
                        <span className="crm-dim">{demo.office.newRow.when}</span>
                        <span className="fd-result" data-issue="true">
                          <CircleAlert className="size-3.5" />
                          {demo.office.newRow.result}
                        </span>
                      </div>
                    ) : null}
                    {demo.office.rows.map((r) => (
                      <div className="crm-tr" key={r.asset}>
                        <span className="qd-cust">
                          <FileCheck2 className="size-4 text-gray-500" />
                          <strong>{r.asset}</strong>
                        </span>
                        <span>{r.inspection}</span>
                        <span className="crm-dim">{r.by}</span>
                        <span className="crm-dim">{r.when}</span>
                        <span className="fd-result">
                          <Check className="size-3.5" />
                          {r.result}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>

      {/* Narration: square cards only. */}
      {started && beat === "intro-tech" && brief ? (
        <Brief at="intro" icon={<ClipboardCheck className="size-4" />} {...demo.briefs.introTech} />
      ) : null}
      {started && beat === "scan" && brief ? (
        <div className="crm-brief-scrim">
          <Brief at="center" icon={<ListChecks className="size-4" />} {...demo.briefs.task} />
        </div>
      ) : null}
      {started && beat === "intro-manager" && brief ? (
        <Brief at="intro" icon={<FileCheck2 className="size-4" />} {...demo.briefs.introManager} />
      ) : null}
      {started && beat === "result" && brief ? (
        <Brief at="corner" icon={<CircleCheck className="size-4" />} {...demo.briefs.result} />
      ) : null}

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

      {!started ? (
        <div className="crm-overlay fd-start">
          <div className="crm-brief crm-brief-start">
            <p className="crm-brief-label">
              <ClipboardList className="size-4" />
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

      {started && !reduce ? (
        <div className="crm-controls" role="group" aria-label={ui.controlsLabel}>
          <button type="button" className="crm-ctl" onClick={() => goTo(index - 1)} disabled={index === 0} aria-label={ui.back}>
            <ChevronLeft className="size-4" />
          </button>
          {atEnd ? (
            <button type="button" className="crm-ctl crm-ctl-main" onClick={reset} aria-label={ui.replay}>
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
          <button type="button" className="crm-ctl" onClick={() => goTo(index + 1)} disabled={atEnd} aria-label={ui.forward}>
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
