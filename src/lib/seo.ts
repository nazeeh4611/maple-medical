import type { Metadata } from "next";
import { indexingAllowed, siteConfig, siteUrl } from "@/config/site";
import { defaultLocale, enabledLocales, localeConfig } from "@/i18n/config";

type BuildMetadataInput = {
  title: string;
  description: string;
  /** Path beginning with "/", e.g. "/services/dentistry" */
  path: string;
  image?: { url: string; width: number; height: number; alt: string };
  /** Force noindex (drafts, utility pages). Indexing is also disabled site-wide on non-production URLs. */
  noIndex?: boolean;
  /** Use the title as-is, without the "| Maple Medical Center" suffix. */
  absoluteTitle?: boolean;
};

export const absoluteUrl = (path = "/") => new URL(path, siteUrl).toString();

/** hreflang alternates — only for locales that are enabled (verified translations). */
const languageAlternates = (path: string) => {
  if (enabledLocales.length < 2) return undefined;
  return Object.fromEntries([
    ...enabledLocales.map((l) => [localeConfig[l].hreflang, absoluteUrl(localeConfig[l].pathPrefix + path)]),
    ["x-default", absoluteUrl(localeConfig[defaultLocale].pathPrefix + path)],
  ]);
};

export function buildMetadata({
  title,
  description,
  path,
  image,
  noIndex,
  absoluteTitle,
}: BuildMetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const index = indexingAllowed && !noIndex;
  const fullTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical, languages: languageAlternates(path) },
    robots: index
      ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } }
      : { index: false, follow: !noIndex },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      url: canonical,
      title: fullTitle,
      description,
      ...(image && { images: [image] }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(image && { images: [image.url] }),
    },
  };
}
