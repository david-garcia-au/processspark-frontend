import { Flag } from "@/components/flags";
import type { Locale } from "@/lib/i18n/config";
import { readyPhones } from "@/lib/site";

type PhoneCardsProps = {
  lang: Locale;
  /** light: contact section. dark: footer. */
  variant: "light" | "dark";
};

/**
 * Small country cards (round flag, country name, tel: link), one per ready
 * number in the order of `phones` (lib/site.ts). Static markup: both numbers
 * are always shown, nothing depends on language or location.
 */
export function PhoneCards({ lang, variant }: PhoneCardsProps) {
  const ready = readyPhones();
  if (ready.length === 0) return null;
  return (
    <ul
      className={`phone-cards phone-cards-${variant}`}
      data-count={ready.length}
    >
      {ready.map((phone) => (
        <li key={phone.region} className="phone-card">
          <Flag region={phone.region} />
          <span className="phone-card-text">
            <span className="phone-card-country">{phone.label[lang]}</span>
            <a className="phone-card-number" href={`tel:${phone.tel}`}>
              {phone.display}
            </a>
          </span>
        </li>
      ))}
    </ul>
  );
}
