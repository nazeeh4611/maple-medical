import type { SiteImage } from "@/types";

import generalPractice from "../../public/images/general-practice.jpg";
import internalMedicine from "../../public/images/internal-medicine.jpg";
import paediatrics from "../../public/images/paediatrics.jpg";
import familyMedicine from "../../public/images/family-medicine.jpg";
import dentistry from "../../public/images/dentistry.jpg";
import womensHealth from "../../public/images/womens-health.jpg";
import aboutConsultation from "../../public/images/about-consultation.jpg";
import appointmentConsultation from "../../public/images/appointment-consultation.jpg";
import healthScreening from "../../public/images/health-screening.jpg";
import dentalSuite from "../../public/images/dental-suite.jpg";
import reception from "../../public/images/reception.jpg";
import teamConsultation from "../../public/images/team-consultation.jpg";
import womensHealthConsult from "../../public/images/womens-health-consult.jpg";
import doctorConsultation from "../../public/images/doctor-consultation.jpg";
import paperwork from "../../public/images/paperwork.jpg";
import treatmentRoom from "../../public/images/treatment-room.jpg";
import dentalXray from "../../public/images/dental-xray.jpg";
import tabletConsult from "../../public/images/tablet-consult.jpg";
import babyCheckup from "../../public/images/baby-checkup.jpg";
import stethoscopeBp from "../../public/images/stethoscope-bp.jpg";
import laptopCare from "../../public/images/laptop-care.jpg";

/**
 * Licensed stock photography (Unsplash Licence — free for commercial use).
 * These are illustrative and do NOT depict Maple Medical Center staff or premises.
 * Replace with professional photography of the real clinic before launch where possible.
 * Source IDs are kept in IMAGE_CREDITS.md.
 */
const img = (src: SiteImage["src"] & { width: number; height: number }, alt: string): SiteImage => ({
  src,
  alt,
  width: src.width,
  height: src.height,
});

export const images = {
  hero: img(aboutConsultation, "A doctor talking warmly with a mother and her young son during a consultation"),
  generalPractice: img(generalPractice, "A doctor checking a patient's blood pressure at a consultation desk"),
  internalMedicine: img(internalMedicine, "A physician listening attentively to a patient across the desk"),
  paediatrics: img(paediatrics, "A doctor talking with a young boy and his mother"),
  familyMedicine: img(familyMedicine, "A doctor speaking with a grandfather and his grandson"),
  dentistry: img(dentistry, "A dentist chatting with a relaxed patient in a bright dental chair"),
  womensHealth: img(womensHealthConsult, "A smiling woman talking with a female doctor in a bright examination room"),
  reassurance: img(womensHealth, "A clinician placing a reassuring hand on a patient's hand"),
  about: img(aboutConsultation, "A doctor explaining next steps to a mother and her son"),
  appointment: img(appointmentConsultation, "A doctor taking notes while a patient describes her concerns"),
  healthScreening: img(healthScreening, "A doctor listening to a patient's chest with a stethoscope"),
  dentalSuite: img(dentalSuite, "A clean, sunlit dental treatment room"),
  reception: img(reception, "A calm, modern clinic reception desk"),
  team: img(teamConsultation, "A doctor writing notes while speaking with a family"),
  doctorConsultation: img(doctorConsultation, "A doctor listening to a patient during a consultation"),
  paperwork: img(paperwork, "A doctor completing paperwork with a patient at the desk"),
  treatmentRoom: img(treatmentRoom, "A bright, clean clinic treatment room"),
  dentalXray: img(dentalXray, "A dentist reviewing dental X-rays on a light box"),
  tabletConsult: img(tabletConsult, "Clinicians reviewing information together on a tablet"),
  babyCheckup: img(babyCheckup, "A doctor gently examining a baby in a colourful children's room"),
  stethoscope: img(stethoscopeBp, "A stethoscope and blood pressure gauge"),
  laptopCare: img(laptopCare, "A stethoscope beside a laptop on a desk"),
} as const;
