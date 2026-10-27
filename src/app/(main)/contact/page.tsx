import Link from "next/link";
import { CalendarCheck, Navigation, Phone } from "lucide-react";
import { siteConfig, whatsappUrl } from "@/config/site";
import { images } from "@/data/images";
import { buildMetadata } from "@/lib/seo";
import { jsonLd, webPageSchema } from "@/lib/schema";
import { PageHero } from "@/components/sections/page-hero";
import { LocationSection } from "@/components/location/location-section";
import { WhatsAppIcon } from "@/components/ui/brand-icons";

const title = "Contact Maple Medical Center, Al Rawda 3, Ajman";
const description =
  "Contact Maple Medical Center at 193 Munah Street, Al Rawda 3, Ajman. Call +971 6 595 5921, WhatsApp +971 58 586 2753. Open every day 9 AM – 10 PM.";

export const metadata = buildMetadata({ title, description, path: "/contact" });

export default function ContactPage() {
  const channels = [
    {
      icon: <CalendarCheck className="size-6" aria-hidden="true" />,
      title: "Book online",
      body: "Send an appointment request and we'll contact you to confirm.",
      action: "Request an appointment",
      href: "/book-appointment",
      track: "appointment_cta_click",
      internal: true,
    },
    {
      icon: <WhatsAppIcon className="size-6" />,
      title: "WhatsApp",
      body: siteConfig.whatsapp.display,
      action: "Start a chat",
      href: whatsappUrl(),
      track: "whatsapp_click",
    },
    {
      icon: <Phone className="size-6" aria-hidden="true" />,
      title: "Phone",
      body: siteConfig.phone.display,
      action: "Call now",
      href: siteConfig.phone.href,
      track: "phone_click",
    },
    {
      icon: <Navigation className="size-6 rtl-flip" aria-hidden="true" />,
      title: "Directions",
      body: siteConfig.address.singleLine,
      action: "Open Google Maps",
      href: siteConfig.maps.directionsUrl,
      track: "directions_click",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(webPageSchema({ name: title, description, path: "/contact" }))}
      />
      <PageHero
        crumbs={[{ name: "Contact", path: "/contact" }]}
        image={images.treatmentRoom}
        eyebrow="Contact us"
        title="We're here to help"
        intro={<p>Reach our team by WhatsApp, phone or online request. We&rsquo;re open every day, 9 AM – 10 PM.</p>}
      />

      <section aria-label="Ways to contact us" className="bg-white">
        <ul className="container-page grid sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((c, i) => {
            const cls =
              "group flex h-full flex-col gap-4 border-line py-10 sm:px-6 lg:px-8 " +
              (i > 0 ? "border-t sm:border-t-0 " : "") +
              (i % 2 === 1 ? "sm:border-s " : "") +
              (i >= 2 ? "sm:border-t lg:border-t-0 " : "") +
              (i === 2 ? "lg:border-s " : "");
            const inner = (
              <>
                <span className="flex size-12 items-center justify-center rounded-full bg-brand-50 text-brand-800 group-hover:bg-mist-deep">
                  {c.icon}
                </span>
                <span className="font-display text-2xl text-ink">{c.title}</span>
                <span className="flex-1 text-muted">{c.body}</span>
                <span className="font-semibold text-brand-700 underline decoration-brand-600/40 underline-offset-4 group-hover:decoration-brand-600">
                  {c.action}
                </span>
              </>
            );
            return (
              <li key={c.title} className="flex">
                {c.internal ? (
                  <Link href={c.href} className={cls + "flex-1"} data-track={c.track} data-track-location="contact">
                    {inner}
                  </Link>
                ) : (
                  <a
                    href={c.href}
                    className={cls + "flex-1"}
                    data-track={c.track}
                    data-track-location="contact"
                    {...(c.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                  >
                    {inner}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <LocationSection />

      <section className="border-t border-line bg-white py-12">
        <div className="container-page">
          <p className="max-w-3xl text-sm leading-relaxed text-muted">
            <strong className="text-ink">Medical emergency?</strong> Call{" "}
            <a href="tel:998" className="font-semibold text-ink underline underline-offset-4">
              998
            </a>{" "}
            or go to the nearest emergency department. Please don&rsquo;t use WhatsApp or the appointment form for
            urgent medical needs, and avoid sharing detailed medical information through these channels.
          </p>
        </div>
      </section>
    </>
  );
}
