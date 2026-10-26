"use client";
import { useState } from "react";
import {
  Activity,
  Check,
  ClipboardCheck,
  Files,
  Network,
  Search,
} from "lucide-react";
import { capabilities, type CapabilityId } from "@/lib/content";
import type { Dictionary } from "@/lib/i18n";
import { Media, type MediaText } from "@/components/media";

const icons = {
  Activity,
  ClipboardCheck,
  Files,
  Network,
  Search,
};

type ProcessExplorerProps = {
  copy: Dictionary["capabilities"];
  /** Placeholder label and alt text for each capability's media slot. */
  mediaText: Record<CapabilityId, MediaText>;
};

export function ProcessExplorer({ copy, mediaText }: ProcessExplorerProps) {
  const [active, setActive] = useState<CapabilityId>(capabilities[0].id);
  const item = capabilities.find((capability) => capability.id === active);
  if (!item) throw new Error(`Unknown capability "${active}".`);

  const text = copy.items[item.id];
  const Icon = icons[item.icon];

  return (
    <div className="capability-explorer">
      <div
        className="capability-selector"
        role="group"
        aria-label={copy.selectorLabel}
      >
        {capabilities.map((capability, index) => {
          const OptionIcon = icons[capability.icon];
          return (
            <button
              key={capability.id}
              type="button"
              className="capability-option"
              aria-pressed={active === capability.id}
              aria-controls="capability-story"
              onClick={() => setActive(capability.id)}
            >
              <span className="capability-option-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="capability-option-label">
                <OptionIcon size={18} aria-hidden="true" />
                {copy.items[capability.id].name}
              </span>
            </button>
          );
        })}
      </div>

      <article
        className="capability-story"
        id="capability-story"
        aria-labelledby="capability-story-title"
      >
        <div className="capability-story-main">
          <div className="capability-story-copy">
            <p className="eyebrow">
              <Icon size={16} aria-hidden="true" />
              {text.example}
            </p>
            <h3 id="capability-story-title" aria-live="polite">
              {text.question}
            </h3>
            <p>{text.detail}</p>
            <p className="capability-story-outcome">
              <Check size={18} aria-hidden="true" />
              {text.outcome}
            </p>
          </div>
          {item.id === "integrations" ? (
            <div className="integration-diagram">
              <div className="integration-sources">
                {copy.integration.sources.map((source) => (
                  <div key={source}>
                    <Network size={22} aria-hidden="true" />
                    {source}
                  </div>
                ))}
              </div>
              <div className="integration-connector" aria-hidden="true">
                ↓
              </div>
              <div className="integration-hub">
                {copy.integration.connection}
              </div>
              <div className="integration-connector" aria-hidden="true">
                ↓
              </div>
              <div className="integration-result">
                <strong>{copy.integration.view}</strong>
                <span>{copy.integration.details}</span>
              </div>
            </div>
          ) : (
            <Media
              slot={`capability-${item.id}`}
              text={mediaText[item.id]}
              className="capability-story-media"
              sizes="(max-width: 850px) 100vw, 40vw"
            />
          )}
        </div>

      </article>
    </div>
  );
}
