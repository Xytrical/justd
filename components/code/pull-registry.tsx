"use client"

import { IconBrandV0 } from "@/components/icons/icon-brand-v0"
import { Button, buttonStyles } from "@/components/ui/button"
import { Link } from "@/components/ui/link"
import { Tooltip } from "@/components/ui/tooltip"
import { copyToClipboard } from "@/resources/lib/copy"
import { openInV0Url } from "@/resources/lib/utils"
import { IconDuplicate, IconTerminal } from "@intentui/icons"
import { twMerge } from "tailwind-merge"

interface PullRegistryProps {
  processedSourceCode: string | null
  blockDemo: string
  className?: string
}

export function PullRegistry({ className, processedSourceCode, blockDemo }: PullRegistryProps) {
  return (
    <div className={twMerge("flex items-center gap-x-1", className)}>
      <Tooltip>
        <Button
          onPress={() => copyToClipboard(processedSourceCode as string)}
          intent="plain"
          className="size-7 rounded-xs"
          size="square-petite"
        >
          <IconDuplicate />
        </Button>
        <Tooltip.Content>Copy code</Tooltip.Content>
      </Tooltip>
      <Tooltip>
        <Button
          onPress={() => copyToClipboard(`npx intentui@latest add -b ${blockDemo}`)}
          intent="plain"
          className="size-7 rounded-xs"
          size="square-petite"
        >
          <IconTerminal />
        </Button>
        <Tooltip.Content>Copy registry command</Tooltip.Content>
      </Tooltip>
      <Tooltip>
        <Link
          href={openInV0Url(blockDemo as string)}
          target="_blank"
          className={buttonStyles({
            size: "square-petite",
            intent: "plain",
            className: "size-7 rounded-xs",
          })}
        >
          <IconBrandV0 />
        </Link>
        <Tooltip.Content>Open in V0</Tooltip.Content>
      </Tooltip>
    </div>
  )
}
