/**
 * Brand palette for TypeScript consumers that cannot read CSS variables
 * (generated images, manifest, viewport). Keep in sync with the tokens in
 * app/home.css (the navy system), which override app/globals.css.
 */
export const palette = {
  paper: "#ffffff",
  ink: "#0d1b33",
  muted: "#4d5b72",
  faint: "#5f6c84",
  forest: "#0d1b33",
  forestDeep: "#081226",
  onDark: "#f7f9fd",
  onDarkSoft: "#d6def0",
  lime: "#8aa4ff",
  orange: "#ed643b",
} as const;
