import { buttonVariants } from "@/components/ui/button";
import Logo from "@/components/web/logo";
import { ThemeToggle } from "@/components/web/theme-toggle";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

function AuthNavbar() {
  return (
    <div className="grid grid-cols-3 py-4.5 z-10 relative bg-background mb-14">
      <div className="sm:block hidden">
        <Link href="/" className={buttonVariants({ variant: "outline" })}>
          <ArrowLeft />
          <span>Go Back</span>
        </Link>
      </div>
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
