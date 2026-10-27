import type { NavItem, OpeningHoursSpec } from "@/types";

/**
 * Single source of truth for business details.
 *
 * ⚠️ CONFIRM BEFORE LAUNCH — every value marked `reference` below comes from the
 * clinic's public Doctify profile and the details supplied in the project brief.
 * Ask the clinic to confirm each one, then change `status` to "verified".
 * Do not add contact details anywhere else in the codebase; import from here.
 */

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "");

export const siteUrl = rawSiteUrl || "http://localhost:3000";

/**
 * Search engines may only index the site when a real production URL is configured
 * and indexing hasn't been explicitly disabled (use NEXT_PUBLIC_ALLOW_INDEXING=false
 * on staging/preview deployments).
 */
export const indexingAllowed =
  Boolean(rawSiteUrl) && !/localhost|127\.0\.0\.1/.test(siteUrl) && process.env.NEXT_PUBLIC_ALLOW_INDEXING !== "false";

/** Preview unconfirmed services/doctors locally. Never enable on the live site. */
export const showDraftContent = process.env.SHOW_DRAFT_CONTENT === "true";

const phoneE164 = "+97165955921";
const whatsappE164 = "+971585862753";

const addressLines = {
  street: "193 Munah Street",
  area: "Al Rawda 3",
  city: "Ajman",
  emirate: "Ajman",
  country: "United Arab Emirates",
  countryCode: "AE",
} as const;

const mapsQuery = encodeURIComponent(
  `Maple Medical Center, ${addressLines.street}, ${addressLines.area}, ${addressLines.city}, UAE`,
);

export const openingHours: OpeningHoursSpec[] = [
  {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "09:00",
    closes: "22:00",
    label: "Every day",
  },
];

export const siteConfig = {
  name: "Maple Medical Center",
  shortName: "Maple Medical",
  tagline: "Healthcare that puts you first",
  description:
    "Maple Medical Center is a multidisciplinary outpatient clinic in Al Rawda 3, Ajman, caring for adults and children across general practice, internal medicine, paediatrics, women's health, family medicine and dentistry. Open every day, 9 AM – 10 PM.",
  locale: "en_AE",
  timeZone: "Asia/Dubai",

  phone: {
    e164: phoneE164,
    display: "+971 6 595 5921",
    href: `tel:${phoneE164}`,
    status: "reference",
  },
  whatsapp: {
    e164: whatsappE164,
    display: "+971 58 586 2753",
    /** wa.me requires digits only */
    number: whatsappE164.replace(/\D/g, ""),
    status: "reference",
  },
  /** Not published on the reference profile — add once the clinic provides one. */
  email: null as string | null,

  address: {
    ...addressLines,
    singleLine: `${addressLines.street}, ${addressLines.area}, ${addressLines.city}, UAE`,
    status: "reference",
  },
  /** Leave null until the clinic confirms exact coordinates (used for structured data). */
  geo: null as { latitude: number; longitude: number } | null,

  maps: {
    directionsUrl: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
    embedUrl: `https://www.google.com/maps?q=${mapsQuery}&output=embed`,
  },

  hoursSummary: "Open every day, 9 AM – 10 PM",
  hoursStatus: "reference",

  social: [
    {
      label: "Instagram",
      handle: "@maplemedical",
      href: "https://www.instagram.com/maplemedical",
      status: "reference",
    },
  ],

  doctify: {
    url: "https://www.doctify.com/en-ae/practice/maple-medical-center",
  },

  /** UAE legal details — add trade licence / MOHAP facility licence only once verified. */
  legal: {
    tradeLicence: null as string | null,
    facilityLicence: null as string | null,
  },
} as const;

export const whatsappMessage = (serviceName?: string) =>
  serviceName
    ? `Hello Maple Medical Center, I would like to book an appointment for ${serviceName}.`
    : "Hello Maple Medical Center, I would like to book an appointment.";

export const whatsappUrl = (serviceName?: string) =>
  `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(whatsappMessage(serviceName))}`;

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Doctors", href: "/doctors" },
  { label: "Insurance", href: "/insurance" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: NavItem[] = [
  { label: "About us", href: "/about" },
  { label: "Our services", href: "/services" },
  { label: "Our doctors", href: "/doctors" },
  { label: "Insurance", href: "/insurance" },
  { label: "Patient information", href: "/patient-information" },
  { label: "FAQs", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Book an appointment", href: "/book-appointment" },
];
