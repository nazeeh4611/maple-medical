import Link from "next/link";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/page-hero";

/** Have these terms reviewed by a qualified UAE legal adviser before launch. */
const LAST_UPDATED = "26 October 2026";

export const metadata = buildMetadata({
  title: "Terms and Conditions",
  description:
    "Terms for using the Maple Medical Center website, including appointment requests and medical information.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Terms & Conditions", path: "/terms" }]}
        title="Terms and Conditions"
        intro={<p>Last updated: {LAST_UPDATED}</p>}
      />
      <article className="bg-white py-14 md:py-20">
        <div className="container-page prose-clinic max-w-3xl">
          <p>
            These terms apply to your use of the {siteConfig.name} website. By using the site, you agree to them. If you
            do not agree, please do not use the site.
          </p>

          <h2>No medical advice</h2>
          <p>
            Content on this website is general information about our clinic and services. It is not medical advice and
            is not a substitute for a consultation with a qualified healthcare professional. Do not delay seeking care
            because of something you have read on this site.
          </p>

          <h2>Emergencies</h2>
          <p>
            This website, our appointment form and our WhatsApp channel are not for emergencies. In a medical emergency,
            call <a href="tel:998">998</a> or go to the nearest hospital emergency department.
          </p>

          <h2>Appointment requests</h2>
          <p>
            Submitting the appointment form or sending a WhatsApp message is a request, not a confirmed booking. An
            appointment is confirmed only when a member of our team contacts you to confirm it. Availability of specific
            doctors, dates and times is not guaranteed. Please provide accurate contact details so we can reach you.
          </p>

          <h2>Insurance</h2>
          <p>
            The list of insurance providers on this site is for general guidance only. Coverage depends on your
            individual plan and policy terms and must be confirmed before your visit. See our{" "}
            <Link href="/insurance">insurance page</Link>.
          </p>

          <h2>Reviews</h2>
          <p>
            Patient review excerpts are reproduced from third-party platforms with a link to the original source. They
            reflect individual experiences and are not a guarantee of any particular outcome.
          </p>

          <h2>Accuracy of information</h2>
          <p>
            We aim to keep information on this website accurate and up to date, including opening hours, services and
            contact details, but it may change. Please contact us to confirm details before your visit.
          </p>

          <h2>Third-party links</h2>
          <p>
            This site links to third-party services such as Google Maps, WhatsApp, Instagram and Doctify. We are not
            responsible for their content or privacy practices.
          </p>

          <h2>Acceptable use</h2>
          <p>
            Please don&rsquo;t misuse the site — for example, by submitting false appointment requests, attempting to
            access it without authorisation, or interfering with its operation.
          </p>

          <h2>Intellectual property</h2>
          <p>
            The content and design of this website belong to {siteConfig.name} or its licensors and may not be copied
            without permission, except as allowed by law.
          </p>

          <h2>Governing law</h2>
          <p>These terms are governed by the laws of the United Arab Emirates as applied in the Emirate of Ajman.</p>

          <h2>Contact</h2>
          <p>
            Questions about these terms? Call <a href={siteConfig.phone.href}>{siteConfig.phone.display}</a> or visit
            our <Link href="/contact">contact page</Link>.
          </p>
        </div>
      </article>
    </>
  );
}
