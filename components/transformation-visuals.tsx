import Image from "next/image";
import {
  ArrowRight,
  Check,
  FileText,
  Files,
  LockKeyhole,
  ScanLine,
  Server,
  ShieldCheck,
  User,
} from "lucide-react";
import type { Dictionary } from "@/lib/i18n";

const extractRows = [
  "supplier",
  "partNumber",
  "description",
  "batchNumber",
  "material",
  "dateOfManufacture",
  "testResult",
] as const;

export function VisionHero({
  copy,
}: {
  copy: Dictionary["transformation"]["hero"];
}) {
  return (
    <figure className="vision-hero">
      <div className="vision-photo">
        {/* Backdrop photo — replace src with the clean (overlay-free) hero
            scene. The UI below is recreated in HTML so no text is baked in. */}
        <Image
          src="/images/hero.webp"
          alt={copy.photoAlt}
          fill
          sizes="(max-width: 850px) 100vw, 50vw"
          priority
        />
        <span className="photo-badge">
          <ScanLine size={16} /> {copy.badge}
        </span>
        <div className="vision-extract">
          <div className="vision-extract-head">
            <span className="vision-extract-ic">
              <FileText size={14} />
            </span>
            <span>{copy.extractHeading}</span>
          </div>
          <dl className="vision-extract-rows">
            {extractRows.map((key) => (
              <div className="vision-extract-row" key={key}>
                <dt>{copy.extractRows[key].label}</dt>
                <dd>
                  <span>{copy.extractRows[key].value}</span>
                  <span className="vcheck">
                    <Check size={11} />
                  </span>
                </dd>
              </div>
            ))}
          </dl>
          <div className="vision-extract-foot">
            <span className="vcheck">
              <Check size={11} />
            </span>
            {copy.extractFooter}
          </div>
        </div>
      </div>
      <figcaption className="vision-caption">
        <div className="vision-steps">
          <span className="vision-step">
            <span className="vision-step-ic">
              <FileText size={16} />
            </span>
            {copy.steps.received}
          </span>
          <ArrowRight size={16} className="vision-step-arrow" />
          <span className="vision-step">
            <span className="vision-step-ic">
              <ScanLine size={16} />
            </span>
            {copy.steps.extracted}
          </span>
          <ArrowRight size={16} className="vision-step-arrow" />
          <span className="vision-step">
            <span className="vision-step-ic">
              <User size={16} />
            </span>
            {copy.steps.review}
          </span>
        </div>
      </figcaption>
    </figure>
  );
}

export function TransformationVisuals({
  copy,
}: {
  copy: Dictionary["transformation"];
}) {
  return (
    <section
      className="transformation-section"
      aria-labelledby="transformation-title"
    >
      <div className="section shell">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 id="transformation-title">
            {copy.title.line1}
            <br />
            {copy.title.line2}
          </h2>
        </div>
        <p>
          {copy.lead.line1}
          <br />
          {copy.lead.line2}
          <br />
          {copy.lead.line3}
        </p>
      </div>
      <article className="document-story">
        <figure className="document-photo">
          <Image
            src="/images/copy-by-hand.webp"
            alt={copy.story.photoAlt}
            fill
            sizes="(max-width: 850px) 100vw, 50vw"
          />
          <span className="photo-badge">
            <Files size={16} /> {copy.story.badge}
          </span>
        </figure>
        <div className="document-copy">
          <p className="eyebrow">{copy.story.eyebrow}</p>
          <h3>
            {copy.story.title.line1}
            <br />
            <span>{copy.story.title.accent}</span>
          </h3>
          <p>{copy.story.text}</p>
          <div className="document-change">
            <div>
              <span className="change-label">{copy.story.todayLabel}</span>
              <p>{copy.story.todayText}</p>
            </div>
            <div>
              <span className="change-label">{copy.story.withAiLabel}</span>
              <p>{copy.story.withAiText}</p>
            </div>
          </div>
          <a href="https://demo.processspark.com/" className="text-link">
            {copy.story.link} <ArrowRight size={18} />
          </a>
        </div>
      </article>
      <aside className="trust-panel" aria-labelledby="trust-title">
        <div className="trust-intro">
          <h3 id="trust-title">
            {copy.trust.title.line1}{" "}
            <span>{copy.trust.title.accent}</span>
          </h3>
          <p>{copy.trust.text}</p>
        </div>
        <ul className="trust-points">
          <li>
            <LockKeyhole size={24} aria-hidden="true" />
            <span>{copy.trust.points.access}</span>
          </li>
          <li>
            <Server size={24} aria-hidden="true" />
            <span>{copy.trust.points.hosting}</span>
          </li>
          <li>
            <ShieldCheck size={24} aria-hidden="true" />
            <span>{copy.trust.points.training}</span>
          </li>
        </ul>
      </aside>
      </div>
    </section>
  );
}
