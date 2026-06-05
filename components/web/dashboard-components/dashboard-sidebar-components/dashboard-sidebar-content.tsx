import {
    SidebarContent,
    SidebarGroup,
    SidebarMenu,
    SidebarGroupLabel,
} from "@/components/ui/sidebar"
import DashboardSidebarLink from "./dashboard-sidebar-link"
import { LucideIcon } from "lucide-react"

interface Data {
    title: string
    url: string
    icon: LucideIcon
    isActive: boolean
}

interface Props {
    data: Data[]
}

function DashboardSidebarContent({ data }: Props) {
    return (
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>Articles</SidebarGroupLabel>
                <SidebarMenu>
                    {data.map((item) => (
                        <DashboardSidebarLink key={item.url} item={item} />
                    ))}
                </SidebarMenu>
            </SidebarGroup>
        </SidebarContent>
    )
}

export default DashboardSidebarContent