import { Clock, MapPin, Phone } from "lucide-react";
import { mainNav, siteConfig, whatsappUrl } from "@/config/site";
import { Logo } from "@/components/layout/logo";
import { DesktopNav, HeaderScrollState, MobileNav } from "@/components/layout/header-client";
import { BookAppointmentButton } from "@/components/cta/cta-buttons";
import { ButtonLink } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/brand-icons";

export function SiteHeader() {
  return (
    <>
      {/* Contact bar — tablet and up, keeps the mobile header compact */}
      <div className="hidden bg-brand-700 text-brand-50 md:block">
        <div className="container-page flex h-10 items-center justify-between text-[0.8125rem]">
          <p className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5" aria-hidden="true" />
              {siteConfig.hoursSummary}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="size-3.5" aria-hidden="true" />
              {siteConfig.address.street}, {siteConfig.address.area}, Ajman
            </span>
          </p>
          <p className="flex items-center gap-6 font-semibold">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              data-track="whatsapp_click"
              data-track-location="top_bar"
              className="flex items-center gap-1.5 hover:text-white"
            >
              <WhatsAppIcon className="size-3.5" />
              {siteConfig.whatsapp.display}
              <span className="sr-only">on WhatsApp (opens in a new tab)</span>
            </a>
            <a
              href={siteConfig.phone.href}
              data-track="phone_click"
              data-track-location="top_bar"
              className="flex items-center gap-1.5 hover:text-white"
            >
              <Phone className="size-3.5" aria-hidden="true" />
              <span className="sr-only">Call us on </span>
              {siteConfig.phone.display}
            </a>
          </p>
        </div>
      </div>

      <header id="site-header" className="site-header sticky top-0 z-40 bg-white transition-shadow duration-200">
        <HeaderScrollState targetId="site-header" />
        <div className="container-page flex h-16 items-center justify-between gap-6 lg:h-20">
          <Logo />
          <DesktopNav items={mainNav} />
          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <BookAppointmentButton location="header" size="md" />
            </div>
            <div className="sm:hidden">
              <ButtonLink href="/book-appointment" size="sm" track="appointment_cta_click" trackLocation="header">
                Book
              </ButtonLink>
            </div>
            <MobileNav
              items={mainNav}
              phoneHref={siteConfig.phone.href}
              phoneDisplay={siteConfig.phone.display}
              whatsappHref={whatsappUrl()}
              hoursSummary={siteConfig.hoursSummary}
            />
          </div>
        </div>
      </header>
    </>
  );
}
