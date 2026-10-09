import { ImageResponse } from "next/og";
import { BrandMark } from "@/lib/og";
import { site } from "@/lib/site";

export const alt = `${site.name}: simpler processes, smoother operations`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#20352a",
          color: "#fafbf5",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <BrandMark size={64} />
          <div style={{ display: "flex", fontSize: 44, fontWeight: 700 }}>
            {site.name}
            <span style={{ color: "#ed643b" }}>.</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              lineHeight: 1.08,
              fontWeight: 700,
              letterSpacing: -3,
            }}
          >
            Simpler processes.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              lineHeight: 1.08,
              fontWeight: 700,
              letterSpacing: -3,
              color: "#ff9c68",
            }}
          >
            Smoother operations.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 32,
              fontSize: 32,
              color: "#c4d2bd",
            }}
          >
            Practical AI for manufacturing, logistics and industrial services.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 3,
            color: "#c0d6ac",
          }}
        >
          MAKE. MOVE. MAINTAIN.
        </div>
      </div>
    ),
    { ...size },
  );
}
