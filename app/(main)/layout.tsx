import Navbar from "@/components/web/navbar-components/navbar"
import { ReactNode } from "react"

interface Props { children: ReactNode }

function MainLayout({ children }: Props) {
  return (
    <section>
        <Navbar />
        {children}
    </section>
  )
}

export default MainLayout