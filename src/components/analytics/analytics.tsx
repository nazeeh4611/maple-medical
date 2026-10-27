import Script from "next/script";
import { analyticsConfig, analyticsEnabled, type AnalyticsEvent } from "@/lib/analytics";
import { ClickTracker, ViewTracker } from "@/components/analytics/trackers";

/**
 * Loads GTM (preferred) or GA4 only when configured via env vars — nothing is
 * loaded otherwise. IP anonymisation and ad personalisation signals are disabled.
 */
export function Analytics() {
  if (!analyticsEnabled) return null;
  const { gtmId, gaId } = analyticsConfig;

  return (
    <>
      {gtmId ? (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',${JSON.stringify(gtmId)});`}
        </Script>
      ) : (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config',${JSON.stringify(gaId)},{anonymize_ip:true,allow_google_signals:false,allow_ad_personalization_signals:false});`}
          </Script>
        </>
      )}
      <ClickTracker />
    </>
  );
}

/** Fires a page-level event (e.g. service or doctor view). Renders nothing when analytics is off. */
export function TrackPageView({ event, params }: { event: AnalyticsEvent; params: Record<string, string> }) {
  if (!analyticsEnabled) return null;
  return <ViewTracker event={event} params={params} />;
}
