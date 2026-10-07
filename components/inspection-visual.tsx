import { ArrowRight, Check, ScanLine } from "lucide-react";
export function InspectionVisual() {
  return (
    <div
      className="inspection-visual"
      aria-label="Illustration of AI assisted product inspection, with an exception flagged for human review"
    >
      <div className="visual-top">
        <span>
          <span className="live-dot" /> PROCESS IN FOCUS
        </span>
        <span>01 / VISUAL INSPECTION</span>
      </div>
      <div className="inspection-scene">
        <div className="scene-grid" />
        <span className="scene-label">FROM REPETITIVE CHECKS</span>
        <svg
          className="assembly"
          viewBox="0 0 520 330"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="metal"
              x1="100"
              y1="40"
              x2="350"
              y2="250"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#d5ddd9" />
              <stop offset=".32" stopColor="#758680" />
              <stop offset=".5" stopColor="#c4ceca" />
              <stop offset="1" stopColor="#455952" />
            </linearGradient>
            <linearGradient id="side" x1="50" y1="100" x2="460" y2="300">
              <stop stopColor="#61746b" />
              <stop offset="1" stopColor="#182d24" />
            </linearGradient>
          </defs>
          <path
            d="M35 230 255 120 493 228 270 342Z"
            fill="#11231b"
            stroke="#385344"
          />
          <path d="m35 230 235 109 223-111v18L270 356 35 247Z" fill="#0a1912" />
          <g transform="translate(148 55)">
            <path
              d="M0 110 111 55 223 110v50L111 216 0 162Z"
              fill="url(#side)"
              stroke="#8b9a91"
            />
            <path
              d="m0 110 111-55 112 55-112 57Z"
              fill="url(#metal)"
              stroke="#b6c2b9"
            />
            <ellipse
              cx="111"
              cy="102"
              rx="75"
              ry="40"
              fill="#52695b"
              stroke="#c4cec7"
              strokeWidth="2"
            />
            <path
              d="M36 103V67c0-22 34-40 75-40s75 18 75 40v36"
              fill="url(#metal)"
              stroke="#a0afa5"
            />
            <ellipse
              cx="111"
              cy="67"
              rx="75"
              ry="40"
              fill="url(#metal)"
              stroke="#d5ded8"
              strokeWidth="2"
            />
            <ellipse
              cx="111"
              cy="67"
              rx="42"
              ry="22"
              fill="#152c20"
              stroke="#5b7464"
              strokeWidth="7"
            />
            <ellipse cx="111" cy="71" rx="34" ry="16" fill="#091b11" />
            {[
              [56, 52],
              [112, 36],
              [166, 53],
              [164, 83],
              [111, 98],
              [59, 83],
            ].map(([cx, cy]) => (
              <ellipse
                key={`${cx}-${cy}`}
                cx={cx}
                cy={cy}
                rx="6"
                ry="3.5"
                fill="#223c2d"
                stroke="#899f90"
              />
            ))}
            <path d="m174 114 8 6-3 8" stroke="#f48b59" strokeWidth="3" />
          </g>
          <path
            d="M137 65v-18h32M350 47h32v18M137 260v18h32M350 278h32v-18"
            stroke="#badbbd"
            strokeWidth="2"
          />
          <path d="M137 179h245" stroke="#c2e5b7" strokeOpacity=".55" />
          <rect
            x="310"
            y="161"
            width="42"
            height="39"
            rx="3"
            stroke="#ff9564"
            strokeWidth="2"
          />
          <path d="m352 180 43-22h43" stroke="#ff9564" />
          <circle cx="438" cy="158" r="3" fill="#ff9564" />
        </svg>
        <div className="review-label">
          <span /> Surface anomaly <span className="review-small">REVIEW</span>
        </div>
        <span className="scene-caption">
          <ScanLine size={14} /> Defined checks. Traceable results.
        </span>
      </div>
      <div className="visual-result">
        <span className="result-icon">
          <Check size={19} />
        </span>
        <div>
          <strong>Let routine results move forward.</strong>
          <p>Bring exceptions to your people.</p>
        </div>
        <ArrowRight size={20} />
      </div>
      <div className="visual-bottom">
        <span>ILLUSTRATIVE WORKFLOW</span>
        <span>HUMAN JUDGEMENT, BUILT IN</span>
      </div>
    </div>
  );
}
