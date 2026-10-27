import type { Review } from "@/types";
import { siteConfig } from "@/config/site";

/**
 * Verbatim excerpts from verified-patient reviews on the clinic's Doctify profile.
 * Text is reproduced exactly (including original spelling) and always shown with a
 * link to the source. Re-check figures and wording before launch and whenever updated.
 * Review platform terms: confirm with Doctify that excerpting with attribution is permitted,
 * or replace this section with Doctify's official review widget.
 */
const sourceUrl = siteConfig.doctify.url;

export const reviewSummary = {
  source: "Doctify" as const,
  sourceUrl,
  rating: 4.82,
  count: 8,
  asOf: "2026-10-26",
};

export const reviews: Review[] = [
  {
    id: "doctify-2026-10-04",
    excerpt: "I Had a really good experience with Dr. Aparna.She was very professional, kind, and attentive.",
    rating: 3.75,
    date: "2026-10-04",
    seenFor: ["General Medicine", "Food Allergies"],
    author: "Verified patient",
    source: "Doctify",
    sourceUrl,
  },
  {
    id: "doctify-2026-07-22-a",
    excerpt: "I had a wonderful experience at Maple Medical Centre.",
    rating: 5,
    date: "2026-07-22",
    seenFor: ["General Medicine", "Dental Alignment"],
    author: "Verified patient",
    source: "Doctify",
    sourceUrl,
  },
  {
    id: "doctify-2026-10-19",
    excerpt: "Doctors are very knowledgeable and helpfull very professional clinic",
    rating: 5,
    date: "2026-10-19",
    seenFor: ["Gastroenteritis"],
    author: "Verified patient",
    source: "Doctify",
    sourceUrl,
  },
  {
    id: "doctify-2026-07-22-b",
    excerpt: "I was visit there in recently, it was good experience even doctors and nurses are very caring,",
    rating: 4.75,
    date: "2026-07-22",
    seenFor: ["General Medicine"],
    author: "Verified patient",
    source: "Doctify",
    sourceUrl,
  },
  {
    id: "doctify-2026-06-02",
    excerpt: "the clinic staff were super helpful",
    rating: 5,
    date: "2026-06-02",
    seenFor: ["General Medicine"],
    author: "Verified patient",
    source: "Doctify",
    sourceUrl,
  },
  {
    id: "doctify-2026-07-22-c",
    excerpt: "They are providing good quality service even the doctors and staffs....",
    rating: 5,
    date: "2026-07-22",
    seenFor: ["General Medicine"],
    author: "Verified patient",
    source: "Doctify",
    sourceUrl,
  },
];
