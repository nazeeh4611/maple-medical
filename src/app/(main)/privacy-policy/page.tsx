import Link from "next/link";
import { siteConfig } from "@/config/site";
import { analyticsEnabled } from "@/lib/analytics";
import { emailEnabled } from "@/lib/email";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/page-hero";

/**
 * Describes the site's actual data handling. Have it reviewed by a qualified UAE legal
 * adviser before launch, and update it whenever forms, analytics or integrations change.
 */
const LAST_UPDATED = "26 October 2026";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How Maple Medical Center collects, uses and protects information submitted through this website.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Privacy Policy", path: "/privacy-policy" }]}
        title="Privacy Policy"
        intro={<p>Last updated: {LAST_UPDATED}</p>}
      />
      <article className="bg-white py-14 md:py-20">
        <div className="container-page prose-clinic max-w-3xl">
          <p>
            This policy explains how {siteConfig.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) handles information you
            provide through this website. It applies to this website only. Information you share during a visit to the
            clinic is handled under our clinical records procedures.
          </p>

          <h2>Information we collect</h2>
          <p>
            <strong>Appointment requests.</strong> When you submit the appointment form, we collect the patient&rsquo;s
            name, a phone number, an optional email address, the service and (optionally) doctor you&rsquo;re interested
            in, your preferred date and time window, whether you are a new or existing patient, and any optional
            message. We deliberately do not ask for medical history, and we ask you not to include detailed medical
            information in the message field.
          </p>
          <p>
            <strong>WhatsApp and phone.</strong> If you contact us using WhatsApp or by phone, that communication is
            handled through those services. WhatsApp links on this site open a pre-written greeting (and, where you
            choose one, the name of a service) — no other details are added to the link.
          </p>
          <p>
            <strong>Technical information.</strong> Like most websites, our hosting provider may process standard
            technical data such as IP address, browser type and pages requested, to deliver the site securely and
            prevent abuse (for example, limiting repeated form submissions).
          </p>

          <h2>How we use your information</h2>
          <ul>
            <li>To contact you about your appointment request and arrange an appointment.</li>
            <li>To answer questions you send us.</li>
            <li>To keep the website secure and prevent spam or misuse.</li>
          </ul>
          <p>We do not sell your information, and we do not use appointment request details for marketing.</p>

          <h2>How appointment requests are sent</h2>
          {emailEnabled ? (
            <p>
              Appointment requests are transmitted securely (HTTPS) and delivered to the clinic&rsquo;s team by email
              through a third-party email delivery provider. The website itself does not store appointment requests in a
              database.
            </p>
          ) : (
            <p>
              The appointment form checks your details in your browser and then helps you send your request to us on
              WhatsApp. Nothing is sent until you choose to send the WhatsApp message, and the website itself does not
              store your details.
            </p>
          )}

          <h2>Cookies and analytics</h2>
          {analyticsEnabled ? (
            <p>
              We use Google Analytics to understand how visitors use the site in aggregate — for example, how many
              people click &ldquo;Book an Appointment&rdquo;. These tools may set cookies. We configure them to avoid
              collecting names, phone numbers, emails, appointment details or message content, and we disable
              advertising features.
            </p>
          ) : (
            <p>
              This website does not currently use analytics or advertising cookies. If this changes, we will update this
              policy.
            </p>
          )}
          <p>
            <strong>Google Maps.</strong> The map on our site loads only when you choose to open it. Once loaded, Google
            may process data under its own privacy policy. Links to Google Maps, WhatsApp, Instagram and Doctify take
            you to those services, which have their own privacy policies.
          </p>

          <h2>How long we keep information</h2>
          <p>
            We keep appointment request emails only as long as needed to arrange your appointment and meet our legal and
            regulatory obligations, after which they are deleted.
          </p>

          <h2>Your choices</h2>
          <p>
            You can ask us what information we hold about you from website enquiries, ask us to correct it, or ask us to
            delete it where we are not required to keep it. Contact us using the details below.
          </p>

          <h2>Children</h2>
          <p>Appointment requests for children should be submitted by a parent or legal guardian.</p>

          <h2>Contact us</h2>
          <p>
            {siteConfig.name}, {siteConfig.address.singleLine}. Phone:{" "}
            <a href={siteConfig.phone.href}>{siteConfig.phone.display}</a>. You can also reach us via our{" "}
            <Link href="/contact">contact page</Link>.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            We may update this policy from time to time. The &ldquo;last updated&rdquo; date at the top shows when it
            last changed.
          </p>
        </div>
      </article>
    </>
  );
}
