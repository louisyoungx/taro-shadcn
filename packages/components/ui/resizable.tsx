import * as React from "react"
import { View } from "@tarojs/components"
import { GripVertical } from "lucide-react-taro"
import { cn } from "@/lib/utils"

const ResizablePanelGroup = ({
  className,
  children,
  direction = "horizontal",
  ...props
}: React.ComponentPropsWithoutRef<typeof View> & {
  direction?: "horizontal" | "vertical"
}) => (
  <View
    className={cn(
      "flex h-full w-full",
      direction === "vertical" ? "flex-col" : "flex-row",
      className
    )}
    {...props}
  >
    {children}
  </View>
)

const ResizablePanel = ({
  className,
  children,
  defaultSize,
  ...props
}: React.ComponentPropsWithoutRef<typeof View> & {
  defaultSize?: number
}) => (
  <View
    className={cn("flex-1 overflow-hidden", className)}
    style={{ flexGrow: defaultSize ? defaultSize / 100 : 1 }}
    {...props}
  >
    {children}
  </View>
)

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View> & {
  withHandle?: boolean
}) => (
  <View
    className={cn(
      "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0",
      className
    )}
    {...props}
  >
    {withHandle && (
      <View className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <GripVertical className="h-3 w-3" />
      </View>
    )}
  </View>
)

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
