"use client";
import { useState } from "react";
import { Tabs } from "radix-ui";
import {
  Activity,
  ArrowRight,
  Check,
  Files,
  FilePenLine,
  Keyboard,
  Mail,
  MessagesSquare,
  ScanLine,
  Search,
} from "lucide-react";
import { capabilities } from "@/lib/content";
import { Media } from "@/components/media";
const icons = {
  Activity,
  Files,
  FilePenLine,
  Keyboard,
  Mail,
  MessagesSquare,
  ScanLine,
  Search,
};
export function ProcessExplorer() {
  const [active, setActive] = useState("Documents");
  return (
    <Tabs.Root value={active} onValueChange={setActive} className="explorer">
      <Tabs.List aria-label="Explore manual processes" className="process-tabs">
        {capabilities.map((item) => {
          const Icon = icons[item.icon];
          return (
            <Tabs.Trigger
              key={item.name}
              value={item.name}
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
          key={item.name}
          value={item.name}
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
                0{capabilities.indexOf(item) + 1}
                <span> / 07</span>
              </span>
            </div>
            <Media
              slot={`capability-${item.name.toLowerCase()}`}
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
