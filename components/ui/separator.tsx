"use client"

import { Separator as Divider, type SeparatorProps } from "react-aria-components"
import { twMerge } from "tailwind-merge"

const Separator = ({ className, ...props }: SeparatorProps) => {
  return (
    <Divider
      {...props}
      className={twMerge(
        "shrink-0 bg-border forced-colors:bg-[ButtonBorder]",
        props.orientation === "horizontal" ? "h-px w-full" : "w-px",
        className,
      )}
    />
  )
}

export type { SeparatorProps }
export { Separator }
