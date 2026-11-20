"use client";

import { consentReopenEvent } from "@/lib/consent";

/** Reopens the consent banner so the visitor can change the choice. */
export function CookieSettingsButton({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      data-cookie-settings
      className={`cookie-settings ${className}`.trim()}
      onClick={() => window.dispatchEvent(new Event(consentReopenEvent))}
    >
      {label}
    </button>
  );
}
