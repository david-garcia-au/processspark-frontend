import {
  WORLD_COLS,
  WORLD_LAT_TOP,
  WORLD_LON_LEFT,
  WORLD_ROWS,
  WORLD_STEP,
  worldRows,
} from "@/lib/world-dots";

/** Grid cell size in SVG units. Only the ratio to the dot size matters. */
const CELL = 10;
const DOT = 6.4;

type Place = { id: string; label: string; lat: number; lon: number };

/** Build one path: a zero-length round-capped segment per land cell is a dot. */
const dotsPath = worldRows
  .flatMap((row, r) =>
    [...row].flatMap((cell, c) =>
      cell === "1"
        ? [`M${(c + 0.5) * CELL} ${(r + 0.5) * CELL}h0`]
        : [],
    ),
  )
  .join("");

const width = WORLD_COLS * CELL;
const height = WORLD_ROWS * CELL;

function position(place: Place) {
  const x = ((place.lon - WORLD_LON_LEFT) / WORLD_STEP + 0.5) * CELL;
  const y = ((WORLD_LAT_TOP - place.lat) / WORLD_STEP + 0.5) * CELL;
  return { left: `${(x / width) * 100}%`, top: `${(y / height) * 100}%` };
}

/**
 * Dot-matrix world map with labelled pins. Static server markup: one SVG path
 * for all the dots plus a few absolutely positioned pins. `label` is the
 * accessible description of the whole figure.
 */
export function WorldMap({
  label,
  places,
}: {
  label: string;
  places: readonly Place[];
}) {
  return (
    <figure className="world-map">
      <div className="world-map-canvas" style={{ aspectRatio: `${width} / ${height}` }}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={label}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient
              id="world-map-fade"
              gradientUnits="userSpaceOnUse"
              x1="0"
              y1="0"
              x2="0"
              y2={height}
            >
              <stop offset="0" style={{ stopColor: "var(--orange)" }} />
              <stop offset="0.55" style={{ stopColor: "var(--orange-wash)" }} />
              <stop offset="1" style={{ stopColor: "var(--on-dark-muted)" }} />
            </linearGradient>
          </defs>
          <path
            d={dotsPath}
            fill="none"
            stroke="url(#world-map-fade)"
            strokeWidth={DOT}
            strokeLinecap="round"
            opacity="0.85"
          />
        </svg>
        {places.map((place) => (
          <span
            key={place.id}
            className="world-pin"
            style={position(place)}
          >
            <span className="world-pin-label">{place.label}</span>
            <span className="world-pin-stem" aria-hidden="true" />
            <span className="world-pin-dot" aria-hidden="true" />
          </span>
        ))}
      </div>
    </figure>
  );
}
