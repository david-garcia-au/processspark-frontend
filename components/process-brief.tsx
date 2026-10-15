"use client";
import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
type Status = "idle" | "sending" | "sent" | "error" | "download";

export function ProcessBrief() {
  const [status, setStatus] = useState<Status>("idle");
  async function submitBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const submitter = (event.nativeEvent as SubmitEvent).submitter;
    const action = submitter?.getAttribute("data-action") ?? "send";
    const data = new FormData(form);
    const brief = `PROCESSSPARK — PROCESS BRIEF\n\nName: ${data.get("name")}\nBusiness email: ${data.get("email")}\nBusiness: ${data.get("company")}\nProcess: ${data.get("category")}\n\nWhat happens today:\n${data.get("process")}\n`;
    if (action === "send") {
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
          }),
        });
        if (!response.ok) throw new Error(String(response.status));
        form.reset();
        setStatus("sent");
      } catch {
        setStatus("error");
      }
      return;
    }
    const url = URL.createObjectURL(
      new Blob(
        [
          `${brief}\nPrepared locally. This brief has not been sent to ProcessSpark.\n`,
        ],
        { type: "text/plain;charset=utf-8" },
      ),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "processspark-process-brief.txt";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus("download");
  }
  return (
    <form
      className="brief-form"
      onSubmit={submitBrief}
      onChange={() => setStatus((x) => (x === "sending" ? x : "idle"))}
    >
      <div className="form-heading">
        <span className="eyebrow">LET’S START WITH YOUR CHALLENGE</span>
        <ArrowUpRight size={23} />
      </div>
      <div className="form-row">
        <label>
          Your name
          <input
            name="name"
            autoComplete="name"
            required
            placeholder="Alex Taylor"
            maxLength={120}
          />
        </label>
        <label>
          Work email
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="alex@company.com"
            maxLength={254}
          />
        </label>
      </div>
      <div className="form-row">
        <label>
          Company
          <input
            name="company"
            autoComplete="organization"
            required
            placeholder="Your business"
            maxLength={160}
          />
        </label>
        <label>
          What would you like to improve?
          <select name="category" defaultValue="Other / Not sure yet">
            {[
              "Document processing and data entry",
              "Reporting and spreadsheets",
              "Customer emails and requests",
              "Finding information in documents",
              "Quotations and proposals",
              "Quality records and compliance",
              "Service and maintenance reporting",
              "Other / Not sure yet",
            ].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
      </div>
      <label>
        Tell us what’s taking too much time or causing problems.
        <textarea
          name="process"
          required
          rows={4}
          maxLength={1200}
          placeholder="For example, we receive dozens of supplier documents every day and manually enter the details into our system."
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
          Leave this field empty
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <Button
        type="submit"
        data-action="send"
        disabled={status === "sending"}
        className="button-primary form-submit"
      >
        {status === "sending" ? "Sending..." : "Let’s discuss your challenge"}{" "}
        <ArrowUpRight size={17} />
      </Button>
      <button type="submit" data-action="download" className="download-brief">
        <Download size={14} /> Download a brief instead
      </button>
      <p className="form-note">
        Your brief is emailed to the ProcessSpark team, who will reply to the
        address you give. You can also download the brief instead.
      </p>
      <p className="form-status" role="status" aria-live="polite">
        {status === "sending" && "Sending your brief..."}
        {status === "sent" && (
          <>
            <Check size={16} /> Thanks. We have received your brief and sent a
            confirmation to your email.
          </>
        )}
        {status === "error" && (
          <span>
            We could not send your brief right now. Please try again, or email
            it to{" "}
            <a href="mailto:Info@ProcessSpark.com">Info@ProcessSpark.com</a>.
          </span>
        )}
        {status === "download" && (
          <>
            <Check size={16} /> Your brief is ready. Nothing has been sent.
          </>
        )}
      </p>
    </form>
  );
}
