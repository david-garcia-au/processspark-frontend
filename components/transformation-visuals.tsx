import Image from "next/image";
import {
  ArrowRight,
  Check,
  FileText,
  Files,
  ScanLine,
  Timer,
  TrendingUp,
  User,
} from "lucide-react";

export function VisionHero() {
  return (
    <figure className="vision-hero">
      <div className="vision-photo">
        {/* Backdrop photo — replace src with the clean (overlay-free) hero
            scene. The UI below is recreated in HTML so no text is baked in. */}
        <Image
          src="/images/hero.png"
          alt="A worker reviewing information captured from a stack of supplier certificates on screen in a factory"
          fill
          sizes="(max-width: 850px) 100vw, 50vw"
          priority
        />
        <span className="photo-badge">
          <ScanLine size={16} /> LESS PAPERWORK. MORE PRODUCTIVITY.
        </span>
        <div className="vision-extract">
        <div className="vision-extract-head">
          <FileText size={16} />
          <span>Information extracted</span>
          <span className="vision-extract-tag">
            <Check size={12} /> All key information captured
          </span>
        </div>
        <dl className="vision-extract-rows">
          <div className="vision-extract-row">
            <dt>Supplier</dt>
            <dd>
              ABC Components Ltd <Check size={12} />
            </dd>
          </div>
          <div className="vision-extract-row">
            <dt>Part number</dt>
            <dd>
              AC-3487 <Check size={12} />
            </dd>
          </div>
          <div className="vision-extract-row">
            <dt>Material</dt>
            <dd>
              SS316 <Check size={12} />
            </dd>
          </div>
          <div className="vision-extract-row">
            <dt>Batch number</dt>
            <dd>
              B-2407-15 <Check size={12} />
            </dd>
          </div>
          <div className="vision-extract-row">
            <dt>Date of manufacture</dt>
            <dd>
              12 JUL 2024 <Check size={12} />
            </dd>
          </div>
          <div className="vision-extract-row">
            <dt>Test result</dt>
            <dd>
              PASS <Check size={12} />
            </dd>
          </div>
        </dl>
        </div>
      </div>
      <figcaption className="vision-caption">
        <div className="vision-steps">
          <span className="vision-step">
            <span className="vision-step-ic">
              <FileText size={16} />
            </span>
            Documents received
          </span>
          <ArrowRight size={16} className="vision-step-arrow" />
          <span className="vision-step">
            <span className="vision-step-ic">
              <ScanLine size={16} />
            </span>
            Information extracted
          </span>
          <ArrowRight size={16} className="vision-step-arrow" />
          <span className="vision-step">
            <span className="vision-step-ic">
              <User size={16} />
            </span>
            People review
          </span>
        </div>
        <p>
          <Check size={17} /> Less copying. Fewer errors. Faster processing.
        </p>
      </figcaption>
    </figure>
  );
}

export function TransformationVisuals() {
  return (
    <section
      className="transformation-section"
      aria-labelledby="transformation-title"
    >
      <div className="section shell">
      <div className="section-heading">
        <div>
          <p className="eyebrow">
            SMALL CHANGES. MEASURABLE IMPROVEMENTS.
          </p>
          <h2 id="transformation-title">
            Same work.
            <br />Less effort to get it done.
          </h2>
        </div>
        <p>
          Documents processed without endless copying.
          <br />
          Reports prepared without hours in spreadsheets.
          <br />
          Information available when your team needs it.
        </p>
      </div>
      <article className="document-story">
        <figure className="document-photo">
          <Image
            src="/images/document-processing.webp"
            alt="Illustrative quality-control employee scanning paper inspection forms beside a laptop and a stack of records"
            fill
            sizes="(max-width: 850px) 100vw, 50vw"
          />
          <span className="photo-badge">
            <Files size={16} /> DOCUMENT PROCESSING
          </span>
        </figure>
        <div className="document-copy">
          <p className="eyebrow">PAPERWORK IN. USEFUL INFORMATION OUT.</p>
          <h3>
            Still copying information
            <br />
            <span>from documents by hand?</span>
          </h3>
          <p>
            Supplier certificates, delivery notes, inspection records and
            purchase orders. Stop copying information between documents and
            systems. Capture the details, identify missing information and let
            your team focus on exceptions.
          </p>
          <div className="document-change">
            <div>
              <span className="change-label">TODAY</span>
              <p>
                Open every document. Copy the details. Check for mistakes. Enter
                the same information again.
              </p>
            </div>
            <div>
              <span className="change-label">WITH AI</span>
              <p>
                Upload the document. Capture and check the information. Review
                only what needs attention.
              </p>
            </div>
          </div>
          <a href="#capabilities" className="text-link">
            See how your process could change <ArrowRight size={18} />
          </a>
        </div>
      </article>
      <div className="transformation-outcomes">
        <div>
          <Timer size={24} />
          <p>
            <strong>Give your team time back</strong>
            <span>
              Reduce the repetitive administration that keeps people from more
              valuable work.
            </span>
          </p>
        </div>
        <div>
          <TrendingUp size={24} />
          <p>
            <strong>Handle more work without adding complexity</strong>
            <span>
              Reduce bottlenecks and make better use of the people and systems
              you already have.
            </span>
          </p>
        </div>
        <div>
          <ScanLine size={24} />
          <p>
            <strong>Spot problems before they become delays</strong>
            <span>
              Identify missing information, inconsistencies and issues that need
              someone’s attention.
            </span>
          </p>
        </div>
      </div>
      </div>
    </section>
  );
}
