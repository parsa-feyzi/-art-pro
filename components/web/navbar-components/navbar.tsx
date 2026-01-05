import Link from "next/link";
import NavbarLink from "./navbar-link";
import { ThemeToggle } from "../theme-toggle";
import Logo from "../logo";

function Navbar() {
  return (
    <nav className="flex justify-between items-center py-4">
      <div className="flex items-center gap-6">
        <Logo />
        <div className="mt-1">
          <NavbarLink>Home</NavbarLink>
          <NavbarLink path="/blog">Blog</NavbarLink>
          <NavbarLink path="/create">Create</NavbarLink>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex gap-0.5">
          <NavbarLink path="/sign-up" variant="default">
            Sign up
          </NavbarLink>
          <NavbarLink path="/login">
            Login
          </NavbarLink>
        </div>
        <div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
