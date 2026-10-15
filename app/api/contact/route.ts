import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import { contactConfig } from "@/lib/contact-config";
import {
  defaultLocale,
  getDictionary,
  hasLocale,
  type Locale,
} from "@/lib/i18n";
import { siteUrl } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 20 * 1024;
const MAX_SUBJECT = 150;
const MAX_FIRST_NAME = 60;
const LIMITS = {
  name: 120,
  email: 254,
  company: 160,
  category: 120,
  process: 5000,
} as const;
type Field = keyof typeof LIMITS;
type Brief = Record<Field, string>;
const FIELDS = Object.keys(LIMITS) as Field[];
const EMAIL_RE = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

// Best-effort rate limit. State lives in this server instance's memory only,
// so it is per-instance and resets on restart or cold start.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function rateLimited(ip: string, now = Date.now()) {
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
    }
  }
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function oneLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function json(body: { ok: boolean; error?: string }, status = 200) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

let client: SESv2Client | undefined;
function ses() {
  client ??= new SESv2Client({
    region: contactConfig.region,
    ...(contactConfig.endpoint ? { endpoint: contactConfig.endpoint } : {}),
  });
  return client;
}

function logFailure(label: string, error: unknown) {
  const e = error as { name?: string; message?: string } | undefined;
  console.error(
    `[contact] ${label}: ${e?.name ?? "Error"}: ${e?.message ?? ""}`,
  );
}

const FONT = "-apple-system,Segoe UI,Helvetica,Arial,sans-serif";
const shell = (inner: string) =>
  `<!doctype html><html><head><meta charset="utf-8"><meta name="color-scheme" content="light dark"><meta name="supported-color-schemes" content="light dark"></head><body style="margin:0;padding:24px;background:#eef0e8;font-family:${FONT};"><div style="max-width:560px;margin:0 auto;background:#f9f8f3;color:#1f3a2d;border:1px solid #cfd5c6;border-radius:10px;padding:28px;">${inner}</div></body></html>`;

function notificationEmail(b: Brief, locale: Locale) {
  const subject = oneLine(
    `New process brief from ${b.name} (${b.company})`,
  ).slice(0, MAX_SUBJECT);
  const rows: [string, string][] = [
    ["Name", b.name],
    ["Email", b.email],
    ["Company", b.company],
    ["Process category", b.category],
    ["Language", locale],
  ];
  const text = [
    "New process brief",
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "What happens today:",
    b.process,
    "",
  ].join("\n");
  const html = shell(
    `<p style="margin:0 0 4px;font-size:11px;letter-spacing:.12em;color:#c2571a;">NEW PROCESS BRIEF</p>` +
      `<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;margin:12px 0 18px;">` +
      rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:6px 12px 6px 0;vertical-align:top;font-size:13px;color:#4b6154;white-space:nowrap;">${k}</td><td style="padding:6px 0;font-size:15px;color:#1f3a2d;">${escapeHtml(v)}</td></tr>`,
        )
        .join("") +
      `</table>` +
      `<p style="margin:0 0 6px;font-size:13px;color:#4b6154;">What happens today</p>` +
      `<p style="margin:0;font-size:15px;line-height:1.6;color:#1f3a2d;white-space:pre-wrap;">${escapeHtml(b.process)}</p>`,
  );
  return { subject, text, html };
}

function confirmationEmail(name: string, locale: Locale) {
  const copy = getDictionary(locale).emails.confirmation;
  const first = (name.split(/\s+/)[0] ?? "").slice(0, MAX_FIRST_NAME);
  const greeting = first ? `${copy.greeting} ${first},` : `${copy.greeting},`;
  const lines = copy.lines;
  const text = `${greeting}\n\n${lines.join("\n\n")}\n\n${copy.signoff}\n${siteUrl}\n`;
  const html = shell(
    `<p style="margin:0 0 16px;font-size:16px;color:#1f3a2d;">${escapeHtml(greeting)}</p>` +
      lines
        .map(
          (l) =>
            `<p style="margin:0 0 14px;font-size:15px;line-height:1.6;color:#1f3a2d;">${escapeHtml(l)}</p>`,
        )
        .join("") +
      `<p style="margin:22px 0 0;font-size:15px;color:#1f3a2d;">${escapeHtml(copy.signoff)}<br><a href="${escapeHtml(siteUrl)}" style="color:#c2571a;">${escapeHtml(siteUrl)}</a></p>`,
  );
  return { subject: copy.subject, text, html };
}

function send(
  to: string[],
  replyTo: string,
  mail: { subject: string; text: string; html: string },
) {
  return ses().send(
    new SendEmailCommand({
      FromEmailAddress: contactConfig.from,
      Destination: { ToAddresses: to },
      ReplyToAddresses: [replyTo],
      Content: {
        Simple: {
          Subject: { Data: mail.subject, Charset: "UTF-8" },
          Body: {
            Text: { Data: mail.text, Charset: "UTF-8" },
            Html: { Data: mail.html, Charset: "UTF-8" },
          },
        },
      },
    }),
  );
}

export async function POST(request: Request) {
  if (rateLimited(clientIp(request)))
    return json({ ok: false, error: "rate-limited" }, 429);

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json({ ok: false, error: "invalid-content-type" }, 400);
  }
  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES)
    return json({ ok: false, error: "too-large" }, 413);
  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return json({ ok: false, error: "invalid-body" }, 400);
  }
  if (Buffer.byteLength(raw) > MAX_BODY_BYTES) {
    return json({ ok: false, error: "too-large" }, 413);
  }
  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: "invalid-json" }, 400);
  }
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return json({ ok: false, error: "invalid-body" }, 400);
  }
  const input = payload as Record<string, unknown>;

  // Honeypot: real visitors never see this field. Pretend success, send nothing.
  if (typeof input.website === "string" && input.website.trim() !== "") {
    return json({ ok: true });
  }

  // Language of the page the form was sent from. Anything unknown is English.
  const locale: Locale =
    typeof input.lang === "string" && hasLocale(input.lang)
      ? input.lang
      : defaultLocale;

  const brief = {} as Brief;
  for (const field of FIELDS) {
    const value = input[field];
    if (typeof value !== "string")
      return json({ ok: false, error: `invalid-${field}` }, 400);
    const trimmed = value.trim();
    if (!trimmed || trimmed.length > LIMITS[field]) {
      return json({ ok: false, error: `invalid-${field}` }, 400);
    }
    brief[field] = trimmed;
  }
  if (!EMAIL_RE.test(brief.email) || /[\r\n]/.test(brief.email)) {
    return json({ ok: false, error: "invalid-email" }, 400);
  }

  try {
    await send(contactConfig.to, brief.email, notificationEmail(brief, locale));
  } catch (error) {
    logFailure("notification failed", error);
    return json({ ok: false, error: "send-failed" }, 502);
  }

  try {
    await send(
      [brief.email],
      contactConfig.replyTo,
      confirmationEmail(brief.name, locale),
    );
  } catch (error) {
    // The team already has the brief, so the visitor still sees success.
    logFailure("confirmation failed", error);
  }
  return json({ ok: true });
}
