import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
} from "@/src/components/ui/sidebar"
import Logo from "../logo"
import MainSidebarContent from "./main-sidebar-content"
import MainSidebarUserInfos from "@/src/features/user/components/sidebar/main-sidebar-user-infos"
import { Suspense } from "react"
import Skeleton from "../../ui/skeleton"
//

function MainSidebar() {
  return (
    <Sidebar className="sm:hidden! flex!">
      <SidebarHeader className="flex mx-4 py-4 mb-4 border-b border-input items-center justify-center">
        <Logo size="sm" />
      </SidebarHeader>
      <MainSidebarContent />
      <SidebarFooter>
        <Suspense fallback={<Skeleton className="w-full h-14 rounded-lg" />}>
          <MainSidebarUserInfos />
        </Suspense>
      </SidebarFooter>
    </Sidebar>
  )
}

export default MainSidebar