import Link from "next/link"
import { ReactNode } from "react"
import { buttonVariants } from "../../ui/button"

interface Props {
  children: ReactNode
  path?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}

function NavbarLink({ children, path="/", variant="ghost" }: Props) {
  return (
    <Link href={path} className={buttonVariants({ variant })}>
      {children}
    </Link>
  )
}

export default NavbarLink