import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getDoctors } from "@/data/doctors";
import { getServices } from "@/data/services";
import { images } from "@/data/images";
import { buildMetadata } from "@/lib/seo";
import { jsonLd, webPageSchema } from "@/lib/schema";
import { PageHero } from "@/components/sections/page-hero";
import { DoctorCard } from "@/components/doctors/doctor-card";
import { BookAppointmentButton, CallButton, WhatsAppButton } from "@/components/cta/cta-buttons";
import { FinalCta } from "@/components/sections/final-cta";

const title = "Our Doctors";
const description =
  "Meet the doctors at Maple Medical Center in Al Rawda 3, Ajman, across general practice, internal medicine, paediatrics, women's health, family medicine and dentistry.";

export const metadata = buildMetadata({ title, description, path: "/doctors" });

export default function DoctorsPage() {
  const doctors = getDoctors();
  const services = getServices();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(webPageSchema({ name: title, description, path: "/doctors" }))}
      />
      <PageHero
        crumbs={[{ name: "Doctors", path: "/doctors" }]}
        image={images.doctorConsultation}
        eyebrow="Our doctors"
        title="The people behind your care"
        intro={
          <p>
            Our clinicians cover general practice, specialist consultations and dentistry. When you book, tell us if you
            have a preferred doctor and we&rsquo;ll do our best to arrange it.
          </p>
        }
        actions={
          <>
            <BookAppointmentButton location="doctors_hero" size="lg" />
            <WhatsAppButton location="doctors_hero" size="lg" label="Ask about availability" />
          </>
        }
      />

      <section aria-label="Doctor profiles" className="bg-white py-16 md:py-24">
        <div className="container-page">
          {doctors.length > 0 ? (
            <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
              {doctors.map((d) => (
                <DoctorCard key={d.slug} doctor={d} />
              ))}
            </div>
          ) : (
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-6">
                <h2 className="text-display-md text-ink">Doctor profiles are on their way</h2>
                <p className="mt-5 text-lg leading-relaxed text-muted">
                  We&rsquo;re preparing detailed profiles of our doctors, including their specialties, qualifications
                  and the languages they speak. In the meantime, our team can tell you which doctors are available for
                  the care you need.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <WhatsAppButton location="doctors_empty" label="Ask on WhatsApp" />
                  <CallButton location="doctors_empty" variant="outline" label="Call the clinic" />
                </div>
              </div>
              <div className="lg:col-span-6">
                <h3 className="eyebrow text-brand-700">Specialties at Maple</h3>
                <ul className="mt-4 divide-y divide-line border-y border-line">
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="group flex items-center justify-between py-4 font-display text-xl text-ink hover:text-brand-700"
                      >
                        {s.name}
                        <ArrowRight
                          className="size-4 text-muted transition-transform group-hover:translate-x-1 rtl-flip"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>

      <FinalCta />
    </>
  );
}
