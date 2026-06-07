import { buttonVariants } from "@/src/components/ui/button";
import Logo from "@/src/components/web/logo";
import { ThemeToggle } from "@/src/components/web/theme-toggle";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import AuthNavbarGoBackBtn from "./auth-navbar-go-back-btn";

function AuthNavbar() {
  return (
    <div className="grid grid-cols-3 py-4.5 z-10 relative bg-background">
      <AuthNavbarGoBackBtn />
      <div className="sm:hidden block">
        <Link href="/" className={buttonVariants({ variant: "outline", size: "icon" })}>
          <ArrowLeft />
        </Link>
      </div>
      <div className="flex justify-center">
        <Logo />
      </div>
      <div className="flex justify-end">
        <ThemeToggle />
      </div>
    </div>
  );
}

export default AuthNavbar;
