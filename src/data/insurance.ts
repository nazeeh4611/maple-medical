import type { InsuranceProvider } from "@/types";

/**
 * Insurers and TPAs listed on the clinic's Doctify profile (checked 26 Oct 2026).
 * Confirm the current list — and which plans/networks within each — with the clinic.
 * Logos are intentionally not used: add them only with permission from each insurer.
 */
export const insuranceProviders: InsuranceProvider[] = [
  { name: "Al Sagr National Insurance", status: "reference" },
  { name: "Almadallah", status: "reference" },
  { name: "Arabia Insurance", status: "reference" },
  { name: "Enaya Insurance (Mednet)", status: "reference" },
  { name: "Fidelity United", status: "reference" },
  { name: "FMC", status: "reference" },
  { name: "Inayah TPA", status: "reference" },
  { name: "Liva Insurance", status: "reference" },
  { name: "Mednet", status: "reference" },
  { name: "MetLife", status: "reference" },
  { name: "NAS", status: "reference" },
  { name: "Neuron", status: "reference" },
  { name: "Nextcare", status: "reference" },
  { name: "NGI", status: "reference" },
  { name: "Noor Takaful", status: "reference" },
  { name: "Salama", status: "reference" },
  { name: "Sukoon Insurance", status: "reference" },
  { name: "Takaful Emarat", status: "reference" },
  { name: "Watania", status: "reference" },
];

export const getInsuranceProviders = () => insuranceProviders.filter((p) => p.status !== "unconfirmed");

export const insuranceDisclaimer =
  "Insurance coverage varies by plan, network and policy terms. Inclusion in this list does not guarantee that every plan from a provider is accepted. Please contact us with your insurance card details before your visit to confirm your coverage.";
