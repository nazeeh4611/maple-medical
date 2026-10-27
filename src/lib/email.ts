import "server-only";
import { siteConfig } from "@/config/site";
import { getDoctors } from "@/data/doctors";
import { services } from "@/data/services";
import { formatDate } from "@/lib/utils";
import { timeWindows, toE164, type AppointmentData } from "@/lib/validation";

const env = {
  apiKey: process.env.RESEND_API_KEY?.trim(),
  to: process.env.APPOINTMENT_EMAIL_TO?.trim(),
  from: process.env.APPOINTMENT_EMAIL_FROM?.trim() || "Maple Website <onboarding@resend.dev>",
};

/** True when online appointment requests can be delivered to the clinic. */
export const emailEnabled = Boolean(env.apiKey && env.to);

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export function describeRequest(data: AppointmentData) {
  const service = services.find((s) => s.slug === data.service)?.name ?? "Not sure / general consultation";
  const doctor = getDoctors().find((d) => d.slug === data.doctor)?.name ?? "No preference";
  const time = timeWindows.find((t) => t.value === data.time)?.label ?? data.time;
  return [
    ["Patient name", data.name],
    ["Phone", toE164(data.phone)],
    ["Email", data.email || "—"],
    ["Service", service],
    ["Preferred doctor", doctor],
    ["Preferred date", formatDate(data.date)],
    ["Preferred time", time],
    ["Patient type", data.patientType === "new" ? "New patient" : "Existing patient"],
    ["Message", data.message || "—"],
  ] as const;
}

export async function sendAppointmentEmail(data: AppointmentData) {
  if (!emailEnabled) throw new Error("Email delivery is not configured");

  const rows = describeRequest(data);
  const text = [
    `New appointment request via ${siteConfig.name} website`,
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "This is a request only — please contact the patient to confirm.",
  ].join("\n");
  const html = `<div style="font-family:system-ui,sans-serif;color:#17201d">
<h2 style="margin:0 0 16px">New appointment request</h2>
<table cellpadding="8" style="border-collapse:collapse">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="border-bottom:1px solid #e2dccf;color:#56625d">${escapeHtml(k)}</td><td style="border-bottom:1px solid #e2dccf"><strong>${escapeHtml(v)}</strong></td></tr>`,
    )
    .join("")}</table>
<p style="color:#56625d;margin-top:16px">This is a request only — please contact the patient to confirm the appointment.</p></div>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: env.from,
      to: env.to!.split(",").map((s) => s.trim()),
      subject: `Appointment request — ${rows[3][1]} — ${rows[5][1]}`,
      text,
      html,
      ...(data.email && { reply_to: data.email }),
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!res.ok) {
    throw new Error(`Email provider responded with ${res.status}`);
  }
}
