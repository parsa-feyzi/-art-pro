import Box from "@/src/components/ui/box";
import IconBox from "@/src/components/ui/icon-box";
import { LucideIcon } from "lucide-react";

interface Props {
  step: { icon: LucideIcon; title: string; desc: string };
  index: number;
}

export function AboutWorkStepBox({ step, index }: Props) {
  return (
    <Box key={step.title} className="p-8! bg-muted/40">
      <div className="flex items-cente justify-between">
        <IconBox className="mb-5">
          <step.icon className="h-6 w-6" />
        </IconBox>
        <div className="mb-3 text-sm font-semibold text-primary">
          Step {index + 1}
        </div>
      </div>
      <h3 className="text-xl font-bold">{step.title}</h3>
      <p className="mt-3 leading-7 text-muted-foreground">{step.desc}</p>
    </Box>
  );
}
