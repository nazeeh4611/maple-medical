import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";
import { cn } from "@/lib/utils";

export type Crumb = { name: string; path: string };

/** Visible breadcrumb trail plus matching BreadcrumbList structured data. */
export function Breadcrumbs({ items, tone = "dark" }: { items: Crumb[]; tone?: "dark" | "light" }) {
  const trail = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(trail))} />
      <nav aria-label="Breadcrumb">
        <ol
          className={cn(
            "flex flex-wrap items-center gap-1.5 text-sm",
            tone === "dark" ? "text-muted" : "text-brand-100",
          )}
        >
          {trail.map((c, i) => {
            const last = i === trail.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className={tone === "dark" ? "text-ink" : "text-white"}>
                    {c.name}
                  </span>
                ) : (
                  <>
                    <Link href={c.path} className="underline-offset-4 hover:underline">
                      {c.name}
                    </Link>
                    <ChevronRight className="size-3.5 opacity-60 rtl-flip" aria-hidden="true" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
