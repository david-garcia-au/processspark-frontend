import { Phone } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { readyPhones } from "@/lib/site";

type PhoneCardsProps = {
  lang: Locale;
};

/**
 * Plain contact list: country name, then a phone icon and the tel: link. One
 * entry per ready number, in the order of `phones` (lib/site.ts). Static
 * markup: every number is always shown, nothing depends on language or
 * location. Used in the dark footer.
 */
export function PhoneCards({ lang }: PhoneCardsProps) {
  const ready = readyPhones();
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
