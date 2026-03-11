import * as React from "react"
import { View, Image } from "@tarojs/components"
import { cn } from "@/lib/utils"

const AvatarContext = React.createContext<{
  status: "loading" | "error" | "loaded"
  setStatus: (status: "loading" | "error" | "loaded") => void
} | null>(null)

const Avatar = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => {
  const [status, setStatus] = React.useState<"loading" | "error" | "loaded">("loading")
  return (
    <AvatarContext.Provider value={{ status, setStatus }}>
      <View
        ref={ref}
        className={cn(
          "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
          className
        )}
        {...props}
      />
    </AvatarContext.Provider>
  )
})
Avatar.displayName = "Avatar"

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof Image>,
  React.ComponentPropsWithoutRef<typeof Image>
>(({ className, src, ...props }, ref) => {
  const context = React.useContext(AvatarContext)
  
  const handleLoad = (e) => {
      context?.setStatus("loaded")
 ...props.onLoad?.(e)
  }

  const handleError = (e) => {
      context?.setStatus("error")
 ...props.onError?.(e)
  }

  return (
    <Image
      ref={ref}
      src={src}
      className={cn(
        "aspect-square h-full w-full", 
        className, 
        context?.status !== "loaded" && "w-0 h-0 opacity-0 absolute"
      )}
      onLoad={handleLoad}
      onError={handleError}
      {...props}
    />
  )
})
AvatarImage.displayName = "AvatarImage"

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => {
  const context = React.useContext(AvatarContext)
  
  if (context?.status === "loaded") return null

  return (
    <View
      ref={ref}
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-muted",
        className
      )}
      {...props}
    />
  )
})
AvatarFallback.displayName = "AvatarFallback"

export { Avatar, AvatarImage, AvatarFallback }
