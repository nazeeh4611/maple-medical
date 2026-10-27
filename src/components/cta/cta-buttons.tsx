import { CalendarCheck, Navigation, Phone } from "lucide-react";
import { siteConfig, whatsappUrl } from "@/config/site";
import { ButtonAnchor, ButtonLink } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import type { ComponentProps } from "react";

type CtaProps = {
  location: string;
  variant?: ComponentProps<typeof ButtonLink>["variant"];
  size?: ComponentProps<typeof ButtonLink>["size"];
  className?: string;
  label?: string;
};

/** Primary conversion. Optionally pre-selects a service/doctor on the booking form. */
export function BookAppointmentButton({
  location,
  variant = "primary",
  size,
  className,
  label = "Book an Appointment",
  service,
  doctor,
}: CtaProps & { service?: string; doctor?: string }) {
  const params = new URLSearchParams();
  if (service) params.set("service", service);
  if (doctor) params.set("doctor", doctor);
  const query = params.toString();
  return (
    <ButtonLink
      href={query ? `/book-appointment?${query}` : "/book-appointment"}
      variant={variant}
      size={size}
      className={className}
      track="appointment_cta_click"
      trackLocation={location}
    >
      <CalendarCheck className="size-[1.1em]" aria-hidden="true" />
      {label}
    </ButtonLink>
  );
}

export function WhatsAppButton({
  location,
  variant = "outline",
  size,
  className,
  label = "WhatsApp Us",
  serviceName,
}: CtaProps & { serviceName?: string }) {
  return (
    <ButtonAnchor
      href={whatsappUrl(serviceName)}
      variant={variant}
      size={size}
      className={className}
      track="whatsapp_click"
      trackLocation={location}
    >
      <WhatsAppIcon className="size-[1.15em]" />
      {label}
      <span className="sr-only"> on WhatsApp (opens in a new tab)</span>
    </ButtonAnchor>
  );
}

export function CallButton({ location, variant = "ghost", size, className, label }: CtaProps) {
  return (
    <ButtonAnchor
      href={siteConfig.phone.href}
      variant={variant}
      size={size}
      className={className}
      track="phone_click"
      trackLocation={location}
    >
      <Phone className="size-[1.05em]" aria-hidden="true" />
      {label ?? siteConfig.phone.display}
      {label && <span className="sr-only"> on {siteConfig.phone.display}</span>}
    </ButtonAnchor>
  );
}

export function DirectionsButton({
  location,
  variant = "outline",
  size,
  className,
  label = "Get Directions",
}: CtaProps) {
  return (
    <ButtonAnchor
      href={siteConfig.maps.directionsUrl}
      variant={variant}
      size={size}
      className={className}
      track="directions_click"
      trackLocation={location}
    >
      <Navigation className="size-[1.05em] rtl-flip" aria-hidden="true" />
      {label}
      <span className="sr-only"> in Google Maps (opens in a new tab)</span>
    </ButtonAnchor>
  );
}
