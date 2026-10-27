import Image from "next/image";
import { BadgeCheck, Clock, MapPin, ShieldCheck, Star } from "lucide-react";
import { images } from "@/data/images";
import { reviewSummary } from "@/data/reviews";
import { siteConfig } from "@/config/site";
import { BookAppointmentButton, WhatsAppButton } from "@/components/cta/cta-buttons";
import { OpenStatus } from "@/components/layout/open-status";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-mist">
      {/* Soft decorative shapes */}
      <div aria-hidden="true" className="absolute -top-40 -end-40 size-[34rem] rounded-full bg-brand-100/60" />
      <div aria-hidden="true" className="absolute -bottom-48 -start-32 size-[26rem] rounded-full bg-white/70" />

      <div className="container-page relative grid items-center gap-12 pt-10 pb-24 md:pt-14 lg:grid-cols-2 lg:gap-14 lg:pt-16 lg:pb-32">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-brand-700 shadow-sm">
            <MapPin className="size-4" aria-hidden="true" />
            Al Rawda 3, Ajman
          </p>
          <h1 id="hero-title" className="mt-6 text-display-xl text-ink animate-rise">
            Healthcare that puts <span className="text-brand-600">you</span> first.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted md:text-xl">
            Personalised medical care for you and your family, delivered with compassion, expertise, and a commitment to
            your wellbeing.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <BookAppointmentButton location="hero" size="lg" />
            <WhatsAppButton location="hero" size="lg" label="Talk to Our Team" />
          </div>

          <ul className="mt-10 grid gap-4 text-sm sm:grid-cols-3">
            <li className="flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-brand-600 shadow-sm">
                <BadgeCheck className="size-5" aria-hidden="true" />
              </span>
              <span className="font-semibold text-ink">Care for adults &amp; children</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-brand-600 shadow-sm">
                <Clock className="size-5" aria-hidden="true" />
              </span>
              <span className="font-semibold text-ink">Open 7 days, 9 AM – 10 PM</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-brand-600 shadow-sm">
                <ShieldCheck className="size-5" aria-hidden="true" />
              </span>
              <span className="font-semibold text-ink">Works with many insurers</span>
            </li>
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div className="relative aspect-[4/3.4] overflow-hidden rounded-[var(--radius-lg)] bg-brand-100 shadow-[var(--shadow-float)]">
            <Image
              src={images.hero.src}
              alt={images.hero.alt}
              fill
              preload
              fetchPriority="high"
              placeholder="blur"
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-cover object-[45%_center]"
            />
          </div>

          {/* Floating info cards */}
          <a
            href={reviewSummary.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="card absolute -bottom-8 start-4 flex items-center gap-3 px-4 py-3 sm:-start-6"
          >
            <span className="flex size-11 items-center justify-center rounded-full bg-[#fff6e3] text-star">
              <Star className="size-5" fill="currentColor" strokeWidth={0} aria-hidden="true" />
            </span>
            <span>
              <span className="block font-display text-lg leading-none text-ink">
                {reviewSummary.rating.toFixed(1)}
                <span className="text-sm text-muted"> / 5</span>
              </span>
              <span className="mt-1 block text-xs text-muted">{reviewSummary.count} reviews on Doctify</span>
            </span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          <div className="card absolute -top-5 end-4 hidden px-4 py-3 sm:block lg:-end-6">
            <p className="text-xs font-semibold text-muted">Clinic hours</p>
            <p className="mt-0.5 font-display text-base text-ink">Daily · 9 AM – 10 PM</p>
            <OpenStatus className="mt-1 text-xs" />
          </div>
          <p className="sr-only">{siteConfig.address.singleLine}</p>
        </div>
      </div>
    </section>
  );
}
