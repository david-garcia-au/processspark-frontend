"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  ArrowLeft,
  ArrowUp,
  BellOff,
  CalendarDays,
  Check,
  CheckCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  ClipboardCheck,
  ClipboardList,
  HeartHandshake,
  LifeBuoy,
  ListChecks,
  MessageSquareText,
  MousePointer2,
  Pause,
  PhoneCall,
  Play,
  RotateCcw,
  Send,
  Sparkles,
  SquarePen,
  UserRoundCheck,
  Users,
} from "lucide-react";
import {
  prefersReducedMotion,
  reducedOnServer,
  subscribeMotion,
} from "@/components/team-explorer";
import { useBeatClock } from "@/components/demo-clock";
import type { CrmDemoUi, Person } from "@/lib/crm-demo";
import type { ApprovalStatus, DeskDemo as DeskDemoData } from "@/lib/desk-demo";

/**
 * Employee Service Desk, played in the same CRM stage as the other demos (see
 * the solution-demo-video skill). John asks how to take leave for his sick
 * son, fills in the prefilled form, Matt approves it, Anna (HR) finds it
 * recorded plus one question handed to her. Narration is the square cards.
 */
type Beat =
  | "intro-employee"
  | "question"
  | "answer"
  | "form"
  | "intro-manager"
  | "approve"
  | "intro-hr"
  | "hr"
  | "result";
const BEATS: Beat[] = [
  "intro-employee",
  "question",
  "answer",
  "form",
  "intro-manager",
  "approve",
  "intro-hr",
  "hr",
  "result",
];
/** How long each beat plays (ms). The question beat waits for its typing. */
const BEAT_MS: Record<Beat, number> = {
  "intro-employee": 10000,
  question: 8000,
  answer: 9600,
  form: 25000,
  "intro-manager": 10000,
  approve: 13500,
  "intro-hr": 10000,
  hr: 12000,
  result: 9000,
};
/** Each person shows alone for this long before their card. */
const INTRO_DELAY = 4000;

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
function Initials({ text }: { text: string }) {
  return (
    <span className="qd-cust-dot" aria-hidden="true">
      {text}
    </span>
  );
}
function Status({ status, label }: { status: ApprovalStatus; label: string }) {
  return (
    <span className="dd-status" data-s={status}>
      {status === "approved" ? <Check className="size-3.5" aria-hidden="true" /> : null}
      {label}
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

type DeskDemoProps = { demo: DeskDemoData; ui: CrmDemoUi };

export function DeskDemo({ demo, ui }: DeskDemoProps) {
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
  const actionRef = useRef<HTMLSpanElement>(null);
  const typeRef = useRef<HTMLDivElement>(null);
  const optionRef = useRef<HTMLSpanElement>(null);
  const datesRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);
  const sendRef = useRef<HTMLSpanElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const approveRef = useRef<HTMLSpanElement>(null);

  const beat = BEATS[index];
  const question = demo.chat.question;
  const note = demo.form.note.text;
  // Long questions type a little faster; the beat waits for the typing.
  const perChar = Math.min(110, Math.round(9000 / question.length));
  const beatMs = (b: Beat) =>
    b === "question" ? Math.max(BEAT_MS.question, 1500 + question.length * perChar + 1800) : BEAT_MS[b];

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
    setBrief(beat === "form");
    if (beat !== "question" && beat !== "form") setTyped("");

    if (beat === "intro-employee" || beat === "intro-manager" || beat === "intro-hr") {
      at(INTRO_DELAY, () => setBrief(true));
    } else if (beat === "question") {
      at(700, () => setMicro(1)); // composer active
      for (let i = 1; i <= question.length; i++) {
        at(1500 + i * perChar, () => setTyped(question.slice(0, i)));
      }
    } else if (beat === "answer") {
      at(2400, () => setMicro(1)); // answer
      at(3800, () => setMicro(2)); // source panel
      at(6600, () => pointAt(actionRef));
      at(7900, click);
    } else if (beat === "form") {
      // Task card first; the cursor starts once it has gone.
      const B = 6000;
      setTyped("");
      at(B - 600, () => setBrief(false));
      at(B + 700, () => pointAt(typeRef));
      at(B + 2000, click);
      at(B + 2400, () => setMicro(1)); // options open
      at(B + 3400, () => pointAt(optionRef));
      at(B + 4600, click);
      at(B + 5000, () => setMicro(2)); // type chosen
      at(B + 5800, () => pointAt(datesRef));
      at(B + 7000, click);
      at(B + 7400, () => setMicro(3)); // dates filled, balance updated
      at(B + 8200, () => pointAt(noteRef));
      at(B + 9400, click);
      at(B + 9800, () => setMicro(4)); // note active
      const start = B + 10300;
      const charMs = 55;
      for (let i = 1; i <= note.length; i++) {
        at(start + i * charMs, () => setTyped(note.slice(0, i)));
      }
      const done = start + note.length * charMs;
      at(done + 600, () => pointAt(sendRef));
      at(done + 1800, click);
      at(done + 2200, () => {
        setCursor(null);
        setMicro(5); // sent
      });
    } else if (beat === "approve") {
      at(1200, () => pointAt(rowRef));
      at(2400, click);
      at(3000, () => setMicro(1)); // detail open
      at(6800, () => pointAt(approveRef));
      at(8000, click);
      at(8400, () => {
        setCursor(null);
        setMicro(2); // approved
      });
    } else if (beat === "hr") {
      at(2600, () => setMicro(1)); // the handed-off question
    } else if (beat === "result") {
      at(1800, () => setBrief(true));
    }
    if (reduce) {
      // Reduced motion: show the beat's end state at once, no timers.
      clock.flush();
      setCursor(null);
      return;
    }
    at(beatMs(beat), () => {
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
  const onIntro = beat === "intro-employee" || beat === "intro-manager" || beat === "intro-hr";
  const onChat = beat === "question" || beat === "answer";
  const onApp = onChat || beat === "form" || beat === "approve" || beat === "hr";
  const screenKey = onChat ? "chat" : beat;
  const intro =
    beat === "intro-manager" ? demo.managerIntro : beat === "intro-hr" ? demo.hrIntro : demo.employeeIntro;
  const introPerson = beat === "intro-manager" ? demo.manager : beat === "intro-hr" ? demo.hr : demo.employee;
  const who = beat === "approve" ? demo.manager : beat === "hr" ? demo.hr : demo.employee;
  const tabs =
    beat === "approve"
      ? [
          { label: demo.tabs.ask, icon: MessageSquareText, on: false },
          { label: demo.tabs.approvals, icon: CheckCheck, on: true },
        ]
      : beat === "hr"
        ? [
            { label: demo.tabs.ask, icon: MessageSquareText, on: false },
            { label: demo.tabs.hrDesk, icon: Users, on: true },
          ]
        : [
            { label: demo.tabs.ask, icon: MessageSquareText, on: onChat },
            { label: demo.tabs.requests, icon: ClipboardList, on: beat === "form" },
          ];

  const answered = beat === "answer" && micro >= 1;
  const sourceOpen = beat === "answer" && micro >= 2;
  const optionsOpen = beat === "form" && micro === 1;
  const typeChosen = beat === "form" && micro >= 2;
  const datesSet = beat === "form" && micro >= 3;
  const noteActive = beat === "form" && micro >= 4;
  const sent = beat === "form" && micro >= 5;
  const detail = beat === "approve" && micro >= 1;
  const approved = beat === "approve" && micro >= 2;
  const handoff = beat === "hr" && micro >= 1;
  const toast = sent ? demo.toasts.sent : approved ? demo.toasts.approved : null;
  const john = demo.approvals.rows[0];

  return (
    <div className="crm-stage dd-stage" data-beat={beat} ref={stageRef}>
      <div className="crm-win" key={`win-${screenKey}`}>
        {onApp ? (
          <>
            <div className="crm-tabs" aria-hidden="true">
              {tabs.map((t) => (
                <span className="crm-tab" data-active={t.on ? "true" : undefined} key={t.label}>
                  <t.icon className="size-3.5" />
                  {t.label}
                </span>
              ))}
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
          data-variant={onIntro ? "intro" : beat === "result" ? "fault" : onChat ? "chat" : "docs"}
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
                  priority={beat === "intro-employee"}
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

          {/* Ask: the chat, full window. */}
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
                  <div className="crm-chat-thread">
                    <div className="crm-turn-user">
                      <p>{question}</p>
                    </div>
                    <div className="crm-turn-ai">
                      {!answered ? (
                        <p className="crm-activity">
                          <span className="crm-spin" aria-hidden="true" />
                          {demo.chat.activity}
                        </p>
                      ) : (
                        <>
                          <p className="crm-answer">{demo.chat.answer}</p>
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
                          {sourceOpen ? (
                            <span
                              className="dd-action"
                              ref={actionRef}
                              data-press={cursor?.click ? "true" : undefined}
                            >
                              <ClipboardList className="size-4" />
                              {demo.chat.action}
                            </span>
                          ) : null}
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : null}

          {/* My requests: the leave form, prefilled from the employee record. */}
          {beat === "form" ? (
            <div className="dd-screen">
              <div className="crm-docs-head">
                <div>
                  <h3>{demo.form.title}</h3>
                  <p>{demo.form.subtitle}</p>
                </div>
              </div>
              <div className="dd-form">
                <aside className="dd-record">
                  {demo.form.fields.map((f) => (
                    <p key={f.label}>
                      <small>{f.label}</small>
                      <strong>{f.value}</strong>
                    </p>
                  ))}
                  <span className="dd-prefilled">
                    <Sparkles className="size-3.5" />
                    {demo.form.prefilled}
                  </span>
                </aside>
                <div className="dd-fields">
                  <div className="dd-field">
                    <span className="dd-label">{demo.form.type.label}</span>
                    <div
                      className="dd-input dd-select"
                      ref={typeRef}
                      data-active={optionsOpen ? "true" : undefined}
                      data-filled={typeChosen ? "true" : undefined}
                    >
                      {typeChosen ? demo.form.type.options[demo.form.type.pick] : demo.form.type.placeholder}
                      <ChevronDown className="size-4" />
                      {optionsOpen ? (
                        <div className="dd-options" role="listbox">
                          {demo.form.type.options.map((o, i) => (
                            <span
                              key={o}
                              ref={i === demo.form.type.pick ? optionRef : undefined}
                              className="dd-option"
                              role="option"
                              aria-selected={false}
                            >
                              {o}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="dd-field">
                    <span className="dd-label">{demo.form.dates.label}</span>
                    <div className="dd-input" ref={datesRef} data-filled={datesSet ? "true" : undefined}>
                      <CalendarDays className="size-4" />
                      {datesSet ? demo.form.dates.value : demo.form.dates.placeholder}
                    </div>
                    <span className="dd-balance" data-after={datesSet ? "true" : undefined}>
                      {datesSet ? demo.form.balance.after : demo.form.balance.before}
                    </span>
                  </div>
                  <div className="dd-field">
                    <span className="dd-label">{demo.form.note.label}</span>
                    <div
                      className="dd-input dd-textarea"
                      ref={noteRef}
                      data-active={noteActive && !sent ? "true" : undefined}
                      data-filled={typed ? "true" : undefined}
                    >
                      {typed || demo.form.note.placeholder}
                      {noteActive && !sent ? <i className="crm-caret" aria-hidden="true" /> : null}
                    </div>
                  </div>
                  <div className="dd-foot">
                    <span
                      className="qd-send"
                      ref={sendRef}
                      data-press={micro === 4 && cursor?.click ? "true" : undefined}
                      data-sent={sent ? "true" : undefined}
                    >
                      {sent ? <Check className="size-4" /> : <Send className="size-4" />}
                      {sent ? demo.form.sent : demo.form.send}
                    </span>
                  </div>
                </div>
              </div>
              {toast ? (
                <p className="qd-toast" key={toast}>
                  <CircleCheck className="size-4" />
                  {toast}
                </p>
              ) : null}
            </div>
          ) : null}

          {/* Approvals: Matt's queue, then John's request. */}
          {beat === "approve" ? (
            <div className="dd-screen" key={detail ? "detail" : "list"}>
              {detail ? (
                <div className="dd-detail">
                  <div className="qd-detail-head">
                    <span className="qd-back">
                      <ArrowLeft className="size-4" />
                      {demo.approvals.detail.back}
                    </span>
                    <h3>
                      {john.name} · {john.request}
                    </h3>
                    <Status status={approved ? "approved" : "waiting"} label={demo.statuses[approved ? "approved" : "waiting"]} />
                  </div>
                  <div className="dd-detail-grid">
                    <article className="dd-card">
                      <p className="dd-kv">
                        <small>{demo.form.type.label}</small>
                        <strong>{demo.form.type.options[demo.form.type.pick]}</strong>
                      </p>
                      <p className="dd-kv">
                        <small>{demo.form.dates.label}</small>
                        <strong>{demo.form.dates.value}</strong>
                      </p>
                      <p className="dd-kv">
                        <small>{demo.approvals.detail.noteLabel}</small>
                        <span>{note}</span>
                      </p>
                    </article>
                    <article className="dd-card">
                      <ul className="dd-checks">
                        {demo.approvals.detail.checks.map((c) => (
                          <li key={c}>
                            <CircleCheck className="size-4" />
                            {c}
                          </li>
                        ))}
                      </ul>
                      <div className="dd-decide">
                        <span className="dd-decline">{demo.approvals.detail.decline}</span>
                        <span
                          className="dd-approve"
                          ref={approveRef}
                          data-press={micro === 1 && cursor?.click ? "true" : undefined}
                          data-done={approved ? "true" : undefined}
                        >
                          {approved ? <CheckCheck className="size-4" /> : <UserRoundCheck className="size-4" />}
                          {approved ? demo.statuses.approved : demo.approvals.detail.approve}
                        </span>
                      </div>
                    </article>
                  </div>
                </div>
              ) : (
                <div className="crm-docs">
                  <div className="crm-docs-head">
                    <div>
                      <h3>{demo.approvals.title}</h3>
                      <p>{demo.approvals.subtitle}</p>
                    </div>
                  </div>
                  <div className="crm-table qd-table dd-table">
                    <div className="crm-tr crm-th">
                      <span>{demo.approvals.cols.person}</span>
                      <span>{demo.approvals.cols.request}</span>
                      <span>{demo.approvals.cols.dates}</span>
                      <span>{demo.approvals.cols.status}</span>
                    </div>
                    {demo.approvals.rows.map((r, i) => (
                      <div
                        className={i === 0 ? "crm-tr qd-tr-new" : "crm-tr"}
                        key={r.name}
                        ref={i === 0 ? rowRef : undefined}
                      >
                        <span className="qd-cust">
                          <Initials text={r.initials} />
                          <strong>{r.name}</strong>
                        </span>
                        <span className="qd-req">{r.request}</span>
                        <span className="crm-dim">{r.dates}</span>
                        <Status status={r.status} label={demo.statuses[r.status]} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {toast ? (
                <p className="qd-toast" key={toast}>
                  <CircleCheck className="size-4" />
                  {toast}
                </p>
              ) : null}
            </div>
          ) : null}

          {/* HR desk: what was recorded, and the one question handed to Anna. */}
          {beat === "hr" ? (
            <div className="dd-screen">
              <div className="crm-docs-head">
                <div>
                  <h3>{demo.hrDesk.title}</h3>
                  <p>{demo.hrDesk.subtitle}</p>
                </div>
              </div>
              <div className="dd-hr">
                <section className="dd-card">
                  <p className="dd-card-label">
                    <ClipboardCheck className="size-4" />
                    {demo.hrDesk.recordedLabel}
                  </p>
                  {demo.hrDesk.recorded.map((r, i) => (
                    <div className={i === 0 ? "dd-rec qd-tr-new" : "dd-rec"} key={r.name}>
                      <Initials text={r.initials} />
                      <span>
                        <strong>{r.name}</strong>
                        <small>{r.text}</small>
                      </span>
                      <span className="dd-status" data-s="approved">
                        <Check className="size-3.5" aria-hidden="true" />
                        {r.status}
                      </span>
                    </div>
                  ))}
                </section>
                {handoff ? (
                  <section className="dd-card dd-handoff">
                    <p className="dd-card-label">
                      <LifeBuoy className="size-4" />
                      {demo.hrDesk.handoffLabel}
                    </p>
                    <p className="dd-from">
                      <Initials text={demo.hrDesk.handoff.initials} />
                      <strong>{demo.hrDesk.handoff.name}</strong>
                    </p>
                    <p className="dd-question">{demo.hrDesk.handoff.question}</p>
                    <p className="dd-reason">{demo.hrDesk.handoff.reason}</p>
                    <span className="dd-reply">{demo.hrDesk.handoff.reply}</span>
                  </section>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* Narration: square cards only. */}
      {started && beat === "intro-employee" && brief ? (
        <Brief at="intro" icon={<PhoneCall className="size-4" />} {...demo.briefs.introEmployee} />
      ) : null}
      {started && beat === "form" && brief ? (
        <div className="crm-brief-scrim">
          <Brief at="center" icon={<ListChecks className="size-4" />} {...demo.briefs.task} />
        </div>
      ) : null}
      {started && beat === "intro-manager" && brief ? (
        <Brief at="intro" icon={<ClipboardCheck className="size-4" />} {...demo.briefs.introManager} />
      ) : null}
      {started && beat === "intro-hr" && brief ? (
        <Brief at="intro" icon={<BellOff className="size-4" />} {...demo.briefs.introHr} />
      ) : null}
      {started && beat === "result" && brief ? (
        <Brief at="left" icon={<HeartHandshake className="size-4" />} {...demo.briefs.result} />
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
        <div className="crm-overlay dd-start">
          <div className="crm-brief crm-brief-start">
            <p className="crm-brief-label">
              <LifeBuoy className="size-4" />
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
