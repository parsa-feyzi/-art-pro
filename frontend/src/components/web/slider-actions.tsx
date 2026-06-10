import { Button } from "@/src/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface Props {
    nextActionId: string
    prevActionId: string
}

function SliderActions({ nextActionId, prevActionId }: Props) {
    return (
        <>
            <label htmlFor={prevActionId}>
                <div className={cn(
                    "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                    "bg-secondary text-secondary-foreground hover:text-white hover:bg-primary active:opacity-80",
                    "lg:size-11 sm:size-10 size-10"
                )}>
                    <ArrowLeft className="w-5! h-5!" />
                </div>
            </label>
            <label htmlFor={nextActionId}>
                <div className={cn(
                    "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                    "bg-secondary text-secondary-foreground hover:text-white hover:bg-primary active:opacity-80",
                    "lg:size-11 sm:size-10 size-10"
                )}>
                    <ArrowRight className="w-5! h-5!" />
                </div>
            </label>
        </>
    )
}

export default SliderActions