import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { images } from "@/data/images";
import { getServices } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { jsonLd, webPageSchema } from "@/lib/schema";
import { PageHero } from "@/components/sections/page-hero";
import { Eyebrow } from "@/components/ui/section-heading";
import { BookAppointmentButton, DirectionsButton } from "@/components/cta/cta-buttons";
import { ReviewsSection } from "@/components/sections/reviews-section";
import { FinalCta } from "@/components/sections/final-cta";

const title = "About Maple Medical Center, Ajman";
const description =
  "Maple Medical Center is a multidisciplinary outpatient clinic in Al Rawda 3, Ajman, providing primary care, specialist consultations and dental care for adults and children.";

export const metadata = buildMetadata({ title, description, path: "/about" });

const principles = [
  {
    title: "We listen first",
    image: images.appointment,
    body: "Good care starts with understanding what matters to you. We take time to hear your concerns before recommending next steps.",
  },
  {
    title: "Plans built around you",
    image: images.paperwork,
    body: "Treatment plans are tailored to each patient's clinical needs, using evidence-based assessment, diagnosis and management.",
  },
  {
    title: "Clear explanations",
    image: images.tabletConsult,
    body: "We explain what we find and what your options are in plain language, so you can make informed decisions about your health.",
  },
  {
    title: "Care that connects",
    image: images.team,
    body: "With several specialties in one clinic, it's simpler to coordinate care between doctors when you need more than one kind of support.",
  },
];

export default function AboutPage() {
  const services = getServices();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(webPageSchema({ name: title, description, path: "/about" }))}
      />
      <PageHero
        crumbs={[{ name: "About", path: "/about" }]}
        eyebrow="About us"
        title="A neighbourhood clinic with multidisciplinary care"
        intro={
          <p>
            Maple Medical Center provides outpatient healthcare for adults and children in Al Rawda 3, Ajman — bringing
            primary care, specialist consultations and dental care together under one roof.
          </p>
        }
        image={images.about}
      />

      <section className="bg-white py-16 md:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow>Our approach</Eyebrow>
            <h2 className="mt-4 text-display-lg text-ink">Healthcare that puts you first</h2>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius-md)] shadow-[var(--shadow-card)]">
                <Image src={images.treatmentRoom.src} alt={images.treatmentRoom.alt} fill sizes="20vw" className="object-cover" />
              </div>
              <div className="relative mt-10 aspect-[3/4] overflow-hidden rounded-[var(--radius-md)] shadow-[var(--shadow-card)]">
                <Image src={images.womensHealth.src} alt={images.womensHealth.alt} fill sizes="20vw" className="object-cover" />
              </div>
            </div>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-muted lg:col-span-7">
            <p>
              We care for patients at every stage of life — from babies and children to adults managing long-term health
              conditions. Our clinic offers {services.map((s) => s.name.toLowerCase()).join(", ")}.
            </p>
            <p>
              Whether you need help with a new symptom, ongoing care, or a routine check-up, our aim is the same: to
              understand your needs, explain your options clearly, and support you with care that fits your life.
            </p>
            <p>
              We&rsquo;re open every day from 9 AM to 10 PM, including weekends, so it&rsquo;s easier to find a time
              that works for you and your family.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="principles" className="bg-mist py-16 md:py-24">
        <div className="container-page">
          <h2 id="principles" className="max-w-xl text-display-lg text-ink">
            What guides our care
          </h2>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p) => (
              <li key={p.title} className="card overflow-hidden">
                <div className="relative aspect-[4/3] bg-brand-50">
                  <Image
                    src={p.image.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl text-ink">{p.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{p.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-md)] bg-mist">
            <Image
              src={images.reception.src}
              alt={images.reception.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <Eyebrow>Visit us</Eyebrow>
            <h2 className="mt-4 text-display-md text-ink">In the heart of Al Rawda 3</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              You&rsquo;ll find us at {siteConfig.address.singleLine}. See our{" "}
              <Link href="/patient-information" className="text-brand-800 underline underline-offset-4">
                patient information
              </Link>{" "}
              page for what to bring to your appointment.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <BookAppointmentButton location="about" />
              <DirectionsButton location="about" />
            </div>
          </div>
        </div>
      </section>

      <ReviewsSection limit={2} />
      <FinalCta />
    </>
  );
}
