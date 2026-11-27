"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  ArrowLeft,
  CalendarClock,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  CircleCheck,
  FileSearch,
  FileText,
  FolderKanban,
  Inbox,
  ListChecks,
  Mail,
  MessageSquareWarning,
  MousePointer2,
  Paperclip,
  Pause,
  Play,
  ReceiptText,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Truck,
  X,
} from "lucide-react";
import {
  prefersReducedMotion,
  reducedOnServer,
  subscribeMotion,
} from "@/components/team-explorer";
import { revealForCursor, useBeatClock, useFollowLatest } from "@/components/demo-clock";
import type { CrmDemoUi, Person } from "@/lib/crm-demo";
import type { InvoiceDemo as InvoiceDemoData, InvoiceStatus } from "@/lib/invoice-demo";

/**
 * Check Your Invoices, played in the same CRM stage as the other demos (see
 * the solution-demo-video skill). Invoices are read and checked against their
 * PO; Dunvale's doesn't match, so it is held and Matt is asked. Marta reviews
 * why, Matt rejects it and a credit note is requested. Narration is the cards.
 */
type Beat = "intro-ap" | "inbox" | "review" | "intro-pm" | "decide" | "result";
const BEATS: Beat[] = ["intro-ap", "inbox", "review", "intro-pm", "decide", "result"];
/** How long each beat plays (ms). */
const BEAT_MS: Record<Beat, number> = {
  "intro-ap": 10000,
  inbox: 10000,
  review: 20000,
  "intro-pm": 10000,
  decide: 13000,
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
function Status({ status, label }: { status: InvoiceStatus; label: string }) {
  return (
    <span className="iv-status" data-s={status}>
      {status === "reading" ? <span className="crm-spin" aria-hidden="true" /> : null}
      {status === "matched" ? <Check className="size-3.5" aria-hidden="true" /> : null}
      {status === "held" ? <CircleAlert className="size-3.5" aria-hidden="true" /> : null}
      {status === "rejected" ? <CalendarClock className="size-3.5" aria-hidden="true" /> : null}
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

type InvoiceDemoProps = { demo: InvoiceDemoData; ui: CrmDemoUi };

export function InvoiceDemo({ demo, ui }: InvoiceDemoProps) {
  const reduce = useSyncExternalStore(subscribeMotion, prefersReducedMotion, reducedOnServer);
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [micro, setMicro] = useState(0);
  const [brief, setBrief] = useState(false);
  const [cursor, setCursor] = useState<{ x: number; y: number; click: boolean } | null>(null);
  const cursorRef = useRef(cursor);
  useEffect(() => {
    cursorRef.current = cursor;
  }, [cursor]);
  // Pausable clock: Pause freezes every step of the beat, Play resumes it.
  const clock = useBeatClock(playing);
  const followScreen = useFollowLatest(".iv-email");
  const followDetail = useFollowLatest(".iv-summary");
  const at = clock.at;
  const stageRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const rejectRef = useRef<HTMLSpanElement>(null);

  const beat = BEATS[index];

  // Point the cursor at a real element; enter from the middle the first time.
  const pointAt = useCallback((ref: React.RefObject<HTMLElement | null>) => {
    const stage = stageRef.current;
    const el = ref.current;
    if (!stage || !el) return;
    // On phones some screens scroll: bring the target into view first.
    const dy = revealForCursor(el);
    const s = stage.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    const target = { x: r.left + r.width / 2 - s.left, y: r.top + r.height / 2 - s.top - dy, click: false };
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
    setBrief(beat === "review");

    if (beat === "intro-ap" || beat === "intro-pm") {
      at(INTRO_DELAY, () => setBrief(true));
    } else if (beat === "inbox") {
      at(1600, () => setMicro(1)); // the others match
      at(3000, () => setMicro(2)); // Dunvale held
      at(4400, () => setMicro(3)); // "held, Matt asked" message
    } else if (beat === "review") {
      // Task card first; the cursor starts once it has gone.
      const B = 6000;
      at(B - 600, () => setBrief(false));
      at(B + 700, () => pointAt(rowRef));
      at(B + 2000, click);
      at(B + 2600, () => {
        setCursor(null);
        setMicro(1); // invoice next to the PO, first line checked
      });
      at(B + 4200, () => setMicro(2)); // second line
      at(B + 5600, () => setMicro(3)); // third line
      at(B + 7000, () => setMicro(4)); // difference, hold, Matt asked
    } else if (beat === "decide") {
      at(1200, () => pointAt(rejectRef));
      at(2500, click);
      at(2900, () => {
        setCursor(null);
        setMicro(1); // email drafted and sending
      });
      at(4300, () => setMicro(2)); // sent, status updated
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
  const onIntro = beat === "intro-ap" || beat === "intro-pm";
  const onInvoices = beat === "inbox" || beat === "review";
  const onApp = onInvoices || beat === "decide";
  const screenKey = onInvoices ? "invoices" : beat;
  const intro = beat === "intro-pm" ? demo.pmIntro : demo.apIntro;
  const introPerson = beat === "intro-pm" ? demo.pm : demo.ap;
  const who = beat === "decide" ? demo.pm : demo.ap;
  const tabs =
    beat === "decide"
      ? [
          { label: demo.tabs.inbox, icon: Inbox, on: true },
          { label: demo.tabs.projects, icon: FolderKanban, on: false },
        ]
      : [
          { label: demo.tabs.invoices, icon: ReceiptText, on: true },
          { label: demo.tabs.orders, icon: ShoppingCart, on: false },
          { label: demo.tabs.suppliers, icon: Truck, on: false },
        ];

  // Inbox: every row reads, then the others match and Dunvale is held.
  const others: InvoiceStatus = beat === "inbox" && micro < 1 ? "reading" : "matched";
  const dunvale: InvoiceStatus = beat === "inbox" && micro < 2 ? "reading" : "held";
  const detail = beat === "review" && micro >= 1;
  const checked = beat === "review" ? micro : 0; // lines checked so far
  const summary = beat === "review" && micro >= 4;
  const emailOn = beat === "decide" && micro >= 1;
  const sent = beat === "decide" && micro >= 2;
  const toast =
    beat === "inbox" && micro >= 3 ? demo.toasts.held : sent ? demo.toasts.sent : null;
  const dv = demo.inbox.rows[0];

  return (
    <div className="crm-stage iv-stage" data-beat={beat} ref={stageRef}>
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
        <div className="crm-body" data-variant={onIntro ? "intro" : beat === "result" ? "fault" : "docs"}>
          {onIntro ? (
            <div className="crm-intro">
              <div className="crm-intro-photo">
                <Image
                  src={intro.photo}
                  alt={intro.alt}
                  width={1536}
                  height={1024}
                  sizes="(max-width: 1000px) 100vw, 900px"
                  priority={beat === "intro-ap"}
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

          {/* Invoices: the list, then Dunvale's invoice next to its PO. */}
          {onInvoices ? (
            <div className="iv-screen" key={detail ? "detail" : "list"}>
              {detail ? (
                <div className="iv-detail" ref={followDetail}>
                  <div className="qd-detail-head">
                    <span className="qd-back">
                      <ArrowLeft className="size-4" />
                      {demo.detail.back}
                    </span>
                    <h3>{demo.detail.title}</h3>
                    <Status status="held" label={demo.statuses.held} />
                  </div>
                  <p className="iv-project">
                    <FileText className="size-4" />
                    {demo.detail.project}
                  </p>
                  <div className="iv-compare">
                    <div className="iv-crow iv-chead">
                      <span>{demo.detail.cols.item}</span>
                      <span>{demo.detail.cols.order}</span>
                      <span>{demo.detail.cols.invoice}</span>
                      <span>{demo.detail.cols.check}</span>
                    </div>
                    {demo.detail.lines.map((l, i) => {
                      const done = checked > i;
                      return (
                        <div
                          className="iv-crow"
                          key={l.item}
                          data-flag={done && !l.ok ? "true" : undefined}
                        >
                          <span className="iv-item">{l.item}</span>
                          <span className="crm-dim">{l.order}</span>
                          <span>{l.invoice}</span>
                          <span className="iv-check" data-ok={l.ok ? "true" : "false"}>
                            {done ? (
                              <>
                                {l.ok ? <CircleCheck className="size-4" /> : <CircleAlert className="size-4" />}
                                {l.check}
                              </>
                            ) : (
                              <span className="crm-spin" aria-hidden="true" />
                            )}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  {summary ? (
                    <div className="iv-summary">
                      <div className="iv-totals">
                        {demo.detail.totals.map((t) => (
                          <span key={t.label}>
                            {t.label} <strong>{t.value}</strong>
                          </span>
                        ))}
                        <span className="iv-diff">
                          <CircleAlert className="size-4" />
                          {demo.detail.difference}
                        </span>
                      </div>
                      <p className="iv-hold">
                        <ShieldCheck className="size-4" />
                        {demo.detail.hold}
                      </p>
                      <p className="iv-notified">
                        <Mail className="size-4" />
                        {demo.detail.notified}
                      </p>
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="crm-docs">
                  <div className="crm-docs-head">
                    <div>
                      <h3>{demo.inbox.title}</h3>
                      <p>{demo.inbox.subtitle}</p>
                    </div>
                    {micro >= 2 ? <span className="qd-inbox-pill iv-sumpill">{demo.inbox.summary}</span> : null}
                  </div>
                  <div className="crm-table qd-table iv-table">
                    <div className="crm-tr crm-th">
                      <span>{demo.inbox.cols.supplier}</span>
                      <span>{demo.inbox.cols.invoice}</span>
                      <span>{demo.inbox.cols.order}</span>
                      <span>{demo.inbox.cols.amount}</span>
                      <span>{demo.inbox.cols.status}</span>
                    </div>
                    {demo.inbox.rows.map((r, i) => {
                      const s = i === 0 ? dunvale : others;
                      return (
                        <div
                          className={i === 0 && s === "held" ? "crm-tr qd-tr-new" : "crm-tr"}
                          key={r.invoice}
                          ref={i === 0 ? rowRef : undefined}
                          data-held={i === 0 && s === "held" ? "true" : undefined}
                        >
                          <span className="qd-cust">
                            <span className="qd-cust-dot" aria-hidden="true">
                              {r.supplier[0]}
                            </span>
                            <strong>{r.supplier}</strong>
                          </span>
                          <span className="crm-dim">{r.invoice}</span>
                          <span className="crm-dim">{r.order}</span>
                          <span className="iv-amount">{r.amount}</span>
                          <Status status={s} label={demo.statuses[s]} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              {toast ? (
                <p className="qd-toast iv-toast" key={toast}>
                  <ShieldCheck className="size-4" />
                  {toast}
                </p>
              ) : null}
            </div>
          ) : null}

          {/* Matt's inbox: the request for advice, then the credit-note email. */}
          {beat === "decide" ? (
            <div className="iv-screen iv-advice-screen" ref={followScreen}>
              <div className="iv-advice-grid">
                <article className="dd-card iv-advice">
                  <p className="dd-card-label">
                    <MessageSquareWarning className="size-4" />
                    {demo.advice.title}
                  </p>
                  <p className="iv-from">{demo.advice.from}</p>
                  <p className="iv-text">{demo.advice.text}</p>
                  <div>
                    <p className="iv-sublabel">{demo.advice.differencesLabel}</p>
                    <ul className="iv-diffs">
                      {demo.advice.differences.map((d) => (
                        <li key={d}>
                          <CircleAlert className="size-4" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="iv-actions">
                    <span className="dd-decline">
                      <Paperclip className="size-4" />
                      {demo.advice.attach}
                    </span>
                    <span className="dd-decline">
                      <Check className="size-4" />
                      {demo.advice.approve}
                    </span>
                    <span
                      className="iv-reject"
                      ref={rejectRef}
                      data-press={micro === 0 && cursor?.click ? "true" : undefined}
                      data-done={emailOn ? "true" : undefined}
                    >
                      <X className="size-4" />
                      {demo.advice.reject}
                    </span>
                  </div>
                </article>
                <div className="iv-side">
                  <article className="dd-card iv-mini">
                    <p className="iv-mini-head">
                      <FileSearch className="size-4" />
                      <strong>{dv.invoice}</strong>
                      <span className="crm-dim">
                        {dv.supplier} · {dv.order}
                      </span>
                    </p>
                    <p className="iv-mini-row">
                      <span className="crm-dim">{dv.amount}</span>
                      <Status
                        status={sent ? "rejected" : "held"}
                        label={demo.statuses[sent ? "rejected" : "held"]}
                      />
                    </p>
                  </article>
                  {emailOn ? (
                    <article className="dd-card iv-email">
                      <p className="dd-card-label">
                        <Mail className="size-4" />
                        {demo.advice.email.label}
                        <span className="iv-email-state" data-sent={sent ? "true" : undefined}>
                          {sent ? <Check className="size-3.5" /> : <span className="crm-spin" aria-hidden="true" />}
                          {sent ? demo.advice.email.sent : demo.advice.email.sending}
                        </span>
                      </p>
                      <p className="iv-email-meta">
                        <span>{demo.advice.email.to}</span>
                        <strong>{demo.advice.email.subject}</strong>
                      </p>
                      {demo.advice.email.body.map((p) => (
                        <p className="iv-email-body" key={p}>
                          {p}
                        </p>
                      ))}
                    </article>
                  ) : null}
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
        </div>
      </div>

      {/* Narration: square cards only. */}
      {started && beat === "intro-ap" && brief ? (
        <Brief at="intro" icon={<Inbox className="size-4" />} {...demo.briefs.introAp} />
      ) : null}
      {started && beat === "review" && brief ? (
        <div className="crm-brief-scrim">
          <Brief at="center" icon={<ListChecks className="size-4" />} {...demo.briefs.task} />
        </div>
      ) : null}
      {started && beat === "intro-pm" && brief ? (
        <Brief at="intro" icon={<MessageSquareWarning className="size-4" />} {...demo.briefs.introPm} />
      ) : null}
      {started && beat === "result" && brief ? (
        <Brief at="left" icon={<ShieldCheck className="size-4" />} {...demo.briefs.result} />
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
        <div className="crm-overlay iv-start">
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
