import { cn } from "@/lib/utils"
import { ClassNameValue } from "tailwind-merge"
//
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
//

type Props = {
    onClick: () => void
    icon: React.ReactNode
    desc: string
    disabled?: boolean
    isActive?: boolean
    className?: ClassNameValue
}

function DashboardEditorToolbarButton({ onClick, icon, desc, disabled, isActive, className }: Props) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant={'ghost'}
                    size={'icon'}
                    onClick={onClick}
                    disabled={disabled}
                    type="button"
                    className={cn("text-muted-foreground", isActive && "text-primary bg-primary/10 hover:text-primary hover:bg-primary/5!", className)}
                >
                    {icon}
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>{desc}</p>
            </TooltipContent>
        </Tooltip>
    )
}

export default DashboardEditorToolbarButton