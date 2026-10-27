"use client";

import { useState } from "react";
import { Check, Copy, MapPin } from "lucide-react";

/** Click-to-load Google Map: no third-party requests until the visitor asks for the map. */
export function MapEmbed({ embedUrl, title }: { embedUrl: string; title: string }) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        src={embedUrl}
        title={title}
        className="absolute inset-0 size-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      className="group absolute inset-0 flex size-full flex-col items-center justify-center gap-4 text-ink"
    >
      {/* Abstract street-grid preview — lightweight SVG instead of a map tile request */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 size-full"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 400 300"
      >
        <rect width="400" height="300" fill="#e6f0f2" />
        <g stroke="#ffffff" strokeWidth="10" fill="none">
          <path d="M-10 90 L410 60" />
          <path d="M-10 210 L410 240" />
          <path d="M120 -10 L150 310" />
          <path d="M290 -10 L260 310" />
        </g>
        <g stroke="#ffffff" strokeWidth="4" fill="none" opacity="0.9">
          <path d="M-10 150 L410 150" />
          <path d="M60 -10 L80 310" />
          <path d="M210 -10 L205 310" />
          <path d="M350 -10 L340 310" />
        </g>
        <rect x="160" y="95" width="40" height="45" fill="#d4efec" />
        <rect x="215" y="160" width="38" height="40" fill="#d4efec" />
        <rect x="88" y="165" width="50" height="35" fill="#d4efec" />
      </svg>
      <span className="relative flex size-14 items-center justify-center rounded-full bg-brand-600 text-white transition-transform group-hover:scale-105">
        <MapPin className="size-6" aria-hidden="true" />
      </span>
      <span className="relative rounded-full bg-white px-5 py-2 text-sm font-bold text-brand-700 shadow-[var(--shadow-card)] group-hover:bg-brand-600 group-hover:text-white">
        Load interactive map
      </span>
      <span className="relative text-xs text-muted">Loads Google Maps</span>
    </button>
  );
}

export function CopyAddress({ address }: { address: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-800 underline-offset-4 hover:underline"
    >
      {copied ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
      <span aria-live="polite">{copied ? "Address copied" : "Copy address"}</span>
    </button>
  );
}
