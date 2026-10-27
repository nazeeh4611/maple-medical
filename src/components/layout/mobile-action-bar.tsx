import Link from "next/link";
import { CalendarCheck, Phone } from "lucide-react";
import { siteConfig, whatsappUrl } from "@/config/site";
import { WhatsAppIcon } from "@/components/ui/brand-icons";

/**
 * Fixed bottom actions on small screens. Pure links — no JavaScript.
 * The page wrapper adds matching bottom padding so content is never hidden behind it,
 * and it's omitted on the booking page so it can't cover form fields.
 */
export function MobileActionBar() {
  const item = "flex flex-col items-center justify-center gap-1 text-[0.7rem] font-semibold tracking-wide";
  return (
    <nav
      aria-label="Quick contact"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white shadow-[0_-8px_24px_-16px_rgb(17_41_59/0.25)] pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <ul className="grid h-16 grid-cols-[1fr_1fr_1.6fr]">
        <li className="flex">
          <a
            href={siteConfig.phone.href}
            data-track="phone_click"
            data-track-location="mobile_bar"
            className={`${item} flex-1 text-brand-700`}
          >
            <Phone className="size-5" aria-hidden="true" />
            Call
            <span className="sr-only"> the clinic on {siteConfig.phone.display}</span>
          </a>
        </li>
        <li className="flex border-s border-line">
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            data-track="whatsapp_click"
            data-track-location="mobile_bar"
            className={`${item} flex-1 text-brand-700`}
          >
            <WhatsAppIcon className="size-5" />
            WhatsApp
            <span className="sr-only"> the clinic (opens in a new tab)</span>
          </a>
        </li>
        <li className="flex p-2">
          <Link
            href="/book-appointment"
            data-track="appointment_cta_click"
            data-track-location="mobile_bar"
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-600 text-sm font-semibold text-white"
          >
            <CalendarCheck className="size-4" aria-hidden="true" />
            Book Appointment
          </Link>
        </li>
      </ul>
    </nav>
  );
}
