import { ThemeToggle } from "../theme-toggle";
import Logo from "../logo";
import NavbarUserLinks from "./navbar-user-links";
import NavbarLinksGroup from "./navbar-links-group";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Suspense } from "react";
import NavbarUserLinksSkeleton from "@/components/skeleton/navbar-user-links-skeleton";

function Navbar() {
  return (
    <nav className="sm:static fixed z-30 right-0 left-0 sm:px-0 px-4 sm:flex sm:justify-between sm:items-center grid grid-cols-3 bg-background/70 backdrop-blur-sm sm:py-4 py-3 sm:border-b-0 border-b border-b-input">
      <div className="sm:hidden block">
        <Button variant="outline" size="icon-sm">
          <Menu />
          <span className="sr-only">Menu toggle</span>
        </Button>
      </div>
      <div className="flex items-center sm:justify-start justify-center sm:gap-6">
        <div>
          <Logo className="lg:inline-block hidden" />
          <Logo size="sm" className="lg:hidden inline-block" />
        </div>
        <div className="sm:block hidden">
          <NavbarLinksGroup className="lg:flex hidden" />
          <NavbarLinksGroup itemsSize={"sm"} className="lg:hidden flex" />
        </div>
      </div>
      <div className="flex justify-end lg:gap-4 gap-3">
        <Suspense fallback={<NavbarUserLinksSkeleton />}>
          <NavbarUserLinks />
        </Suspense>
        <div className="sm:block hidden">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;