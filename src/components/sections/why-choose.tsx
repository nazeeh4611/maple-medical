import Image from "next/image";
import { CalendarClock, ClipboardList, HeartHandshake, MapPin, ShieldCheck, Users } from "lucide-react";
import { images } from "@/data/images";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";

/** Every point comes from the clinic's published profile — no invented awards or statistics. */
const reasons = [
  {
    icon: HeartHandshake,
    title: "Multidisciplinary care",
    body: "GP, internal medicine, paediatrics, women's health, family medicine and dentistry under one roof.",
  },
  {
    icon: Users,
    title: "For every age",
    body: "Babies, children, parents and grandparents — the whole family in one place.",
  },
  {
    icon: CalendarClock,
    title: "Open every day",
    body: "9 AM to 10 PM, including weekends, so care fits around work and school.",
  },
  {
    icon: ClipboardList,
    title: "Personalised plans",
    body: "Treatment tailored to your needs using evidence-based assessment and management.",
  },
  { icon: MapPin, title: "Easy to reach", body: "On Munah Street in Al Rawda 3, Ajman, with directions one tap away." },
  {
    icon: ShieldCheck,
    title: "Insurance support",
    body: "We work with many UAE insurers and help you check your plan before you visit.",
  },
];

export function WhyChoose() {
  return (
    <section aria-labelledby="why-title" className="bg-mist py-20 md:py-28">
      <div className="container-page grid items-center gap-14 lg:grid-cols-12">
        <div className="relative lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-float)]">
            <Image
              src={images.paediatrics.src}
              alt={images.paediatrics.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="card absolute -end-3 bottom-8 max-w-[15rem] p-5 sm:-end-8">
            <p className="font-display text-3xl text-brand-600">7 days</p>
            <p className="mt-1 text-sm leading-snug text-muted">a week, from 9 AM to 10 PM — including weekends.</p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <SectionHeading
            id="why-title"
            eyebrow="Why choose Maple"
            title="Caring, convenient healthcare close to home"
            intro="We believe good care starts with listening. Here's what you can expect at Maple Medical Center."
          />
          <ul className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {reasons.map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white text-brand-600 shadow-sm">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg text-ink">{title}</h3>
                  <p className="mt-1 leading-relaxed text-muted">{body}</p>
                </div>
              </li>
            ))}
          </ul>
          <ButtonLink href="/about" variant="outline" className="mt-10">
            About our clinic
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
