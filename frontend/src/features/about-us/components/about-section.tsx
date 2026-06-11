import { cn } from "@/src/lib/utils";
import { ClassNameValue } from "tailwind-merge";

interface Props {
  title: string;
  desc: string;
  hasBorder?: boolean;
  children: React.ReactNode;
  className?: ClassNameValue
}

export function AboutSection({ title, desc, hasBorder, children, className }: Props) {
  return (
    <section className={cn(hasBorder ? "border-y border-input" : "", "py-16", className)}>
      <div>
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
          <p className="mt-4 text-muted-foreground">{desc}</p>
        </div>
        {children}
      </div>
    </section>
  );
}
