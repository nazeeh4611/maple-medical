import { getFaqs } from "@/data/faqs";
import { images } from "@/data/images";
import { buildMetadata } from "@/lib/seo";
import { jsonLd, webPageSchema } from "@/lib/schema";
import { PageHero } from "@/components/sections/page-hero";
import { FaqList } from "@/components/faq/faq-list";
import { CallButton, WhatsAppButton } from "@/components/cta/cta-buttons";
import { FinalCta } from "@/components/sections/final-cta";

const title = "Frequently Asked Questions";
const description =
  "Answers to common questions about Maple Medical Center in Al Rawda 3, Ajman: location, opening hours, booking, specialties, insurance and WhatsApp.";

export const metadata = buildMetadata({ title, description, path: "/faq" });

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(webPageSchema({ name: title, description, path: "/faq" }))}
      />
      <PageHero
        crumbs={[{ name: "FAQs", path: "/faq" }]}
        image={images.tabletConsult}
        eyebrow="Help"
        title="Frequently asked questions"
        intro={
          <p>
            Quick answers about visiting Maple Medical Center. If your question isn&rsquo;t here, our team is happy to
            help.
          </p>
        }
        actions={
          <>
            <WhatsAppButton location="faq_hero" />
            <CallButton location="faq_hero" variant="ghost" />
          </>
        }
      />
      <section aria-label="Questions and answers" className="bg-white py-16 md:py-24">
        <div className="container-page max-w-4xl">
          {/* FAQPage markup only here, where every answer is visible on the page. */}
          <FaqList faqs={getFaqs()} withSchema />
        </div>
      </section>
      <FinalCta />
    </>
  );
}
