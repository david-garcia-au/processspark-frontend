import { buildLlmsTxt } from "@/lib/llms";

// Spanish counterpart of /llms.txt (which stays English).
export const dynamic = "force-static";

export function GET() {
  return new Response(buildLlmsTxt("es"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
