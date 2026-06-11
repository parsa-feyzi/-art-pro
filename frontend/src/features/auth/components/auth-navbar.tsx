import Logo from "@/src/components/web/logo";
import { ThemeToggle } from "@/src/components/web/theme-toggle";
import AuthNavbarGoBackBtn from "./auth-navbar-go-back-btn";

function AuthNavbar() {
  return (
    <div className="container p-container max-w-7xl mx-auto grid grid-cols-3 py-4.5 z-10 relative bg-background">
      <AuthNavbarGoBackBtn />
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
