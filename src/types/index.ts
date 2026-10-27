import type { StaticImageData } from "next/image";

/**
 * Content verification status.
 * - "verified": confirmed by the clinic, safe to publish.
 * - "reference": taken from a public listing (e.g. Doctify) and believed accurate,
 *   but should be re-confirmed by the clinic before launch.
 * - "unconfirmed": mentioned somewhere but NOT yet confirmed. Never published
 *   unless SHOW_DRAFT_CONTENT=true (preview only, noindex).
 */
export type VerificationStatus = "verified" | "reference" | "unconfirmed";

export type SiteImage = {
  src: StaticImageData | string;
  alt: string;
  width: number;
  height: number;
};

export type DayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

export type OpeningHoursSpec = {
  days: DayOfWeek[];
  /** 24h "HH:MM" */
  opens: string;
  closes: string;
  label: string;
};

export type Service = {
  slug: string;
  name: string;
  /** Shorter label for nav and form options */
  shortName: string;
  status: VerificationStatus;
  summary: string;
  metaTitle: string;
  metaDescription: string;
  intro: string[];
  /** Broad, specialty-inherent reasons to visit. Never specific procedures unless verified. */
  helpsWith: string[];
  whoFor: string;
  visitNotes: string[];
  image: SiteImage;
  /** schema.org MedicalSpecialty enum value, when one exists */
  schemaSpecialty?: string;
  faqs: Faq[];
};

export type Doctor = {
  slug: string;
  name: string;
  status: VerificationStatus;
  /** Slugs of services this doctor practises */
  services: string[];
  specialtyLabel: string | null;
  qualifications: string[];
  languages: string[];
  bio: string[];
  image: SiteImage | null;
  /** Healthcare professional licence number (e.g. MOHAP), only once verified */
  licenceNumber: string | null;
  verificationNote?: string;
};

export type InsuranceProvider = {
  name: string;
  status: VerificationStatus;
};

export type Review = {
  id: string;
  /** Verbatim excerpt; never edited for spelling */
  excerpt: string;
  rating: number;
  date: string;
  seenFor: string[];
  author: string;
  source: "Doctify";
  sourceUrl: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export type NavItem = {
  label: string;
  href: string;
};
