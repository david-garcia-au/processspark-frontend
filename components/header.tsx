import { Brand } from "@/components/brand";
import { HeaderBar, type HeaderMenuItem } from "@/components/header-bar";
import type { PageId } from "@/components/site-link";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";
import { solutionsCopy } from "@/lib/solutions-copy";
import { teams } from "@/lib/teams";

export { Brand };

type HeaderProps = {
  lang: Locale;
  copy: Dictionary["header"];
  switcherCopy: Dictionary["languageSwitcher"];
  brandLabel: string;
  /** Page being rendered. Defaults to the landing page. */
  page?: PageId;
  /** Locale-less path of this exact page, when it is not the page's root. */
  path?: string;
};

/**
 * Server wrapper: builds the Solutions menu from the team data so that data
 * never ships in the client bundle, then renders the interactive bar.
 */
export function Header(props: HeaderProps) {
  const menu: HeaderMenuItem[] = teams[props.lang].map((team) => ({
    id: team.id,
    label: team.label,
    hint: team.examples.slice(0, 2).join(" · "),
  }));
  const copy = solutionsCopy[props.lang];
  return (
    <HeaderBar
      {...props}
      menu={menu}
      menuCopy={{ toggle: copy.menuToggle, all: copy.allSolutions }}
    />
  );
}
