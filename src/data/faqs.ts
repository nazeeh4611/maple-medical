import type { Faq } from "@/types";
import { siteConfig } from "@/config/site";
import { getServices } from "@/data/services";

const specialtyList = () => {
  const names = getServices().map((s) => s.name);
  return names.length > 1 ? `${names.slice(0, -1).join(", ")} and ${names.at(-1)}` : names.join("");
};

/** General FAQs. Every answer must be factual — re-check whenever business details change. */
export const getFaqs = (): Faq[] => [
  {
    question: "Where is Maple Medical Center located?",
    answer: `We are at ${siteConfig.address.singleLine}. You can open directions in Google Maps from our Contact page or the location section on our homepage.`,
  },
  {
    question: "What are the clinic opening hours?",
    answer:
      "We are open every day of the week, including weekends, from 9:00 AM to 10:00 PM. Hours may differ on public holidays — please call ahead to check.",
  },
  {
    question: "How can I book an appointment?",
    answer: `You can send an appointment request through our website, message us on WhatsApp at ${siteConfig.whatsapp.display}, or call us on ${siteConfig.phone.display}. Online requests are not confirmed until a member of our team contacts you.`,
  },
  {
    question: "Which medical specialties are available?",
    answer: `Maple Medical Center offers ${specialtyList()}. Contact us if you'd like to check whether a specific treatment or doctor is available.`,
  },
  {
    question: "Does the clinic accept insurance?",
    answer:
      "Yes, we work with a number of insurance providers. Coverage depends on your individual plan, so please share your insurance details with us before your visit and our team will help you check.",
  },
  {
    question: "Can I contact the clinic through WhatsApp?",
    answer: `Yes. You can message us on WhatsApp at ${siteConfig.whatsapp.display} to ask a question or request an appointment. Please avoid sharing detailed medical information over WhatsApp.`,
  },
  {
    question: "Does the clinic provide care for children?",
    answer:
      "Yes. We care for both adults and children, and our paediatrics service is dedicated to babies, children and teenagers. Children under 18 should be accompanied by a parent or legal guardian.",
  },
  {
    question: "How can I get directions to the clinic?",
    answer: `Use the "Get directions" button on our website to open Google Maps with our location pre-filled. Our address is ${siteConfig.address.singleLine}.`,
  },
  {
    question: "Is this website suitable for medical emergencies?",
    answer:
      "No. If you have a medical emergency, call 998 for an ambulance or go to the nearest hospital emergency department immediately. Do not use the appointment form or WhatsApp for emergencies.",
  },
];
