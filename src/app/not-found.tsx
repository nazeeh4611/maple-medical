import Link from "next/link";
import type { Metadata } from "next";
import { getServices } from "@/data/services";
import { buttonClass } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/section-heading";
import { MobileActionBar } from "@/components/layout/mobile-action-bar";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <main id="main" className="flex-1 bg-white pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0">
        <div className="container-page grid gap-12 py-20 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow>Error 404</Eyebrow>
            <h1 className="mt-4 text-display-xl text-ink">We couldn&rsquo;t find that page</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              The page may have moved or no longer exists. Here are some helpful places to start instead.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/" className={buttonClass("secondary", "lg")}>
                Go to homepage
              </Link>
              <Link href="/book-appointment" className={buttonClass("primary", "lg")}>
                Book an Appointment
              </Link>
            </div>
          </div>
          <nav aria-label="Popular pages" className="lg:col-span-5">
            <h2 className="eyebrow text-brand-700">Our services</h2>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {getServices().map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="block py-3.5 font-display text-xl text-ink hover:text-brand-700"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact" className="block py-3.5 font-display text-xl text-ink hover:text-brand-700">
                  Contact us
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </main>
      <MobileActionBar />
    </>
  );
}
