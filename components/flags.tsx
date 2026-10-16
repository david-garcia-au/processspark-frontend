/**
 * Decorative round flags (28x28). The country name is always rendered next to
 * them, so they are hidden from assistive technology.
 */
const size = 28;

function star(cx: number, cy: number, outer: number, points: number) {
  const inner = outer * (points === 5 ? 0.4 : 0.5);
  const coords: string[] = [];
  for (let i = 0; i < points * 2; i += 1) {
    const radius = i % 2 === 0 ? outer : inner;
    const angle = (Math.PI * i) / points - Math.PI / 2;
    coords.push(
      `${(cx + radius * Math.cos(angle)).toFixed(2)},${(cy + radius * Math.sin(angle)).toFixed(2)}`,
    );
  }
  return coords.join(" ");
}

function Round({ children }: { children: React.ReactNode }) {
  return (
    <span className="phone-flag" aria-hidden="true">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        focusable="false"
        aria-hidden="true"
      >
        {children}
        <circle
          cx="14"
          cy="14"
          r="13.5"
          fill="none"
          stroke="#000"
          strokeOpacity="0.18"
        />
      </svg>
    </span>
  );
}

export function FlagAU() {
  return (
    <Round>
      <rect width="28" height="28" fill="#012169" />
      {/* Simplified Union Jack in the top-left canton */}
      <g>
        <rect width="15" height="15" fill="#012169" />
        <path d="M0 0L15 15M15 0L0 15" stroke="#fff" strokeWidth="3" />
        <path d="M0 0L15 15M15 0L0 15" stroke="#c8102e" strokeWidth="1" />
        <path d="M7.5 0V15M0 7.5H15" stroke="#fff" strokeWidth="5" />
        <path d="M7.5 0V15M0 7.5H15" stroke="#c8102e" strokeWidth="3" />
      </g>
      {/* Commonwealth star */}
      <polygon points={star(7.5, 22, 4.2, 7)} fill="#fff" />
      {/* Southern Cross */}
      <polygon points={star(21.5, 5.5, 2, 5)} fill="#fff" />
      <polygon points={star(17.5, 12, 2, 5)} fill="#fff" />
      <polygon points={star(24.5, 12.5, 2, 5)} fill="#fff" />
      <polygon points={star(21.5, 21, 2, 5)} fill="#fff" />
      <polygon points={star(22.2, 14.8, 1.2, 5)} fill="#fff" />
    </Round>
  );
}

export function FlagES() {
  return (
    <Round>
      <rect width="28" height="28" fill="#c60b1e" />
      <rect y="7" width="28" height="14" fill="#ffc400" />
    </Round>
  );
}

const flags: Record<string, () => React.JSX.Element> = {
  AU: FlagAU,
  ES: FlagES,
};

export function Flag({ region }: { region: string }) {
  const Component = flags[region];
  return Component ? <Component /> : null;
}
