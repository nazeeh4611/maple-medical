import { ShieldCheck } from "lucide-react";
import { getInsuranceProviders } from "@/data/insurance";
import { cn } from "@/lib/utils";

/** Insurer name tiles (logos only with each insurer's permission). */
export function InsuranceGrid({ className, columns = 4 }: { className?: string; columns?: 3 | 4 }) {
  const providers = getInsuranceProviders();
  return (
    <ul
      className={cn("grid grid-cols-2 gap-3 sm:grid-cols-3", columns === 4 && "lg:grid-cols-4", className)}
    >
      {providers.map((p) => (
        <li
          key={p.name}
          className="flex min-h-14 items-center gap-2.5 rounded-[var(--radius-sm)] border border-line bg-white px-3.5 py-2.5 text-sm font-bold text-ink"
        >
          <ShieldCheck className="size-4.5 shrink-0 text-brand-500" aria-hidden="true" />
          {p.name}
        </li>
      ))}
    </ul>
  );
}
