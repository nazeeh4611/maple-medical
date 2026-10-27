import type { Doctor } from "@/types";
import { showDraftContent } from "@/config/site";

/**
 * ⚠️ NO DOCTOR DETAILS HAVE BEEN CONFIRMED YET.
 *
 * The clinic's public Doctify profile has no staff directory. The first names below
 * appear only in patient reviews. Before publishing a profile, collect from the clinic:
 *   - full name and title, as it appears on the professional licence
 *   - specialty and the services the doctor provides
 *   - qualifications and licensing authority / licence number
 *   - languages spoken
 *   - a short bio approved by the doctor
 *   - a professional photograph (with consent)
 * Then set `status: "verified"`.
 *
 * Unverified profiles are hidden from the live site and only appear in local preview
 * (SHOW_DRAFT_CONTENT=true), clearly labelled as drafts.
 */
export const doctors: Doctor[] = [
  {
    slug: "dr-aparna",
    name: "Dr. Aparna",
    status: "unconfirmed",
    services: [],
    specialtyLabel: null,
    qualifications: [],
    languages: [],
    bio: [],
    image: null,
    licenceNumber: null,
    verificationNote: "Named in Doctify patient reviews. Full name, specialty and credentials required.",
  },
  {
    slug: "dr-simran",
    name: "Dr. Simran",
    status: "unconfirmed",
    services: [],
    specialtyLabel: null,
    qualifications: [],
    languages: [],
    bio: [],
    image: null,
    licenceNumber: null,
    verificationNote: "Named in a Doctify patient review. Full name, specialty and credentials required.",
  },
  {
    slug: "dr-rabia",
    name: "Dr. Rabia",
    status: "unconfirmed",
    services: [],
    specialtyLabel: null,
    qualifications: [],
    languages: [],
    bio: [],
    image: null,
    licenceNumber: null,
    verificationNote: "Named in a Doctify patient review. Full name, specialty and credentials required.",
  },
];

/** Only fully verified doctors are ever published. */
const isPublishable = (d: Doctor) => d.status === "verified" || showDraftContent;

export const getDoctors = () => doctors.filter(isPublishable);

export const getIndexableDoctors = () => doctors.filter((d) => d.status === "verified");

export const getDoctor = (slug: string) => getDoctors().find((d) => d.slug === slug) ?? null;

export const getDoctorsForService = (serviceSlug: string) =>
  getDoctors().filter((d) => d.services.includes(serviceSlug));
