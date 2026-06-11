import { MouseEventHandler, ReactNode } from "react";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import IconButtonDropdownMenuContent from "./icon-button-dropdown-menu-content";

interface DropdownMenuItem {
  variant?: "destructive" | "default";
  text: string;
  icon?: ReactNode;
  action?: MouseEventHandler<HTMLDivElement>;
  href?: string;
  hasSeparator?: boolean;
}

export interface IconButtonDropdownProps {
  buttonIcon: ReactNode;
  description: string;
  dropdownMenuItems: DropdownMenuItem[];
  children?: ReactNode;
}

function IconButtonDropdown({
  children,
  buttonIcon,
  description,
  dropdownMenuItems,
}: IconButtonDropdownProps) {
  return (
    <>
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer" asChild>
              <Button variant="outline" size="icon">
                {buttonIcon}
                <span className="sr-only">{description}</span>
              </Button>
            </DropdownMenuTrigger>
            <IconButtonDropdownMenuContent dropdownMenuItems={dropdownMenuItems}>
              {children}
            </IconButtonDropdownMenuContent>
          </DropdownMenu>
    </>
  );
}

export default IconButtonDropdown;
