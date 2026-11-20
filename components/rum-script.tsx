"use client";

import { useEffect, useSyncExternalStore } from "react";
import Script from "next/script";
import {
  markRumLoaded,
  readConsent,
  serverConsent,
  subscribeConsent,
} from "@/lib/consent";
import { rumSnippet } from "@/lib/rum";

/** Injects the CloudWatch RUM snippet only after the visitor accepts. */
export function RumScript() {
  const consent = useSyncExternalStore(
    subscribeConsent,
    readConsent,
    serverConsent,
  );
  const accepted = consent === "accepted";
  useEffect(() => {
    if (accepted) markRumLoaded();
  }, [accepted]);
  if (!accepted) return null;
  return (
    <Script id="aws-rum" strategy="afterInteractive">
      {rumSnippet}
    </Script>
  );
}
