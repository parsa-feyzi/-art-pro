import { cn } from "@/lib/utils"
import { ComponentProps } from "react"

function Skeleton({ className, ...props }: ComponentProps<"div">) {
    return (
        <div
            className={cn("skeleton bg-input rounded-sm w-full", className)}
            {...props}
        ></div>
    )
}

export default Skeleton