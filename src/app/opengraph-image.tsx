import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — medical center in Al Rawda 3, Ajman`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social sharing image, generated at build time. */
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0d7f78",
        color: "#ffffff",
        padding: "72px 80px",
        fontFamily: "sans-serif",
        fontWeight: 700,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <svg width="64" height="64" viewBox="0 0 32 32">
          <rect width="32" height="32" rx="10" fill="#ffffff" />
          <path
            fill="#0d7f78"
            d="M16 4.5l2 4.6 3.1-1.4-.6 4.6 5.1-1.4-1.8 4.2 3.7 1.9-5.4 2.7.9 2.8-5.9-1.3v5.8h-2.2v-5.8l-5.9 1.3.9-2.8-5.4-2.7 3.7-1.9-1.8-4.2 5.1 1.4-.6-4.6 3.1 1.4z"
          />
        </svg>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 40 }}>Maple</span>
          <span style={{ fontSize: 16, letterSpacing: 5, color: "#a9d6c8", fontFamily: "sans-serif" }}>
            MEDICAL CENTER
          </span>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: 80, lineHeight: 1.05, maxWidth: 900 }}>Healthcare that puts you first.</span>
        <span style={{ marginTop: 28, fontSize: 28, color: "#d3ebe4", fontFamily: "sans-serif" }}>
          Al Rawda 3, Ajman · Open every day, 9 AM – 10 PM
        </span>
      </div>
    </div>,
    size,
  );
}
