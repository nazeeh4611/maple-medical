import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getDoctors } from "@/data/doctors";
import { DoctorCard } from "@/components/doctors/doctor-card";
import { SectionHeading } from "@/components/ui/section-heading";

/** Renders only when at least one doctor profile is published. */
export function DoctorsSection() {
  const doctors = getDoctors().slice(0, 4);
  if (doctors.length === 0) return null;

  return (
    <section aria-labelledby="doctors-title" className="bg-white py-20 md:py-28">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            id="doctors-title"
            eyebrow="Our doctors"
            title="Meet the team caring for you"
            intro="Get to know the clinicians at Maple Medical Center before your visit."
          />
          <Link
            href="/doctors"
            className="group inline-flex shrink-0 items-center gap-2 font-semibold text-brand-800 hover:text-brand-700"
          >
            View all doctors
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 rtl-flip" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {doctors.map((d) => (
            <DoctorCard key={d.slug} doctor={d} />
          ))}
        </div>
      </div>
    </section>
  );
}
