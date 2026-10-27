import { ArrowUpRight, BadgeCheck, Quote } from "lucide-react";
import { reviews, reviewSummary } from "@/data/reviews";
import type { Review } from "@/types";
import { formatDate } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stars } from "@/components/reviews/stars";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="card flex h-full flex-col p-6 md:p-7">
      <div className="flex items-center justify-between">
        <Stars rating={review.rating} className="text-base" />
        <Quote className="size-7 text-brand-100" aria-hidden="true" />
      </div>
      <blockquote className="mt-4 flex-1 text-[1.0625rem] leading-relaxed text-ink">
        <p>&ldquo;{review.excerpt}&rdquo;</p>
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-4 text-sm">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
          <BadgeCheck className="size-5" aria-hidden="true" />
        </span>
        <span className="min-w-0">
          <span className="block font-bold text-ink">{review.author}</span>
          <span className="block text-muted">
            <time dateTime={review.date}>{formatDate(review.date)}</time> ·{" "}
            <a
              href={review.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-700 hover:underline"
            >
              {review.source}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

export function ReviewsSection({ limit = 6 }: { limit?: number }) {
  const shown = reviews.slice(0, limit);
  return (
    <section aria-labelledby="reviews-title" className="bg-mist py-20 md:py-28">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading id="reviews-title" eyebrow="Patient reviews" title="What our patients say" />
          <div className="card flex items-center gap-4 px-5 py-4">
            <p className="font-display text-4xl text-ink">{reviewSummary.rating}</p>
            <div className="text-sm text-muted">
              <Stars rating={reviewSummary.rating} className="text-base" />
              <p className="mt-1">
                {reviewSummary.count} verified reviews on {reviewSummary.source} · as of{" "}
                <time dateTime={reviewSummary.asOf}>{formatDate(reviewSummary.asOf)}</time>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted">
          Excerpts are shown exactly as written by patients.{" "}
          <a
            href={reviewSummary.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-bold text-brand-700 hover:underline"
          >
            Read all reviews on Doctify
            <ArrowUpRight className="size-4 rtl-flip" aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </p>
      </div>
    </section>
  );
}
