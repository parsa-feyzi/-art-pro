import Link from "next/link"
//
import { LucideIcon } from "lucide-react"
//
import { SidebarMenuButton, SidebarMenuItem } from "@/src/components/ui/sidebar"
import { usePathname } from "next/navigation"
import { cn } from "@/src/lib/utils"
//

interface Props {
    item: {
        title: string
        url: string
        icon: LucideIcon
    }
}

function SidebarLink({ item }: Props) {
    const pathName = usePathname();

    return (
        <SidebarMenuItem>
            <Link href={item.url}>
                <SidebarMenuButton className="cursor-pointer! py-5!" tooltip={item.title} isActive={pathName === item.url} >
                    {item.icon && <item.icon className={cn(pathName === item.url ? "text-muted-foreground" : "text-tertiary")} />}
                    <span className="font-medium">{item.title}</span>
                </SidebarMenuButton>
            </Link>
        </SidebarMenuItem>
    )
}

export default SidebarLink