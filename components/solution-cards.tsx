"use client";

import { useRef, useState } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { solutionGroups, type SolutionId } from "@/lib/content";
import type { Dictionary } from "@/lib/i18n";

type Copy = Dictionary["solutionsPage"];

/** Cards are numbered 1 to 14 in the order they appear on the page. */
const displayOrder: readonly SolutionId[] = solutionGroups.flatMap(
  (group) => group.items,
);

function cardNumber(id: SolutionId): string {
  return String(displayOrder.indexOf(id) + 1).padStart(2, "0");
}

/**
 * One flip card. Mouse users flip it by hovering (CSS, only on devices that
 * can hover). Touch and keyboard users flip it with the full-card button, so
 * `flipped` tracks only those. A mouse click is ignored on purpose: hover
 * already shows the back, and a click would leave the card stuck open.
 */
function SolutionCard({ id, copy }: { id: SolutionId; copy: Copy }) {
  const [flipped, setFlipped] = useState(false);
  const lastInput = useRef<"mouse" | "other">("other");
  const item = copy.items[id];

  return (
    <li className="sol-card" data-flipped={flipped}>
      <div className="sol-card-inner">
        <div className="sol-face sol-front" aria-hidden={flipped}>
          <span className="sol-number">{cardNumber(id)}</span>
          <h3>{item.title}</h3>
          <p>{item.problem}</p>
          <span className="sol-hint">
            {copy.hint} <ArrowRight size={14} aria-hidden="true" />
          </span>
        </div>
        <div className="sol-face sol-back" aria-hidden={!flipped}>
          <p className="sol-back-label">
            <span className="sol-back-dot" aria-hidden="true" />
            {copy.solutionLabel}
          </p>
          <h3>{item.title}</h3>
          <p className="sol-solution">{item.solution}</p>
          <p className="sol-control">
            <ShieldCheck size={16} aria-hidden="true" />
            <span>
              <strong>{copy.controlLabel}.</strong> {item.control}
            </span>
          </p>
        </div>
      </div>
      <button
        type="button"
        className="sol-toggle"
        aria-expanded={flipped}
        aria-label={`${item.title}. ${flipped ? copy.showProblem : copy.showSolution}`}
        onPointerDown={(event) => {
          lastInput.current = event.pointerType === "mouse" ? "mouse" : "other";
        }}
        onKeyDown={(event) => {
          lastInput.current = "other";
          if (event.key === "Escape") setFlipped(false);
        }}
        onClick={() => {
          if (lastInput.current === "mouse") return;
          setFlipped((value) => !value);
        }}
        onBlur={() => setFlipped(false)}
      />
    </li>
  );
}

export function SolutionCards({ copy }: { copy: Copy }) {
  return (
    <div className="sol-groups">
      {solutionGroups.map((group) => (
        <section
          key={group.id}
          className="sol-group"
          aria-labelledby={`sol-group-${group.id}`}
        >
          <h2 id={`sol-group-${group.id}`}>{copy.groups[group.id]}</h2>
          <ul className="sol-grid">
            {group.items.map((id) => (
              <SolutionCard key={id} id={id} copy={copy} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
