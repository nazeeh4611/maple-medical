import { openingHours, siteConfig } from "@/config/site";
import { getIndexableServices } from "@/data/services";
import { absoluteUrl } from "@/lib/seo";
import type { Doctor, Faq, Service } from "@/types";

/**
 * JSON-LD builders. Only verified/reference facts are emitted — no ratings
 * (self-serving review markup is not eligible) and no geo until coordinates are confirmed.
 */

export const CLINIC_ID = absoluteUrl("/#clinic");
const WEBSITE_ID = absoluteUrl("/#website");

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: siteConfig.address.street,
  addressLocality: siteConfig.address.area,
  addressRegion: siteConfig.address.emirate,
  addressCountry: siteConfig.address.countryCode,
};

const hoursSpec = openingHours.map((h) => ({
  "@type": "OpeningHoursSpecification",
  dayOfWeek: h.days.map((d) => `https://schema.org/${d}`),
  opens: h.opens,
  closes: h.closes,
}));

export function clinicSchema() {
  const specialties = Array.from(
    new Set(getIndexableServices().flatMap((s) => (s.schemaSpecialty ? [s.schemaSpecialty] : []))),
  );
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": CLINIC_ID,
    name: siteConfig.name,
    description: siteConfig.description,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/logo.png"),
    image: absoluteUrl("/opengraph-image"),
    telephone: siteConfig.phone.e164,
    address: postalAddress,
    ...(siteConfig.geo && {
      geo: { "@type": "GeoCoordinates", ...siteConfig.geo },
    }),
    hasMap: siteConfig.maps.directionsUrl,
    openingHoursSpecification: hoursSpec,
    medicalSpecialty: specialties.map((s) => `https://schema.org/${s}`),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: siteConfig.phone.e164,
        areaServed: "AE",
        availableLanguage: ["English"],
      },
    ],
    sameAs: siteConfig.social.map((s) => s.href),
    isAcceptingNewPatients: true,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: siteConfig.name,
    url: absoluteUrl("/"),
    inLanguage: "en-AE",
    publisher: { "@id": CLINIC_ID },
  };
}

export function webPageSchema({ name, description, path }: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: "en-AE",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": CLINIC_ID },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Only use on pages where every question/answer is visible on the page. */
export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function servicePageSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "@id": `${absoluteUrl(`/services/${service.slug}`)}#webpage`,
    url: absoluteUrl(`/services/${service.slug}`),
    name: `${service.name} at ${siteConfig.name}`,
    description: service.metaDescription,
    inLanguage: "en-AE",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": CLINIC_ID },
    ...(service.schemaSpecialty && { specialty: `https://schema.org/${service.schemaSpecialty}` }),
  };
}

export function physicianSchema(doctor: Doctor) {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: doctor.name,
    url: absoluteUrl(`/doctors/${doctor.slug}`),
    ...(doctor.image && {
      image: absoluteUrl(typeof doctor.image.src === "string" ? doctor.image.src : doctor.image.src.src),
    }),
    ...(doctor.languages.length && { knowsLanguage: doctor.languages }),
    ...(doctor.specialtyLabel && { description: doctor.specialtyLabel }),
    worksFor: { "@id": CLINIC_ID },
    address: postalAddress,
    telephone: siteConfig.phone.e164,
  };
}

/** Serialises JSON-LD safely for inline <script> tags. */
export const jsonLd = (data: unknown) => ({ __html: JSON.stringify(data).replace(/</g, "\\u003c") });
