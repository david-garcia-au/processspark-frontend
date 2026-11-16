import { Zap } from "lucide-react";
import { SiteLink } from "@/components/site-link";

export function Brand({ label, href = "#" }: { label: string; href?: string }) {
  return (
    <SiteLink href={href} className="brand" aria-label={label}>
      <span className="brand-icon">
        <Zap size={21} fill="currentColor" />
      </span>
      Process<span className="brand-light">Spark</span>
      <span className="brand-dot">.</span>
    </SiteLink>
  );
}
