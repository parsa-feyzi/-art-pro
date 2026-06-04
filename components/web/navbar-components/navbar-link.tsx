'use client'

import Link from "next/link"
import { ReactNode } from "react"
import { buttonVariants } from "../../ui/button"
import { ButtonSizes, ButtonVariants } from "@/lib/types"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ClassNameValue } from "tailwind-merge"

interface Props {
  children: ReactNode,
  path?: string,
  variant?: ButtonVariants,
  size?: ButtonSizes,
  className?: ClassNameValue
}

function NavbarLink({ children, path="/", variant="ghost", size="default", className }: Props) {
  const pathName = usePathname()

  return (
    <Link href={path} className={`${cn(buttonVariants({ variant, size }), className, "lg:text-base text-xs")} ${pathName === path && "bg-accent text-foreground"}`}>
      {children}
    </Link>
  )
}

export default NavbarLink