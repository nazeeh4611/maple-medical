import type { Service } from "@/types";
import { images } from "@/data/images";
import { showDraftContent } from "@/config/site";

/**
 * Specialties marked "reference" are listed on the clinic's Doctify profile.
 * Specialties marked "unconfirmed" are only mentioned in the profile description
 * and must be confirmed with the clinic before their status is changed — until then
 * they are hidden from the live site, the sitemap and structured data.
 *
 * Copy deliberately avoids naming specific procedures, equipment or outcomes.
 * Add those only once the clinic confirms what it offers.
 */
const bookingFaq = (name: string) => ({
  question: `How do I book a ${name.toLowerCase()} appointment?`,
  answer: `You can send an appointment request online, message us on WhatsApp, or call the clinic. Our team will contact you to confirm an available time. Appointment requests are not confirmed until you hear back from us.`,
});

const insuranceFaq = {
  question: "Will my insurance cover this visit?",
  answer:
    "Maple Medical Center works with a number of insurance providers, but coverage depends on your individual plan and policy terms. Please contact us with your insurance details before your visit so we can help you check.",
};

export const services: Service[] = [
  {
    slug: "general-medicine",
    name: "General Practice",
    shortName: "General Practice",
    status: "reference",
    summary:
      "Everyday medical care for adults — from new symptoms and minor illnesses to check-ups and ongoing health concerns.",
    metaTitle: "General Practice & GP Clinic in Ajman",
    metaDescription:
      "See a general practitioner at Maple Medical Center in Al Rawda 3, Ajman. Care for everyday illnesses, new symptoms and check-ups. Open daily 9 AM – 10 PM.",
    intro: [
      "General practice is often the first place to start when something doesn't feel right. Our general practitioners take the time to listen, examine you carefully and explain what they find in plain language.",
      "Whether you have a new symptom, a minor illness or simply want a check-up, your GP can assess you, recommend tests where appropriate, start treatment and refer you to a specialist when needed.",
    ],
    helpsWith: [
      "Coughs, colds, fevers and seasonal illnesses",
      "Stomach upsets and digestive complaints",
      "Headaches and general aches and pains",
      "Allergies and skin irritations",
      "Routine check-ups and health questions",
      "Medical advice and onward referrals",
    ],
    whoFor: "Adults and teenagers looking for everyday, first-contact medical care.",
    visitNotes: [
      "Bring your Emirates ID and insurance card, if you have one.",
      "Bring a list of any medicines you currently take.",
      "Arrive a few minutes early to complete registration.",
    ],
    image: images.generalPractice,
    schemaSpecialty: "PrimaryCare",
    faqs: [bookingFaq("General Practice"), insuranceFaq],
  },
  {
    slug: "internal-medicine",
    name: "Internal Medicine",
    shortName: "Internal Medicine",
    status: "reference",
    summary: "Assessment and long-term management of adult health conditions, with a focus on the whole person.",
    metaTitle: "Internal Medicine Clinic in Ajman",
    metaDescription:
      "Internal medicine at Maple Medical Center, Al Rawda 3, Ajman. Assessment and ongoing management of adult health conditions. Book an appointment today.",
    intro: [
      "Internal medicine focuses on the prevention, diagnosis and management of health conditions in adults. It is well suited to people with complex or long-standing symptoms, or more than one health condition to manage.",
      "Your physician will look at your overall health — not just a single symptom — and work with you on a clear, practical plan for managing your condition over time.",
    ],
    helpsWith: [
      "Ongoing management of long-term conditions",
      "Symptoms that are persistent or hard to explain",
      "Reviewing test results and next steps",
      "Medication reviews",
      "Preventative health advice for adults",
      "Coordinating care with other specialists",
    ],
    whoFor: "Adults with long-term health conditions or symptoms that need a thorough assessment.",
    visitNotes: [
      "Bring any previous test results, reports or discharge letters.",
      "Bring your current medicines or a list of them.",
      "Bring your Emirates ID and insurance card, if you have one.",
    ],
    image: images.internalMedicine,
    faqs: [bookingFaq("Internal Medicine"), insuranceFaq],
  },
  {
    slug: "paediatrics",
    name: "Paediatrics",
    shortName: "Paediatrics",
    status: "reference",
    summary: "Gentle, attentive medical care for babies, children and teenagers — and clear answers for parents.",
    metaTitle: "Paediatric Clinic & Paediatrician in Ajman",
    metaDescription:
      "Children's healthcare at Maple Medical Center, Al Rawda 3, Ajman. Care for babies, children and teenagers. Open every day 9 AM – 10 PM. Book an appointment.",
    intro: [
      "Children aren't small adults — they need care from clinicians who understand how they grow, how illnesses affect them differently, and how to keep a visit calm and reassuring.",
      "Our paediatric team cares for babies, children and teenagers, and makes sure parents leave with a clear understanding of what's going on and what to do next.",
    ],
    helpsWith: [
      "Fevers, coughs, colds and childhood infections",
      "Tummy upsets, vomiting and diarrhoea",
      "Rashes and skin concerns",
      "Growth and development questions",
      "General check-ups",
      "Advice and reassurance for parents",
    ],
    whoFor: "Babies, children and teenagers, accompanied by a parent or guardian.",
    visitNotes: [
      "A parent or legal guardian should accompany children under 18.",
      "Bring your child's vaccination record and any previous reports.",
      "Bring your child's Emirates ID and insurance card, if available.",
    ],
    image: images.babyCheckup,
    schemaSpecialty: "Pediatric",
    faqs: [
      bookingFaq("Paediatrics"),
      {
        question: "Can I bring more than one child to the same appointment?",
        answer:
          "Each child usually needs their own appointment so they can be assessed properly. Let us know when you book and our team will try to arrange consecutive times.",
      },
      insuranceFaq,
    ],
  },
  {
    slug: "obstetrics-gynaecology",
    name: "Obstetrics & Gynaecology",
    shortName: "Women's Health",
    status: "reference",
    summary:
      "Women's health care in a private, respectful setting — from routine gynaecological concerns to pregnancy care.",
    metaTitle: "Gynaecologist & Women's Health Clinic in Ajman",
    metaDescription:
      "Obstetrics and gynaecology at Maple Medical Center, Al Rawda 3, Ajman. Women's health care in a private, respectful setting. Book an appointment today.",
    intro: [
      "Our obstetrics and gynaecology service provides women's health care in a private and respectful environment, where you can talk openly and take your time.",
      "From routine gynaecological concerns to questions about pregnancy, your doctor will explain your options clearly and support you in making decisions that feel right for you.",
    ],
    helpsWith: [
      "Gynaecological consultations",
      "Menstrual concerns",
      "Pregnancy-related consultations",
      "Women's health check-ups",
      "Questions about contraception and family planning",
      "Referrals for further care when needed",
    ],
    whoFor: "Women and teenage girls at every stage of life.",
    visitNotes: [
      "Let our team know if you would prefer to be seen by a female doctor — we'll do our best to accommodate this.",
      "Bring any previous scans, reports or test results.",
      "Bring your Emirates ID and insurance card, if you have one.",
    ],
    image: images.womensHealth,
    schemaSpecialty: "Gynecologic",
    faqs: [bookingFaq("Obstetrics & Gynaecology"), insuranceFaq],
  },
  {
    slug: "family-medicine",
    name: "Family Medicine",
    shortName: "Family Medicine",
    status: "reference",
    summary: "Continuous, whole-family care — one clinic that gets to know your family's health over time.",
    metaTitle: "Family Doctor & Family Medicine in Ajman",
    metaDescription:
      "Looking for a family doctor in Ajman? Maple Medical Center in Al Rawda 3 offers family medicine for every generation. Open daily 9 AM – 10 PM.",
    intro: [
      "Family medicine is about continuity. Seeing a clinic that knows you — and your family's health history — makes it easier to spot changes early and plan care that fits your life.",
      "Our family medicine doctors care for patients of all ages, from children to grandparents, and can coordinate with our other specialties under one roof.",
    ],
    helpsWith: [
      "Everyday illnesses for every member of the family",
      "Long-term health follow-up",
      "Preventative health advice",
      "Health questions across different life stages",
      "Coordinating care with other specialists",
      "Medical advice and referrals",
    ],
    whoFor: "Individuals and families who want one trusted clinic for everyday care.",
    visitNotes: [
      "Bring Emirates IDs and insurance cards for each family member being seen.",
      "Bring a list of current medicines for each patient.",
      "Each patient usually needs their own appointment slot.",
    ],
    image: images.familyMedicine,
    schemaSpecialty: "PrimaryCare",
    faqs: [bookingFaq("Family Medicine"), insuranceFaq],
  },
  {
    slug: "dentistry",
    name: "Dentistry",
    shortName: "Dentistry",
    status: "reference",
    summary:
      "Dental care for adults and children in a calm, comfortable setting, with treatment options explained clearly.",
    metaTitle: "Dentist & Dental Clinic in Ajman",
    metaDescription:
      "Visit the dentist at Maple Medical Center, Al Rawda 3, Ajman. Dental check-ups and care for adults and children. Open every day. Book your dental appointment.",
    intro: [
      "Good dental care starts with a thorough examination and an honest conversation about what you need. Our dental team takes the time to explain your options so you can make informed decisions.",
      "We see adults and children, and aim to make every visit as calm and comfortable as possible — especially for patients who feel nervous about the dentist.",
    ],
    helpsWith: [
      "Dental check-ups and examinations",
      "Tooth pain and sensitivity",
      "Gum concerns",
      "Questions about tooth alignment",
      "Oral hygiene advice",
      "Children's dental visits",
    ],
    whoFor: "Adults and children who want a dental check-up or have a dental concern.",
    visitNotes: [
      "Let us know if you are in pain when you book so we can advise you on timing.",
      "Bring any previous dental X-rays or treatment records.",
      "Ask our team whether a specific treatment is available before booking.",
    ],
    image: images.dentistry,
    schemaSpecialty: "Dentistry",
    faqs: [
      bookingFaq("Dentistry"),
      {
        question: "Is dental treatment covered by insurance?",
        answer:
          "Dental coverage varies considerably between insurance plans, and some plans do not include dental care. Please contact us with your insurance details so we can help you check before your visit.",
      },
    ],
  },

  // ─── Mentioned in the profile description — CONFIRM WITH THE CLINIC ──────────
  {
    slug: "dermatology",
    name: "Dermatology",
    shortName: "Dermatology",
    status: "unconfirmed",
    summary: "Assessment and care for skin, hair and nail concerns.",
    metaTitle: "Dermatology Clinic in Ajman",
    metaDescription:
      "Skin, hair and nail care at Maple Medical Center, Al Rawda 3, Ajman. Book a dermatology consultation.",
    intro: [
      "Our dermatology service assesses common skin, hair and nail concerns and explains your treatment options clearly.",
    ],
    helpsWith: ["Rashes and skin irritation", "Acne", "Hair and nail concerns", "Skin check consultations"],
    whoFor: "Adults and children with skin, hair or nail concerns.",
    visitNotes: ["Bring photos if your symptoms come and go.", "Bring a list of products and medicines you use."],
    image: images.reassurance,
    schemaSpecialty: "Dermatology",
    faqs: [bookingFaq("Dermatology"), insuranceFaq],
  },
  {
    slug: "physiotherapy",
    name: "Physiotherapy",
    shortName: "Physiotherapy",
    status: "unconfirmed",
    summary: "Movement-focused care to help you recover, rebuild strength and stay active.",
    metaTitle: "Physiotherapy in Ajman",
    metaDescription:
      "Physiotherapy at Maple Medical Center, Al Rawda 3, Ajman. Support for recovery and mobility. Book an appointment.",
    intro: ["Our physiotherapy service supports recovery, mobility and strength with a personalised plan."],
    helpsWith: ["Back and neck pain", "Joint and muscle problems", "Recovery after injury", "Mobility and strength"],
    whoFor: "Adults recovering from injury or living with pain that affects movement.",
    visitNotes: ["Wear comfortable clothing.", "Bring any imaging reports or referral letters."],
    image: images.treatmentRoom,
    schemaSpecialty: "Physiotherapy",
    faqs: [bookingFaq("Physiotherapy"), insuranceFaq],
  },
  {
    slug: "health-screening",
    name: "Health Screening",
    shortName: "Health Screening",
    status: "unconfirmed",
    summary: "Preventative check-ups to help you understand your health and act early.",
    metaTitle: "Health Screening & Check-ups in Ajman",
    metaDescription:
      "Preventative health screening at Maple Medical Center, Al Rawda 3, Ajman. Book a health check-up.",
    intro: ["Health screening helps you understand your current health and spot potential issues early."],
    helpsWith: ["General health check-ups", "Preventative health advice", "Follow-up of results"],
    whoFor: "Adults who want a preventative health check.",
    visitNotes: ["Ask our team whether fasting is required before your appointment."],
    image: images.stethoscope,
    faqs: [bookingFaq("Health Screening"), insuranceFaq],
  },
  {
    slug: "laboratory",
    name: "Laboratory Testing",
    shortName: "Laboratory",
    status: "unconfirmed",
    summary: "Laboratory tests to support diagnosis and monitoring, with results reviewed by your doctor.",
    metaTitle: "Laboratory Tests in Ajman",
    metaDescription:
      "Laboratory testing at Maple Medical Center, Al Rawda 3, Ajman. Tests requested by your doctor, with results explained.",
    intro: ["Laboratory tests help your doctor diagnose conditions and monitor your health over time."],
    helpsWith: ["Tests requested by your doctor", "Monitoring of long-term conditions", "Results review"],
    whoFor: "Patients whose doctor has recommended laboratory tests.",
    visitNotes: ["Ask whether fasting is needed before your test."],
    image: images.laptopCare,
    schemaSpecialty: "LaboratoryScience",
    faqs: [bookingFaq("Laboratory Testing"), insuranceFaq],
  },
];

export const isPublishable = (status: Service["status"]) => status !== "unconfirmed" || showDraftContent;

/** Services visible on the site (confirmed/reference, plus drafts in preview mode). */
export const getServices = () => services.filter((s) => isPublishable(s.status));

/** Services that may appear in sitemap / structured data — never drafts. */
export const getIndexableServices = () => services.filter((s) => s.status !== "unconfirmed");

export const getService = (slug: string) => getServices().find((s) => s.slug === slug) ?? null;
