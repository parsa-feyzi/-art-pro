import { ThemeToggle } from "../theme-toggle";
import Logo from "../logo";
import NavbarUserLinks from "../../../features/user/components/navbar/navbar-user-links";
import NavbarLinksGroup from "./navbar-links-group";
import { Button } from "@/src/components/ui/button";
import { Menu } from "lucide-react";
import { Suspense } from "react";
import NavbarUserLinksSkeleton from "@/src/features/user/components/skeletons/navbar-user-links-skeleton";
import { SidebarTrigger } from "../../ui/sidebar";


function Navbar() {
  return (
    <nav className="container p-container max-w-7xl mx-auto sm:static fixed z-30 right-0 left-0 sm:flex sm:justify-between sm:items-center grid grid-cols-3 bg-background/80 sm:backdrop-blur-none backdrop-blur-sm py-4 sm:border-b-0 border-b border-b-input">
      <div className="sm:hidden block">
        <SidebarTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu />
            <span className="sr-only">Menu trigger</span>
          </Button>
        </SidebarTrigger>
      </div>
      <div className="flex items-center sm:justify-start justify-center sm:gap-6">
        <div>
          <Logo className="lg:inline-block hidden" />
          <Logo size="default" className="lg:hidden inline-block" />
        </div>
        <div className="sm:block hidden">
          <NavbarLinksGroup className="lg:flex hidden" />
          <NavbarLinksGroup itemsSize={"sm"} className="lg:hidden flex" />
        </div>
      </div>
      <div className="flex justify-end lg:gap-4 gap-3">
        <div className="sm:block hidden">
          <Suspense fallback={<NavbarUserLinksSkeleton />}>
            <NavbarUserLinks />
          </Suspense>
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
}

export default Navbar;