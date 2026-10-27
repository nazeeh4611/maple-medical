"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { useForm, useWatch, type FieldErrors, type Resolver } from "react-hook-form";
import { CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";
import {
  addDays,
  appointmentSchema,
  MAX_BOOKING_DAYS_AHEAD,
  MESSAGE_MAX,
  timeWindows,
  todayInDubai,
  type AppointmentData,
  type AppointmentInput,
} from "@/lib/validation";
import { track } from "@/lib/analytics";
import { formatDate } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { buttonClass } from "@/components/ui/button";

type Option = { value: string; label: string };

type Props = {
  services: Option[];
  doctors: Option[];
  /** When false, the form validates and hands the request off to WhatsApp instead of email. */
  emailEnabled: boolean;
  whatsappNumber: string;
  phoneHref: string;
  phoneDisplay: string;
};

/** Minimal Zod → React Hook Form resolver (avoids an extra dependency). */
const zodResolver: Resolver<AppointmentInput, unknown, AppointmentData> = async (values) => {
  const result = appointmentSchema.safeParse(values);
  if (result.success) return { values: result.data, errors: {} };
  const errors: FieldErrors<AppointmentInput> = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0] as keyof AppointmentInput;
    if (key && !errors[key]) errors[key] = { type: issue.code, message: issue.message };
  }
  return { values: {}, errors };
};

const inputClass =
  "block w-full rounded-[var(--radius-sm)] border border-line-strong bg-white px-3.5 py-3 text-base text-ink placeholder:text-muted/70 transition-colors hover:border-brand-700/50 focus:border-brand-700 focus:outline-2 focus:outline-offset-0 focus:outline-brand-700/25 aria-invalid:border-alert";

function Field({
  id,
  label,
  optional,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between gap-2 text-[0.9375rem] font-semibold text-ink">
        {label}
        {optional && <span className="text-xs font-normal text-muted">Optional</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-sm text-muted">
          {hint}
        </p>
      )}
      <div className="mt-2">{children}</div>
      {error && (
        <p id={`${id}-error`} className="mt-2 flex items-start gap-1.5 text-sm font-medium text-alert">
          <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

const describedBy = (id: string, opts: { hint?: boolean; error?: boolean }) =>
  [opts.hint && `${id}-hint`, opts.error && `${id}-error`].filter(Boolean).join(" ") || undefined;

const noopSubscribe = () => () => {};

type Status =
  { kind: "idle" } | { kind: "success" } | { kind: "whatsapp"; url: string } | { kind: "error"; message: string };

export function AppointmentForm({ services, doctors, emailEnabled, whatsappNumber, phoneHref, phoneDisplay }: Props) {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const statusRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  // Today's date in Dubai — client-only (undefined during prerender/hydration, so no stale build-time value).
  const today = useSyncExternalStore(noopSubscribe, todayInDubai, () => undefined);
  const dateBounds = today ? { min: today, max: addDays(today, MAX_BOOKING_DAYS_AHEAD) } : {};

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentInput, unknown, AppointmentData>({
    resolver: zodResolver,
    mode: "onTouched",
    defaultValues: { name: "", phone: "", email: "", service: "", doctor: "", date: "", message: "", company: "" },
  });

  // Client-only: form start time and ?service= / ?doctor= preselection.
  useEffect(() => {
    setValue("startedAt", Date.now());
    const params = new URLSearchParams(window.location.search);
    const service = params.get("service");
    const doctor = params.get("doctor");
    if (service && services.some((s) => s.value === service)) setValue("service", service);
    if (doctor && doctors.some((d) => d.value === doctor)) setValue("doctor", doctor);
  }, [services, doctors, setValue]);

  useEffect(() => {
    if (status.kind !== "idle") statusRef.current?.focus();
  }, [status]);

  const messageLength = useWatch({ control, name: "message" })?.length ?? 0;
  const selectedService = useWatch({ control, name: "service" });
  const serviceLabel = services.find((s) => s.value === selectedService && s.value !== "not-sure")?.label;

  const buildWhatsAppUrl = (data?: AppointmentData) => {
    const lines = [
      serviceLabel
        ? `Hello Maple Medical Center, I would like to book an appointment for ${serviceLabel}.`
        : "Hello Maple Medical Center, I would like to book an appointment.",
    ];
    if (data) {
      const time = timeWindows.find((t) => t.value === data.time)?.label;
      lines.push(`Preferred date: ${formatDate(data.date)}`, `Preferred time: ${time}`);
    }
    // Intentionally excludes name, phone, email and message — no personal or medical details in URLs.
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
  };

  const onSubmit = async (data: AppointmentData) => {
    if (!emailEnabled) {
      track("appointment_form_whatsapp", { service: data.service });
      setStatus({ kind: "whatsapp", url: buildWhatsAppUrl(data) });
      return;
    }

    try {
      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        message?: string;
        fieldErrors?: Record<string, string>;
      };

      if (res.ok && body.ok) {
        track("appointment_form_submit", { service: data.service });
        setStatus({ kind: "success" });
        reset();
        return;
      }
      if (body.fieldErrors) {
        for (const [field, message] of Object.entries(body.fieldErrors)) {
          setError(field as keyof AppointmentInput, { type: "server", message });
        }
      }
      setStatus({ kind: "error", message: body.message ?? "Something went wrong. Please try again." });
    } catch {
      setStatus({
        kind: "error",
        message: "We couldn't reach the server. Please check your connection and try again, or contact us on WhatsApp.",
      });
    }
  };

  if (status.kind === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="rounded-[var(--radius-md)] border border-brand-700/25 bg-brand-50 p-8 outline-none"
      >
        <CircleCheck className="size-10 text-brand-700" aria-hidden="true" />
        <h2 className="mt-5 text-display-md text-ink">Thank you — we&rsquo;ve received your request</h2>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          This is an <strong className="text-ink">appointment request, not a confirmed booking</strong>. A member of our
          team will contact you by phone to confirm an available time. If your request is urgent, please call us on{" "}
          <a href={phoneHref} className="font-semibold text-brand-800 underline underline-offset-4">
            {phoneDisplay}
          </a>
          .
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className={buttonClass("secondary")}>
            Back to home
          </Link>
          <button type="button" onClick={() => setStatus({ kind: "idle" })} className={buttonClass("outline")}>
            Send another request
          </button>
        </div>
      </div>
    );
  }

  if (status.kind === "whatsapp") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="rounded-[var(--radius-md)] border border-brand-700/25 bg-brand-50 p-8 outline-none"
      >
        <WhatsAppIcon className="size-10 text-brand-700" />
        <h2 className="mt-5 text-display-md text-ink">One last step: send us a WhatsApp message</h2>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Tap the button below to open WhatsApp with your preferred service, date and time already written. Send the
          message and our team will reply to confirm your appointment.
        </p>
        <p className="mt-3 text-sm text-muted">Your request isn&rsquo;t sent until you send the WhatsApp message.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={status.url}
            target="_blank"
            rel="noopener noreferrer"
            data-track="whatsapp_click"
            data-track-location="booking_handoff"
            className={buttonClass("primary", "lg")}
          >
            <WhatsAppIcon className="size-5" />
            Open WhatsApp
          </a>
          <button type="button" onClick={() => setStatus({ kind: "idle" })} className={buttonClass("ghost", "lg")}>
            Edit my details
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-describedby={`${uid}-required-note`} className="space-y-7">
      <p id={`${uid}-required-note`} className="text-sm text-muted">
        All fields are required unless marked optional.
      </p>

      {status.kind === "error" && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="rounded-[var(--radius-sm)] border border-alert/40 bg-alert-soft p-5 outline-none"
        >
          <p className="flex items-start gap-2 font-semibold text-alert">
            <CircleAlert className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
            {status.message}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              data-track="whatsapp_click"
              data-track-location="booking_error"
              className={buttonClass("secondary", "sm")}
            >
              <WhatsAppIcon className="size-4" /> Continue on WhatsApp
            </a>
            <a
              href={phoneHref}
              data-track="phone_click"
              data-track-location="booking_error"
              className={buttonClass("outline", "sm")}
            >
              Call {phoneDisplay}
            </a>
          </div>
        </div>
      )}

      <fieldset className="space-y-6">
        <legend className="eyebrow mb-6 text-brand-700">Patient details</legend>
        <div className="grid gap-6 sm:grid-cols-2">
          <Field id={id("name")} label="Patient full name" error={errors.name?.message}>
            <input
              id={id("name")}
              type="text"
              autoComplete="name"
              aria-invalid={!!errors.name}
              aria-describedby={describedBy(id("name"), { error: !!errors.name })}
              className={inputClass}
              {...register("name")}
            />
          </Field>
          <Field
            id={id("phone")}
            label="Mobile number"
            hint="UAE number, so we can confirm your appointment."
            error={errors.phone?.message}
          >
            <input
              id={id("phone")}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="050 123 4567"
              aria-invalid={!!errors.phone}
              aria-describedby={describedBy(id("phone"), { hint: true, error: !!errors.phone })}
              className={inputClass}
              {...register("phone")}
            />
          </Field>
        </div>
        <Field id={id("email")} label="Email address" optional error={errors.email?.message}>
          <input
            id={id("email")}
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={describedBy(id("email"), { error: !!errors.email })}
            className={inputClass}
            {...register("email")}
          />
        </Field>

        <div>
          <fieldset aria-describedby={errors.patientType ? id("patientType-error") : undefined}>
            <legend className="text-[0.9375rem] font-semibold text-ink">
              Have you visited Maple Medical Center before?
            </legend>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {[
                { value: "new", label: "No, I'm a new patient" },
                { value: "existing", label: "Yes, I've visited before" },
              ].map((o) => (
                <label
                  key={o.value}
                  className="flex cursor-pointer items-center gap-3 rounded-[var(--radius-sm)] border border-line-strong bg-white px-4 py-3.5 text-[0.9375rem] has-checked:border-brand-700 has-checked:bg-brand-50 has-focus-visible:outline-2 has-focus-visible:outline-brand-600"
                >
                  <input
                    type="radio"
                    value={o.value}
                    className="size-4 accent-brand-700"
                    {...register("patientType")}
                  />
                  {o.label}
                </label>
              ))}
            </div>
          </fieldset>
          {errors.patientType && (
            <p id={id("patientType-error")} className="mt-2 flex items-start gap-1.5 text-sm font-medium text-alert">
              <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {errors.patientType.message}
            </p>
          )}
        </div>
      </fieldset>

      <div className="border-t border-line pt-7">
        <fieldset className="space-y-6">
          <legend className="eyebrow mb-6 text-brand-700">Appointment preferences</legend>
          <div className={doctors.length > 0 ? "grid gap-6 sm:grid-cols-2" : "grid gap-6"}>
            <Field id={id("service")} label="Service" error={errors.service?.message}>
              <select
                id={id("service")}
                aria-invalid={!!errors.service}
                aria-describedby={describedBy(id("service"), { error: !!errors.service })}
                className={inputClass}
                {...register("service")}
              >
                <option value="">Choose a service</option>
                {services.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </Field>
            {doctors.length > 0 && (
              <Field id={id("doctor")} label="Preferred doctor" optional error={errors.doctor?.message}>
                <select id={id("doctor")} className={inputClass} {...register("doctor")}>
                  <option value="">No preference</option>
                  {doctors.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </Field>
            )}
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <Field id={id("date")} label="Preferred date" error={errors.date?.message}>
              <input
                id={id("date")}
                type="date"
                min={dateBounds.min}
                max={dateBounds.max}
                aria-invalid={!!errors.date}
                aria-describedby={describedBy(id("date"), { error: !!errors.date })}
                className={inputClass}
                {...register("date")}
              />
            </Field>
            <Field id={id("time")} label="Preferred time" error={errors.time?.message}>
              <select
                id={id("time")}
                aria-invalid={!!errors.time}
                aria-describedby={describedBy(id("time"), { error: !!errors.time })}
                className={inputClass}
                defaultValue=""
                {...register("time")}
              >
                <option value="" disabled>
                  Choose a time
                </option>
                {timeWindows.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          {emailEnabled && (
            <Field
              id={id("message")}
              label="Anything we should know?"
              optional
              hint="E.g. accessibility needs or a preferred language. Please don't include detailed medical information."
              error={errors.message?.message}
            >
              <textarea
                id={id("message")}
                rows={3}
                maxLength={MESSAGE_MAX}
                aria-invalid={!!errors.message}
                aria-describedby={describedBy(id("message"), { hint: true, error: !!errors.message })}
                className={inputClass}
                {...register("message")}
              />
              <p className="mt-1 text-end text-xs text-muted" aria-live="polite">
                {messageLength}/{MESSAGE_MAX}
              </p>
            </Field>
          )}
        </fieldset>
      </div>

      {/* Honeypot: hidden from people and assistive tech, attractive to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id("company")}>Company</label>
        <input id={id("company")} type="text" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      <div className="border-t border-line pt-7">
        <label className="flex cursor-pointer items-start gap-3 text-[0.9375rem] leading-relaxed text-ink">
          <input
            type="checkbox"
            className="mt-1 size-4.5 shrink-0 accent-brand-700"
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? id("consent-error") : undefined}
            {...register("consent")}
          />
          <span>
            I agree to Maple Medical Center contacting me about this request, and I have read the{" "}
            <Link
              href="/privacy-policy"
              target="_blank"
              className="font-semibold text-brand-800 underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        {errors.consent && (
          <p id={id("consent-error")} className="mt-2 flex items-start gap-1.5 text-sm font-medium text-alert">
            <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {errors.consent.message}
          </p>
        )}
      </div>

      <div className="space-y-4">
        <button type="submit" disabled={isSubmitting} className={buttonClass("primary", "lg", "w-full sm:w-auto")}>
          {isSubmitting ? (
            <>
              <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />
              Sending request…
            </>
          ) : emailEnabled ? (
            "Request appointment"
          ) : (
            <>
              <WhatsAppIcon className="size-5" />
              Continue to WhatsApp
            </>
          )}
        </button>
        <p className="text-sm text-muted">
          {emailEnabled
            ? "This sends an appointment request. Your appointment is confirmed only when our team contacts you."
            : "You'll review and send the request in WhatsApp. Your appointment is confirmed only when our team replies."}
        </p>
      </div>
    </form>
  );
}
