import Image from "next/image";
import {
  ArrowRight,
  Check,
  Files,
  ImageIcon,
  ScanLine,
  Timer,
  TrendingUp,
} from "lucide-react";

export function VisionHero() {
  return (
    <figure className="vision-hero">
      <div className="vision-photo">
        {/* Placeholder — awaiting a real document-processing asset. Fills the
            existing container exactly, as the previous photo did. */}
        <div
          className="media-placeholder"
          style={{ position: "absolute", inset: 0, borderRadius: 0 }}
          aria-hidden="true"
        >
          <span className="media-icon">
            <ImageIcon size={22} />
          </span>
          <span className="media-label">
            Supplier certificate or delivery note entering a digital workflow —
            fields extracted, checked and ready for review
          </span>
          <span className="media-meta">IMAGE · PLACEHOLDER</span>
        </div>
        <span className="photo-badge">
          <ScanLine size={16} /> LESS PAPERWORK. MORE PRODUCTIVITY.
        </span>
        <div className="vision-photo-caption">
          <p>FROM MANUAL DATA ENTRY</p>
          <h2>
            To information ready
            <br />
            when you need it.
          </h2>
        </div>
      </div>
      <figcaption className="vision-caption">
        <div className="vision-steps">
          <span>Documents received</span>
          <ArrowRight size={16} />
          <span>Information extracted</span>
          <ArrowRight size={16} />
          <span>People review</span>
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
