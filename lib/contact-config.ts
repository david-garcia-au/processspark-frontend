/**
 * Server-only configuration for the contact form (app/api/contact).
 * Do not import this from client components.
 *
 * Nothing here is secret. Credentials come from the AWS SDK default provider
 * chain (the SSR compute role on Amplify Hosting, the local AWS profile or
 * environment in development).
 *
 * By default no environment variables are needed. On Amplify Hosting, console
 * environment variables are not exposed to the Next.js SSR runtime, so any
 * CONTACT_* override would additionally need to be written into
 * .env.production at build time via amplify.yml.
 */
const list = (value: string) =>
  value
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);

const env = (name: string) => process.env[name]?.trim() || undefined;

const toOverride = env("CONTACT_TO");

export const contactConfig = {
  region: env("CONTACT_SES_REGION") ?? "ap-southeast-2",
  to: toOverride
    ? list(toOverride)
    : ["david@processspark.com", "david.garcia.au@gmail.com"],
  from: env("CONTACT_FROM") ?? "ProcessSpark <forms@processspark.com>",
  replyTo: env("CONTACT_REPLY_TO") ?? "david@processspark.com",
  // Only for pointing the client at a local mock in tests.
  endpoint: env("CONTACT_SES_ENDPOINT"),
};
