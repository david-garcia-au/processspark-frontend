import { Calculator, Factory, Wrench, type LucideIcon } from "lucide-react";
import type { IconName } from "@/lib/catalogue";

const industryIcons: Partial<Record<IconName, LucideIcon>> = {
  factory: Factory,
  wrench: Wrench,
  calculator: Calculator,
};

/** Icon of an industry (server component, so only these three ship). */
export function IndustryIcon({
  name,
  size = 20,
}: {
  name: IconName;
  size?: number;
}) {
  const Icon = industryIcons[name] ?? Factory;
  return <Icon size={size} />;
}
