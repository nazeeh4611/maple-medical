import { z } from "zod";

/** Strips spaces, dashes, dots and brackets. */
export const normalisePhone = (value: string) => value.replace(/[\s\-().]/g, "");

/**
 * UAE numbers: mobile (05X XXX XXXX) or landline (0X XXX XXXX, area codes 2–4, 6–9),
 * with optional +971 / 00971 country code (leading 0 dropped after the code).
 */
const UAE_PHONE = /^(?:(?:\+971|00971)(?:5\d{8}|[2-46-9]\d{7})|0(?:5\d{8}|[2-46-9]\d{7}))$/;

export const isUaePhone = (value: string) => UAE_PHONE.test(normalisePhone(value));

/** Returns E.164 (+9715XXXXXXXX) for a valid UAE number. */
export const toE164 = (value: string) => {
  const n = normalisePhone(value);
  if (n.startsWith("+971")) return n;
  if (n.startsWith("00971")) return `+${n.slice(2)}`;
  return `+971${n.slice(1)}`;
};

export const timeWindows = [
  { value: "morning", label: "Morning (9 AM – 12 PM)" },
  { value: "afternoon", label: "Afternoon (12 PM – 5 PM)" },
  { value: "evening", label: "Evening (5 PM – 10 PM)" },
  { value: "any", label: "Any time" },
] as const;

export type TimeWindow = (typeof timeWindows)[number]["value"];

/** Today's date (YYYY-MM-DD) in the clinic's time zone. */
export const todayInDubai = (now = new Date()) =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Dubai" }).format(now);

export const addDays = (isoDate: string, days: number) => {
  const d = new Date(`${isoDate}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
};

export const MAX_BOOKING_DAYS_AHEAD = 90;
export const MESSAGE_MAX = 500;

/**
 * Shared by the client form and the API route. Intentionally collects no medical history —
 * the optional message is limited and patients are asked not to include clinical details.
 */
export const appointmentSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Please enter the patient's full name.")
      .max(80, "Please keep the name under 80 characters."),
    phone: z
      .string()
      .trim()
      .min(1, "Please enter a phone number so we can confirm your appointment.")
      .refine(isUaePhone, "Please enter a valid UAE number, e.g. 050 123 4567 or +971 50 123 4567."),
    email: z
      .union([z.literal(""), z.email("Please enter a valid email address, or leave this blank.").max(120)])
      .optional(),
    service: z.string().trim().min(1, "Please choose a service, or select “Not sure”."),
    doctor: z.string().trim().max(80).optional(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Please choose a preferred date."),
    time: z.enum(["morning", "afternoon", "evening", "any"], { error: "Please choose a preferred time." }),
    patientType: z.enum(["new", "existing"], { error: "Please tell us if you have visited us before." }),
    message: z.string().trim().max(MESSAGE_MAX, `Please keep your message under ${MESSAGE_MAX} characters.`).optional(),
    consent: z.literal(true, { error: "Please confirm you agree so we can contact you." }),
    /** Honeypot — should stay empty; the API silently drops filled submissions. */
    company: z.string().max(200).optional(),
    /** ms timestamp when the form was rendered (basic bot timing check). */
    startedAt: z.number().int().nonnegative().optional(),
  })
  .superRefine((data, ctx) => {
    const today = todayInDubai();
    if (data.date < today) {
      ctx.addIssue({ code: "custom", path: ["date"], message: "Please choose today or a future date." });
    } else if (data.date > addDays(today, MAX_BOOKING_DAYS_AHEAD)) {
      ctx.addIssue({
        code: "custom",
        path: ["date"],
        message: `Please choose a date within the next ${MAX_BOOKING_DAYS_AHEAD} days.`,
      });
    }
  });

export type AppointmentInput = z.input<typeof appointmentSchema>;
export type AppointmentData = z.output<typeof appointmentSchema>;
