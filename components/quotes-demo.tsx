"use client";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import {
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  FileText,
  Inbox,
  ListChecks,
  Mail,
  MousePointer2,
  Pause,
  Play,
  ReceiptText,
  RotateCcw,
  Send,
  Sparkles,
  Tag,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  prefersReducedMotion,
  reducedOnServer,
  subscribeMotion,
} from "@/components/team-explorer";
import type { CrmDemoUi, Person } from "@/lib/crm-demo";
import type { QuotesDemo as QuotesDemoData, RfqStatus } from "@/lib/quotes-demo";

/**
 * Quote & RFQ Automation, played in the same CRM stage as DocsDemo (see the
 * solution-demo-video skill). An RFQ email lands in the dashboard, the system
 * drafts a priced reply, Matt adds a note and sends it, Anna orders.
 * Narration is the square cards only.
 */
type Beat = "intro-rep" | "inbox" | "review" | "intro-customer" | "order" | "result";
const BEATS: Beat[] = ["intro-rep", "inbox", "review", "intro-customer", "order", "result"];
/** How long each beat plays before auto-advancing (ms). */
const BEAT_MS: Record<Beat, number> = {
  "intro-rep": 8000,
  inbox: 13000,
  review: 24000,
  "intro-customer": 8000,
  order: 7500,
  result: 9000,
};
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
function Status({ status, label }: { status: RfqStatus; label: string }) {
  return (
    <span className="qd-status" data-s={status}>
      {status === "drafting" ? <span className="crm-spin" aria-hidden="true" /> : null}
      {status === "order" ? <Check className="size-3.5" aria-hidden="true" /> : null}
      {label}
    </span>
  );
}
function Brief({
  icon,
  label,
  text,
  at,
}: {
  icon: React.ReactNode;
  label: string;
  text: string;
  at: string;
}) {
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

type QuotesDemoProps = { demo: QuotesDemoData; ui: CrmDemoUi };

export function QuotesDemo({ demo, ui }: QuotesDemoProps) {
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
  const timers = useRef<number[]>([]);
  const stageRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);
  const sendRef = useRef<HTMLSpanElement>(null);
  const beat = BEATS[index];

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }, []);
  const at = useCallback((ms: number, fn: () => void) => {
    timers.current.push(window.setTimeout(fn, ms));
  }, []);
  useEffect(() => () => clearTimers(), [clearTimers]);

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

  // Schedule each beat's micro-steps.
  useEffect(() => {
    if (!started) return;
    clearTimers();
    setMicro(0);
    setCursor(null);
    setBrief(beat === "review");
    if (beat !== "review") setTyped("");
    if (beat === "intro-rep" || beat === "intro-customer") {
      at(2000, () => setBrief(true));
    } else if (beat === "inbox") {
      at(1500, () => setMicro(1)); // new RFQ row lands
      at(2900, () => setMicro(2)); // drafting
      at(4300, () => setBrief(true)); // "draft in progress" card
      at(10300, () => setBrief(false));
      at(10800, () => setMicro(3)); // draft ready
    } else if (beat === "review") {
      // Task card first; the cursor starts once it has gone.
      const B = 6000;
      setTyped("");
      at(B - 600, () => setBrief(false));
      at(B + 700, () => pointAt(rowRef));
      at(B + 2000, click);
      at(B + 2600, () => {
        setCursor(null);
        setMicro(1); // email + draft open
      });
      at(B + 6600, () => pointAt(noteRef));
      at(B + 7800, click);
      at(B + 8200, () => setMicro(2)); // note field active
      const note = demo.draft.note;
      const perChar = 55;
      const start = B + 8700;
      for (let i = 1; i <= note.length; i++) {
        at(start + i * perChar, () => setTyped(note.slice(0, i)));
      }
      const done = start + note.length * perChar;
      at(done + 600, () => pointAt(sendRef));
      at(done + 1800, click);
      at(done + 2200, () => {
        setCursor(null);
        setMicro(3); // sent
      });
    } else if (beat === "order") {
      at(1800, () => setMicro(1)); // order received
    } else if (beat === "result") {
      at(1800, () => setBrief(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beat, started]);

  const reset = useCallback(() => {
    clearTimers();
    setStarted(false);
    setIndex(0);
    setPlaying(false);
    setTyped("");
    setCursor(null);
    setMicro(0);
    setBrief(false);
  }, [clearTimers]);

  // Auto-advance; after the last beat, back to the start card.
  useEffect(() => {
    if (!started || !playing) return;
    const last = index >= BEATS.length - 1;
    const id = window.setTimeout(() => {
      if (last) reset();
      else setIndex((i) => i + 1);
    }, BEAT_MS[beat]);
    return () => window.clearTimeout(id);
  }, [started, playing, index, beat, reset]);

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
  const goTo = useCallback((i: number) => {
    setIndex(Math.max(0, Math.min(i, BEATS.length - 1)));
  }, []);
  const atEnd = index === BEATS.length - 1;

  // Derived view state
  const onRfq = beat === "inbox" || beat === "review" || beat === "order";
  const onIntro = beat === "intro-rep" || beat === "intro-customer";
  const screenKey = onRfq ? "rfq" : beat;
  const person = beat === "intro-customer" ? demo.customer : demo.rep;
  const intro = beat === "intro-customer" ? demo.customerIntro : demo.repIntro;
  const detail = beat === "review" && micro >= 1;
  const sent = beat === "review" && micro >= 3;
  const newStatus: RfqStatus | null =
    beat === "inbox"
      ? micro >= 3
        ? "ready"
        : micro >= 2
          ? "drafting"
          : micro >= 1
            ? "new"
            : null
      : beat === "review"
        ? sent
          ? "sent"
          : "ready"
        : beat === "order"
          ? micro >= 1
            ? "order"
            : "sent"
          : null;
  const toast =
    sent ? demo.toasts.sent : beat === "order" && micro >= 1 ? demo.toasts.order : null;

  return (
    <div className="crm-stage qd-stage" data-beat={beat} ref={stageRef}>
      <div className="crm-win" key={`win-${screenKey}`}>
        {onRfq ? (
          <>
            <div className="crm-tabs" aria-hidden="true">
              <span className="crm-tab" data-active="true">
                <Inbox className="size-3.5" />
                {demo.tabs.rfqs}
              </span>
              <span className="crm-tab">
                <Tag className="size-3.5" />
                {demo.tabs.prices}
              </span>
              <span className="crm-tab">
                <Users className="size-3.5" />
                {demo.tabs.customers}
              </span>
            </div>
            <div className="crm-userbar">
              <span className="crm-user">
                <Avatar person={demo.rep} />
                <span className="crm-user-text">
                  <strong>{demo.rep.name}</strong>
                  <small>{demo.rep.role}</small>
                </span>
              </span>
            </div>
          </>
        ) : null}
        <div
          className="crm-body"
          data-variant={onIntro ? "intro" : beat === "result" ? "fault" : "docs"}
        >
          {onIntro ? (
            <div className="crm-intro">
              <div className="crm-intro-photo">
                <Image src={intro.photo} alt={intro.alt} width={1536} height={1024} sizes="(max-width: 1000px) 100vw, 900px" priority={beat === "intro-rep"} />
              </div>
              <div className="crm-intro-text">
                <p className="crm-intro-meet">{ui.meet}</p>
                <h3>
                  {person.name}
                  <span>{beat === "intro-customer" ? `${person.role}, ${demo.company}` : person.role}</span>
                </h3>
                <p className="crm-intro-line">{intro.line}</p>
              </div>
            </div>
          ) : null}

          {beat === "result" ? (
            <div className="crm-fault">
              <Image src={demo.resultPhoto.src} alt={demo.resultPhoto.alt} fill sizes="(max-width: 1000px) 100vw, 900px" className="crm-fault-img" />
            </div>
          ) : null}

          {onRfq ? (
            <div className="qd-screen" key={detail ? "detail" : "table"}>
              {detail ? (
                <div className="qd-detail">
                  <div className="qd-detail-head">
                    <span className="qd-back">
                      <ArrowLeft className="size-4" />
                      {demo.inbox.back}
                    </span>
                    <h3>{demo.email.subject}</h3>
                    <span className="qd-key">{demo.keyAccount}</span>
                  </div>
                  <div className="qd-detail-grid">
                    <article className="qd-mail">
                      <p className="qd-from">
                        <Avatar person={demo.customer} />
                        <span>
                          <strong>
                            {demo.customer.name} · {demo.company}
                          </strong>
                          <small>
                            {demo.email.from} → {demo.email.to}
                          </small>
                        </span>
                      </p>
                      {demo.email.body.map((p) => (
                        <p key={p}>{p}</p>
                      ))}
                    </article>
                    <article className="qd-draft" data-sent={sent ? "true" : undefined}>
                      <p className="qd-draft-label">
                        <Sparkles className="size-4" />
                        {demo.draft.label}
                      </p>
                      {demo.draft.body.map((p) => (
                        <p key={p}>{p}</p>
                      ))}
                      <div className="qd-quote">
                        <div className="qd-qrow qd-qhead">
                          <span>{demo.draft.cols.item}</span>
                          <span>{demo.draft.cols.qty}</span>
                          <span>{demo.draft.cols.list}</span>
                          <span>{demo.draft.cols.discount}</span>
                          <span>{demo.draft.cols.net}</span>
                        </div>
                        <div className="qd-qrow">
                          <span>
                            <ReceiptText className="size-3.5" />
                            {demo.draft.line.item}
                          </span>
                          <span>{demo.draft.line.qty}</span>
                          <span>{demo.draft.line.list}</span>
                          <span className="qd-disc">{demo.draft.line.discount}</span>
                          <span>{demo.draft.line.net}</span>
                        </div>
                        <div className="qd-totals">
                          {demo.draft.totals.map((t) => (
                            <span key={t.label}>
                              {t.label} <strong>{t.value}</strong>
                            </span>
                          ))}
                        </div>
                      </div>
                      <ul className="crm-sources">
                        {demo.draft.sources.map((s) => (
                          <li key={s}>{s}</li>
                        ))}
                      </ul>
                      <div className="qd-note" ref={noteRef} data-active={micro >= 2 ? "true" : undefined} data-filled={typed ? "true" : undefined}>
                        {typed || demo.draft.notePlaceholder}
                        {micro === 2 ? <i className="crm-caret" aria-hidden="true" /> : null}
                        {typed ? <span className="qd-sign">{demo.draft.signature}</span> : null}
                      </div>
                      <div className="qd-draft-foot">
                        <span
                          className="qd-send"
                          ref={sendRef}
                          data-press={micro === 2 && cursor?.click ? "true" : undefined}
                          data-sent={sent ? "true" : undefined}
                        >
                          {sent ? <Check className="size-4" /> : <Send className="size-4" />}
                          {sent ? demo.draft.sent : demo.draft.send}
                        </span>
                      </div>
                    </article>
                  </div>
                </div>
              ) : (
                <div className="crm-docs">
                  <div className="crm-docs-head">
                    <div>
                      <h3>{demo.inbox.title}</h3>
                      <p>{demo.inbox.subtitle}</p>
                    </div>
                    <span className="qd-inbox-pill">
                      <Mail className="size-4" />
                      sales@valvora.com
                    </span>
                  </div>
                  <div className="crm-table qd-table">
                    <div className="crm-tr crm-th">
                      <span>{demo.inbox.cols.customer}</span>
                      <span>{demo.inbox.cols.request}</span>
                      <span>{demo.inbox.cols.received}</span>
                      <span>{demo.inbox.cols.status}</span>
                    </div>
                    {newStatus ? (
                      <div
                        className="crm-tr qd-tr-new"
                        ref={rowRef}
                        data-flash={beat === "order" && micro >= 1 ? "again" : undefined}
                        key={beat === "order" && micro >= 1 ? "order" : "new"}
                      >
                        <span className="qd-cust">
                          <Avatar person={demo.customer} />
                          <span>
                            <strong>{demo.company}</strong>
                            <small className="qd-key">{demo.keyAccount}</small>
                          </span>
                        </span>
                        <span className="qd-req">
                          <FileText className="size-4 text-gray-500" />
                          {demo.newRow.request}
                        </span>
                        <span className="crm-dim">{demo.newRow.received}</span>
                        <Status status={newStatus} label={demo.statuses[newStatus]} />
                      </div>
                    ) : null}
                    {demo.rows.map((r) => (
                      <div className="crm-tr" key={r.customer}>
                        <span className="qd-cust">
                          <span className="qd-cust-dot" aria-hidden="true">
                            {r.customer[0]}
                          </span>
                          <strong>{r.customer}</strong>
                        </span>
                        <span className="qd-req">
                          <FileText className="size-4 text-gray-500" />
                          {r.request}
                        </span>
                        <span className="crm-dim">{r.received}</span>
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
        </div>
      </div>

      {/* Narration: square cards only. */}
      {started && beat === "intro-rep" && brief ? (
        <Brief at="intro" icon={<Mail className="size-4" />} label={demo.briefs.newRfq.label} text={demo.briefs.newRfq.text} />
      ) : null}
      {started && beat === "inbox" && brief ? (
        <div className="crm-brief-scrim">
          <Brief at="center" icon={<Sparkles className="size-4" />} label={demo.briefs.drafting.label} text={demo.briefs.drafting.text} />
        </div>
      ) : null}
      {started && beat === "review" && brief ? (
        <div className="crm-brief-scrim">
          <Brief at="center" icon={<ListChecks className="size-4" />} label={demo.briefs.task.label} text={demo.briefs.task.text} />
        </div>
      ) : null}
      {started && beat === "intro-customer" && brief ? (
        <Brief at="intro" icon={<CircleCheck className="size-4" />} label={demo.briefs.received.label} text={demo.briefs.received.text} />
      ) : null}
      {started && beat === "result" && brief ? (
        <Brief at="intro" icon={<TrendingUp className="size-4" />} label={demo.briefs.result.label} text={demo.briefs.result.text} />
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
        <div className="crm-overlay qd-start">
          <div className="crm-brief crm-brief-start">
            <p className="crm-brief-label">
              <ReceiptText className="size-4" />
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
            <button type="button" className="crm-ctl crm-ctl-main" onClick={() => setPlaying((p) => !p)} aria-label={playing ? ui.pause : ui.resume}>
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
