"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import type { NavItem } from "@/types";
import { cn } from "@/lib/utils";

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

/** Toggles the header surface once the user scrolls. */
export function HeaderScrollState({ targetId }: { targetId: string }) {
  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    const update = () => el.setAttribute("data-scrolled", String(window.scrollY > 8));
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [targetId]);
  return null;
}

export function DesktopNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Main" className="hidden lg:block">
      <ul className="flex items-center">
        {items.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "block rounded-full px-4 py-2 text-[0.9375rem] font-semibold transition-colors",
                  active ? "bg-brand-50 text-brand-700" : "text-ink hover:text-brand-700",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Mobile drawer built on the native <dialog> element: focus trapping, Esc and inert background for free. */
export function MobileNav({
  items,
  phoneHref,
  phoneDisplay,
  whatsappHref,
  hoursSummary,
}: {
  items: NavItem[];
  phoneHref: string;
  phoneDisplay: string;
  whatsappHref: string;
  hoursSummary: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close when navigating to a new page.
  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  const show = () => {
    dialogRef.current?.showModal();
    setOpen(true);
  };
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={show}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="mobile-nav"
        className="inline-flex size-11 items-center justify-center rounded-[var(--radius-sm)] text-ink hover:bg-brand-800/[0.06] lg:hidden"
      >
        <Menu className="size-6" aria-hidden="true" />
        <span className="sr-only">Open menu</span>
      </button>

      <dialog
        ref={dialogRef}
        id="mobile-nav"
        aria-label="Site menu"
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
        className="m-0 ms-auto h-dvh max-h-none w-[min(24rem,100%)] max-w-none bg-white p-0 text-ink open:animate-[fade_0.2s_ease-out] lg:hidden"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-line px-5 py-3">
            <span className="eyebrow text-muted">Menu</span>
            <button
              type="button"
              onClick={close}
              className="inline-flex size-11 items-center justify-center rounded-[var(--radius-sm)] hover:bg-brand-800/[0.06]"
            >
              <X className="size-6" aria-hidden="true" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-4">
            <ul>
              {items.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href} className="border-b border-line/70">
                    <Link
                      href={item.href}
                      onClick={close}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center justify-between py-4 font-display text-xl",
                        active ? "text-brand-700" : "text-ink",
                      )}
                    >
                      {item.label}
                      <ArrowRight className="size-5 text-muted rtl-flip" aria-hidden="true" />
                    </Link>
                  </li>
                );
              })}
              <li className="border-b border-line/70">
                <Link
                  href="/patient-information"
                  onClick={close}
                  className="flex items-center justify-between py-4 font-display text-xl text-ink"
                >
                  Patient Information
                  <ArrowRight className="size-5 text-muted rtl-flip" aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </nav>

          <div className="space-y-3 border-t border-line bg-mist px-5 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <Link
              href="/book-appointment"
              onClick={close}
              data-track="appointment_cta_click"
              data-track-location="mobile_menu"
              className="flex h-12 w-full items-center justify-center rounded-full bg-brand-600 font-semibold text-white hover:bg-brand-700"
            >
              Book an Appointment
            </Link>
            <div className="grid grid-cols-2 gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                data-track="whatsapp_click"
                data-track-location="mobile_menu"
                className="flex h-11 items-center justify-center rounded-full border border-brand-800/25 text-sm font-semibold text-brand-900"
              >
                WhatsApp
              </a>
              <a
                href={phoneHref}
                data-track="phone_click"
                data-track-location="mobile_menu"
                className="flex h-11 items-center justify-center rounded-full border border-brand-800/25 text-sm font-semibold text-brand-900"
              >
                Call {phoneDisplay}
              </a>
            </div>
            <p className="pt-1 text-center text-xs text-muted">{hoursSummary}</p>
          </div>
        </div>
      </dialog>
    </>
  );
}
