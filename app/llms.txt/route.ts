import { capabilities, useCases } from "@/lib/content";
import { absoluteUrl, site } from "@/lib/site";

export const dynamic = "force-static";

/**
 * Plain-text summary for AI assistants and answer engines (llms.txt
 * convention). Generated from the same content the page renders.
 */
export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `${site.name} helps manufacturing, logistics and industrial services businesses turn digital transformation into practical improvements: reducing manual work, connecting systems and streamlining everyday operations. We use computer vision, machine learning, AI and conventional software, and we are technology and hyperscaler agnostic. If AI isn’t the right tool, we say so.`,
    "",
    "## Who it is for",
    "",
    ...site.sectors.map((sector) => `- ${sector}`),
    "",
    "## Kinds of manual work we help with",
    "",
    ...capabilities.map(
      (item) =>
        `- **${item.name}**: ${item.question} ${item.detail} ${item.outcome}`,
    ),
    "",
    "## Practical use cases",
    "",
    ...useCases.map(
      (item) => `- **${item.title}** (${item.sector}): ${item.text}`,
    ),
    "",
    "## Links",
    "",
    `- [Home](${absoluteUrl("/")}): Overview, use cases and how we work`,
    `- [Show us your process](${absoluteUrl("/#contact")}): Start with one process`,
    `- [Sitemap](${absoluteUrl("/sitemap.xml")})`,
    "",
    "## Contact",
    "",
    `- Email: ${site.email}`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
