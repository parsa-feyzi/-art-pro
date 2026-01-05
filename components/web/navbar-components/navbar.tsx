import Link from "next/link";
import NavbarLink from "./navbar-link";
import { ThemeToggle } from "./theme-toggle";

function Navbar() {
  return (
    <nav className="flex justify-between items-center py-4">
      <div className="flex items-center gap-6">
        <Link href="/" className="font-bold text-3xl">
          Art<span className="text-emerald-500 text-2xl ms-0.5">PRO</span>
        </Link>
        <div className="mt-1">
          <NavbarLink>Home</NavbarLink>
          <NavbarLink path="/blog">Blog</NavbarLink>
          <NavbarLink path="/create">Create</NavbarLink>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex gap-0.5">
          <NavbarLink path="/sing-up" variant="default">
            Sing up
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
