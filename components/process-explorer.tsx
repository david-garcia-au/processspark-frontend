"use client";
import { useState } from "react";
import { Tabs } from "radix-ui";
import {
  Activity,
  ArrowRight,
  Check,
  ClipboardCheck,
  Files,
  Mail,
  ScanLine,
  Search,
} from "lucide-react";
import { capabilities } from "@/lib/content";
import { Media } from "@/components/media";
const icons = {
  Activity,
  ClipboardCheck,
  Files,
  Mail,
  ScanLine,
  Search,
};
export function ProcessExplorer() {
  const [active, setActive] = useState<string>(capabilities[0].id);
  return (
    <Tabs.Root value={active} onValueChange={setActive} className="explorer">
      <Tabs.List aria-label="Explore manual processes" className="process-tabs">
        {capabilities.map((item) => {
          const Icon = icons[item.icon];
          return (
            <Tabs.Trigger
              key={item.id}
              value={item.id}
              className="process-tab"
            >
              <Icon size={19} />
              {item.name}
            </Tabs.Trigger>
          );
        })}
      </Tabs.List>
      {capabilities.map((item) => (
        <Tabs.Content
          key={item.id}
          value={item.id}
          className="process-panel"
        >
          <div className="panel-top">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">{item.example}</p>
                <h3>{item.question}</h3>
                <p>{item.detail}</p>
              </div>
              <span className="panel-number">
                {String(capabilities.indexOf(item) + 1).padStart(2, "0")}
                <span> / {String(capabilities.length).padStart(2, "0")}</span>
              </span>
            </div>
            <Media
              slot={`capability-${item.id}`}
              sizes="(max-width: 850px) 100vw, 50vw"
            />
          </div>
          <div className="flow-outcome">
            <p>
              <Check size={18} />
              {item.outcome}
            </p>
            <a href="#contact">
              Explore your process <ArrowRight size={17} />
            </a>
          </div>
          <p className="example-note">
            Illustrative workflow. Checks, thresholds and human review are
            defined around your operation.
          </p>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
