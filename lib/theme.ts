/**
 * Brand palette for TypeScript consumers that cannot read CSS variables
 * (generated images, manifest, viewport). Keep in sync with the tokens in
 * the :root block of app/globals.css, which is the source of truth for the UI.
 */
export const palette = {
  paper: "#fafaf7",
  ink: "#202923",
  muted: "#555e55",
  faint: "#6e7566",
  forest: "#20352a",
  forestDeep: "#16251d",
  onDark: "#fafbf5",
  onDarkSoft: "#d5dfcc",
  lime: "#c3d9ae",
  orange: "#ed643b",
  // Accent families (palette v2) — kept in sync with the :root block.
  teal: "#0f766e",
  tealInk: "#0b5952",
  tealWash: "#d7ebe8",
  tealLine: "#a9d5cf",
  tealDeep: "#0c3b37",
  amberInk: "#8a5a0f",
  amberWash: "#fbeccb",
  amberLine: "#ecd49a",
  berry: "#a63457",
  berryInk: "#822741",
  berryWash: "#f6dde7",
  berryLine: "#e7bccc",
} as const;
