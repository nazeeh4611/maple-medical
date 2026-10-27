import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { footerNav, siteConfig, whatsappUrl } from "@/config/site";
import { getServices } from "@/data/services";
import { Logo } from "@/components/layout/logo";
import { InstagramIcon } from "@/components/ui/brand-icons";

const linkClass = "text-white/75 transition-colors hover:text-white hover:underline underline-offset-4";

export function SiteFooter() {
  const services = getServices();
  return (
    <footer className="bg-navy-900 text-white/75">
      {/* Contact strip */}
      <div className="border-b border-white/15">
        <div className="container-page grid divide-white/15 sm:grid-cols-3 sm:divide-x">
          {[
            { label: "Call", value: siteConfig.phone.display, href: siteConfig.phone.href, track: "phone_click" },
            { label: "WhatsApp", value: siteConfig.whatsapp.display, href: whatsappUrl(), track: "whatsapp_click" },
            {
              label: "Visit",
              value: `${siteConfig.address.street}, ${siteConfig.address.area}`,
              href: siteConfig.maps.directionsUrl,
              track: "directions_click",
            },
          ].map((c) => (
            <a
              key={c.label}
              href={c.href}
              data-track={c.track}
              data-track-location="footer_strip"
              {...(c.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
              className="group block border-b border-white/15 py-6 last:border-b-0 sm:border-b-0 sm:px-6 sm:first:ps-0"
            >
              <span className="text-xs font-bold tracking-wide text-brand-300 uppercase">{c.label}</span>
              <span className="mt-1 block font-display text-xl leading-tight text-white group-hover:text-brand-200 lg:text-2xl">
                {c.value}
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="container-page grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo tone="light" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
            A multidisciplinary outpatient clinic in Al Rawda 3, Ajman, caring for adults and children with general
            practice, specialist consultations and dental care.
          </p>
          <ul className="mt-6 flex gap-3">
            {siteConfig.social.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-brand-600"
                >
                  <InstagramIcon className="size-5" />
                  <span className="sr-only">
                    {s.label} {s.handle} (opens in a new tab)
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer" className="lg:col-span-2">
          <h2 className="eyebrow text-white/50">Clinic</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Services" className="lg:col-span-3">
          <h2 className="eyebrow text-white/50">Services</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className={linkClass}>
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="eyebrow text-white/50">Visit &amp; contact</h2>
          <address className="mt-4 space-y-4 text-sm not-italic">
            <p className="leading-relaxed text-white">
              {siteConfig.address.street}
              <br />
              {siteConfig.address.area}, {siteConfig.address.city}
              <br />
              United Arab Emirates
            </p>
            <p>
              <a
                href={siteConfig.maps.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-track="directions_click"
                data-track-location="footer"
                className="inline-flex items-center gap-1 font-semibold text-white underline-offset-4 hover:underline"
              >
                Open in Google Maps <ArrowUpRight className="size-4 rtl-flip" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </p>
            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
              <dt className="text-white/50">Phone</dt>
              <dd>
                <a
                  href={siteConfig.phone.href}
                  data-track="phone_click"
                  data-track-location="footer"
                  className={linkClass}
                >
                  {siteConfig.phone.display}
                </a>
              </dd>
              <dt className="text-white/50">WhatsApp</dt>
              <dd>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="whatsapp_click"
                  data-track-location="footer"
                  className={linkClass}
                >
                  {siteConfig.whatsapp.display}
                </a>
              </dd>
              <dt className="text-white/50">Hours</dt>
              <dd className="text-white">Daily, 9:00 AM – 10:00 PM</dd>
            </dl>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-4 py-6 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {siteConfig.name}. All rights reserved.
            <span className="mt-1 block md:mt-0 md:ms-2 md:inline">
              In an emergency, call{" "}
              <a href="tel:998" className="font-semibold text-white underline-offset-2 hover:underline">
                998
              </a>
              .
            </span>
          </p>
          <ul className="flex gap-5">
            <li>
              <Link href="/privacy-policy" className={linkClass}>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className={linkClass}>
                Terms &amp; Conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
