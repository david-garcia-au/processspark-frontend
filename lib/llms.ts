import { capabilities, useCases } from "@/lib/content";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";
import { absoluteUrl, site } from "@/lib/site";

/**
 * Plain-text summary for AI assistants and answer engines (llms.txt
 * convention). Generated from the same content the page renders.
 */
export function buildLlmsTxt(locale: Locale): string {
  const dict = getDictionary(locale);
  const { seo } = dict;
  const lines = [
    `# ${site.name}`,
    "",
    `> ${seo.description}`,
    "",
    seo.llms.intro,
    "",
    `## ${seo.llms.whoFor}`,
    "",
    ...seo.sectors.map((sector) => `- ${sector}`),
    "",
    `## ${seo.llms.kinds}`,
    "",
    ...capabilities.map((item) => {
      const text = dict.capabilities.items[item.id];
      return `- **${text.name}**: ${text.question} ${text.detail} ${text.outcome}`;
    }),
    "",
    `## ${seo.llms.useCases}`,
    "",
    ...useCases.map((item) => {
      const text = dict.useCases.items[item.id];
      return `- **${text.title}** (${text.sector}): ${text.text}`;
    }),
    "",
    `## ${seo.llms.links}`,
    "",
    `- [${seo.llms.home}](${absoluteUrl(localePath(locale))}): ${seo.llms.homeDescription}`,
    `- [${dict.aboutPage.title}](${absoluteUrl(localePath(locale, "/about"))}): ${dict.footer.lead}`,
    `- [${seo.llms.contactLink}](${absoluteUrl(`${localePath(locale)}#contact`)}): ${seo.llms.contactDescription}`,
    `- [${seo.llms.sitemap}](${absoluteUrl("/sitemap.xml")})`,
    "",
    `## ${seo.llms.contact}`,
    "",
    `- ${seo.llms.email}: ${site.email}`,
    "",
  ];
  return lines.join("\n");
}
