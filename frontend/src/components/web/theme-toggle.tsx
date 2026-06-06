"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import IconButtonDropdown from "../ui/icon-button-dropdown";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  const dropdownMenuItems = [
    { text: "Light", icon: <Sun />, action: () => setTheme("light") }, 
    { text: "Dark", icon: <Moon />, action: () => setTheme("dark") }, 
    { text: "System", icon: <Monitor />, action: () => setTheme("system") }, 
  ]

  return (
    <IconButtonDropdown
      buttonIcon={
        <>
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        </>
      }
      description="Toggle theme"
      dropdownMenuItems={dropdownMenuItems}
    />
  );
}
