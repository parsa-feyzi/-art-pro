import { LucideIcon } from "lucide-react"
//
import {
    SidebarContent,
    SidebarGroup,
    SidebarMenu,
    SidebarGroupLabel,
} from "@/src/components/ui/sidebar"
import SidebarLink from "./sidebar-link"
//

interface Item {
    title: string
    url: string
    icon: LucideIcon
}

interface Groups {
    label: string,
    items: Item[]
}

interface Props {
    data: Groups[]
}

function SidebarBody({ data }: Props) {
    return (
        <SidebarContent>
            {
                data.map(({ label, items }) => (
                    <SidebarGroup key={label}>
                        <SidebarGroupLabel>{label}</SidebarGroupLabel>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarLink key={item.url} item={item} />
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                ))
            }
        </SidebarContent>
    )
}

export default SidebarBody