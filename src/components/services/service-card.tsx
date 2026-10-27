import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/types";
import { DraftBadge } from "@/components/ui/section-heading";
import { ServiceIcon } from "@/components/services/service-icon";

/** Specialty card: photo, icon badge, name, short description, Learn more + Book. */
export function ServiceCard({ service }: { service: Service; index?: number }) {
  return (
    <article className="card group relative flex flex-col overflow-hidden transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[var(--shadow-float)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-brand-50">
        <Image
          src={service.image.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="relative flex flex-1 flex-col px-6 pt-0 pb-6">
        <ServiceIcon
          slug={service.slug}
          className="-mt-7 border-4 border-white bg-brand-600 text-white shadow-[var(--shadow-card)]"
        />
        <h3 className="mt-4 text-xl text-ink">
          <Link
            href={`/services/${service.slug}`}
            className="after:absolute after:inset-0 after:rounded-[var(--radius-md)]"
          >
            {service.name}
          </Link>
        </h3>
        {service.status === "unconfirmed" && (
          <div className="mt-2">
            <DraftBadge />
          </div>
        )}
        <p className="mt-2 flex-1 leading-relaxed text-muted">{service.summary}</p>
        <div className="relative z-10 mt-5 flex items-center justify-between gap-4 border-t border-line pt-4 text-sm font-bold">
          <span className="inline-flex items-center gap-1.5 text-brand-700" aria-hidden="true">
            Learn more <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 rtl-flip" />
          </span>
          <Link
            href={`/book-appointment?service=${service.slug}`}
            data-track="appointment_cta_click"
            data-track-location="service_card"
            data-track-label={service.slug}
            className="rounded-full bg-brand-50 px-3.5 py-1.5 text-brand-700 hover:bg-brand-600 hover:text-white"
          >
            Book
            <span className="sr-only"> {service.name}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export function ServiceIndex({ services }: { services: Service[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((s) => (
        <ServiceCard key={s.slug} service={s} />
      ))}
    </div>
  );
}
