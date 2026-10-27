/**
 * Privacy-conscious analytics helpers.
 * Events carry only non-identifying context (where a button was clicked, which service page).
 * Never pass names, phone numbers, emails, dates or message content.
 */

export const analyticsConfig = {
  gaId: process.env.NEXT_PUBLIC_GA_ID?.trim() || null,
  gtmId: process.env.NEXT_PUBLIC_GTM_ID?.trim() || null,
};

export const analyticsEnabled = Boolean(analyticsConfig.gaId || analyticsConfig.gtmId);

export type AnalyticsEvent =
  | "appointment_cta_click"
  | "appointment_form_submit"
  | "appointment_form_whatsapp"
  | "phone_click"
  | "whatsapp_click"
  | "directions_click"
  | "doctor_profile_view"
  | "service_page_view";

type Params = Record<string, string | number | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: AnalyticsEvent, params: Params = {}) {
  if (typeof window === "undefined") return;
  if (window.gtag) {
    window.gtag("event", event, params);
  } else if (window.dataLayer) {
    window.dataLayer.push({ event, ...params });
  }
}
