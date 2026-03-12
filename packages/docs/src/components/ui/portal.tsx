import * as React from "react"
import * as TaroComponents from "@tarojs/components"
import { createPortal } from "react-dom"
import { isH5 } from "@/lib/platform"

const RootPortal = (TaroComponents as any).RootPortal

const Portal = ({ children }: { children: React.ReactNode }) => {
  if (isH5()) {
    if (typeof document === "undefined") return <>{children}</>
    return createPortal(children, document.body)
  }
  if (!RootPortal) {
    return <>{children}</>
  }
  return <RootPortal>{children}</RootPortal>
}

export { Portal }
