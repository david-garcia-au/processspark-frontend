import {
  industries,
  mainProblem,
  problem,
  problemIds,
  problemsForProduct,
  productsByGroup,
  industriesForProduct,
} from "@/lib/catalogue";
import { demoGalleryCopy } from "@/lib/demo-gallery";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";
import { absoluteUrl, readyPhones, site } from "@/lib/site";

/**
 * Plain-text summary for AI assistants and answer engines (llms.txt
 * convention). Generated from the same catalogue the pages render, so every
 * URL in it is also in the sitemap.
 */
export function buildLlmsTxt(locale: Locale): string {
  const dict = getDictionary(locale);
  const { seo } = dict;
  const url = (path: string) => absoluteUrl(localePath(locale, path));
  const lines = [
    `# ${site.name}`,
    "",
    `> ${seo.description}`,
    "",
    seo.llms.intro,
    "",
    `## ${seo.llms.whoFor}`,
    "",
    ...industries(locale).map(
      (i) => `- [${i.copy.name}](${i.href ? absoluteUrl(i.href) : ""}): ${i.copy.whoFor}`,
    ),
    "",
    `## ${seo.llms.problems}`,
    "",
    ...problemIds.map((id) => {
      const item = problem(locale, id);
      const main = productsByGroup(locale)
        .flatMap((g) => g.products)
        .find((p) => p.id === item.products[0])!;
      return `- ${item.statement} [${main.name}](${absoluteUrl(main.href)})`;
    }),
    "",
    `## ${seo.llms.solutions}`,
    "",
    ...productsByGroup(locale).flatMap((group) => [
      `### ${group.name}`,
      "",
      ...group.products.flatMap((item) => {
        const others = problemsForProduct(locale, item.id).filter(
          (p) => p.id !== mainProblem(locale, item.id).id,
        );
        const where = industriesForProduct(locale, item.id).map(
          (e) => e.industry.copy.shortName,
        );
        return [
          `- [${item.name}](${absoluteUrl(item.href)}): ${item.oneLine}`,
          `  - ${dict.solutionsPage.problemLabel}: ${mainProblem(locale, item.id).statement}`,
          ...others.map((p) => `  - ${p.statement}`),
          ...(where.length
            ? [`  - ${dict.solutionsPage.industriesLabel}: ${where.join(", ")}`]
            : []),
        ];
      }),
      "",
    ]),
    `## ${seo.llms.how}`,
    "",
    seo.llms.howText,
    "",
    `## ${seo.llms.links}`,
    "",
    `- [${seo.llms.home}](${url("/")}): ${seo.llms.homeDescription}`,
    `- [${dict.problemsPage.heading}](${url("/problems")}): ${dict.problemsPage.seo.description}`,
    `- [${dict.industriesPage.heading}](${url("/industries")}): ${dict.industriesPage.seo.description}`,
    `- [${dict.header.solutions}](${url("/solutions")}): ${dict.solutionsPage.seo.description}`,
    `- [${demoGalleryCopy[locale].title}](${url("/demos")}): ${demoGalleryCopy[locale].description}`,
    `- [${dict.aboutPage.title}](${url("/about")}): ${dict.aboutPage.description}`,
    `- [${dict.resourcesPage.title}](${url("/resources")}): ${dict.resourcesPage.description}`,
    `- [${dict.privacyPage.title}](${url("/privacy")}): ${dict.privacyPage.intro}`,
    `- [${seo.llms.contactLink}](${url("/")}#contact): ${seo.llms.contactDescription}`,
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
