"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * A pausable clock for one beat of a scripted demo.
 *
 * Every step of a beat (cursor moves, clicks, typing, cards, and the advance
 * to the next beat) is registered with `at(ms, fn)`, in ms from the start of
 * the beat. Pause freezes the clock: no step fires and the time already played
 * is kept. Play resumes from that point, so only the remaining time is waited.
 * `reset()` starts a new beat at 0. `flush()` runs every pending step at once
 * (reduced motion: show the end state of the beat with no timers).
 */
type Step = { ms: number; fn: () => void; done: boolean };

export function useBeatClock(playing: boolean) {
  const steps = useRef<Step[]>([]);
  const timers = useRef<number[]>([]);
  // Time played in this beat before the current run, and when the run began.
  const elapsed = useRef(0);
  const runStart = useRef<number | null>(null);
  const playingRef = useRef(playing);

  const clearTimeouts = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }, []);

  const fire = useCallback((step: Step) => {
    if (step.done) return;
    step.done = true;
    step.fn();
  }, []);

  const schedule = useCallback(
    (step: Step) => {
      const played = elapsed.current + (runStart.current === null ? 0 : performance.now() - runStart.current);
      timers.current.push(window.setTimeout(() => fire(step), Math.max(0, step.ms - played)));
    },
    [fire],
  );

  /** Start (or continue) running the pending steps. */
  const arm = useCallback(() => {
    clearTimeouts();
    runStart.current = performance.now();
    steps.current.forEach((s) => {
      if (!s.done) schedule(s);
    });
  }, [clearTimeouts, schedule]);

  /** Stop the clock and keep the time already played. */
  const freeze = useCallback(() => {
    if (runStart.current !== null) {
      elapsed.current += performance.now() - runStart.current;
      runStart.current = null;
    }
    clearTimeouts();
  }, [clearTimeouts]);

  /** Forget every step and go back to 0 (a new beat, or the start screen). */
  const reset = useCallback(() => {
    clearTimeouts();
    steps.current = [];
    elapsed.current = 0;
    runStart.current = playingRef.current ? performance.now() : null;
  }, [clearTimeouts]);

  /** Register a step at `ms` from the start of the beat. */
  const at = useCallback(
    (ms: number, fn: () => void) => {
      const step: Step = { ms, fn, done: false };
      steps.current.push(step);
      if (playingRef.current) schedule(step);
    },
    [schedule],
  );

  /** Run every pending step now, in order (reduced motion). */
  const flush = useCallback(() => {
    clearTimeouts();
    [...steps.current].sort((a, b) => a.ms - b.ms).forEach(fire);
  }, [clearTimeouts, fire]);

  useEffect(() => {
    playingRef.current = playing;
    if (playing) arm();
    else freeze();
  }, [playing, arm, freeze]);

  useEffect(() => () => clearTimeouts(), [clearTimeouts]);

  return { at, reset, flush };
}

/**
 * Phones only: keep the newest part of a chat thread in view. On a tall,
 * narrow stage a question, its answer and the source panel don't fit at
 * once, so when a block appears the thread scrolls (smoothly) to bring its
 * top into view, as a real chat would. On wider screens it does nothing.
 * Use as a callback ref: `<div className="crm-chat-thread" ref={follow}>`.
 * `only` limits it to new blocks matching a selector (other changes, such
 * as a status icon swapping, are ignored).
 */
export function useFollowLatest(only?: string, query = "(max-width: 760px)") {
  const observer = useRef<MutationObserver | null>(null);
  return useCallback(
    (el: HTMLElement | null) => {
      observer.current?.disconnect();
      observer.current = null;
      if (!el || !window.matchMedia(query).matches) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      observer.current = new MutationObserver((records) => {
        let added: HTMLElement | null = null;
        records.forEach((r) =>
          r.addedNodes.forEach((n) => {
            if (n instanceof HTMLElement && (!only || n.matches(only))) added = n;
          }),
        );
        if (!added) return;
        const target = added as HTMLElement;
        // Wait a frame so the new block has its size.
        requestAnimationFrame(() => {
          const max = el.scrollHeight - el.clientHeight;
          if (max <= 0) return;
          const top = target.getBoundingClientRect().top - el.getBoundingClientRect().top + el.scrollTop - 12;
          el.scrollTo({ top: Math.min(max, Math.max(0, top)), behavior: reduce ? "auto" : "smooth" });
        });
      });
      observer.current.observe(el, { childList: true, subtree: true });
    },
    [only, query],
  );
}

/**
 * Phones: when the cursor is about to go to `el` inside a scrolling screen
 * (an ancestor marked `data-scroll-follow` whose overflow scrolls), scroll
 * that screen so `el` is in view and return how far it scrolled, so the
 * cursor can aim at where `el` will be. Returns 0 when nothing scrolls
 * (wider screens, where those screens don't scroll).
 */
export function revealForCursor(el: HTMLElement, pad = 18): number {
  const sc = el.closest<HTMLElement>("[data-scroll-follow]");
  if (!sc) return 0;
  const oy = getComputedStyle(sc).overflowY;
  if (oy !== "auto" && oy !== "scroll") return 0;
  const max = sc.scrollHeight - sc.clientHeight;
  if (max <= 0) return 0;
  const sr = sc.getBoundingClientRect();
  const er = el.getBoundingClientRect();
  let want = sc.scrollTop;
  if (er.top < sr.top + pad) want += er.top - sr.top - pad;
  else if (er.bottom > sr.bottom - pad) want += er.bottom - sr.bottom + pad;
  want = Math.min(max, Math.max(0, want));
  const dy = want - sc.scrollTop;
  if (dy === 0) return 0;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  sc.scrollTo({ top: want, behavior: reduce ? "auto" : "smooth" });
  return dy;
}
