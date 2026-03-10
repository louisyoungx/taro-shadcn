import * as React from "react"
import { View, Text, RootPortal } from "@tarojs/components"
import {
  CircleCheck,
  Info,
  LoaderCircle,
  OctagonX,
  TriangleAlert,
  X
} from "lucide-react-taro"
import { cn } from "@/lib/utils"

// Custom Toaster implementation for Taro using RootPortal
// Mimics 'sonner' API to some extent

type ToastType = "success" | "info" | "warning" | "error" | "loading"

interface Toast {
  id: string | number
  title?: React.ReactNode
  description?: React.ReactNode
  type?: ToastType
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
  cancel?: {
    label: string
    onClick: () => void
  }
}

// Simple event bus for toasts
const listeners: Array<(toasts: Toast[]) => void> = []
let toasts: Toast[] = []

const notify = () => {
  listeners.forEach((l) => l([...toasts]))
}

const toast = (title: string | React.ReactNode, data?: Omit<Toast, "id" | "title">) => {
    const id = Date.now()
    const newToast: Toast = { id, title, ...data }
    toasts = [...toasts, newToast]
    notify()
    
    if (newToast.duration !== Infinity) {
        setTimeout(() => {
            dismiss(id)
        }, newToast.duration || 4000)
    }
    return id
}

const dismiss = (id: string | number) => {
    toasts = toasts.filter(t => t.id !== id)
    notify()
}

// Add specific methods
toast.success = (title: string | React.ReactNode, data?: any) => toast(title, { ...data, type: "success" })
toast.error = (title: string | React.ReactNode, data?: any) => toast(title, { ...data, type: "error" })
toast.info = (title: string | React.ReactNode, data?: any) => toast(title, { ...data, type: "info" })
toast.warning = (title: string | React.ReactNode, data?: any) => toast(title, { ...data, type: "warning" })
toast.loading = (title: string | React.ReactNode, data?: any) => toast(title, { ...data, type: "loading" })
toast.dismiss = dismiss

const Toaster = ({ ...props }) => {
    const [activeToasts, setActiveToasts] = React.useState<Toast[]>([])

    React.useEffect(() => {
        listeners.push(setActiveToasts)
        return () => {
            const index = listeners.indexOf(setActiveToasts)
            if (index > -1) {
                listeners.splice(index, 1)
            }
        }
    }, [])

    if (activeToasts.length === 0) return null

    return (
        <RootPortal>
            <View className="fixed bottom-0 right-0 z-[100] flex flex-col gap-2 p-4 w-full sm:max-w-[420px]">
                {activeToasts.map(t => (
                    <View 
                      key={t.id}
                      className={cn(
                            "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
                            "bg-background text-foreground border-border"
                        )}
                    >
                        <View className="flex gap-3 items-start">
                             {t.type === "success" && <CircleCheck className="h-5 w-5 text-green-500" />}
                             {t.type === "error" && <OctagonX className="h-5 w-5 text-red-500" />}
                             {t.type === "warning" && <TriangleAlert className="h-5 w-5 text-yellow-500" />}
                             {t.type === "info" && <Info className="h-5 w-5 text-blue-500" />}
                             {t.type === "loading" && <LoaderCircle className="h-5 w-5 animate-spin" />}
                             
                             <View className="grid gap-1">
                                {t.title && <View className="text-sm font-semibold">{t.title}</View>}
                                {t.description && <View className="text-sm opacity-90">{t.description}</View>}
                             </View>
                        </View>
                        <View
                          className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
                          onClick={() => dismiss(t.id)}
                        >
                            <X className="h-4 w-4" />
                        </View>
                    </View>
                ))}
            </View>
        </RootPortal>
    )
}

export { Toaster, toast }
