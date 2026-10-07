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
  MessagesSquare,
  ScanLine,
  Search,
} from "lucide-react";
import { capabilities } from "@/lib/content";
const icons = {
  Activity,
  Files,
  FilePenLine,
  Keyboard,
  MessagesSquare,
  ScanLine,
  Search,
};
export function ProcessExplorer() {
  const [active, setActive] = useState("Looking");
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
          <div className="flow-comparison">
            <div className="flow-before">
              <p className="flow-label">
                <span className="status-dot" /> TODAY{" "}
                <span>Manual effort at every step</span>
              </p>
              <ol>
                {item.today.map((step, i) => (
                  <li key={step}>
                    <span className="step-number">0{i + 1}</span>
                    {step}
                    {i < 2 && <ArrowRight size={17} />}
                  </li>
                ))}
              </ol>
            </div>
            <div className="flow-after">
              <p className="flow-label">
                <span className="status-dot" /> AFTER{" "}
                <span>With ProcessSpark</span>
              </p>
              <ol>
                {item.after.map((step, i) => (
                  <li key={step}>
                    <span className="step-number">
                      {i === 2 ? <Check size={16} /> : <>0{i + 1}</>}
                    </span>
                    {step}
                    {i < 2 && <ArrowRight size={17} />}
                  </li>
                ))}
              </ol>
            </div>
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
