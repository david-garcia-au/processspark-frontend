import Image from "next/image";
import { ImageIcon, Play } from "lucide-react";
import { media } from "@/lib/media";
import { cn } from "@/lib/utils";

type MediaProps = {
  /** Key in lib/media.ts. */
  slot: string;
  /** "dark" for placeholders that sit on the forest green background. */
  tone?: "light" | "dark";
  className?: string;
  /** Responsive sizes hint for next/image once a real image is set. */
  sizes?: string;
};

/**
 * Renders the asset for a media slot, or a labelled placeholder until
 * `src` is set in lib/media.ts.
 */
export function Media({
  slot,
  tone = "light",
  className,
  sizes = "(max-width: 850px) 100vw, 50vw",
}: MediaProps) {
  const item = media[slot];
  if (!item) {
    throw new Error(`Unknown media slot "${slot}". Add it to lib/media.ts.`);
  }
  const style = { aspectRatio: item.ratio };

  if (item.src && item.kind === "video") {
    return (
      <div className={cn("media", className)} style={style}>
        <video
          className="media-asset"
          src={item.src}
          poster={item.poster}
          aria-label={item.alt}
          controls
          playsInline
          preload="metadata"
        />
      </div>
    );
  }

  if (item.src) {
    return (
      <div className={cn("media", className)} style={style}>
        <Image
          className="media-asset"
          src={item.src}
          alt={item.alt}
          fill
          sizes={sizes}
        />
      </div>
    );
  }

  const Icon = item.kind === "video" ? Play : ImageIcon;
  return (
    <div
      className={cn(
        "media media-placeholder",
        tone === "dark" && "media-dark",
        className,
      )}
      style={style}
      data-media-slot={slot}
      aria-hidden="true"
    >
      <span className="media-icon">
        <Icon size={22} />
      </span>
      <span className="media-label">{item.label}</span>
      <span className="media-meta">
        {item.kind === "video" ? "VIDEO" : "IMAGE"} ·{" "}
        {item.ratio.replace(/\s*\/\s*/, ":")}
      </span>
    </div>
  );
}
