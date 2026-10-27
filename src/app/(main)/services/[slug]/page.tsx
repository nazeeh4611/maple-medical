import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Clock, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getService, getServices } from "@/data/services";
import { getDoctorsForService } from "@/data/doctors";
import { buildMetadata } from "@/lib/seo";
import { jsonLd, servicePageSchema } from "@/lib/schema";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { BookAppointmentButton, CallButton, WhatsAppButton } from "@/components/cta/cta-buttons";
import { DraftBadge, Eyebrow } from "@/components/ui/section-heading";
import { FaqList } from "@/components/faq/faq-list";
import { DoctorCard } from "@/components/doctors/doctor-card";
import { ServiceCard } from "@/components/services/service-card";
import { FinalCta } from "@/components/sections/final-cta";
import { TrackPageView } from "@/components/analytics/analytics";

export function generateStaticParams() {
  return getServices().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  const src = service.image.src;
  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
    noIndex: service.status === "unconfirmed",
    image: {
      url: typeof src === "string" ? src : src.src,
      width: service.image.width,
      height: service.image.height,
      alt: service.image.alt,
    },
  });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const doctors = getDoctorsForService(service.slug);
  const related = getServices()
    .filter((s) => s.slug !== service.slug)
    .slice(0, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(servicePageSchema(service))} />
      <TrackPageView event="service_page_view" params={{ service: service.slug }} />

      <section className="border-b border-line bg-white">
        <div className="container-page pt-8 pb-14 md:pt-10 md:pb-20">
          <Breadcrumbs
            items={[
              { name: "Services", path: "/services" },
              { name: service.name, path: `/services/${service.slug}` },
            ]}
          />
          <div className="mt-10 grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <Eyebrow>Maple Medical Center · Ajman</Eyebrow>
              {service.status === "unconfirmed" && (
                <div className="mt-4">
                  <DraftBadge />
                </div>
              )}
              <h1 className="mt-4 text-display-xl text-ink animate-rise">{service.name}</h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted md:text-xl">{service.summary}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <BookAppointmentButton location="service_hero" size="lg" service={service.slug} />
                <WhatsAppButton location="service_hero" size="lg" serviceName={service.name} />
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
                <li className="flex items-center gap-1.5">
                  <Clock className="size-4 text-brand-700" aria-hidden="true" /> Open daily, 9 AM – 10 PM
                </li>
                <li className="flex items-center gap-1.5">
                  <MapPin className="size-4 text-brand-700" aria-hidden="true" /> {siteConfig.address.area}, Ajman
                </li>
              </ul>
            </div>
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-md)] bg-mist">
                <Image
                  src={service.image.src}
                  alt={service.image.alt}
                  fill
                  preload
                  placeholder="blur"
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="text-display-md text-ink">About {service.name.toLowerCase()} at Maple</h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted">
              {service.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <h2 className="mt-14 text-display-md text-ink">Common reasons patients visit</h2>
            <ul className="mt-6 grid gap-x-8 sm:grid-cols-2">
              {service.helpsWith.map((item) => (
                <li key={item} className="flex gap-3 border-b border-line py-4 text-ink">
                  <Check className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted">
              This list is a general guide, not a complete list of treatments. If you&rsquo;re unsure whether we can
              help, please{" "}
              <Link href="/contact" className="text-brand-800 underline underline-offset-4">
                contact us
              </Link>{" "}
              before booking.
            </p>
          </div>

          <aside className="lg:col-span-5">
            <div className="space-y-8 lg:sticky lg:top-32">
              <div className="rounded-[var(--radius-md)] bg-mist p-7">
                <h2 className="eyebrow text-brand-700">Who it&rsquo;s for</h2>
                <p className="mt-3 font-display text-2xl leading-snug text-ink">{service.whoFor}</p>
              </div>
              <div className="rounded-[var(--radius-md)] border border-line p-7">
                <h2 className="eyebrow text-brand-700">Before your visit</h2>
                <ul className="mt-4 space-y-3">
                  {service.visitNotes.map((n) => (
                    <li key={n} className="flex gap-3 text-[0.9375rem] leading-relaxed text-muted">
                      <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand-600" />
                      {n}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-col gap-3">
                  <BookAppointmentButton location="service_aside" service={service.slug} />
                  <CallButton location="service_aside" variant="outline" label={`Call ${siteConfig.phone.display}`} />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {doctors.length > 0 && (
        <section aria-labelledby="service-doctors" className="bg-white py-16 md:py-24">
          <div className="container-page">
            <h2 id="service-doctors" className="text-display-md text-ink">
              {service.name} doctors
            </h2>
            <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {doctors.map((d) => (
                <DoctorCard key={d.slug} doctor={d} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section aria-labelledby="service-faq" className="bg-white py-16 md:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-16">
          <h2 id="service-faq" className="text-display-md text-ink lg:col-span-4">
            {service.name} FAQs
          </h2>
          <div className="lg:col-span-8">
            <FaqList faqs={service.faqs} />
          </div>
        </div>
      </section>

      <section aria-labelledby="related-services" className="border-t border-line bg-white py-16 md:py-24">
        <div className="container-page">
          <h2 id="related-services" className="text-display-md text-ink">
            Other services at Maple
          </h2>
          <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      <FinalCta
        title={`Book a ${service.name.toLowerCase()} appointment`}
        body="Send a request online and our team will contact you to confirm a time that suits you."
        service={service.slug}
      />
    </>
  );
}
