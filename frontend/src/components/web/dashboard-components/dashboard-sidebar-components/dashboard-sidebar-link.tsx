import Link from "next/link"
//
import { LucideIcon } from "lucide-react"
//
import { SidebarMenuButton, SidebarMenuItem } from "@/src/components/ui/sidebar"
import { usePathname } from "next/navigation"
//

interface Props {
    item: {
        title: string
        url: string
        icon: LucideIcon
    }
}

function DashboardSidebarLink({ item }: Props) {
    const pathName = usePathname();

    return (
        <SidebarMenuItem>
            <Link href={item.url}>
                <SidebarMenuButton className="cursor-pointer!" tooltip={item.title} isActive={pathName === item.url} >
                    {item.icon && <item.icon className="text-sidebar-primary" />}
                    <span className="font-medium">{item.title}</span>
                </SidebarMenuButton>
            </Link>
        </SidebarMenuItem>
    )
}

export default DashboardSidebarLink