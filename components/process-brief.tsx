"use client";
import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories, defaultCategoryValue } from "@/lib/content";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";
type Status = "idle" | "sending" | "sent" | "error";

type ProcessBriefProps = {
  /** Locale of the page. Sent with the brief so the reply uses the same language. */
  lang: Locale;
  copy: Dictionary["contact"]["form"];
  /** Address shown in the error message. */
  email: string;
};

export function ProcessBrief({ lang, copy, email }: ProcessBriefProps) {
  const [status, setStatus] = useState<Status>("idle");
  async function submitBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          category: data.get("category"),
          process: data.get("process"),
          website: data.get("website"),
          lang,
        }),
      });
      if (!response.ok) throw new Error(String(response.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }
  return (
    <form
      className="brief-form"
      onSubmit={submitBrief}
      onChange={() => setStatus((x) => (x === "sending" ? x : "idle"))}
    >
      <div className="form-heading">
        <span className="eyebrow">{copy.eyebrow}</span>
        <ArrowUpRight size={23} />
      </div>
      <div className="form-row">
        <label>
          {copy.name.label}
          <input
            name="name"
            autoComplete="name"
            required
            placeholder={copy.name.placeholder}
            maxLength={120}
          />
        </label>
        <label>
          {copy.email.label}
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder={copy.email.placeholder}
            maxLength={254}
          />
        </label>
      </div>
      <div className="form-row">
        <label>
          {copy.company.label}
          <input
            name="company"
            autoComplete="organization"
            required
            placeholder={copy.company.placeholder}
            maxLength={160}
          />
        </label>
        <label>
          {copy.category.label}
          <select name="category" defaultValue={defaultCategoryValue}>
            {categories.map(({ id, value }) => (
              <option key={id} value={value}>
                {copy.category.options[id]}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label>
        {copy.process.label}
        <textarea
          name="process"
          required
          rows={4}
          maxLength={1200}
          placeholder={copy.process.placeholder}
        />
      </label>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: -9999,
          width: 1,
          height: 1,
          overflow: "hidden",
        }}
      >
        <label>
          {copy.honeypotLabel}
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <Button
        type="submit"
        data-action="send"
        disabled={status === "sending"}
        className="button-primary form-submit"
      >
        {status === "sending" ? copy.sending : copy.submit}{" "}
        <ArrowUpRight size={17} />
      </Button>
      <a
        href="/downloads/processspark-overview.pdf"
        download="ProcessSpark-overview.pdf"
        className="download-brief"
      >
        <Download size={14} /> {copy.pdf}
      </a>
      <p className="form-note">{copy.note}</p>
      <p className="form-status" role="status" aria-live="polite">
        {status === "sending" && copy.statusSending}
        {status === "sent" && (
          <>
            <Check size={16} /> {copy.statusSent}
          </>
        )}
        {status === "error" && (
          <span>
            {copy.statusError.before}{" "}
            <a href={`mailto:${email}`}>{email}</a>
            {copy.statusError.after}
          </span>
        )}
      </p>
    </form>
  );
}
