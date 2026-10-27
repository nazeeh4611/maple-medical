import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GraduationCap, Languages, Stethoscope } from "lucide-react";
import { doctors, getDoctor, getDoctors } from "@/data/doctors";
import { services } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { jsonLd, physicianSchema } from "@/lib/schema";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { DoctorPortrait } from "@/components/doctors/doctor-card";
import { BookAppointmentButton, CallButton, WhatsAppButton } from "@/components/cta/cta-buttons";
import { DraftBadge } from "@/components/ui/section-heading";
import { FinalCta } from "@/components/sections/final-cta";
import { TrackPageView } from "@/components/analytics/analytics";

export function generateStaticParams() {
  const published = getDoctors();
  // Prerender at least one path so the route builds before any profile is published;
  // unpublished slugs resolve to a 404 below.
  return (published.length ? published : doctors.slice(0, 1)).map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doctor = getDoctor(slug);
  if (!doctor) return {};
  return buildMetadata({
    title: `${doctor.name}${doctor.specialtyLabel ? `, ${doctor.specialtyLabel}` : ""} in Ajman`,
    description: `${doctor.name}${doctor.specialtyLabel ? `, ${doctor.specialtyLabel},` : ""} at Maple Medical Center, Al Rawda 3, Ajman. View profile and book an appointment.`,
    path: `/doctors/${doctor.slug}`,
    noIndex: doctor.status !== "verified",
  });
}

export default async function DoctorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doctor = getDoctor(slug);
  if (!doctor) notFound();

  const doctorServices = services.filter((s) => doctor.services.includes(s.slug));
  const firstName = doctor.name;

  return (
    <>
      {doctor.status === "verified" && (
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(physicianSchema(doctor))} />
      )}
      <TrackPageView event="doctor_profile_view" params={{ doctor: doctor.slug }} />

      <section className="bg-white">
        <div className="container-page pt-8 pb-16 md:pt-10 md:pb-24">
          <Breadcrumbs
            items={[
              { name: "Doctors", path: "/doctors" },
              { name: doctor.name, path: `/doctors/${doctor.slug}` },
            ]}
          />
          <div className="mt-10 grid gap-10 md:grid-cols-12 lg:gap-16">
            <div className="md:col-span-5 lg:col-span-4">
              <DoctorPortrait doctor={doctor} sizes="(min-width: 768px) 33vw, 100vw" preload />
            </div>
            <div className="md:col-span-7 lg:col-span-8">
              {doctor.status !== "verified" && <DraftBadge note={doctor.verificationNote} />}
              <h1 className="mt-4 text-display-xl text-ink">{doctor.name}</h1>
              <p className="mt-3 text-xl font-medium text-brand-700">
                {doctor.specialtyLabel ?? "Specialty to be confirmed"}
              </p>

              <dl className="mt-8 grid gap-6 border-y border-line py-8 sm:grid-cols-3">
                <div>
                  <dt className="flex items-center gap-2 eyebrow text-muted">
                    <Stethoscope className="size-4" aria-hidden="true" /> Services
                  </dt>
                  <dd className="mt-2 text-ink">
                    {doctorServices.length
                      ? doctorServices.map((s, i) => (
                          <span key={s.slug}>
                            {i > 0 && ", "}
                            <Link
                              href={`/services/${s.slug}`}
                              className="underline underline-offset-4 hover:text-brand-700"
                            >
                              {s.name}
                            </Link>
                          </span>
                        ))
                      : "To be confirmed"}
                  </dd>
                </div>
                <div>
                  <dt className="flex items-center gap-2 eyebrow text-muted">
                    <GraduationCap className="size-4" aria-hidden="true" /> Qualifications
                  </dt>
                  <dd className="mt-2 text-ink">{doctor.qualifications.join(", ") || "To be confirmed"}</dd>
                </div>
                <div>
                  <dt className="flex items-center gap-2 eyebrow text-muted">
                    <Languages className="size-4" aria-hidden="true" /> Languages
                  </dt>
                  <dd className="mt-2 text-ink">{doctor.languages.join(", ") || "To be confirmed"}</dd>
                </div>
              </dl>

              {doctor.bio.length > 0 && (
                <div className="mt-8 max-w-2xl space-y-4 text-lg leading-relaxed text-muted">
                  {doctor.bio.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              )}
              {doctor.licenceNumber && <p className="mt-6 text-sm text-muted">Licence no. {doctor.licenceNumber}</p>}

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <BookAppointmentButton
                  location="doctor_profile"
                  size="lg"
                  doctor={doctor.slug}
                  label={`Book with ${firstName}`}
                />
                <WhatsAppButton location="doctor_profile" size="lg" />
                <CallButton location="doctor_profile" size="lg" label="Call" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
