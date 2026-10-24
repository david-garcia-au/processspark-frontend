"use client";
import { useState } from "react";
import { Tabs } from "radix-ui";
import {
  Activity,
  ArrowRight,
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
  const [active, setActive] = useState<string>(capabilities[0].id);
  return (
    <Tabs.Root value={active} onValueChange={setActive} className="explorer">
      <Tabs.List aria-label={copy.tablistLabel} className="process-tabs">
        {capabilities.map((item) => {
          const Icon = icons[item.icon];
          return (
            <Tabs.Trigger key={item.id} value={item.id} className="process-tab">
              <Icon size={19} />
              {copy.items[item.id].name}
            </Tabs.Trigger>
          );
        })}
      </Tabs.List>
      {capabilities.map((item, index) => {
        const text = copy.items[item.id];
        return (
          <Tabs.Content key={item.id} value={item.id} className="process-panel">
            <div className="panel-top">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">{text.example}</p>
                  <h3>{text.question}</h3>
                  <p>{text.detail}</p>
                </div>
                <span className="panel-number">
                  {String(index + 1).padStart(2, "0")}
                  <span> / {String(capabilities.length).padStart(2, "0")}</span>
                </span>
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
                  sizes="(max-width: 850px) 100vw, 50vw"
                />
              )}
            </div>
            <div className="process-comparison">
              <div>
                <strong>{copy.todayLabel}</strong>
                <p>{text.today}</p>
              </div>
              <div>
                <strong>{copy.afterLabel}</strong>
                <p>{text.after}</p>
              </div>
            </div>
            <div className="flow-outcome">
              <p>
                <Check size={18} />
                {text.outcome}
              </p>
              <a href="#contact">
                {copy.cta} <ArrowRight size={17} />
              </a>
            </div>
            <p className="example-note">{copy.note}</p>
          </Tabs.Content>
        );
      })}
    </Tabs.Root>
  );
}
