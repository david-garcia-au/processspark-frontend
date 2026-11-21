import type { Dictionary } from "@/lib/i18n";

export type FaqItem = { question: string; answer: string };

/** The product fields the questions are answered from. */
type FaqProduct = {
  shortName: string;
  oneLine: string;
  whoFor: string;
  controlText: string;
  firstStep: string;
  goodToKnow: string[];
};

/**
 * Questions and answers for a solution page. Every answer is text the page
 * already shows (or a site-wide statement kept in the dictionary), so the
 * visible FAQ and the FAQPage JSON-LD say the same thing and nothing is
 * invented here.
 */
export function productFaq(
  copy: Dictionary["productPage"]["faq"],
  item: FaqProduct,
): FaqItem[] {
  const name = item.shortName;
  return [
    { question: copy.what.replace("{name}", name), answer: item.oneLine },
    { question: copy.who.replace("{name}", name), answer: item.whoFor },
    { question: copy.control, answer: item.controlText },
    { question: copy.systems, answer: copy.systemsAnswer },
    { question: copy.first, answer: item.firstStep },
    { question: copy.data, answer: copy.dataAnswer },
    ...(item.goodToKnow.length
      ? [{ question: copy.limits, answer: item.goodToKnow.join(" ") }]
      : []),
  ];
}
