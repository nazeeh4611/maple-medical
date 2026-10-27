import Link from "next/link";
import { MapleMark } from "@/components/ui/brand-icons";
import { cn } from "@/lib/utils";

export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-2.5", className)}>
      <MapleMark className={cn("size-10 shrink-0", tone === "dark" ? "text-brand-600" : "text-brand-500")} />
      <span className="flex flex-col leading-none">
        <span className={cn("font-display text-[1.3rem]", tone === "dark" ? "text-ink" : "text-white")}>Maple</span>
        <span
          className={cn(
            "mt-1 text-[0.68rem] font-bold tracking-[0.12em] uppercase",
            tone === "dark" ? "text-brand-700" : "text-brand-200",
          )}
        >
          Medical Center
        </span>
      </span>
      <span className="sr-only">, home</span>
    </Link>
  );
}
