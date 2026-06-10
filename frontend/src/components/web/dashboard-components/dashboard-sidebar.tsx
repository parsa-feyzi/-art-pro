import * as React from "react"
//
import {
  Sidebar,
  SidebarRail
} from "@/src/components/ui/sidebar"
import DashboardSidebarHeader from "../../../features/user/components/sidebar/dashboard-sidebar-header"
import DashboardSidebarContent from "./dashboard-sidebar-content"
//

function DashboardSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <DashboardSidebarHeader />
      <DashboardSidebarContent />
      <SidebarRail />
    </Sidebar>
  )
}

export default DashboardSidebar
