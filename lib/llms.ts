import { capabilities } from "@/lib/capabilities";
import { teams } from "@/lib/teams";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";
import { absoluteUrl, readyPhones, site } from "@/lib/site";
import { solutionsCopy } from "@/lib/solutions-copy";

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
    `## ${dict.solutionsPage.eyebrow}`,
    "",
    ...teams[locale].flatMap((team) => [
      `### [${team.label}](${absoluteUrl(localePath(locale, `/solutions/${team.id}`))})`,
      team.problem,
      ...team.cases.map((item) => `- **${item.title}**: ${item.text}`),
      "",
    ]),
    `## ${solutionsCopy[locale].capabilitiesHeading}`,
    "",
    ...capabilities[locale].flatMap((item) => [
      `### [${item.title}](${absoluteUrl(`${localePath(locale, "/solutions")}#${item.id}`)})`,
      `${item.headline} ${item.text}`,
      ...item.points.map((point) => `- ${point}`),
      "",
    ]),
    `## ${seo.llms.links}`,
    "",
    `- [${seo.llms.home}](${absoluteUrl(localePath(locale))}): ${seo.llms.homeDescription}`,
    `- [${dict.header.solutions}](${absoluteUrl(localePath(locale, "/solutions"))}): ${dict.solutionsPage.description}`,
    `- [${dict.aboutPage.title}](${absoluteUrl(localePath(locale, "/about"))}): ${dict.footer.lead}`,
    `- [${seo.llms.contactLink}](${absoluteUrl(`${localePath(locale)}#contact`)}): ${seo.llms.contactDescription}`,
    `- [${seo.llms.sitemap}](${absoluteUrl("/sitemap.xml")})`,
    "",
    `## ${seo.llms.contact}`,
    "",
    `- ${seo.llms.email}: ${site.email}`,
    ...readyPhones().map(
      (phone) =>
        `- ${seo.llms.phone} (${phone.label[locale]}): ${phone.display}`,
    ),
    "",
  ];
  return lines.join("\n");
}
