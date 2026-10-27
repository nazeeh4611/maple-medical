import type { MetadataRoute } from "next";
import { getIndexableServices } from "@/data/services";
import { getIndexableDoctors } from "@/data/doctors";
import { absoluteUrl } from "@/lib/seo";

/** Only verified/reference content is listed — never drafts. */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/book-appointment", priority: 0.9, changeFrequency: "monthly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/doctors", priority: 0.8, changeFrequency: "monthly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/insurance", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
    { path: "/patient-information", priority: 0.6, changeFrequency: "monthly" },
    { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
    { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
  ];

  return [
    ...staticPages.map((p) => ({ url: absoluteUrl(p.path), priority: p.priority, changeFrequency: p.changeFrequency })),
    ...getIndexableServices().map((s) => ({
      url: absoluteUrl(`/services/${s.slug}`),
      priority: 0.8,
      changeFrequency: "monthly" as const,
    })),
    ...getIndexableDoctors().map((d) => ({
      url: absoluteUrl(`/doctors/${d.slug}`),
      priority: 0.7,
      changeFrequency: "monthly" as const,
    })),
  ];
}
