import Image from "next/image";
import Link from "next/link";
import { Languages } from "lucide-react";
import type { Doctor } from "@/types";
import { DraftBadge } from "@/components/ui/section-heading";

const initials = (name: string) =>
  name
    .replace(/^Dr\.?\s*/i, "")
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

/** Doctor portrait, or a neutral monogram until an approved photograph is supplied. */
export function DoctorPortrait({ doctor, sizes, preload }: { doctor: Doctor; sizes: string; preload?: boolean }) {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-sm)] bg-mist">
      {doctor.image ? (
        <Image
          src={doctor.image.src}
          alt={doctor.image.alt}
          fill
          sizes={sizes}
          preload={preload}
          className="object-cover"
        />
      ) : (
        <div
          className="flex size-full items-center justify-center"
          role="img"
          aria-label={`Photo of ${doctor.name} coming soon`}
        >
          <span className="font-display text-6xl text-brand-800/40">{initials(doctor.name)}</span>
        </div>
      )}
    </div>
  );
}

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <article className="group relative flex flex-col">
      <DoctorPortrait doctor={doctor} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 100vw" />
      {doctor.status !== "verified" && (
        <div className="mt-3">
          <DraftBadge note={doctor.verificationNote} />
        </div>
      )}
      <h3 className="mt-4 text-2xl text-ink">
        <Link href={`/doctors/${doctor.slug}`} className="after:absolute after:inset-0">
          {doctor.name}
        </Link>
      </h3>
      <p className="mt-1 font-medium text-brand-700">{doctor.specialtyLabel ?? "Specialty to be confirmed"}</p>
      {doctor.qualifications.length > 0 && (
        <p className="mt-2 text-sm text-muted">{doctor.qualifications.join(", ")}</p>
      )}
      {doctor.languages.length > 0 && (
        <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
          <Languages className="size-4" aria-hidden="true" />
          <span className="sr-only">Languages:</span> {doctor.languages.join(", ")}
        </p>
      )}
      <div className="relative z-10 mt-4 flex gap-5 text-sm font-semibold">
        <Link
          href={`/book-appointment?doctor=${doctor.slug}`}
          data-track="appointment_cta_click"
          data-track-location="doctor_card"
          className="text-brand-700 underline decoration-brand-600/40 underline-offset-4 hover:decoration-brand-600"
        >
          Book with {doctor.name}
        </Link>
      </div>
    </article>
  );
}
