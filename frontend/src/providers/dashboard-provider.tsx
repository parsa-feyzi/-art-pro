import { ReactNode } from "react"
//
import {
    SidebarInset,
    SidebarProvider,
} from "@/src/components/ui/sidebar"
//
import DashboardSidebar from "@/src/components/web/dashboard-components/dashboard-sidebar-components/dashboard-sidebar"
import DashboardNavbar from "@/src/components/web/dashboard-components/dashboard-navbar"
//

function DashboardProvider({ children }: { children: ReactNode }) {
    return (
        <SidebarProvider>
            <DashboardSidebar />
            <SidebarInset>
                <DashboardNavbar />
                <main className="px-4 lg:px-6 2xl:px-8">{children}</main>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default DashboardProvider