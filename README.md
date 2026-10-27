# Maple Medical Center — website

Marketing and appointment-enquiry website for Maple Medical Center, 193 Munah Street, Al Rawda 3, Ajman.

Built with Next.js 16 (App Router, Cache Components), TypeScript (strict), Tailwind CSS v4, React Hook Form + Zod and
Lucide icons. Every page is prerendered to static HTML (`ensureStatic = "navigation"`); the only server code is the
appointment API route.

```bash
npm install
cp .env.example .env.local   # fill in what you have — everything is optional for local dev
npm run dev                  # http://localhost:3000
npm run check                # lint + typecheck + production build
```

## ⚠️ Before launch: confirm with the clinic

Nothing below has been invented, but much of it comes from the clinic's public
[Doctify profile](https://www.doctify.com/en-ae/practice/maple-medical-center) and needs the clinic's sign-off.

| Item | Where | Status |
| --- | --- | --- |
| Phone `+971 6 595 5921`, WhatsApp `+971 58 586 2753` | `src/config/site.ts` | From brief + Doctify — confirm |
| Address, 193 Munah Street, Al Rawda 3 | `src/config/site.ts` | Matches Doctify — confirm |
| Hours, daily 9 AM – 10 PM | `src/config/site.ts`, `src/data/faqs.ts` | Doctify says 09:00–22:00; **one other directory lists an 8 AM opening** — confirm |
| Map coordinates | `siteConfig.geo` | Not set (left out of structured data until verified) |
| Email address | `siteConfig.email` | Not published anywhere — add if the clinic has one |
| Trade / MOHAP facility licence numbers | `siteConfig.legal` | Not set |
| 6 specialties (GP, Internal Medicine, Paediatrics, O&G, Family Medicine, Dentistry) | `src/data/services.ts` | Listed on Doctify — live |
| Dermatology, Physiotherapy, Health Screening, Laboratory | `src/data/services.ts` | Only mentioned in the profile description — **hidden** (`status: "unconfirmed"`) |
| Doctors | `src/data/doctors.ts` | **None verified.** Dr. Aparna, Dr. Simran and Dr. Rabia appear only in reviews — hidden. Need full names, specialties, qualifications, licence numbers, languages, approved photos |
| 19 insurers / TPAs | `src/data/insurance.ts` | From Doctify — confirm current list; logos only with insurer permission |
| Review excerpts + rating (4.82 from 8, as of 26 Oct 2026) | `src/data/reviews.ts` | Verbatim from Doctify, linked to source — confirm Doctify permits excerpting, or switch to their widget |
| Logo | `src/components/ui/brand-icons.tsx` (`MapleMark`), `src/app/icon.svg`, `public/logo.png` | **Placeholder mark** — replace with official logo files |
| Photography | `public/images/` | Licensed Unsplash stock (see `IMAGE_CREDITS.md`), not the real clinic |
| Privacy Policy & Terms | `src/app/(main)/privacy-policy`, `terms` | Written to match the site's actual data handling — have a UAE legal adviser review |

To publish a confirmed item, change its `status` to `"verified"` (or `"reference"` for services). To preview hidden
drafts locally, set `SHOW_DRAFT_CONTENT=true` — drafts are labelled, `noindex`, and never in the sitemap.

## Environment

See `.env.example`. Key behaviour:

- **`NEXT_PUBLIC_SITE_URL`** — required in production. Until set, all pages are `noindex` and `robots.txt` blocks
  crawlers, so previews never get indexed. Set `NEXT_PUBLIC_ALLOW_INDEXING=false` on staging.
- **Appointment email** — with `RESEND_API_KEY` + `APPOINTMENT_EMAIL_TO`, requests are emailed to the clinic. Without
  them, the form still validates and then hands off to WhatsApp (pre-filled with service, date and time only — never
  name, phone or message).
- **Analytics** — `NEXT_PUBLIC_GTM_ID` or `NEXT_PUBLIC_GA_ID`. Nothing loads when both are empty. Tracked events:
  `appointment_cta_click`, `appointment_form_submit`, `appointment_form_whatsapp`, `phone_click`, `whatsapp_click`,
  `directions_click`, `service_page_view`, `doctor_profile_view` — with CTA location only, no personal data.

Env vars are read at **build time** for static pages — rebuild after changing them.

## Structure

```
src/
  app/
    (main)/            Standard pages (with the fixed mobile action bar)
    (focused)/         Booking page (no fixed bar, so nothing covers form fields)
    api/appointment/   Validated, rate-limited, honeypot-protected enquiry endpoint
    sitemap.ts robots.ts manifest.ts opengraph-image.tsx not-found.tsx error.tsx global-error.tsx
  components/          layout, sections, services, doctors, insurance, reviews, faq, location, forms, cta, ui, analytics
  config/site.ts       Single source of truth for business details
  data/                Typed content: services, doctors, insurance, reviews, faqs, images
  i18n/config.ts       Locale config (Arabic prepared, disabled)
  lib/                 seo, schema (JSON-LD), validation (Zod), email, rate-limit, analytics, utils
```

## SEO

- Unique title/description, canonical, Open Graph and Twitter tags on every page (`src/lib/seo.ts`).
- JSON-LD: `MedicalClinic` + `WebSite` sitewide; `WebPage`/`MedicalWebPage` per page; `BreadcrumbList` on inner pages;
  `FAQPage` only on `/faq` where every answer is visible; `Physician` only for verified doctors. No self-serving
  review/rating markup, no unverified geo.
- Sitemap lists only published content. Legacy/alternate URLs (`/book`, `/services/pediatrics`, …) 308-redirect.
- Unknown service/doctor slugs return a real 404.

## Adding Arabic

The locale architecture lives in `src/i18n/config.ts`. Arabic is disabled because medical content must be
professionally translated and clinically reviewed — never machine-translated. To launch it: add reviewed copy, enable
the locale, and move pages under an `app/[lang]` segment (see Next's `docs/01-app/02-guides/internationalization.md`)
with `dir="rtl"` and an Arabic font (e.g. IBM Plex Sans Arabic via `next/font`). Components already use logical
properties (`ps-`/`pe-`/`ms-`/`start-`) and flip directional icons with `.rtl-flip`. `hreflang` alternates are emitted
automatically once more than one locale is enabled.

## Rate limiting note

`src/lib/rate-limit.ts` is in-memory (per server instance). On serverless or multi-instance hosting, swap it for a
shared store such as Upstash Redis for strict limits.
# maple-medical
