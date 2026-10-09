import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

// Search and AI crawlers are welcome. A crawler that matches a named group
// ignores the "*" group, so each group repeats the allow rule.
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Amazonbot",
  "meta-externalagent",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: aiCrawlers, allow: "/" },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
