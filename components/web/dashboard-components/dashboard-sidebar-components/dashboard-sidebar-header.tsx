import {
    EllipsisVertical,
} from "lucide-react"
//
import {
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import ProfileImage from "@/components/ui/profile-image"

function DashboardSidebarHeader() {
    return (
        <SidebarHeader className="border-b border-muted">
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton className="py-6.5 flex justify-between hover:bg-sidebar active:bg-sidebar group-data-[collapsible=icon]:p-0!" >
                        <div className="flex gap-2 items-center col-span-5">
                            <ProfileImage
                                alt={"Example User"}
                                src={""}
                                size={30}
                            />
                            <div>
                                <div className="text-xs font-medium">{"Example User"}</div>
                                <div className="text-[11px] text-tertiary">{"example@gmail.com"}</div>
                            </div>
                        </div>
                        <Button asChild variant="link" size="icon-sm" className="col-span-1 text-foreground hover:text-black">
                            <EllipsisVertical className="text-muted-foreground" />
                        </Button>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
    )
}

export default DashboardSidebarHeader