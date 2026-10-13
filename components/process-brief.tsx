"use client";
import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
export function ProcessBrief() {
  const [ready, setReady] = useState(false);
  const [action, setAction] = useState<"email" | "download">("email");
  function downloadBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const brief = `PROCESSSPARK — PROCESS BRIEF\n\nName: ${data.get("name")}\nBusiness email: ${data.get("email")}\nBusiness: ${data.get("company")}\nProcess: ${data.get("category")}\n\nWhat happens today:\n${data.get("process")}\n\nPrepared locally. This brief has not been sent to ProcessSpark.\n`;
    if (action === "email") {
      window.location.href = `mailto:Info@ProcessSpark.com?subject=${encodeURIComponent("ProcessSpark — Show us your process")}&body=${encodeURIComponent(brief.replace("Prepared locally. This brief has not been sent to ProcessSpark.", ""))}`;
      setReady(true);
      return;
    }
    const url = URL.createObjectURL(
      new Blob([brief], { type: "text/plain;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "processspark-process-brief.txt";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setReady(true);
  }
  return (
    <form
      className="brief-form"
      onSubmit={downloadBrief}
      onChange={() => setReady(false)}
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
      <Button
        type="submit"
        className="button-primary form-submit"
        onClick={() => setAction("email")}
      >
        Let&rsquo;s discuss your challenge <ArrowUpRight size={17} />
      </Button>
      <button
        type="submit"
        className="download-brief"
        onClick={() => setAction("download")}
      >
        <Download size={14} /> Download a brief instead
      </button>
      <p className="form-note">
        Opens an email draft to Info@ProcessSpark.com in your mail app. Review
        and send it there. This website does not store or submit your details.
      </p>
      <p className="form-status" role="status">
        {ready && (
          <>
            <Check size={16} />{" "}
            {action === "email"
              ? "Email draft requested. Please send it from your mail app, or download your brief if it did not open."
              : "Your brief is ready. Nothing has been sent."}
          </>
        )}
      </p>
    </form>
  );
}
