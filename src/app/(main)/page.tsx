import { buildMetadata } from "@/lib/seo";
import { jsonLd, webPageSchema } from "@/lib/schema";
import { Hero } from "@/components/sections/hero";
import { QuickActions } from "@/components/sections/quick-actions";
import { ServicesSection } from "@/components/sections/services-section";
import { WhyChoose } from "@/components/sections/why-choose";
import { DoctorsSection } from "@/components/sections/doctors-section";
import { InsuranceSection } from "@/components/sections/insurance-section";
import { ReviewsSection } from "@/components/sections/reviews-section";
import { LocationSection } from "@/components/location/location-section";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCta } from "@/components/sections/final-cta";

const title = "Maple Medical Center | Medical Center in Al Rawda 3, Ajman";
const description =
  "Family-focused medical center in Al Rawda 3, Ajman. General practice, internal medicine, paediatrics, women's health, family medicine and dentistry. Open daily 9 AM – 10 PM.";

export const metadata = buildMetadata({ title, description, path: "/", absoluteTitle: true });

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(webPageSchema({ name: title, description, path: "/" }))}
      />
      <Hero />
      <QuickActions />
      <ServicesSection />
      <WhyChoose />
      <DoctorsSection />
      <InsuranceSection />
      <ReviewsSection />
      <LocationSection />
      <FaqSection />
      <FinalCta />
    </>
  );
}
