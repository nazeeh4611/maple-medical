import Image from "next/image";
import { Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { images } from "@/data/images";
import { BookAppointmentButton } from "@/components/cta/cta-buttons";

export function FinalCta({
  title = "Your health deserves the right care.",
  body = "Connect with Maple Medical Center and take the next step toward better health.",
  service,
}: {
  title?: string;
  body?: string;
  service?: string;
}) {
  return (
    <section aria-labelledby="final-cta-title" className="bg-white py-16 md:py-20">
      <div className="container-page">
        <div className="relative grid overflow-hidden rounded-[var(--radius-lg)] bg-brand-600 text-white lg:grid-cols-[1.2fr_1fr]">
          <div aria-hidden="true" className="absolute -start-24 -bottom-24 size-72 rounded-full bg-white/10" />
          <div className="relative px-6 py-12 sm:px-10 md:py-16 lg:px-14">
            <h2 id="final-cta-title" className="text-display-lg text-white">
              {title}
            </h2>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-brand-50">{body}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <BookAppointmentButton location="final_cta" size="lg" variant="light" service={service} />
              <a
                href={siteConfig.phone.href}
                data-track="phone_click"
                data-track-location="final_cta"
                className="inline-flex h-13 items-center justify-center gap-2 rounded-full border border-white/50 px-7 font-semibold text-white transition-colors hover:bg-white/10"
              >
                <Phone className="size-5" aria-hidden="true" />
                Call Us Today
                <span className="sr-only"> on {siteConfig.phone.display}</span>
              </a>
            </div>
          </div>
          <div className="relative min-h-64 lg:min-h-full">
            <Image
              src={images.familyMedicine.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
