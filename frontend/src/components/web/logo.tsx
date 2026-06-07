import { SizeBase } from "@/src/lib/types";
import { cn } from "@/src/lib/utils";
import { cva } from "class-variance-authority";
import Link from "next/link";
import { ClassNameValue } from "tailwind-merge";

interface Props {
  size?: SizeBase | "md" | "default";
  className?: ClassNameValue;
}

const logoArtVariants = cva("font-bold", {
  variants: {
    size: {
      sm: "text-2xl",
      default: "text-3xl",
      md: "text-4xl",
      lg: "text-5xl",
      xl: "text-7xl",
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

const logoProVariants = cva("text-primary ms-0.5", {
  variants: {
    size: {
      sm: "text-xl",
      default: "text-2xl",
      md: "text-3xl",
      lg: "text-4xl",
      xl: "text-6xl",
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

function Logo({ size = "default", className }: Props) {
  return (
    <Link href="/" className={cn(logoArtVariants({ size }), className)}>
      Art<span className={cn(logoProVariants({ size }))}>PRO</span>
    </Link>
  );
}

export default Logo;
