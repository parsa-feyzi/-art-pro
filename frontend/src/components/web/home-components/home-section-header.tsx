import { Activity } from "react"
//
import { cn } from "@/src/lib/utils"
//

interface Props {
  title: React.ReactNode,
  actions: React.ReactNode
}

function HomeSectionHeader({ title, actions }: Props) {
  return (
    <div className={cn(actions ? "justify-between" : "justify-center", "relative flex flex-wrap sm:flex-nowrap items-center md:mb-9 mb-7 gap-y-2")}>
      <div className={cn(actions ? "pe-6" : "px-6", "md:text-3xl text-2xl md:-translate-y-1 font-bold bg-background")}>{title}</div>
      <span className="md:inline-block hidden absolute top-1/2 -translate-y-1/2 left-0 right-0 w-full h-px bg-input -z-10"></span>
      <Activity mode={actions ? "visible" : "hidden"}>
        <div className="flex items-center gap-2 bg-background sm:ps-6">{actions}</div>
      </Activity>
    </div>
  )
}

export default HomeSectionHeader