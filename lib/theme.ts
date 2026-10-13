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
} as const;
