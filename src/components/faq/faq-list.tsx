import { ChevronDown } from "lucide-react";
import type { Faq } from "@/types";
import { faqSchema, jsonLd } from "@/lib/schema";

/**
 * Accessible accordion using native <details>/<summary> — keyboard and screen-reader
 * support without JavaScript, and answers stay in the HTML for search engines.
 */
export function FaqList({ faqs, withSchema = false }: { faqs: Faq[]; withSchema?: boolean }) {
  return (
    <>
      {withSchema && <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema(faqs))} />}
      <div className="space-y-3">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="group rounded-[var(--radius-md)] border border-line bg-white transition-shadow open:shadow-[var(--shadow-card)]"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-6 px-5 py-4 text-start md:px-6 md:py-5">
              <h3 className="font-sans text-[1.0625rem] font-bold tracking-normal text-ink md:text-lg">
                {faq.question}
              </h3>
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600 transition-colors group-open:bg-brand-600 group-open:text-white">
                <ChevronDown
                  className="size-4 transition-transform duration-200 group-open:rotate-180"
                  aria-hidden="true"
                />
              </span>
            </summary>
            <p className="px-5 pb-5 leading-relaxed text-muted md:px-6 md:pe-16">{faq.answer}</p>
          </details>
        ))}
      </div>
    </>
  );
}
