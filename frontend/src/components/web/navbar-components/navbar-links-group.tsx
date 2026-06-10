import { ButtonSizes } from "@/src/lib/types";
import NavbarLink from "./navbar-link";
import { ClassNameValue } from "tailwind-merge";
import { cn } from "@/src/lib/utils";

interface Props {
    itemsSize?: ButtonSizes,
    className?: ClassNameValue
}

function NavbarLinksGroup({ itemsSize="default", className }: Props) {
  return (
    <div className={cn("flex gap-1 items-center mt-1 text-muted-foreground", className)}>
      <NavbarLink size={itemsSize}>Home</NavbarLink>
      <NavbarLink size={itemsSize} path="/blog">Blog</NavbarLink>
      <NavbarLink size={itemsSize} path="/about-us">About us</NavbarLink>
      <NavbarLink size={itemsSize} path="/dashboard/articles-create">Create Article</NavbarLink>
    </div>
  );
}

export default NavbarLinksGroup;
