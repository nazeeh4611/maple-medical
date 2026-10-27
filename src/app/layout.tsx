import type { Metadata, Viewport } from "next";
import { Lexend, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { indexingAllowed, siteConfig, siteUrl } from "@/config/site";
import { defaultLocale, localeConfig } from "@/i18n/config";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Analytics } from "@/components/analytics/analytics";
import { clinicSchema, jsonLd, websiteSchema } from "@/lib/schema";

/** Every page must be fully prerendered — no request-time rendering (fast, cheap, and real 404s for unknown slugs). */
export const ensureStatic = "navigation";

// Body text: warm, rounded and very legible.
const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  display: "swap",
  weight: ["400", "600", "700"],
});

// Headings: Lexend was designed for reading ease — friendly and clear.
const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.name} | Medical Center in Al Rawda, Ajman`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  formatDetection: { telephone: false, address: false, email: false },
  robots: indexingAllowed ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0d7f78",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = localeConfig[defaultLocale];
  return (
    <html lang="en" dir={locale.dir} className={`${nunitoSans.variable} ${lexend.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-50 rounded-[var(--radius-sm)] bg-brand-900 px-4 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to main content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd([clinicSchema(), websiteSchema()])} />
        <SiteHeader />
        {children}
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
