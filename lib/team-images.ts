/** Photo for each team, shared by the home scene and the Solutions page. */
export const teamImages: Record<string, string> = {
  operations: "warehouse-manager.webp",
  engineering: "boiler-room.webp",
  sales: "email-manager-wide.webp",
  finance: "document-processing.webp",
  people: "workflow.webp",
  leadership: "dashboard.webp",
};

export function teamImageSrc(id: string): string {
  return `/images/${teamImages[id]}`;
}
