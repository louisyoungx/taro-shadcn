import * as React from "react"
import { RootPortal } from "@tarojs/components"
import Taro from "@tarojs/taro"
import { createPortal } from "react-dom"

const isH5 = () => {
  try {
    return Taro.getEnv() === Taro.ENV_TYPE.WEB
  } catch {
    return typeof document !== "undefined"
  }
}

const Portal = ({ children }: { children: React.ReactNode }) => {
  if (isH5()) {
    if (typeof document === "undefined") return <>{children}</>
    return createPortal(children, document.body)
  }
  return <RootPortal>{children}</RootPortal>
}

export { Portal }
