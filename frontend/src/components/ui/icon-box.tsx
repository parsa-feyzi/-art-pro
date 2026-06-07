import { cn } from "@/src/lib/utils";
import { ClassNameValue } from "tailwind-merge";

interface Props {
    className?: ClassNameValue;
    children: React.ReactNode;
}

function IconBox({ children, className }: Props) {
  return (
    <div className={cn("flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary", className)}>
        {children}
    </div>
  )
}

export default IconBox