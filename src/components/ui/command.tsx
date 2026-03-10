import * as React from "react"
import { View, Input, ScrollView } from "@tarojs/components"
import { Search } from "lucide-react-taro"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "@/components/ui/dialog"

const CommandContext = React.createContext<{
  search: string
  deferredSearch: string
  setSearch: (search: string) => void
  setItemState: (id: string, state: ItemState) => void
  removeItem: (id: string) => void
  hasAnyMatch: () => boolean
  groupHasAnyMatch: (groupId: string) => boolean
  itemsSize: number
} | null>(null)

type ItemState = { match: boolean; groupId?: string }

const GroupContext = React.createContext<{ groupId?: string } | null>(null)

function getNodeText(node: React.ReactNode): string {
  if (node == null || typeof node === "boolean") return ""
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(getNodeText).join(" ")
  if (React.isValidElement(node)) return getNodeText(node.props?.children)
  return ""
}

const Command = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, children, ...props }, ref) => {
  const [search, setSearch] = React.useState("")
  // 使用 deferredSearch 来延迟搜索过滤逻辑，确保输入框在输入时保持响应，解决微信小程序中的输入抖动和文字消失问题
  const deferredSearch = React.useDeferredValue(search)
  const [, setItemsTick] = React.useState(0)
  const itemsRef = React.useRef<Map<string, ItemState>>(new Map())

  const setItemState = React.useCallback((id: string, state: ItemState) => {
    const prev = itemsRef.current.get(id)
    if (prev?.match === state.match && prev?.groupId === state.groupId) return
    itemsRef.current.set(id, state)
    // React 18 handles state update batching, but we can also use a small tick to be safe
    setItemsTick((v) => v + 1)
  }, [])

  const removeItem = React.useCallback((id: string) => {
    if (!itemsRef.current.has(id)) return
    itemsRef.current.delete(id)
    setItemsTick((v) => v + 1)
  }, [])

  const hasAnyMatch = React.useCallback(() => {
    for (const s of itemsRef.current.values()) {
      if (s.match) return true
    }
    return false
  }, [])

  const groupHasAnyMatch = React.useCallback((groupId: string) => {
    for (const s of itemsRef.current.values()) {
      if (s.groupId === groupId && s.match) return true
    }
    return false
  }, [])

  return (
    <CommandContext.Provider
      value={{
        search,
        deferredSearch,
        setSearch,
        setItemState,
        removeItem,
        hasAnyMatch,
        groupHasAnyMatch,
        itemsSize: itemsRef.current.size,
      }}
    >
      <View
        ref={ref}
        className={cn(
          "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
          className
        )}
        {...props}
      >
        {children}
      </View>
    </CommandContext.Provider>
  )
})
Command.displayName = "Command"

const CommandDialog = ({ children, ...props }) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        <Command>{children}</Command>
      </DialogContent>
    </Dialog>
  )
}

const CommandInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentPropsWithoutRef<typeof Input> & { focus?: boolean }
>(({ className, placeholderClass, focus = true, ...props }, ref) => {
  const context = React.useContext(CommandContext)
  const [localValue, setLocalValue] = React.useState(context?.search ?? "")

  React.useEffect(() => {
    if (context?.search !== localValue) {
      setLocalValue(context?.search ?? "")
    }
  }, [context?.search])

  return (
    <View
      className="flex h-11 items-center border-b px-3"
      data-slot="command-input-wrapper"
    >
      <Search className="mr-2 shrink-0 opacity-50" size={16} />
      <Input
        ref={ref}
        className={cn(
          "min-w-0 flex-1 rounded-md bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        placeholderClass={cn("text-muted-foreground", placeholderClass)}
        value={localValue}
        onInput={(e) => {
          const v = e.detail.value
          setLocalValue(v)
          context?.setSearch(v)
        }}
        focus={focus}
        {...props}
      />
    </View>
  )
})
CommandInput.displayName = "CommandInput"

const CommandList = React.forwardRef<
  React.ElementRef<typeof ScrollView>,
  React.ComponentPropsWithoutRef<typeof ScrollView>
>(({ className, ...props }, ref) => (
  <ScrollView
    scrollY
    ref={ref}
    className={cn("overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
))
CommandList.displayName = "CommandList"

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => {
  const context = React.useContext(CommandContext)

  const show = context ? context.itemsSize > 0 && !context.hasAnyMatch() : false
  if (!show) return null

  return (
    <View
      ref={ref}
      className={cn("py-6 text-center text-sm", className)}
      {...props}
    />
  )
})
CommandEmpty.displayName = "CommandEmpty"

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { heading?: React.ReactNode }
>(({ className, heading, children, ...props }, ref) => {
  const context = React.useContext(CommandContext)
  const groupId = React.useId()

  const show =
    !context || context.itemsSize === 0 || context.groupHasAnyMatch(groupId)

  return (
    <GroupContext.Provider value={{ groupId }}>
      <View
        ref={ref}
        data-slot="command-group"
        className={cn("overflow-hidden p-1 text-foreground", className)}
        style={!show ? ({ display: "none" } as any) : undefined}
        {...props}
      >
        {heading && (
          <View
            data-slot="command-group-heading"
            className="px-2 py-2 text-xs font-medium text-muted-foreground"
          >
            {heading}
          </View>
        )}
        {children}
      </View>
    </GroupContext.Provider>
  )
})
CommandGroup.displayName = "CommandGroup"

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn("-mx-1 h-px bg-border", className)}
    {...props}
  />
))
CommandSeparator.displayName = "CommandSeparator"

const CommandItem = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { 
    value?: string
    onSelect?: (value: string) => void 
    disabled?: boolean
  }
>(({ className, value, onSelect, disabled, children, ...props }, ref) => {
  const context = React.useContext(CommandContext)
  const group = React.useContext(GroupContext)
  const id = React.useId()

  const computedValue = (value ?? getNodeText(children)).trim()
  const search = (context?.deferredSearch ?? "").trim().toLowerCase()

  const match =
    !search || (!!computedValue && computedValue.toLowerCase().includes(search))

  React.useEffect(() => {
    if (!context) return
    context.setItemState(id, { match, groupId: group?.groupId })
    return () => context.removeItem(id)
  }, [context, id, match, group?.groupId])

  return (
    <View
      ref={ref}
      data-slot="command-item"
      className={cn(
        "relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-2 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
      style={!match ? ({ display: "none" } as any) : undefined}
      onClick={() => !disabled && onSelect?.(computedValue)}
      {...props}
    >
      {children}
    </View>
  )
})
CommandItem.displayName = "CommandItem"

const CommandShortcut = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) => {
  return (
    <View
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
CommandShortcut.displayName = "CommandShortcut"

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
