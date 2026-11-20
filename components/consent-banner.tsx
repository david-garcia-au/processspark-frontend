"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Brand } from "@/components/brand";
import { SiteLink } from "@/components/site-link";
import {
  clearRumCookies,
  consentReopenEvent,
  isRumLoaded,
  readConsent,
  serverConsent,
  subscribeConsent,
  writeConsent,
  type ConsentChoice,
} from "@/lib/consent";
import { localePath, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n";

type ConsentBannerProps = {
  lang: Locale;
  copy: Dictionary["consent"];
  brandLabel: string;
};

/**
 * Privacy banner fixed to the bottom of the viewport. Non-modal: the page stays
 * usable behind it. Shown until the visitor chooses, and again from the footer
 * "Cookie settings" button.
 */
export function ConsentBanner({ lang, copy, brandLabel }: ConsentBannerProps) {
  const consent = useSyncExternalStore(
    subscribeConsent,
    readConsent,
    serverConsent,
  );
  const [reopened, setReopened] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const bannerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const visible = consent === "none" || (reopened && consent !== "unknown");

  useEffect(() => {
    const reopen = () => {
      openerRef.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      setReopened(true);
    };
    window.addEventListener(consentReopenEvent, reopen);
    return () => window.removeEventListener(consentReopenEvent, reopen);
  }, []);

  useEffect(() => {
    if (reopened) headingRef.current?.focus();
  }, [reopened]);

  // Keep the page clear of the banner: body padding follows its height.
  useEffect(() => {
    const banner = bannerRef.current;
    if (!visible || !banner) return;
    const root = document.documentElement;
    const update = () =>
      root.style.setProperty("--consent-height", `${banner.offsetHeight}px`);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(banner);
    return () => {
      observer.disconnect();
      root.style.removeProperty("--consent-height");
    };
  }, [visible]);

  function choose(choice: ConsentChoice) {
    const wasLoaded = isRumLoaded();
    if (choice === "rejected") clearRumCookies();
    writeConsent(choice);
    // A loaded script cannot be unloaded, so a reload drops it.
    if (choice === "rejected" && wasLoaded) {
      window.location.reload();
      return;
    }
    setReopened(false);
    setDetailsOpen(false);
    const opener = openerRef.current;
    openerRef.current = null;
    if (opener?.isConnected) opener.focus();
  }

  if (!visible) return null;
  return (
    <section
      ref={bannerRef}
      role="region"
      aria-label={copy.regionLabel}
      className="consent"
    >
      <div className="shell consent-inner">
        <div className="consent-brand">
          <Brand label={brandLabel} href={localePath(lang)} />
        </div>
        <div className="consent-body">
          <h2 id="consent-title" ref={headingRef} tabIndex={-1}>
            {copy.heading}
          </h2>
          <p>
            {copy.textBefore}
            <SiteLink href={localePath(lang, "/privacy")}>
              {copy.policyLinkLabel}
            </SiteLink>
            {copy.textAfter}
          </p>
          {reopened && consent !== "none" && (
            <p className="consent-current">
              {consent === "accepted"
                ? copy.currentAccepted
                : copy.currentRejected}
            </p>
          )}
          <button
            type="button"
            className="consent-more"
            aria-expanded={detailsOpen}
            aria-controls="consent-details"
            onClick={() => setDetailsOpen((open) => !open)}
          >
            {detailsOpen ? copy.moreInfoClose : copy.moreInfo}
          </button>
          <div
            id="consent-details"
            className="consent-details"
            hidden={!detailsOpen}
          >
            <h3>{copy.detailsNecessaryHeading}</h3>
            <p>{copy.detailsNecessary}</p>
            <h3>{copy.detailsOptionalHeading}</h3>
            <p>{copy.detailsOptional}</p>
          </div>
        </div>
        <div className="consent-actions">
          <button
            type="button"
            className="button-primary consent-button"
            onClick={() => choose("accepted")}
          >
            {copy.accept}
          </button>
          <button
            type="button"
            className="consent-button consent-reject"
            onClick={() => choose("rejected")}
          >
            {copy.reject}
          </button>
        </div>
      </div>
    </section>
  );
}
