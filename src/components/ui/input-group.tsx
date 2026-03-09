import * as React from "react"
import { View, Text, Input, Textarea } from "@tarojs/components"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "./button"

function InputGroup({ className, ...props }: React.ComponentPropsWithoutRef<typeof View>) {
  return (
    <View
      data-slot="input-group"
      role="group"
      className={cn(
        "group/input-group border-input dark:bg-input/30 shadow-xs relative flex w-full flex-wrap items-center rounded-md border outline-none transition-[color,box-shadow] ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        "h-9 has-[textarea]:h-auto",

        // Variants based on alignment - simplified for Taro as specific selector support varies
        // "has-[>[data-align=inline-start]]:[&>input]:pl-2",
        // "has-[>[data-align=inline-end]]:[&>input]:pr-2",
        
        className
      )}
      {...props}
    />
  )
}

const inputGroupAddonVariants = cva(
  "text-muted-foreground flex h-auto cursor-text select-none items-center justify-center gap-2 py-1 text-sm font-medium group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4",
  {
    variants: {
      align: {
        "inline-start":
          "order-first pl-3",
        "inline-end":
          "order-last pr-3",
        "block-start":
          "[.border-b]:pb-3 order-first w-full justify-start px-3 pt-3",
        "block-end":
          "[.border-t]:pt-3 order-last w-full justify-start px-3 pb-3",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
)

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentPropsWithoutRef<typeof View> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <View
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      {...props}
    />
  )
}

const inputGroupButtonVariants = cva(
  "flex items-center gap-2 text-sm shadow-none",
  {
    variants: {
      size: {
        xs: "h-6 gap-1 rounded-[calc(var(--radius)-5px)] px-2 has-[>svg]:px-2 [&>svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-2 rounded-md px-2 has-[>svg]:px-2",
        "icon-xs":
          "size-6 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0",
        "icon-sm": "size-8 p-0 has-[>svg]:p-0",
      },
    },
    defaultVariants: {
      size: "xs",
    },
  }
)

function InputGroupButton({
  className,
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size"> &
  VariantProps<typeof inputGroupButtonVariants>) {
  return (
    <Button
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  )
}

function InputGroupText({ className, ...props }: React.ComponentPropsWithoutRef<typeof Text>) {
  return (
    <Text
      className={cn(
        "text-muted-foreground flex items-center gap-2 text-sm [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
        className
      )}
      {...props}
    />
  )
}

function InputGroupInput({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Input>) {
  return (
    <View className="flex h-full flex-1 items-center px-2 py-2">
      <Input
        data-slot="input-group-control"
        className={cn(
          "flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        placeholderClass="text-muted-foreground"
        {...props}
      />
    </View>
  )
}

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Textarea>) {
  return (
    <View className="flex h-full flex-1 min-w-20 m-2">
      <Textarea
        data-slot="input-group-control"
        className={cn(
          "flex-1 w-full h-full bg-transparent text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        placeholderClass="text-muted-foreground"
        {...props}
      />
    </View>
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
}
