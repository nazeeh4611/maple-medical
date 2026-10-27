"use client";

import { siteConfig } from "@/config/site";

/** Last-resort 500 page when the root layout itself fails. Uses inline styles: global CSS may not be available. */
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#f8f5ee", color: "#17201d", fontFamily: "system-ui, sans-serif" }}>
        <main style={{ maxWidth: 640, margin: "0 auto", padding: "96px 24px" }}>
          <p
            style={{
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              fontSize: 12,
              fontWeight: 700,
              color: "#963f1f",
            }}
          >
            Error 500
          </p>
          <h1
            style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 40, lineHeight: 1.1, margin: "16px 0" }}
          >
            Sorry, something went wrong
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: "#56625d" }}>
            Please try again in a moment. To reach {siteConfig.name} now, call{" "}
            <a href={siteConfig.phone.href} style={{ color: "#0f4a43", fontWeight: 600 }}>
              {siteConfig.phone.display}
            </a>
            .
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: 24,
              height: 48,
              padding: "0 24px",
              border: 0,
              borderRadius: 4,
              background: "#0f4a43",
              color: "#f8f5ee",
              fontSize: 16,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
