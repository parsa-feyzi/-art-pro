'use client'

import { House, LayoutTemplate, Newspaper, SquarePlus, SquarePen } from "lucide-react"
import SidebarBody from "./sidebar-body"

const data = [
    {
      label: "Site",
      items: [
        {
          title: "Home",
          url: "/",
          icon: House
        },
        {
          title: "Blog",
          url: "/blog",
          icon: Newspaper
        },
        {
          title: "About us",
          url: "/about-us",
          icon: LayoutTemplate
        },
      ]
    },
    {
      label: "Dashboard",
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
    },
  ]

function MainSidebarContent() {
  return (
    <SidebarBody data={data} />
  )
}

export default MainSidebarContent