/**
 * Cookie consent record. Client only, no dictionary imports.
 *
 * The choice is stored in the first-party cookie `ps_consent` as
 * `<policyVersion>:accepted` or `<policyVersion>:rejected`. Raise
 * `policyVersion` when the policy changes so the banner asks again.
 * Optional scripts (CloudWatch RUM) load only after "accepted".
 */
export const consentCookie = "ps_consent";
export const policyVersion = "v1";
const consentMaxAge = 31536000; // 12 months
/** Fired on window after the stored choice changes. */
export const consentChangeEvent = "ps-consent-change";
/** Fired on window to reopen the banner (footer "Cookie settings"). */
export const consentReopenEvent = "ps-consent-reopen";
export type ConsentChoice = "accepted" | "rejected";
/** What the stores report: a choice, none yet, or not known (server render). */
export type ConsentState = ConsentChoice | "none" | "unknown";
export function readConsent(): ConsentState {
  const entry = document.cookie
    .split("; ")
    .find((part) => part.startsWith(`${consentCookie}=`));
  const value = entry
    ? decodeURIComponent(entry.slice(consentCookie.length + 1))
    : "";
  if (value === `${policyVersion}:accepted`) return "accepted";
  if (value === `${policyVersion}:rejected`) return "rejected";
  return "none";
}
export function writeConsent(choice: ConsentChoice): void {
  const secure = window.location.protocol === "https:" ? "; secure" : "";
  document.cookie = `${consentCookie}=${policyVersion}:${choice}; path=/; max-age=${consentMaxAge}; samesite=lax${secure}`;
  window.dispatchEvent(new Event(consentChangeEvent));
}
export function subscribeConsent(callback: () => void): () => void {
  window.addEventListener(consentChangeEvent, callback);
  return () => window.removeEventListener(consentChangeEvent, callback);
}
export const serverConsent = (): ConsentState => "unknown";
let rumLoaded = false;
/** Called by RumScript once the optional script has been injected. */
export function markRumLoaded(): void {
  rumLoaded = true;
}
export function isRumLoaded(): boolean {
  return rumLoaded;
}
/**
 * Delete the CloudWatch RUM cookies (`cwr_s`, `cwr_u`). Their domain depends on
 * how the host was reached, so try the host, no domain and each parent domain.
 */
export function clearRumCookies(): void {
  const host = window.location.hostname;
  const parts = host.split(".");
  const domains: (string | null)[] = [null, host];
  for (let i = 1; i < parts.length - 1; i++) {
    domains.push(parts.slice(i).join("."));
  }
  for (const name of ["cwr_s", "cwr_u"]) {
    for (const domain of domains) {
      const scope = domain ? `; domain=${domain}` : "";
      document.cookie = `${name}=; path=/${scope}; max-age=0`;
    }
  }
}
