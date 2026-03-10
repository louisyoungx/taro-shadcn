import * as React from "react"
import { View } from "@tarojs/components"

import { cn } from "@/lib/utils"

const Table = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View className="relative w-full overflow-auto">
    <View
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </View>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn("[&>*]:border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn("[&>*:last-child]:border-b-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>*:last-child]:border-b-0",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted flex flex-row",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 flex flex-1 basis-0 min-w-0 items-center justify-start",
      typeof className === "string" && /(^|\s)text-right(\s|$)/.test(className)
        ? "justify-end"
        : null,
      typeof className === "string" && /(^|\s)w-/.test(className)
        ? "flex-none basis-auto"
        : null,
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { colSpan?: number }
>(({ className, colSpan, style, ...props }, ref) => (
  <View
    ref={ref}
    style={
      colSpan != null &&
      typeof style === "object" &&
      style != null &&
      !Array.isArray(style) &&
      !(typeof className === "string" && /(^|\s)w-/.test(className))
        ? { ...(style as React.CSSProperties), flexGrow: colSpan }
        : style
    }
    className={cn(
      "p-4 align-middle [&:has([role=checkbox])]:pr-0 flex flex-1 basis-0 min-w-0 items-center justify-start",
      typeof className === "string" && /(^|\s)text-right(\s|$)/.test(className)
        ? "justify-end"
        : null,
      typeof className === "string" && /(^|\s)w-/.test(className)
        ? "flex-none basis-auto"
        : null,
      className
    )}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
