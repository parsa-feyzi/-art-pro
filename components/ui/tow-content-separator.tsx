import { SizeBase } from "@/lib/types"
import { ReactNode } from "react"
import { ClassNameValue } from "tailwind-merge"

interface Props {
  firstData: ReactNode,
  lastData: ReactNode,
  size?: SizeBase,
  opacity?: number,
  className?: ClassNameValue
}

function TowContentSeparator({ firstData, lastData, opacity = 70, size = "lg", className }: Props) {
  return (
    <div
      style={{ opacity: `${opacity}%`, fontSize: `${size == "sm" ? "0.8rem" : size == "xl" ? "1.125rem" : "1rem"}` }}
      className={`flex opacity-70 ${className}`}
    >
      <div
        style={{ paddingInlineEnd: `${size == "sm" ? "0.8rem" : size == "xl" ? "1.125rem" : "1rem"}` }}
        className="border-e-2 border-gray-500/50"
      >
        {firstData}
      </div>
      <div
        style={{ paddingInlineStart: `${size == "sm" ? "0.8rem" : size == "xl" ? "1.125rem" : "1rem"}` }}
        className="ps-4"
      >
        {lastData}
      </div>
    </div>

  )
}

export default TowContentSeparator