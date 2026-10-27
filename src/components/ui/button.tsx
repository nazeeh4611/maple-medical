import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import type { AnalyticsEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "light" | "outline-light";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-colors duration-200 disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-brand-600 text-white shadow-[0_8px_20px_-10px_rgb(13_127_120/0.7)] hover:bg-brand-700",
  secondary: "bg-brand-50 text-brand-800 hover:bg-brand-100",
  outline: "border border-line-strong bg-white text-ink hover:border-brand-500 hover:text-brand-700",
  ghost: "text-brand-700 hover:bg-brand-50",
  light: "bg-white text-brand-800 hover:bg-brand-50",
  "outline-light": "border border-white/50 text-white hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-13 px-7 text-base",
};

export const buttonClass = (variant: Variant = "primary", size: Size = "md", className?: string) =>
  cn(base, variants[variant], sizes[size], className);

type Tracking = {
  /** Analytics event fired on click (handled by the delegated ClickTracker). */
  track?: AnalyticsEvent;
  /** Where on the page the CTA lives, e.g. "hero", "header". */
  trackLocation?: string;
  trackLabel?: string;
};

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> &
  Tracking & { variant?: Variant; size?: Size; className?: string; children: ReactNode };

/** Internal navigation styled as a button. */
export function ButtonLink({ variant, size, className, track, trackLocation, trackLabel, ...props }: ButtonLinkProps) {
  return (
    <Link
      className={buttonClass(variant, size, className)}
      data-track={track}
      data-track-location={trackLocation}
      data-track-label={trackLabel}
      {...props}
    />
  );
}

type ExternalButtonProps = Omit<ComponentProps<"a">, "className"> &
  Tracking & { variant?: Variant; size?: Size; className?: string; children: ReactNode };

/** tel:, wa.me, maps and other external links styled as a button. */
export function ButtonAnchor({
  variant,
  size,
  className,
  track,
  trackLocation,
  trackLabel,
  href,
  ...props
}: ExternalButtonProps) {
  const external = href?.startsWith("http");
  return (
    <a
      href={href}
      className={buttonClass(variant, size, className)}
      data-track={track}
      data-track-location={trackLocation}
      data-track-label={trackLabel}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      {...props}
    />
  );
}
