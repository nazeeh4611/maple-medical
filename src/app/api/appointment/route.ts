import { NextResponse, type NextRequest } from "next/server";
import { appointmentSchema } from "@/lib/validation";
import { emailEnabled, sendAppointmentEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";
import { getServices } from "@/data/services";
import { getDoctors } from "@/data/doctors";

const MIN_FILL_MS = 3000;
const MAX_BODY_BYTES = 8_000;

const json = (status: number, body: Record<string, unknown>, headers?: HeadersInit) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });

const clientIp = (req: NextRequest) =>
  req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";

export async function POST(req: NextRequest) {
  // Same-origin only (blocks cross-site form posts).
  const origin = req.headers.get("origin");
  if (origin && new URL(origin).host !== req.headers.get("host")) {
    return json(403, { ok: false, code: "forbidden", message: "Request not allowed." });
  }
  if (!req.headers.get("content-type")?.includes("application/json")) {
    return json(415, { ok: false, code: "unsupported", message: "Unsupported request." });
  }

  const limit = rateLimit(`appointment:${clientIp(req)}`, { limit: 5, windowMs: 10 * 60_000 });
  if (!limit.ok) {
    return json(
      429,
      {
        ok: false,
        code: "rate_limited",
        message: "Too many requests. Please try again later, or contact us on WhatsApp.",
      },
      { "Retry-After": String(limit.retryAfter) },
    );
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) {
    return json(413, { ok: false, code: "too_large", message: "Request too large." });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json(400, { ok: false, code: "invalid", message: "Invalid request." });
  }

  const parsed = appointmentSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors = Object.fromEntries(parsed.error.issues.map((i) => [String(i.path[0] ?? "form"), i.message]));
    return json(422, { ok: false, code: "validation", message: "Please check the highlighted fields.", fieldErrors });
  }
  const data = parsed.data;

  // Honeypot / timing: pretend success so bots learn nothing.
  if (data.company || (data.startedAt && Date.now() - data.startedAt < MIN_FILL_MS)) {
    return json(200, { ok: true });
  }

  // Only accept known services/doctors.
  const validService = data.service === "not-sure" || getServices().some((s) => s.slug === data.service);
  const validDoctor = !data.doctor || getDoctors().some((d) => d.slug === data.doctor);
  if (!validService || !validDoctor) {
    return json(422, { ok: false, code: "validation", message: "Please choose a service from the list." });
  }

  if (!emailEnabled) {
    return json(503, {
      ok: false,
      code: "not_configured",
      message: "Online requests are temporarily unavailable. Please contact us on WhatsApp or by phone.",
    });
  }

  try {
    await sendAppointmentEmail(data);
  } catch {
    // Never log submitted personal data.
    console.error("[appointment] email delivery failed");
    return json(502, {
      ok: false,
      code: "delivery_failed",
      message: "We couldn't send your request just now. Please try again, or contact us on WhatsApp or by phone.",
    });
  }

  return json(200, { ok: true });
}
