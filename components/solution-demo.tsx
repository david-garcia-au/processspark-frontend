"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import {
  Check,
  FileText,
  MessageSquare,
  Play,
  RotateCcw,
  TriangleAlert,
} from "lucide-react";
import {
  prefersReducedMotion,
  reducedOnServer,
  subscribeMotion,
} from "@/components/team-explorer";
import type { Demo, DemoChoice, DemoUi } from "@/lib/demos";

/**
 * A fixed-size stage that plays one invented scenario. The dark card is a set
 * height (about one screen, capped) and never grows: the content moves through
 * scenes that crossfade in place. The visitor presses run, watches a few steps,
 * sees the result, then makes a decision that is written to an audit line.
 * Nothing auto-plays; reduced-motion visitors jump straight to the result.
 * No vendor or platform is named.
 *
 * Scenes: 0 = input is shown, waiting for run; 1 = steps run; 2 = result and
 * the human decision.
 */
type SolutionDemoProps = {
  demo: Demo;
  ui: DemoUi;
};

export function SolutionDemo({ demo, ui }: SolutionDemoProps) {
  const reduce = useSyncExternalStore(
    subscribeMotion,
    prefersReducedMotion,
    reducedOnServer,
  );
  const [scene, setScene] = useState(0);
  const [step, setStep] = useState(0);
  const [choice, setChoice] = useState<DemoChoice | null>(null);
  const timers = useRef<number[]>([]);

  const clear = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }, []);
  useEffect(() => () => clear(), [clear]);

  const run = useCallback(() => {
    clear();
    setChoice(null);
    if (reduce) {
      setStep(demo.steps.length - 1);
      setScene(2);
      return;
    }
    setScene(1);
    setStep(0);
    const stepMs = 1050;
    demo.steps.forEach((_, i) => {
      if (i === 0) return;
      timers.current.push(window.setTimeout(() => setStep(i), stepMs * i));
    });
    timers.current.push(
      window.setTimeout(() => setScene(2), stepMs * demo.steps.length + 350),
    );
  }, [clear, demo.steps, reduce]);

  const replay = useCallback(() => {
    clear();
    setChoice(null);
    setStep(0);
    setScene(0);
  }, [clear]);

  const input = demo.input;
  const running = scene === 1;

  return (
    <div className="demo" data-scene={scene}>
      <div className="demo-stage">
        {/* Scene 0 and 1 share the two-column layout: the input stays put on
            the left while the steps run on the right. */}
        <div className="demo-screen" data-show={scene <= 1} aria-hidden={scene > 1}>
          <div className="demo-two">
            <div className="demo-col demo-col-input">
              <p className="demo-colhead">{ui.arrives}</p>
              {input.kind === "document" ? (
                <div className="demo-doc">
                  <p className="demo-doc-head">
                    <FileText size={18} aria-hidden="true" />
                    <span>
                      <strong>{input.title}</strong>
                      <small>{input.meta}</small>
                    </span>
                  </p>
                  <dl className="demo-fields">
                    {input.fields.map((f) => (
                      <div key={f.label} data-flag={f.flag ? "true" : undefined}>
                        <dt>{f.label}</dt>
                        <dd>{f.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ) : (
                <div className="demo-chat">
                  <p className="demo-asker">
                    <MessageSquare size={16} aria-hidden="true" />
                    {input.asker}
                  </p>
                  <p className="demo-bubble">{input.question}</p>
                </div>
              )}
            </div>
            <div className="demo-col demo-col-work">
              <p className="demo-colhead">{ui.does}</p>
              {scene === 0 ? (
                <p className="demo-idle">{ui.idle}</p>
              ) : (
                <ol className="demo-steps">
                  {demo.steps.map((s, i) => {
                    const state =
                      i < step ? "done" : i === step ? "active" : "wait";
                    return (
                      <li key={s.title} data-state={state}>
                        <span className="demo-step-dot" aria-hidden="true">
                          {state === "done" ? <Check size={13} /> : i + 1}
                        </span>
                        <span className="demo-step-text">
                          <strong>{s.title}</strong>
                          <small>{s.detail}</small>
                        </span>
                      </li>
                    );
                  })}
                </ol>
              )}
            </div>
          </div>
        </div>

        {/* Scene 2: the result and the human decision. */}
        <div className="demo-screen demo-screen-result" data-show={scene === 2} aria-hidden={scene !== 2}>
          <div className="demo-result">
            {demo.result.kind === "checks" ? (
              <div className="demo-checks">
                <p className="demo-result-head">{demo.result.title}</p>
                <ul>
                  {demo.result.rows.map((r) => (
                    <li key={r.label} data-flag={r.flag ? "true" : undefined}>
                      <span className="demo-check-mark" aria-hidden="true">
                        {r.flag ? <TriangleAlert size={15} /> : <Check size={15} />}
                      </span>
                      <span>
                        <strong>{r.label}</strong>
                        <small>{r.value}</small>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="demo-answer">
                <p>{demo.result.text}</p>
                <ul className="demo-sources">
                  {demo.result.sources.map((src) => (
                    <li key={src}>{src}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="demo-gate" data-tone={demo.gate.tone}>
              <p className="demo-gate-head">
                <span className="demo-gate-mark" aria-hidden="true">
                  {demo.gate.tone === "review" ? (
                    <TriangleAlert size={16} />
                  ) : (
                    <Check size={16} />
                  )}
                </span>
                {demo.gate.title}
              </p>
              {!choice ? (
                <>
                  <p className="demo-gate-prompt">{demo.gate.prompt}</p>
                  <div className="demo-gate-actions">
                    {demo.gate.choices.map((c) => (
                      <button
                        key={c.label}
                        type="button"
                        className="demo-choice"
                        onClick={() => setChoice(c)}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="demo-outcome">
                  <p>{choice.outcome}</p>
                  {choice.reveal ? (
                    <div className="demo-reveal">
                      <p className="demo-reveal-head">{choice.reveal.title}</p>
                      <ul>
                        {choice.reveal.lines.map((line, i) => (
                          <li
                            key={line}
                            data-mark={choice.reveal!.mark === i ? "true" : undefined}
                          >
                            {line}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  <p className="demo-log">
                    <span>{ui.logged}</span> {choice.log}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="demo-bar">
        {scene === 0 ? (
          <button type="button" className="demo-run" onClick={run}>
            <Play size={16} aria-hidden="true" />
            {ui.run}
          </button>
        ) : running ? (
          <span className="demo-run" aria-disabled="true" data-busy="true">
            {ui.running}
            <span className="demo-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          </span>
        ) : (
          <button type="button" className="demo-run demo-replay" onClick={replay}>
            <RotateCcw size={16} aria-hidden="true" />
            {ui.replay}
          </button>
        )}
      </div>
    </div>
  );
}
