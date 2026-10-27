import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

/** Proportionally filled stars (e.g. 3.75 shows three and three-quarter stars). */
export function Stars({ rating, className, label = true }: { rating: number; className?: string; label?: boolean }) {
  const pct = Math.max(0, Math.min(100, (rating / 5) * 100));
  const row = (cls: string) => (
    <span className={cn("flex gap-0.5", cls)}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className="size-[1em] shrink-0" fill="currentColor" strokeWidth={0} aria-hidden="true" />
      ))}
    </span>
  );
  return (
    <span
      className={cn("relative inline-flex", className)}
      {...(label && { role: "img", "aria-label": `Rated ${rating} out of 5` })}
    >
      {row("text-line")}
      <span className="absolute inset-y-0 start-0 overflow-hidden" style={{ width: `${pct}%` }}>
        {row("text-star")}
      </span>
    </span>
  );
}
