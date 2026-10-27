import { getServices } from "@/data/services";
import { ServiceIndex } from "@/components/services/service-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";

export function ServicesSection() {
  return (
    <section aria-labelledby="services-title" className="bg-white py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          id="services-title"
          align="center"
          eyebrow="Our specialties"
          title="Complete care for your whole family"
          intro="From everyday illnesses to women's health and dental care — adults and children are cared for in one convenient Ajman clinic."
        />
        <div className="mt-14">
          <ServiceIndex services={getServices()} />
        </div>
        <div className="mt-10 text-center">
          <ButtonLink href="/services" variant="outline">
            View all services
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
