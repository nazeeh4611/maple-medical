import Image from "next/image";
import Link from "next/link";
import { getFaqs } from "@/data/faqs";
import { images } from "@/data/images";
import { FaqList } from "@/components/faq/faq-list";
import { SectionHeading } from "@/components/ui/section-heading";
import { CallButton, WhatsAppButton } from "@/components/cta/cta-buttons";

export function FaqSection() {
  const faqs = getFaqs().slice(0, 6);
  return (
    <section aria-labelledby="faq-title" className="bg-mist py-20 md:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <SectionHeading
            id="faq-title"
            eyebrow="FAQs"
            title="Questions, answered"
            intro={
              <>
                Can&rsquo;t find what you&rsquo;re looking for? Our team is happy to help, or see{" "}
                <Link href="/faq" className="font-semibold text-brand-700 underline underline-offset-4">
                  all FAQs
                </Link>
                .
              </>
            }
          />
          <div className="relative mt-8 hidden aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-float)] lg:block">
            <Image
              src={images.tabletConsult.src}
              alt={images.tabletConsult.alt}
              fill
              sizes="40vw"
              className="object-cover"
            />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <WhatsAppButton location="faq" />
            <CallButton location="faq" label="Call us" variant="ghost" />
          </div>
        </div>
        <div className="lg:col-span-7">
          <FaqList faqs={faqs} />
        </div>
      </div>
    </section>
  );
}
