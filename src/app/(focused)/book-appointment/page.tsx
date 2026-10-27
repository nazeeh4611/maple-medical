import Image from "next/image";
import { Clock, ShieldAlert } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getServices } from "@/data/services";
import { getDoctors } from "@/data/doctors";
import { images } from "@/data/images";
import { emailEnabled } from "@/lib/email";
import { buildMetadata } from "@/lib/seo";
import { jsonLd, webPageSchema } from "@/lib/schema";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Eyebrow } from "@/components/ui/section-heading";
import { AppointmentForm } from "@/components/forms/appointment-form";
import { CallButton, WhatsAppButton } from "@/components/cta/cta-buttons";

const title = "Book an Appointment in Ajman";
const description =
  "Request an appointment at Maple Medical Center, Al Rawda 3, Ajman. Choose a service and preferred time — our team will contact you to confirm. Open daily 9 AM – 10 PM.";

export const metadata = buildMetadata({ title, description, path: "/book-appointment" });

const steps = [
  { title: "Send your request", body: "Choose a service and a preferred date and time." },
  { title: "We contact you", body: "Our team calls or messages you to confirm an available slot." },
  { title: "Visit the clinic", body: "Bring your Emirates ID and insurance card, if you have one." },
];

export default function BookAppointmentPage() {
  const serviceOptions = [
    ...getServices().map((s) => ({ value: s.slug, label: s.name })),
    { value: "not-sure", label: "Not sure — help me choose" },
  ];
  const doctorOptions = getDoctors().map((d) => ({ value: d.slug, label: d.name }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(webPageSchema({ name: title, description, path: "/book-appointment" }))}
      />
      <section className="bg-white">
        <div className="container-page pt-8 pb-16 md:pt-10 md:pb-24">
          <Breadcrumbs items={[{ name: "Book an appointment", path: "/book-appointment" }]} />

          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <Eyebrow>Appointments</Eyebrow>
              <h1 className="mt-4 text-display-lg text-ink">Request an appointment</h1>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
                Tell us when you&rsquo;d like to visit and we&rsquo;ll contact you to confirm. It takes about a minute.
              </p>

              <div className="mt-10 rounded-[var(--radius-md)] border border-line bg-white p-5 sm:p-8">
                <AppointmentForm
                  services={serviceOptions}
                  doctors={doctorOptions}
                  emailEnabled={emailEnabled}
                  whatsappNumber={siteConfig.whatsapp.number}
                  phoneHref={siteConfig.phone.href}
                  phoneDisplay={siteConfig.phone.display}
                />
              </div>
            </div>

            <aside className="lg:col-span-5" aria-label="Booking information">
              <div className="space-y-8 lg:sticky lg:top-32">
                <div className="relative hidden aspect-[16/10] overflow-hidden rounded-[var(--radius-md)] lg:block">
                  <Image
                    src={images.appointment.src}
                    alt={images.appointment.alt}
                    fill
                    sizes="40vw"
                    className="object-cover"
                  />
                </div>

                <div>
                  <h2 className="eyebrow text-brand-700">What happens next</h2>
                  <ol className="mt-4 space-y-5">
                    {steps.map((s, i) => (
                      <li key={s.title} className="flex gap-4">
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-600 font-display text-sm text-white">
                          {i + 1}
                        </span>
                        <span>
                          <span className="block font-semibold text-ink">{s.title}</span>
                          <span className="block text-muted">{s.body}</span>
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="rounded-[var(--radius-md)] bg-mist p-6">
                  <h2 className="font-display text-2xl text-ink">Prefer to talk?</h2>
                  <p className="mt-2 flex items-center gap-2 text-sm text-muted">
                    <Clock className="size-4" aria-hidden="true" /> {siteConfig.hoursSummary}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <WhatsAppButton location="booking_aside" variant="secondary" />
                    <CallButton location="booking_aside" variant="outline" />
                  </div>
                </div>

                <p className="flex gap-3 text-sm leading-relaxed text-muted">
                  <ShieldAlert className="mt-0.5 size-4 shrink-0 text-alert" aria-hidden="true" />
                  <span>
                    Not for emergencies. If you need urgent medical help, call{" "}
                    <a href="tel:998" className="font-semibold text-ink underline underline-offset-2">
                      998
                    </a>{" "}
                    or go to the nearest emergency department.
                  </span>
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
