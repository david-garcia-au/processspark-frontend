import Image from "next/image";
import {
  ArrowRight,
  Check,
  Files,
  ScanLine,
  Timer,
  TrendingUp,
} from "lucide-react";

export function VisionHero() {
  return (
    <figure className="vision-hero">
      <div className="vision-photo">
        <Image
          src="/images/bottle-inspection.webp"
          alt="Illustrative bottling line with a vision camera above bottles moving along a conveyor"
          fill
          sizes="(max-width: 850px) 100vw, 50vw"
          preload
        />
        <span className="photo-badge">
          <ScanLine size={16} /> COMPUTER VISION AT WORK
        </span>
        {/* Share the photograph's coordinates and crop to keep one bottle framed. */}
        <svg
          className="vision-target"
          viewBox="0 0 1672 941"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <rect
            x="945"
            y="383"
            width="103"
            height="200"
            rx="5"
            fill="none"
            stroke="#d4f2ab"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
          <rect x="945" y="343" width="249" height="33" rx="3" fill="#dbeec3" />
          <text
            x="958"
            y="365"
            fill="#263a21"
            fontSize="20"
            fontFamily="Arial, sans-serif"
          >
            Detect · Count · Check
          </text>
        </svg>
        <div className="vision-photo-caption">
          <p>FROM WATCHING THE LINE</p>
          <h2>
            To knowing what’s
            <br />
            moving through it.
          </h2>
        </div>
      </div>
      <figcaption className="vision-caption">
        <div className="vision-steps">
          <span>Camera captures</span>
          <ArrowRight size={16} />
          <span>AI checks & counts</span>
          <ArrowRight size={16} />
          <span>People review</span>
        </div>
        <p>
          <Check size={17} /> More visibility. Less repetitive checking.
        </p>
        <span className="image-disclosure">
          Illustrative AI-generated scene · Workflow example
        </span>
      </figcaption>
    </figure>
  );
}

export function TransformationVisuals() {
  return (
    <section
      className="transformation-section section shell"
      aria-labelledby="transformation-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">
            THIS IS WHAT BUSINESS TRANSFORMATION LOOKS LIKE
          </p>
          <h2 id="transformation-title">
            Familiar work.
            <br />A very different way to do it.
          </h2>
        </div>
        <p>
          AI that sees, reads and understands.
          <br />
          Machine learning that finds patterns.
          <br />
          Connected to the work you do every day.
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
            <Files size={16} /> DOCUMENT INTELLIGENCE
          </span>
          <figcaption>Illustrative AI-generated scene</figcaption>
        </figure>
        <div className="document-copy">
          <p className="eyebrow">PAPERWORK IN. USEFUL INFORMATION OUT.</p>
          <h3>
            That pile of forms?
            <br />
            <span>It could process itself.</span>
          </h3>
          <p>
            Supplier certificates, delivery notes, inspection records. AI reads
            the information, checks what’s missing and prepares it for your
            business systems.
          </p>
          <div className="document-change">
            <div>
              <span className="change-label">TODAY</span>
              <p>
                Read every page. Copy every field. Chase every missing detail.
              </p>
            </div>
            <div>
              <span className="change-label">WITH AI</span>
              <p>
                Scan or upload. Extract and validate. Your team reviews the
                exceptions.
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
            <strong>Give time back</strong>
            <span>Move people from repetitive tasks to valuable work.</span>
          </p>
        </div>
        <div>
          <TrendingUp size={24} />
          <p>
            <strong>Create room to grow</strong>
            <span>Handle more work with the team you already have.</span>
          </p>
        </div>
        <div>
          <ScanLine size={24} />
          <p>
            <strong>See what needs attention</strong>
            <span>Turn images, documents and data into earlier action.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
