import { Brand } from "@/components/brand";
import { HeaderBar } from "@/components/header-bar";
import { Media } from "@/components/media";
import {
  SiteLink,
  pagePath,
  type PageId,
} from "@/components/site-link";
import { menus, navCards } from "@/lib/catalogue";
import type { Dictionary } from "@/lib/i18n";
import { localePath, type Locale } from "@/lib/i18n/config";

export { Brand };

type HeaderProps = {
  lang: Locale;
  copy: Dictionary["header"];
  switcherCopy: Dictionary["languageSwitcher"];
  brandLabel: string;
  mediaCopy: Dictionary["media"];
  /** Page being rendered. Defaults to the landing page. */
  page?: PageId;
  /** Locale-less path of this exact page, when it is not the page's root. */
  path?: string;
  /** The page renders its own #contact section, so the button stays on it. */
  hasContact?: boolean;
};

/**
 * Server wrapper: builds the two menus and their cards from the catalogue, so
 * catalogue data never ships in the client bundle beyond the menu strings.
 */
export function Header({
  mediaCopy,
  hasContact = undefined,
  ...props
}: HeaderProps) {
  const { lang, copy, page = "home" } = props;
  const path = props.path ?? pagePath(page);
  const onPage = hasContact ?? page === "home";
  const contactHref = onPage ? "#contact" : `${localePath(lang)}#contact`;
  const data = menus(
    lang,
    path,
    {
      ...copy.menu,
      solve: copy.menu.solve,
      solutions: copy.solutions,
    },
    contactHref,
  );
  // One "See it in action" card, shown at the bottom of both menus.
  const cards = Object.fromEntries(
    (["solve", "solutions"] as const).flatMap((menuId) =>
      navCards(lang).map((card) => [
        menuId,
        <SiteLink key={card.id} href={card.href} className="nav-card">
        <Media
          slot={card.media}
          text={mediaCopy[card.media]}
          sizes="240px"
          className="nav-card-media"
        />
        <span className="nav-card-text">
          <strong>{card.title}</strong>
          <small>{card.text}</small>
        </span>
      </SiteLink>,
      ]),
    ),
  );
  return (
    <HeaderBar
      {...props}
      page={page}
      path={path}
      menus={data}
      cards={cards}
      contactHref={contactHref}
    />
  );
}
