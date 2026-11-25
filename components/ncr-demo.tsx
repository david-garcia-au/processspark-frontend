"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  BarChart3,
  Camera,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  CircleCheck,
  ClipboardList,
  FileWarning,
  History,
  Link2,
  ListChecks,
  ListTodo,
  MousePointer2,
  Pause,
  Play,
  RotateCcw,
  ScanBarcode,
  Search,
  Send,
  ShieldAlert,
  Sparkles,
  TriangleAlert,
} from "lucide-react";
import {
  prefersReducedMotion,
  reducedOnServer,
  subscribeMotion,
} from "@/components/team-explorer";
import { useBeatClock } from "@/components/demo-clock";
import type { CrmDemoUi, Person } from "@/lib/crm-demo";
import type { NcrDemo as NcrDemoData, NcrStage } from "@/lib/ncr-demo";

/**
 * Digitise Your Paperwork, NCR version (see the solution-demo-video skill).
 * Maria raises a non-conformance on a tablet: the traveller's barcode fills
 * in the part and batch, she records the defect, containment and a photo,
 * links a similar past NCR and raises it. Matt sees it in the register with
 * every open NCR's status, then searches past issues. Reuses the tablet from
 * the inspection demo (fd-* in app/forms-demo.css).
 */
type Beat = "intro-qe" | "scan" | "report" | "intro-manager" | "register" | "result";
const BEATS: Beat[] = ["intro-qe", "scan", "report", "intro-manager", "register", "result"];
/** How long each beat plays (ms). */
const BEAT_MS: Record<Beat, number> = {
  "intro-qe": 10000,
  scan: 14000,
  report: 26000,
  "intro-manager": 10000,
  register: 19000,
  result: 9000,
};
/** Each person shows alone for this long before their card. */
const INTRO_DELAY = 4000;

const AVATAR_TINT: Record<string, string> = {
  blue: "bg-blue-500",
  amber: "bg-amber-500",
  emerald: "bg-emerald-500",
  violet: "bg-violet-500",
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
function Stage({ stage, label }: { stage: NcrStage; label: string }) {
  return (
    <span className="nc-stage" data-s={stage}>
      {stage === "closed" ? <Check className="size-3.5" aria-hidden="true" /> : null}
      {label}
    </span>
  );
}
/** A drawn barcode on a traveller label, as the iPad camera sees it.
 * Decorative only: fixed bar pattern with the batch number under it. */
function BarcodeArt({ code }: { code: string }) {
  const widths = [2, 1, 1, 3, 1, 2, 2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 1, 3, 1, 2, 2, 1, 1, 3, 2, 1, 2, 1, 3, 1, 1, 2];
  let x = 0;
  const bars: { x: number; w: number }[] = [];
  widths.forEach((w, i) => {
    if (i % 2 === 0) bars.push({ x, w });
    x += w;
  });
  return (
    <svg viewBox={`-6 -6 ${x + 12} 46`} className="nc-barcode" aria-hidden="true">
      <rect x="-6" y="-6" width={x + 12} height="46" rx="3" fill="#fff" />
      {bars.map((bar) => (
        <rect key={bar.x} x={bar.x} y="0" width={bar.w} height="26" fill="currentColor" />
      ))}
      <text x={x / 2} y="36" textAnchor="middle" fontSize="7" fontWeight="600" letterSpacing="0.6" fill="currentColor">
        {code}
      </text>
    </svg>
  );
}

type NcrDemoProps = { demo: NcrDemoData; ui: CrmDemoUi };

export function NcrDemo({ demo, ui }: NcrDemoProps) {
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
  const defectRef = useRef<HTMLDivElement>(null);
  const optionRef = useRef<HTMLSpanElement>(null);
  const partsRef = useRef<HTMLDivElement>(null);
  const severityRef = useRef<HTMLSpanElement>(null);
  const containRef = useRef<HTMLSpanElement>(null);
  const photoRef = useRef<HTMLSpanElement>(null);
  const linkRef = useRef<HTMLSpanElement>(null);
  const sendRef = useRef<HTMLSpanElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const beat = BEATS[index];
  const t = demo.tablet;
  const reg = demo.register;
  const query = reg.search.query;

  // Point the cursor at a real element; enter from the middle the first time.
  const pointAt = useCallback((ref: React.RefObject<HTMLElement | null>) => {
    const stage = stageRef.current;
    const el = ref.current;
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
    setTyped("");
    setBrief(beat === "scan");

    // Cursor to an element, click a second later, then the next state.
    const tap = (ms: number, ref: React.RefObject<HTMLElement | null>, step: number) => {
      at(ms, () => pointAt(ref));
      at(ms + 1000, click);
      at(ms + 1300, () => setMicro(step));
    };

    if (beat === "intro-qe" || beat === "intro-manager") {
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
      at(B + 4400, () => setMicro(2)); // filled in from the traveller
    } else if (beat === "report") {
      // micro: 1 options open, 2 defect chosen (risk + similar issues),
      // 3 parts, 4 severity, 5 containment, 6 photo, 7 linked, 8 raised.
      tap(1000, defectRef, 1);
      tap(2800, optionRef, 2);
      tap(5400, partsRef, 3);
      tap(7400, severityRef, 4);
      tap(9400, containRef, 5);
      tap(11400, photoRef, 6);
      tap(13600, linkRef, 7);
      tap(16400, sendRef, 8);
      at(18000, () => setCursor(null));
    } else if (beat === "register") {
      at(1000, () => setMicro(1)); // the new NCR lands
      at(7000, () => pointAt(searchRef));
      at(8000, click);
      at(8300, () => {
        setCursor(null);
        setMicro(2); // search active
      });
      const start = 8800;
      const perChar = 70;
      for (let i = 1; i <= query.length; i++) {
        at(start + i * perChar, () => setTyped(query.slice(0, i)));
      }
      at(start + query.length * perChar + 600, () => setMicro(3)); // results
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
  const onIntro = beat === "intro-qe" || beat === "intro-manager";
  const onTablet = beat === "scan" || beat === "report";
  const screenKey = onTablet ? "tablet" : beat;
  const intro = beat === "intro-manager" ? demo.managerIntro : demo.qeIntro;
  const introPerson = beat === "intro-manager" ? demo.manager : demo.qe;
  const scanning = beat === "scan" && micro === 1;
  const filled = beat === "report" || (beat === "scan" && micro >= 2);
  const r = beat === "report" ? micro : 0;
  const optionsOpen = r === 1;
  const defectChosen = r >= 2;
  const partsSet = r >= 3;
  const severitySet = r >= 4;
  const containSet = r >= 5;
  const photoAdded = r >= 6;
  const linked = r >= 7;
  const raised = r >= 8;
  const landed = beat === "register" && micro >= 1;
  const searching = beat === "register" && micro >= 2;
  const results = beat === "register" && micro >= 3;
  const stages: NcrStage[] = ["containment", "root", "action", "closed"];

  return (
    <div className="crm-stage fd-stage nc-stage-root" data-beat={beat} ref={stageRef}>
      <div className="crm-win" key={`win-${screenKey}`}>
        {beat === "register" ? (
          <>
            <div className="crm-tabs" aria-hidden="true">
              <span className="crm-tab" data-active="true">
                <FileWarning className="size-3.5" />
                {reg.tabs.ncrs}
              </span>
              <span className="crm-tab">
                <ListTodo className="size-3.5" />
                {reg.tabs.actions}
              </span>
              <span className="crm-tab">
                <BarChart3 className="size-3.5" />
                {reg.tabs.reports}
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
            // Maria stands on the left of her photo, so her text goes right.
            <div className="crm-intro" data-side={beat === "intro-qe" ? "right" : undefined}>
              <div className="crm-intro-photo">
                <Image
                  src={intro.photo}
                  alt={intro.alt}
                  width={1536}
                  height={1024}
                  sizes="(max-width: 1000px) 100vw, 900px"
                  priority={beat === "intro-qe"}
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

          {/* Maria's tablet: scan the traveller, then the report. */}
          {onTablet ? (
            <div className="fd-device-wrap">
              <div className="fd-tablet">
                <div className="fd-tablet-bar">
                  <span className="fd-app">
                    <ClipboardList className="size-4" />
                    {t.app}
                  </span>
                  <strong>{t.formTitle}</strong>
                  <span className="crm-user fd-user">
                    <Avatar person={demo.qe} />
                    <span className="crm-user-text">
                      <strong>{demo.qe.name}</strong>
                    </span>
                  </span>
                </div>
                {!filled ? (
                  <div className="fd-scan">
                    <div className="fd-camera nc-camera" data-scanning={scanning ? "true" : undefined}>
                      <BarcodeArt code={t.fields[1].value} />
                      {scanning ? <span className="fd-scanline" aria-hidden="true" /> : null}
                    </div>
                    <p>{scanning ? t.scan.scanning : t.scan.prompt}</p>
                    <span
                      className="fd-scan-btn"
                      ref={scanRef}
                      data-press={micro === 0 && cursor?.click ? "true" : undefined}
                    >
                      <ScanBarcode className="size-4" />
                      {t.scan.button}
                    </span>
                  </div>
                ) : (
                  <div className="nc-form">
                    <aside className="fd-fields">
                      {t.fields.map((f) => (
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
                    <div className="nc-main">
                      <div className="dd-field">
                        <span className="dd-label">{t.defect.label}</span>
                        <div
                          className="dd-input dd-select"
                          ref={defectRef}
                          data-active={optionsOpen ? "true" : undefined}
                          data-filled={defectChosen ? "true" : undefined}
                        >
                          {defectChosen ? t.defect.options[t.defect.pick] : t.defect.placeholder}
                          <ChevronDown className="size-4" />
                          {optionsOpen ? (
                            <div className="dd-options" role="listbox">
                              {t.defect.options.map((o, i) => (
                                <span
                                  key={o}
                                  ref={i === t.defect.pick ? optionRef : undefined}
                                  className="dd-option nc-option"
                                  data-pick={i === t.defect.pick ? "true" : undefined}
                                  role="option"
                                  aria-selected={false}
                                >
                                  {o}
                                </span>
                              ))}
                            </div>
                          ) : null}
                        </div>
                        {defectChosen ? (
                          <span className="nc-risk">
                            <ShieldAlert className="size-3.5" />
                            {t.risk.label}: {t.risk.value}
                          </span>
                        ) : null}
                      </div>
                      <div className="dd-field">
                        <span className="dd-label">{t.parts.label}</span>
                        <div className="dd-input" ref={partsRef} data-filled={partsSet ? "true" : undefined}>
                          {partsSet ? t.parts.value : "—"}
                        </div>
                      </div>
                      <div className="dd-field">
                        <span className="dd-label">{t.severity.label}</span>
                        <span className="nc-seg">
                          {t.severity.options.map((o, i) => (
                            <span
                              key={o}
                              ref={i === t.severity.pick ? severityRef : undefined}
                              className="nc-seg-btn"
                              data-on={severitySet && i === t.severity.pick ? "true" : undefined}
                            >
                              {o}
                            </span>
                          ))}
                        </span>
                      </div>
                      <div className="dd-field">
                        <span className="dd-label">{t.containment.label}</span>
                        <span className="nc-contain">
                          {t.containment.options.map((o, i) => (
                            <span
                              key={o}
                              ref={i === t.containment.pick ? containRef : undefined}
                              className="nc-radio"
                              data-on={containSet && i === t.containment.pick ? "true" : undefined}
                            >
                              <span className="nc-dot" aria-hidden="true" />
                              {o}
                            </span>
                          ))}
                        </span>
                      </div>
                      <div className="nc-foot">
                        <span
                          className="fd-photo nc-photo"
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
                              {t.photo.add}
                            </>
                          )}
                        </span>
                        <span
                          className="qd-send"
                          ref={sendRef}
                          data-press={r === 7 && cursor?.click ? "true" : undefined}
                          data-sent={raised ? "true" : undefined}
                        >
                          {raised ? <Check className="size-4" /> : <Send className="size-4" />}
                          {raised ? t.sent : t.send}
                        </span>
                      </div>
                    </div>
                    <aside className="nc-similar" data-on={defectChosen ? "true" : undefined}>
                      {defectChosen ? (
                        <>
                          <p className="dd-card-label">
                            <History className="size-4" />
                            {t.similar.label}
                          </p>
                          <p className="nc-hint">{t.similar.hint}</p>
                          {t.similar.items.map((s, i) => (
                            <article className="nc-past" key={s.id} data-linked={i === 0 && linked ? "true" : undefined}>
                              <p className="nc-past-head">
                                <strong>{s.id}</strong>
                                <span className="crm-dim">{s.when}</span>
                              </p>
                              <p className="nc-past-title">{s.title}</p>
                              <p className="nc-past-cause">{s.cause}</p>
                              {i === 0 ? (
                                <span className="nc-link" ref={linkRef} data-on={linked ? "true" : undefined}>
                                  {linked ? <Check className="size-3.5" /> : <Link2 className="size-3.5" />}
                                  {linked ? t.similar.linked : t.similar.link}
                                </span>
                              ) : null}
                            </article>
                          ))}
                        </>
                      ) : null}
                    </aside>
                  </div>
                )}
                {raised ? (
                  <p className="qd-toast fd-toast" key="raised">
                    <CircleCheck className="size-4" />
                    {demo.toasts.sent}
                  </p>
                ) : null}
              </div>
            </div>
          ) : null}

          {/* Matt's register: every NCR and where it is, then a search. */}
          {beat === "register" ? (
            <div className="fd-screen nc-register">
              <div className="crm-docs">
                <div className="crm-docs-head">
                  <div>
                    <h3>{reg.title}</h3>
                    <p>{reg.subtitle}</p>
                  </div>
                  <div className="nc-search" ref={searchRef} data-active={searching ? "true" : undefined}>
                    <Search className="size-4" />
                    <span data-filled={typed ? "true" : undefined}>{typed || reg.search.placeholder}</span>
                    {searching && !results ? <i className="crm-caret" aria-hidden="true" /> : null}
                  </div>
                </div>
                {!results ? (
                  <>
                    <div className="nc-counts">
                      {stages.map((s) => (
                        <span className="nc-count" data-s={s} key={s}>
                          <strong>{reg.counts[s]}</strong>
                          {reg.stages[s]}
                        </span>
                      ))}
                      <span className="nc-count" data-s="overdue">
                        <strong>1</strong>
                        {reg.overdue}
                      </span>
                    </div>
                    <div className="crm-table qd-table nc-table">
                      <div className="crm-tr crm-th">
                        <span>{reg.cols.id}</span>
                        <span>{reg.cols.issue}</span>
                        <span>{reg.cols.severity}</span>
                        <span>{reg.cols.owner}</span>
                        <span>{reg.cols.due}</span>
                        <span>{reg.cols.status}</span>
                      </div>
                      {landed ? (
                        <div className="crm-tr qd-tr-new">
                          <strong className="nc-id">{reg.newRow.id}</strong>
                          <span className="nc-issue">{reg.newRow.issue}</span>
                          <span className="nc-sev" data-major="true">
                            {reg.newRow.severity}
                          </span>
                          <span className="crm-dim">{reg.newRow.owner}</span>
                          <span className="crm-dim">{reg.newRow.due}</span>
                          <Stage stage={reg.newRow.status} label={reg.stages[reg.newRow.status]} />
                        </div>
                      ) : null}
                      {reg.rows.map((row) => (
                        <div className="crm-tr" key={row.id}>
                          <strong className="nc-id">{row.id}</strong>
                          <span className="nc-issue">{row.issue}</span>
                          <span className="nc-sev" data-major={row.severity === reg.newRow.severity ? "true" : undefined}>
                            {row.severity}
                          </span>
                          <span className="crm-dim">{row.owner}</span>
                          <span className="nc-due" data-overdue={row.overdue ? "true" : undefined}>
                            {row.overdue ? <TriangleAlert className="size-3.5" /> : null}
                            {row.due}
                          </span>
                          <Stage stage={row.status} label={reg.stages[row.status]} />
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="nc-results">
                    <p className="dd-card-label">
                      <History className="size-4" />
                      {reg.search.resultsLabel}
                    </p>
                    {reg.results.map((res) => (
                      <article className="nc-result" key={res.id}>
                        <strong className="nc-id">{res.id}</strong>
                        <span className="crm-dim">{res.when}</span>
                        <span className="nc-issue">{res.issue}</span>
                        <span className="nc-cause">
                          <CircleAlert className="size-3.5" />
                          {res.cause}
                        </span>
                        <Stage stage="closed" label={reg.stages.closed} />
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* Narration: square cards only. */}
      {started && beat === "intro-qe" && brief ? (
        <Brief at="corner" icon={<TriangleAlert className="size-4" />} {...demo.briefs.introQe} />
      ) : null}
      {started && beat === "scan" && brief ? (
        <div className="crm-brief-scrim">
          <Brief at="center" icon={<ListChecks className="size-4" />} {...demo.briefs.task} />
        </div>
      ) : null}
      {started && beat === "intro-manager" && brief ? (
        <Brief at="intro" icon={<FileWarning className="size-4" />} {...demo.briefs.introManager} />
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
              <FileWarning className="size-4" />
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
