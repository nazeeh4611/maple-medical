import Link from "next/link";
import { CalendarCheck, ClipboardList, Clock, ShieldAlert, Users } from "lucide-react";
import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";
import { images } from "@/data/images";
import { buildMetadata } from "@/lib/seo";
import { jsonLd, webPageSchema } from "@/lib/schema";
import { PageHero } from "@/components/sections/page-hero";
import { LocationSection } from "@/components/location/location-section";
import { FinalCta } from "@/components/sections/final-cta";

const title = "Patient Information";
const description =
  "Plan your visit to Maple Medical Center in Al Rawda 3, Ajman: how to book, what to bring, opening hours, insurance and visiting with children.";

export const metadata = buildMetadata({ title, description, path: "/patient-information" });

function Block({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <section className="grid gap-4 border-t border-line py-10 md:grid-cols-12 md:gap-10">
      <div className="flex items-start gap-3 md:col-span-4">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-800">
          {icon}
        </span>
        <h2 className="pt-1 text-2xl text-ink md:text-3xl">{title}</h2>
      </div>
      <div className="prose-clinic md:col-span-8 [&>*:first-child]:mt-0">{children}</div>
    </section>
  );
}

export default function PatientInformationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(webPageSchema({ name: title, description, path: "/patient-information" }))}
      />
      <PageHero
        crumbs={[{ name: "Patient information", path: "/patient-information" }]}
        image={images.laptopCare}
        eyebrow="Plan your visit"
        title="Patient information"
        intro={<p>Everything you need to know before your appointment at Maple Medical Center.</p>}
      />

      <div className="bg-white py-10 md:py-16">
        <div className="container-page">
          <Block icon={<CalendarCheck className="size-5" aria-hidden="true" />} title="Booking an appointment">
            <p>You can request an appointment in three ways:</p>
            <ul>
              <li>
                <Link href="/book-appointment">Online appointment request</Link> — choose a service, a preferred date
                and time, and our team will contact you to confirm.
              </li>
              <li>WhatsApp — message us on {siteConfig.whatsapp.display}.</li>
              <li>Phone — call us on {siteConfig.phone.display}.</li>
            </ul>
            <p>
              <strong>Your appointment is confirmed only once our team contacts you.</strong> If you need to change or
              cancel, please let us know as early as possible so we can offer the time to another patient.
            </p>
          </Block>

          <Block icon={<ClipboardList className="size-5" aria-hidden="true" />} title="What to bring">
            <ul>
              <li>Your Emirates ID (or passport for visitors)</li>
              <li>Your insurance card, if you plan to use insurance</li>
              <li>A list of medicines you currently take</li>
              <li>Any previous test results, scans or medical reports relevant to your visit</li>
              <li>For children: their vaccination record, if available</li>
            </ul>
            <p>Please arrive a few minutes before your appointment time to complete registration.</p>
          </Block>

          <Block icon={<Clock className="size-5" aria-hidden="true" />} title="Opening hours">
            <p>
              We are open <strong>every day, 9:00 AM – 10:00 PM</strong>, including weekends. Hours may differ on public
              holidays, so please call ahead.
            </p>
          </Block>

          <Block icon={<Users className="size-5" aria-hidden="true" />} title="Visiting with children">
            <p>
              Children under 18 should be accompanied by a parent or legal guardian. If you&rsquo;re booking for more
              than one child, please let us know so we can try to arrange consecutive appointments.
            </p>
          </Block>

          <Block icon={<ShieldAlert className="size-5" aria-hidden="true" />} title="Insurance & payment">
            <p>
              We work with a range of insurance providers. Coverage depends on your individual plan, so please{" "}
              <Link href="/insurance">check your coverage</Link> with our team before your visit. Some plans may involve
              a co-payment.
            </p>
          </Block>

          <section className="mt-6 rounded-[var(--radius-md)] border border-alert/30 bg-alert-soft p-6 md:p-8">
            <h2 className="text-2xl text-alert">In an emergency</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-ink">
              Maple Medical Center is an outpatient clinic and does not provide emergency care. If you or someone with
              you has a medical emergency, call{" "}
              <a href="tel:998" className="font-semibold underline underline-offset-4">
                998
              </a>{" "}
              for an ambulance or go to the nearest hospital emergency department immediately.
            </p>
          </section>
        </div>
      </div>

      <LocationSection />
      <FinalCta />
    </>
  );
}
