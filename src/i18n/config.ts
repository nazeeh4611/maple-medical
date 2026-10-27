/**
 * Locale architecture.
 *
 * English launches first at the root ("/services"). Arabic is configured but disabled
 * until professionally translated and medically reviewed content is available — machine
 * translation of medical content must not be published.
 *
 * To launch Arabic:
 *   1. Add reviewed strings to src/i18n/dictionaries/ar.ts and reviewed service copy.
 *   2. Set `enabled: true` below.
 *   3. Add the /ar route tree (see README → "Adding Arabic"), which reuses the same
 *      components with `dir="rtl"`, the Arabic font and `lang="ar"`.
 * hreflang alternates are emitted automatically once more than one locale is enabled.
 */
export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeConfig: Record<
  Locale,
  { label: string; nativeLabel: string; dir: "ltr" | "rtl"; hreflang: string; pathPrefix: string; enabled: boolean }
> = {
  en: { label: "English", nativeLabel: "English", dir: "ltr", hreflang: "en-AE", pathPrefix: "", enabled: true },
  ar: { label: "Arabic", nativeLabel: "العربية", dir: "rtl", hreflang: "ar-AE", pathPrefix: "/ar", enabled: false },
};

export const enabledLocales = locales.filter((l) => localeConfig[l].enabled);
