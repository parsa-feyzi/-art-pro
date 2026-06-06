 
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/src/components/ui/dropdown-menu";
import Link from "next/link";
import { IconButtonDropdownProps } from "./icon-button-dropdown";

function IconButtonDropdownMenuContent({ children, dropdownMenuItems }: Omit<IconButtonDropdownProps, "buttonIcon" | "description">) {
  return (
    <DropdownMenuContent align="end">
        {children}
        {dropdownMenuItems.map(
          ({ variant = "default", text, icon, action, href, hasSeparator }) =>
            href ? (
              <Link href={href} key={text}>
                <DropdownMenuItem
                  variant={variant}
                  onClick={action}
                  hasSeparator={hasSeparator}
                  className="cursor-pointer flex justify-between"
                >
                  {text}
                  {icon}
                </DropdownMenuItem>
              </Link>
            ) : (
              <div key={text}>
                <DropdownMenuItem
                  variant={variant}
                  onClick={action}
                  hasSeparator={hasSeparator}
                  className="cursor-pointer flex justify-between"
                >
                  {text}
                  {icon}
                </DropdownMenuItem>
              </div>
            )
        )}
      </DropdownMenuContent>
  )
}

export default IconButtonDropdownMenuContent