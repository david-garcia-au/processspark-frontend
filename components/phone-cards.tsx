import { Phone } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { readyPhones } from "@/lib/site";

type PhoneCardsProps = {
  lang: Locale;
};

/**
 * Plain contact list: country name, then a phone icon and the tel: link. One
 * entry per ready number. Every number is always shown; the language only
 * decides which one comes first (the reader's own region), otherwise the
 * order of `phones` (lib/site.ts) applies. Used in the dark footer.
 */
const firstRegion: Record<Locale, string> = { en: "AU", es: "ES" };

export function PhoneCards({ lang }: PhoneCardsProps) {
  const ready = [...readyPhones()].sort(
    (a, b) =>
      Number(b.region === firstRegion[lang]) -
      Number(a.region === firstRegion[lang]),
  );
  if (ready.length === 0) return null;
  return (
    <ul className="phone-list">
      {ready.map((phone) => (
        <li key={phone.region} className="phone-item">
          <span className="phone-item-country">{phone.label[lang]}</span>
          <a className="phone-item-number" href={`tel:${phone.tel}`}>
            <Phone size={18} aria-hidden="true" />
            {phone.display}
          </a>
        </li>
      ))}
    </ul>
  );
}
