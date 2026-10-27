import Image from "next/image";
import type { ReactNode } from "react";
import type { SiteImage } from "@/types";
import { Breadcrumbs, type Crumb } from "@/components/layout/breadcrumbs";
import { Eyebrow } from "@/components/ui/section-heading";

/** Inner-page hero: soft tinted band with breadcrumbs, H1, intro, optional actions and photo. */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  intro,
  actions,
  image,
  aside,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  actions?: ReactNode;
  image?: SiteImage;
  aside?: ReactNode;
}) {
  const split = Boolean(image || aside);
  return (
    <section className="relative overflow-hidden bg-mist">
      <div aria-hidden="true" className="absolute -top-32 -end-32 size-[28rem] rounded-full bg-brand-100/50" />
      <div className="container-page relative pt-8 pb-14 md:pb-20">
        <Breadcrumbs items={crumbs} />
        <div className={split ? "mt-8 grid items-center gap-10 lg:grid-cols-2 lg:gap-14" : "mt-8 max-w-3xl"}>
          <div>
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <h1 className="mt-4 text-display-xl text-ink animate-rise">{title}</h1>
            {intro && <div className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{intro}</div>}
            {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
          </div>
          {image && (
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] bg-brand-100 shadow-[var(--shadow-float)]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                preload
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          )}
          {!image && aside}
        </div>
      </div>
    </section>
  );
}
