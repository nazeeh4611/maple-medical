import { Clock, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { CallButton, DirectionsButton, WhatsAppButton } from "@/components/cta/cta-buttons";
import { SectionHeading } from "@/components/ui/section-heading";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { CopyAddress, MapEmbed } from "@/components/location/location-client";

export function LocationSection({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  return (
    <section id="location" aria-labelledby="location-title" className="bg-white py-20 md:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            id="location-title"
            as={headingLevel}
            eyebrow="Visit us"
            title="Find us in Al Rawda 3, Ajman"
            intro="Open seven days a week, so you can be seen at a time that works around family and work."
          />

          <dl className="mt-10 space-y-7">
            <div className="flex gap-4">
              <dt>
                <MapPin className="mt-1 size-5 text-brand-700" aria-hidden="true" />
                <span className="sr-only">Address</span>
              </dt>
              <dd>
                <address className="text-lg leading-relaxed text-ink not-italic">
                  {siteConfig.address.street}
                  <br />
                  {siteConfig.address.area}, {siteConfig.address.city}, UAE
                </address>
                <div className="mt-2">
                  <CopyAddress address={`${siteConfig.name}, ${siteConfig.address.singleLine}`} />
                </div>
              </dd>
            </div>
            <div className="flex gap-4">
              <dt>
                <Clock className="mt-1 size-5 text-brand-700" aria-hidden="true" />
                <span className="sr-only">Opening hours</span>
              </dt>
              <dd className="text-lg text-ink">
                Every day, 9:00 AM – 10:00 PM
                <span className="mt-1 block text-sm text-muted">
                  Including weekends. Please call ahead on public holidays.
                </span>
              </dd>
            </div>
            <div className="flex gap-4">
              <dt>
                <Phone className="mt-1 size-5 text-brand-700" aria-hidden="true" />
                <span className="sr-only">Phone</span>
              </dt>
              <dd className="text-lg">
                <a
                  href={siteConfig.phone.href}
                  data-track="phone_click"
                  data-track-location="location"
                  className="text-ink underline-offset-4 hover:underline"
                >
                  {siteConfig.phone.display}
                </a>
              </dd>
            </div>
            <div className="flex gap-4">
              <dt>
                <WhatsAppIcon className="mt-1 size-5 text-brand-700" />
                <span className="sr-only">WhatsApp</span>
              </dt>
              <dd className="text-lg text-ink">{siteConfig.whatsapp.display}</dd>
            </div>
          </dl>

          <div className="mt-10 flex flex-wrap gap-3">
            <DirectionsButton location="location" variant="secondary" />
            <WhatsAppButton location="location" />
            <CallButton location="location" label="Call" variant="ghost" />
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-md)] border border-line bg-mist lg:aspect-auto lg:h-full lg:min-h-[28rem]">
            <MapEmbed
              embedUrl={siteConfig.maps.embedUrl}
              title={`Map showing ${siteConfig.name} in ${siteConfig.address.area}, Ajman`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
