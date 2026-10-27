import { getServices } from "@/data/services";
import { images } from "@/data/images";
import { buildMetadata } from "@/lib/seo";
import { jsonLd, webPageSchema } from "@/lib/schema";
import { PageHero } from "@/components/sections/page-hero";
import { ServiceIndex } from "@/components/services/service-card";
import { BookAppointmentButton, WhatsAppButton } from "@/components/cta/cta-buttons";
import { FinalCta } from "@/components/sections/final-cta";

const title = "Medical Services in Ajman";
const description =
  "Explore medical services at Maple Medical Center, Al Rawda 3, Ajman: general practice, internal medicine, paediatrics, obstetrics & gynaecology, family medicine and dentistry.";

export const metadata = buildMetadata({ title, description, path: "/services" });

export default function ServicesPage() {
  const services = getServices();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(webPageSchema({ name: title, description, path: "/services" }))}
      />
      <PageHero
        crumbs={[{ name: "Services", path: "/services" }]}
        image={images.team}
        eyebrow="Our services"
        title="Medical services for the whole family"
        intro={
          <p>
            Maple Medical Center brings general practice, specialist consultations and dental care together in one
            clinic in Al Rawda 3, Ajman — so adults and children can be seen in one familiar place.
          </p>
        }
        actions={
          <>
            <BookAppointmentButton location="services_hero" size="lg" />
            <WhatsAppButton location="services_hero" size="lg" />
          </>
        }
      />

      <section aria-label="All services" className="bg-white py-16 md:py-24">
        <div className="container-page">
          <ServiceIndex services={services} />
          <p className="mt-16 max-w-2xl border-t border-line pt-6 text-sm leading-relaxed text-muted">
            Looking for a specific treatment that isn&rsquo;t listed? Please contact our team to check whether it is
            available before booking.
          </p>
        </div>
      </section>

      <FinalCta
        title="Not sure which service you need?"
        body="Tell us a little about what you need and our team will help you book with the right clinician."
      />
    </>
  );
}
