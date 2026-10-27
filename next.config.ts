import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75],
    deviceSizes: [390, 640, 828, 1080, 1280, 1600, 1920],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    // Common alternative spellings / legacy paths patients or old links may use.
    return [
      { source: "/appointment", destination: "/book-appointment", permanent: true },
      { source: "/book", destination: "/book-appointment", permanent: true },
      { source: "/services/pediatrics", destination: "/services/paediatrics", permanent: true },
      { source: "/services/general-practice", destination: "/services/general-medicine", permanent: true },
      { source: "/services/obgyn", destination: "/services/obstetrics-gynaecology", permanent: true },
      { source: "/terms-and-conditions", destination: "/terms", permanent: true },
      { source: "/privacy", destination: "/privacy-policy", permanent: true },
      { source: "/faqs", destination: "/faq", permanent: true },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
