"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

type Status = { open: boolean; label: string };

const OPENS = 9;
const CLOSES = 22;

function computeStatus(): Status {
  const hour = Number(
    new Intl.DateTimeFormat("en-GB", { hour: "numeric", hourCycle: "h23", timeZone: "Asia/Dubai" }).format(new Date()),
  );
  return hour >= OPENS && hour < CLOSES
    ? { open: true, label: "Open now · until 10 PM" }
    : { open: false, label: "Closed · opens 9 AM" };
}

// Cache the snapshot per minute so useSyncExternalStore gets a stable reference.
let cached: { minute: number; status: Status } | null = null;
const getSnapshot = () => {
  const minute = Math.floor(Date.now() / 60_000);
  if (!cached || cached.minute !== minute) cached = { minute, status: computeStatus() };
  return cached.status;
};
const subscribe = (cb: () => void) => {
  const id = setInterval(cb, 60_000);
  return () => clearInterval(id);
};

/**
 * Live open/closed indicator in clinic time. Renders nothing during prerender/hydration
 * so a static page can never show a stale status.
 * Hours mirror `openingHours` in src/config/site.ts — update both together.
 */
export function OpenStatus({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  const status = useSyncExternalStore(subscribe, getSnapshot, () => null);
  if (!status) return null;
  return (
    <p className={cn("inline-flex items-center gap-2 text-sm font-medium", className)}>
      <span
        aria-hidden="true"
        className={cn("size-2.5", status.open ? "bg-brand-600" : tone === "dark" ? "bg-line-strong" : "bg-white/50")}
      />
      <span className={tone === "dark" ? "text-ink" : "text-white"}>{status.label}</span>
    </p>
  );
}
