import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"
import { ClassNameValue } from "tailwind-merge"

interface Props {
    itemsNumber?: 2 | 3 | 4,
    gap?: number,
    className?: ClassNameValue,
    children: React.ReactNode
}

const collapsibleVariants = cva("grid", {
    variants: {
        itemsNumber: {
            2: "md:grid-cols-2 grid-cols-1",
            3: "lg:grid-cols-3 sm:grid-cols-2 grid-cols-1",
            4: "lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1"
        }
    },
    defaultVariants: {
        itemsNumber: 3
    }
})

function Collapsible({ itemsNumber, gap=4, className, children }: Props) {
    return (
        <div style={{ gap: `${gap*4}px` }} className={cn(collapsibleVariants({ itemsNumber }), className)}>
            {children}
        </div>
    )
}

export default Collapsible