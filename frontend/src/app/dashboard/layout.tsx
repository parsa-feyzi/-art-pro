import { ReactNode } from "react"
//
import DashboardProvider from "@/src/providers/dashboard-provider"
//

function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <DashboardProvider>
            {children}
        </DashboardProvider>
    )
}

export default DashboardLayout