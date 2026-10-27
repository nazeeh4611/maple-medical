import {
  Activity,
  Baby,
  ClipboardCheck,
  FlaskConical,
  Heart,
  HeartPulse,
  Sparkles,
  Stethoscope,
  Users,
} from "lucide-react";
import { ToothIcon } from "@/components/ui/brand-icons";
import { cn } from "@/lib/utils";

const icons: Record<string, typeof Stethoscope> = {
  "general-medicine": Stethoscope,
  "internal-medicine": HeartPulse,
  paediatrics: Baby,
  "obstetrics-gynaecology": Heart,
  "family-medicine": Users,
  dermatology: Sparkles,
  physiotherapy: Activity,
  "health-screening": ClipboardCheck,
  laboratory: FlaskConical,
};

/** Specialty icon in a soft tinted circle. */
export function ServiceIcon({ slug, className }: { slug: string; className?: string }) {
  const Icon = slug === "dentistry" ? ToothIcon : (icons[slug] ?? Stethoscope);
  return (
    <span
      className={cn(
        "inline-flex size-14 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600",
        className,
      )}
    >
      <Icon className="size-7" aria-hidden="true" />
    </span>
  );
}
