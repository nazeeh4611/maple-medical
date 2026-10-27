import { Info } from "lucide-react";
import { siteConfig } from "@/config/site";
import { insuranceDisclaimer } from "@/data/insurance";
import { images } from "@/data/images";
import { buildMetadata } from "@/lib/seo";
import { jsonLd, webPageSchema } from "@/lib/schema";
import { PageHero } from "@/components/sections/page-hero";
import { InsuranceGrid } from "@/components/insurance/insurance-grid";
import { CallButton, WhatsAppButton } from "@/components/cta/cta-buttons";
import { FinalCta } from "@/components/sections/final-cta";

const title = "Insurance Accepted at Maple Medical Center Ajman";
const description =
  "See the insurance providers and TPAs Maple Medical Center in Al Rawda 3, Ajman works with, and how to check your coverage before your visit.";

export const metadata = buildMetadata({ title, description, path: "/insurance" });

const steps = [
  {
    title: "Have your card ready",
    body: "Find your insurance card and Emirates ID. Your plan or network name is usually printed on the card.",
  },
  {
    title: "Contact our team",
    body: `Message us on WhatsApp or call ${siteConfig.phone.display} and tell us your insurer and plan name.`,
  },
  {
    title: "We'll help you check",
    body: "Our team will help you check whether your plan can be used for the service you need, and whether any co-payment may apply.",
  },
];

export default function InsurancePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(webPageSchema({ name: title, description, path: "/insurance" }))}
      />
      <PageHero
        crumbs={[{ name: "Insurance", path: "/insurance" }]}
        image={images.paperwork}
        eyebrow="Insurance"
        title="Insurance providers we work with"
        intro={<p>We work with a range of insurance providers and TPAs used by patients across Ajman and the UAE.</p>}
        actions={
          <>
            <WhatsAppButton location="insurance_hero" size="lg" label="Check my coverage" variant="secondary" />
            <CallButton location="insurance_hero" size="lg" variant="outline" label="Call the clinic" />
          </>
        }
      />

      <section aria-labelledby="providers" className="bg-white py-16 md:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <h2 id="providers" className="text-display-md text-ink">
              Providers
            </h2>
            <p className="mt-6 flex gap-3 rounded-[var(--radius-sm)] border border-line bg-white p-4 text-sm leading-relaxed text-muted">
              <Info className="mt-0.5 size-4 shrink-0 text-brand-700" aria-hidden="true" />
              <span>{insuranceDisclaimer}</span>
            </p>
          </div>
          <div className="lg:col-span-8">
            <InsuranceGrid className="bg-white" />
            <p className="mt-4 text-sm text-muted">
              Don&rsquo;t see your insurer? Please contact us — this list may not be exhaustive.
            </p>
          </div>
        </div>
      </section>

      <section id="check" aria-labelledby="check-title" className="bg-brand-900 py-16 text-white md:py-24">
        <div className="container-page">
          <h2 id="check-title" className="max-w-xl text-display-lg text-white">
            How to check your coverage
          </h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="border-t border-white/15 pt-6">
                <span className="font-display text-lg text-brand-200 tabular-nums" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-2xl text-white">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-brand-100">{s.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12 flex flex-wrap gap-3">
            <WhatsAppButton location="insurance_steps" variant="light" label="Message us on WhatsApp" />
            <CallButton location="insurance_steps" variant="outline-light" />
          </div>
          <p className="mt-6 max-w-xl text-sm text-brand-100">
            Please don&rsquo;t send photos of your insurance card or medical documents unless our team asks for them.
          </p>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
