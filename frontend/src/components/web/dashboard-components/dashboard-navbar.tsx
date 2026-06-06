import { SidebarTrigger } from "@/src/components/ui/sidebar"
import { ThemeToggle } from "../theme-toggle"
import Logo from "../logo"

function DashboardNavbar() {
  return (
      <nav className="py-4 mb-8 transition-[width,height] ease-linear ">
        <div className="flex w-full items-center justify-between gap-2 px-4 lg:px-6 2xl:px-8">
          <SidebarTrigger className="-ml-1" />
          <div className="flex-1 flex justify-center">
            <Logo />
          </div>
          <ThemeToggle />
        </div>
      </nav>
  )
}

export default DashboardNavbar