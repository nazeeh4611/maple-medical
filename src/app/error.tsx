"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { buttonClass } from "@/components/ui/button";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main id="main" className="flex-1 bg-white">
      <div className="container-page max-w-3xl py-20 md:py-28">
        <p className="eyebrow text-brand-700">Something went wrong</p>
        <h1 className="mt-4 text-display-lg text-ink">Sorry, this page didn&rsquo;t load properly</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          Please try again. If you need to reach us now, call{" "}
          <a href={siteConfig.phone.href} className="font-semibold text-brand-800 underline underline-offset-4">
            {siteConfig.phone.display}
          </a>
          .
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" onClick={reset} className={buttonClass("secondary", "lg")}>
            Try again
          </button>
          <Link href="/" className={buttonClass("outline", "lg")}>
            Go to homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
