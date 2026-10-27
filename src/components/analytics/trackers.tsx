"use client";

import { useEffect } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

/**
 * One delegated listener for every element with `data-track` — keeps CTAs as
 * zero-JS server components. Only the event name and CTA location are sent.
 */
export function ClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-track]");
      if (!el) return;
      track(el.dataset.track as AnalyticsEvent, {
        cta_location: el.dataset.trackLocation,
        cta_label: el.dataset.trackLabel,
        page_path: window.location.pathname,
      });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}

export function ViewTracker({ event, params }: { event: AnalyticsEvent; params: Record<string, string> }) {
  const key = JSON.stringify(params);
  useEffect(() => {
    track(event, JSON.parse(key));
  }, [event, key]);
  return null;
}
