"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import {
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  Database,
  ListChecks,
  MessageSquareText,
  Pause,
  Play,
  RotateCcw,
  ShieldCheck,
  SquarePen,
  Wrench,
} from "lucide-react";
import {
  prefersReducedMotion,
  reducedOnServer,
  subscribeMotion,
} from "@/components/team-explorer";
import { useBeatClock } from "@/components/demo-clock";
import type { CrmDemoUi } from "@/lib/crm-demo";
import type { DataDemo as DataDemoData } from "@/lib/data-demo";

/**
 * Talk to Your Data, played in the same stage as the other demos (see the
 * solution-demo-video skill). Short on purpose: John asks when a pump was last
 * replaced and gets the exact answer with the records it came from, then asks
 * something he isn't allowed to see and gets "I can't answer that." One card
 * at the end says permissions are checked first. No cursor: John only types.
 */
type Beat = "intro" | "ask1" | "answer1" | "ask2" | "answer2";
const BEATS: Beat[] = ["intro", "ask1", "answer1", "ask2", "answer2"];
/** How long each beat plays (ms). The typing beats wait for their typing. */
const BEAT_MS: Record<Beat, number> = {
  intro: 10000,
  ask1: 8000,
  answer1: 12000,
  ask2: 7000,
  answer2: 11500,
};
/** Each person shows alone for this long before their card. */
const INTRO_DELAY = 4000;

type DataDemoProps = { demo: DataDemoData; ui: CrmDemoUi };

export function DataDemo({ demo, ui }: DataDemoProps) {
  const reduce = useSyncExternalStore(subscribeMotion, prefersReducedMotion, reducedOnServer);
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [micro, setMicro] = useState(0);
  const [typed, setTyped] = useState("");
  const [brief, setBrief] = useState(false);
  // Pausable clock: Pause freezes every step of the beat, Play resumes it.
  const clock = useBeatClock(playing);
  const at = clock.at;

  const beat = BEATS[index];
  const c = demo.chat;
  const q1 = c.first.question;
  const q2 = c.second.question;
  const perChar = (q: string) => Math.min(110, Math.round(7000 / q.length));
  const typingMs = (q: string) => 1500 + q.length * perChar(q) + 1500;
  const beatMs = (b: Beat) =>
    b === "ask1"
      ? Math.max(BEAT_MS.ask1, typingMs(q1))
      : b === "ask2"
        ? Math.max(BEAT_MS.ask2, typingMs(q2))
        : BEAT_MS[b];

  const reset = useCallback(() => {
    clock.reset();
    setStarted(false);
    setIndex(0);
    setPlaying(false);
    setTyped("");
    setMicro(0);
    setBrief(false);
  }, [clock]);

  // Schedule each beat's steps on the clock, ending with the advance.
  useEffect(() => {
    if (!started) return;
    clock.reset();
    setMicro(0);
    setBrief(false);
    setTyped("");
    const typeOut = (q: string) => {
      at(700, () => setMicro(1)); // composer active
      const pc = perChar(q);
      for (let i = 1; i <= q.length; i++) {
        at(1500 + i * pc, () => setTyped(q.slice(0, i)));
      }
    };
    if (beat === "intro") {
      at(INTRO_DELAY, () => setBrief(true));
    } else if (beat === "ask1") {
      typeOut(q1);
    } else if (beat === "answer1") {
      at(2400, () => setMicro(1)); // answer
      at(3800, () => setMicro(2)); // the records it came from
    } else if (beat === "ask2") {
      typeOut(q2);
    } else if (beat === "answer2") {
      at(2200, () => setMicro(1)); // "I can't answer that."
      at(4200, () => setBrief(true)); // permissions-first card
    }
    if (reduce) {
      // Reduced motion: show the beat's end state at once, no timers.
      clock.flush();
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

  const onChat = beat !== "intro";
  const screenKey = onChat ? "chat" : "intro";
  const answered1 = beat === "answer1" ? micro >= 1 : beat === "ask2" || beat === "answer2";
  const recordsOpen = beat === "answer1" && micro >= 2;
  const answered2 = beat === "answer2" && micro >= 1;
  const composer = (placeholder: string) => (
    <div className="crm-composer" data-typing={micro >= 1 ? "true" : undefined}>
      <span className="crm-composer-text" data-filled={typed ? "true" : undefined}>
        {typed || placeholder}
        <i className="crm-caret" aria-hidden="true" />
      </span>
      <span className="crm-send" aria-hidden="true">
        <ArrowUp className="size-4" />
      </span>
    </div>
  );

  return (
    <div className="crm-stage ta-stage" data-beat={beat}>
      <div className="crm-win" key={`win-${screenKey}`}>
        {onChat ? (
          <>
            <div className="crm-tabs" aria-hidden="true">
              <span className="crm-tab" data-active="true">
                <MessageSquareText className="size-3.5" />
                {c.tabLabel}
              </span>
            </div>
            <div className="crm-userbar">
              <span className="crm-user">
                <span className="crm-avatar bg-amber-500" aria-hidden="true">
                  {demo.tech.initials}
                </span>
                <span className="crm-user-text">
                  <strong>{demo.tech.name}</strong>
                  <small>{demo.tech.role}</small>
                </span>
              </span>
            </div>
          </>
        ) : null}
        <div className="crm-body" data-variant={onChat ? "chat" : "intro"}>
          {!onChat ? (
            <div className="crm-intro">
              <div className="crm-intro-photo">
                <Image
                  src={demo.techIntro.photo}
                  alt={demo.techIntro.alt}
                  width={1536}
                  height={1024}
                  sizes="(max-width: 1000px) 100vw, 900px"
                  priority
                />
              </div>
              <div className="crm-intro-text">
                <p className="crm-intro-meet">{ui.meet}</p>
                <h3>
                  {demo.tech.name}
                  <span>{demo.tech.role}</span>
                </h3>
                <p className="crm-intro-line">{demo.techIntro.line}</p>
              </div>
            </div>
          ) : (
            <div className="crm-chatwin">
              <aside className="crm-chat-side">
                <span className="crm-chat-new">
                  <SquarePen className="size-4" />
                  {c.newChat}
                </span>
                <p className="crm-chat-sidelabel">{c.chatsLabel}</p>
                <span className="crm-chat-thread-item" data-active="true">
                  {beat === "ask1" ? c.empty : c.threadTitle}
                </span>
              </aside>
              <div className="crm-chat">
                {beat === "ask1" ? (
                  <div className="crm-chat-empty">
                    <h3>{c.empty}</h3>
                    {composer(c.placeholder)}
                  </div>
                ) : (
                  <>
                    <div className="crm-chat-thread">
                      <div className="crm-turn-user">
                        <p>{q1}</p>
                      </div>
                      <div className="crm-turn-ai">
                        {!answered1 ? (
                          <p className="crm-activity">
                            <span className="crm-spin" aria-hidden="true" />
                            {c.activity}
                          </p>
                        ) : (
                          <>
                            <p className="crm-answer">{c.first.answer}</p>
                            <ul className="crm-sources">
                              {c.first.sources.map((s) => (
                                <li key={s}>{s}</li>
                              ))}
                            </ul>
                            {recordsOpen ? (
                              <div className="crm-source ta-records">
                                <p className="crm-source-head">
                                  <Database className="size-4" />
                                  {c.first.records.title}
                                </p>
                                <div className="ta-table" role="table">
                                  <div className="ta-row ta-head" role="row">
                                    {c.first.records.cols.map((col) => (
                                      <span key={col} role="columnheader">
                                        {col}
                                      </span>
                                    ))}
                                  </div>
                                  {c.first.records.rows.map((row, i) => (
                                    <div
                                      className="ta-row"
                                      role="row"
                                      key={row[0]}
                                      data-mark={i === c.first.records.mark ? "true" : undefined}
                                    >
                                      {row.map((cell, j) => (
                                        <span key={`${row[0]}-${j}`} role="cell">
                                          {j === 2 ? <Wrench className="size-3.5" aria-hidden="true" /> : null}
                                          {cell}
                                        </span>
                                      ))}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ) : null}
                          </>
                        )}
                      </div>
                      {beat === "answer2" ? (
                        <>
                          <div className="crm-turn-user">
                            <p>{q2}</p>
                          </div>
                          <div className="crm-turn-ai">
                            {!answered2 ? (
                              <p className="crm-activity">
                                <span className="crm-spin" aria-hidden="true" />
                                {c.activity}
                              </p>
                            ) : (
                              <p className="crm-answer ta-refuse">
                                <ShieldCheck className="size-4" aria-hidden="true" />
                                {c.second.answer}
                              </p>
                            )}
                          </div>
                        </>
                      ) : null}
                    </div>
                    {beat === "ask2" ? <div className="ta-dock">{composer(c.placeholder)}</div> : null}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Narration: square cards only. */}
      {started && beat === "intro" && brief ? (
        <div className="crm-brief" data-at="intro">
          <p className="crm-brief-label">
            <Wrench className="size-4" />
            {demo.briefs.intro.label}
          </p>
          <p className="crm-brief-text">{demo.briefs.intro.text}</p>
        </div>
      ) : null}
      {started && beat === "answer2" && brief ? (
        <div className="crm-brief-scrim">
          <div className="crm-brief" data-at="center">
            <p className="crm-brief-label">
              <ShieldCheck className="size-4" />
              {demo.briefs.result.label}
            </p>
            <p className="crm-brief-text">{demo.briefs.result.text}</p>
          </div>
        </div>
      ) : null}

      {!started ? (
        <div className="crm-overlay ta-start">
          <div className="crm-brief crm-brief-start">
            <p className="crm-brief-label">
              <ListChecks className="size-4" />
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
