"use client"

import * as React from "react"
//
import {
  SquarePlus,
  SquarePen,
} from "lucide-react"
//
import {
  Sidebar,
  SidebarRail
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import DashboardSidebarHeader from "./dashboard-sidebar-header"
import DashboardSidebarContent from "./dashboard-sidebar-content"
//

// This is sample data.
const data = [
  {
    title: "Create Article",
    url: "/dashboard/articles-create",
    icon: SquarePlus,
    isActive: true,
  },
  {
    title: "Modify Article",
    url: "/dashboard/articles-modify",
    icon: SquarePen,
    isActive: true,
  },
]

function DashboardSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <DashboardSidebarHeader />
      <DashboardSidebarContent data={data} />
      <SidebarRail />
    </Sidebar>
  )
}

export default DashboardSidebar
