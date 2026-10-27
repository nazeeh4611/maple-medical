import { CalendarCheck, ChevronDown, Navigation, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { siteConfig, whatsappUrl } from "@/config/site";
import { getServices } from "@/data/services";
import { WhatsAppIcon } from "@/components/ui/brand-icons";

type Action = { title: string; detail: string; href: string; icon: ReactNode; track: string };

/**
 * Appointment finder card overlapping the hero: choose a service and continue to the
 * booking form with it pre-selected, plus quick Call / WhatsApp / Directions.
 * A plain GET form — works without JavaScript.
 */
export function QuickActions() {
  const services = getServices();
  const actions: Action[] = [
    {
      title: "Call us",
      detail: siteConfig.phone.display,
      href: siteConfig.phone.href,
      icon: <Phone className="size-5" aria-hidden="true" />,
      track: "phone_click",
    },
    {
      title: "WhatsApp",
      detail: siteConfig.whatsapp.display,
      href: whatsappUrl(),
      icon: <WhatsAppIcon className="size-5" />,
      track: "whatsapp_click",
    },
    {
      title: "Directions",
      detail: "Al Rawda 3, Ajman",
      href: siteConfig.maps.directionsUrl,
      icon: <Navigation className="size-5 rtl-flip" aria-hidden="true" />,
      track: "directions_click",
    },
  ];

  return (
    <section aria-label="Book or contact us" className="relative z-10 -mt-14 lg:-mt-16">
      <div className="container-page">
        <div className="card grid gap-6 p-5 md:p-7 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:gap-8">
          <form action="/book-appointment" method="get" className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="flex-1">
              <label htmlFor="quick-service" className="text-sm font-bold text-ink">
                Book an appointment for
              </label>
              <div className="relative mt-2">
                <select
                  id="quick-service"
                  name="service"
                  defaultValue="not-sure"
                  className="h-13 w-full cursor-pointer appearance-none rounded-full border border-line-strong bg-white ps-5 pe-11 text-base text-ink hover:border-brand-500 focus-visible:border-brand-500"
                >
                  <option value="not-sure">Not sure yet — help me choose</option>
                  {services.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.name}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute end-4 top-1/2 size-5 -translate-y-1/2 text-muted"
                  aria-hidden="true"
                />
              </div>
            </div>
            <button
              type="submit"
              data-track="appointment_cta_click"
              data-track-location="booking_card"
              className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-brand-600 px-7 font-semibold text-white shadow-[0_8px_20px_-10px_rgb(13_127_120/0.7)] transition-colors hover:bg-brand-700"
            >
              <CalendarCheck className="size-5" aria-hidden="true" />
              Continue
            </button>
          </form>

          <ul className="grid gap-3 sm:grid-cols-3 lg:border-s lg:border-line lg:ps-8">
            {actions.map((a) => {
              const external = a.href.startsWith("http");
              return (
                <li key={a.title}>
                  <a
                    href={a.href}
                    data-track={a.track}
                    data-track-location="booking_card"
                    {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                    className="group flex items-center gap-3 rounded-[var(--radius-sm)] p-2 transition-colors hover:bg-brand-50 sm:flex-col sm:items-start sm:gap-2"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600 group-hover:bg-white">
                      {a.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-bold text-ink">{a.title}</span>
                      <span className="block truncate text-xs text-muted">{a.detail}</span>
                    </span>
                    {external && <span className="sr-only">(opens in a new tab)</span>}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
