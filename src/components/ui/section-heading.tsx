import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Small tinted pill label shown above section headings. */
export function Eyebrow({
  children,
  tone = "dark",
  className,
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "eyebrow inline-flex items-center rounded-full px-3 py-1",
        tone === "dark" ? "bg-brand-50 text-brand-700" : "bg-white/10 text-brand-100",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "dark",
  align = "start",
  as: Tag = "h2",
  id,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "dark" | "light";
  align?: "start" | "center";
  as?: "h1" | "h2";
  id?: string;
  className?: string;
}) {
  return (
    <div className={cn(align === "center" && "mx-auto text-center", "max-w-2xl", className)}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <Tag id={id} className={cn("mt-4 text-display-lg", tone === "dark" ? "text-ink" : "text-white")}>
        {title}
      </Tag>
      {intro && (
        <p className={cn("mt-4 text-lg leading-relaxed", tone === "dark" ? "text-muted" : "text-brand-100")}>{intro}</p>
      )}
    </div>
  );
}

export function DraftBadge({ note }: { note?: string }) {
  return (
    <span
      title={note}
      className="inline-flex items-center gap-1 rounded-full border border-dashed border-alert bg-alert-soft px-2.5 py-0.5 text-[0.7rem] font-bold tracking-wide text-alert uppercase"
    >
      Draft · awaiting clinic confirmation
    </span>
  );
}
