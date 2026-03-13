import * as React from "react"
import { View, Input, ScrollView } from "@tarojs/components"
import Taro from "@tarojs/taro"
import { Search } from "lucide-react-taro"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "@/components/ui/dialog"

const CommandContext = React.createContext<{
  search: string
  deferredSearch: string
  setSearch: (search: string) => void
} | null>(null)

const CommandItemsContext = React.createContext<{
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
  const tickRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    return () => {
      if (tickRef.current) clearTimeout(tickRef.current)
    }
  }, [])

  const triggerItemsUpdate = React.useCallback(() => {
    if (tickRef.current) return
    // 使用短延时批处理项目状态更新，减少重绘频率
    tickRef.current = setTimeout(() => {
      setItemsTick((v) => v + 1)
      tickRef.current = null
    }, 16)
  }, [])

  const setItemState = React.useCallback((id: string, state: ItemState) => {
    const prev = itemsRef.current.get(id)
    if (prev?.match === state.match && prev?.groupId === state.groupId) return
    itemsRef.current.set(id, state)
    triggerItemsUpdate()
  }, [triggerItemsUpdate])

  const removeItem = React.useCallback((id: string) => {
    if (!itemsRef.current.has(id)) return
    itemsRef.current.delete(id)
    triggerItemsUpdate()
  }, [triggerItemsUpdate])

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

  const searchContextValue = React.useMemo(() => ({
    search,
    deferredSearch,
    setSearch,
  }), [search, deferredSearch])

  const itemsContextValue = React.useMemo(() => ({
    setItemState,
    removeItem,
    hasAnyMatch,
    groupHasAnyMatch,
    itemsSize: itemsRef.current.size,
  }), [setItemState, removeItem, hasAnyMatch, groupHasAnyMatch])

  return (
    <CommandContext.Provider value={searchContextValue}>
      <CommandItemsContext.Provider value={itemsContextValue}>
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
      </CommandItemsContext.Provider>
    </CommandContext.Provider>
  )
})
Command.displayName = "Command"

const CommandDialog = ({ children, ...props }) => {
  const { open: openProp, defaultOpen, onOpenChange, ...rest } = props as any
  const [openState, setOpenState] = React.useState(defaultOpen || false)
  const open = openProp !== undefined ? openProp : openState

  const handleOpenChange = (newOpen: boolean) => {
    if (openProp === undefined) setOpenState(newOpen)
    onOpenChange?.(newOpen)
  }

  const enhancedChildren = React.useMemo(() => {
    const enhance = (node: React.ReactNode): React.ReactNode =>
      React.Children.map(node, (child) => {
        if (!React.isValidElement(child)) return child
        if (child.type === CommandInput) {
          if (child.props?.focus === false) return child
          return React.cloneElement(child as any, { 
            focus: open,
            className: cn(child.props?.className, "pr-11")
          })
        }
        if (!child.props?.children) return child
        return React.cloneElement(child as any, undefined, enhance(child.props.children))
      })

    return enhance(children)
  }, [children, open])

  return (
    <Dialog open={open} onOpenChange={handleOpenChange} {...rest}>
      <DialogContent 
        className="overflow-hidden p-0 shadow-lg"
        closeClassName="top-3"
      >
        <Command>{enhancedChildren}</Command>
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
  const lastSyncedSearchRef = React.useRef(context?.search ?? "")
  const [inputFocus, setInputFocus] = React.useState(false)
  const focusTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    // 只有当 context.search 与上次同步的值不同，且与当前输入值也不同时，才进行强制同步（通常是外部重置了搜索内容）
    if (context?.search !== lastSyncedSearchRef.current && context?.search !== localValue) {
      setLocalValue(context?.search ?? "")
      lastSyncedSearchRef.current = context?.search ?? ""
    }
  }, [context?.search, localValue])

  React.useEffect(() => {
    if (focusTimerRef.current) clearTimeout(focusTimerRef.current)
    focusTimerRef.current = null

    if (!focus) {
      setInputFocus(false)
      return
    }

    setInputFocus(false)

    const schedule = () => {
      focusTimerRef.current = setTimeout(() => {
        setInputFocus(true)
        focusTimerRef.current = null
      }, 0)
    }

    if (typeof (Taro as any)?.nextTick === "function") {
      ;(Taro as any).nextTick(schedule)
    } else {
      schedule()
    }

    return () => {
      if (focusTimerRef.current) clearTimeout(focusTimerRef.current)
      focusTimerRef.current = null
    }
  }, [focus])

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
          lastSyncedSearchRef.current = v
          context?.setSearch(v)
        }}
        focus={inputFocus}
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
  const context = React.useContext(CommandItemsContext)

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
  const context = React.useContext(CommandItemsContext)
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
  const itemsContext = React.useContext(CommandItemsContext)
  const group = React.useContext(GroupContext)
  const id = React.useId()

  const computedValue = React.useMemo(() => (value ?? getNodeText(children)).trim(), [value, children])
  const search = (context?.deferredSearch ?? "").trim().toLowerCase()

  const match = React.useMemo(() => 
    !search || (!!computedValue && computedValue.toLowerCase().includes(search))
  , [search, computedValue])

  React.useEffect(() => {
    if (!itemsContext) return
    itemsContext.setItemState(id, { match, groupId: group?.groupId })
    return () => itemsContext.removeItem(id)
  }, [itemsContext, id, match, group?.groupId])

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
