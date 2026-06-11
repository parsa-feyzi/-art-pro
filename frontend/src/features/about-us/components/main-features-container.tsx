import { BookOpen, PenTool, ShieldCheck, Users } from "lucide-react";

import { ClassNameValue } from "tailwind-merge";
import { cn } from "@/src/lib/utils";
import { FeatureBox } from "@/src/features/about-us/components/boxes/feature-box";

const features = [
  {
    icon: PenTool,
    title: "Effortless Writing",
    desc: "A clean editor that helps writers focus on ideas without distractions.",
  },
  {
    icon: BookOpen,
    title: "Open Reading",
    desc: "Readers can freely explore a growing collection of thoughtful articles.",
  },
  {
    icon: Users,
    title: "Community Driven",
    desc: "Artpro grows through writers, readers, and shared knowledge.",
  },
  {
    icon: ShieldCheck,
    title: "Simple & Reliable",
    desc: "A stable platform built to keep publishing smooth and easy.",
  },
];

function MainFeaturesContainer({ className }: { className?: ClassNameValue }) {
  return (
    <div className={cn("grid gap-6 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {features.map((feature) => (
        <FeatureBox {...feature} key={feature.title} />
      ))}
    </div>
  );
}

export default MainFeaturesContainer;
