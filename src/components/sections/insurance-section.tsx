import Image from "next/image";
import { Info } from "lucide-react";
import { images } from "@/data/images";
import { insuranceDisclaimer } from "@/data/insurance";
import { InsuranceGrid } from "@/components/insurance/insurance-grid";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/cta/cta-buttons";

export function InsuranceSection() {
  return (
    <section aria-labelledby="insurance-title" className="bg-white py-20 md:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-14">
        <div className="relative lg:col-span-5">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-float)] lg:aspect-[4/5]">
            <Image
              src={images.paperwork.src}
              alt={images.paperwork.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="card absolute inset-x-4 -bottom-6 flex gap-3 p-4 text-sm leading-relaxed text-muted sm:inset-x-6">
            <Info className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden="true" />
            <p>{insuranceDisclaimer}</p>
          </div>
        </div>

        <div className="pt-6 lg:col-span-7 lg:pt-0">
          <SectionHeading
            id="insurance-title"
            eyebrow="Insurance"
            title="Insurance providers we work with"
            intro="We work with many of the insurers and TPAs that patients across Ajman rely on."
          />
          <InsuranceGrid className="mt-8" columns={3} />
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/insurance">Check Your Insurance Coverage</ButtonLink>
            <WhatsAppButton location="insurance" label="Ask on WhatsApp" />
          </div>
        </div>
      </div>
    </section>
  );
}
