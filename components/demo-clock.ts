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
