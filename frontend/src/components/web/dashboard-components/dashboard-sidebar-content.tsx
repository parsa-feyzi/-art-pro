"use client"

import { SquarePen, SquarePlus } from "lucide-react"
import SidebarBody from "../sidebar-components/sidebar-body"

const data = [
    {
      label: "Articles",
      items: [
        {
          title: "Create Article",
          url: "/dashboard/articles-create",
          icon: SquarePlus
        },
        {
          title: "Manage Articles",
          url: "/dashboard/articles-manage",
          icon: SquarePen
        }
      ]
    }
  ]

function DashboardSidebarContent() {
  return (
    <SidebarBody data={data} />
  )
}

export default DashboardSidebarContent