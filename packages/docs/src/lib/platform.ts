import Taro from "@tarojs/taro"

export const canUseDOM = () => typeof window !== "undefined" && typeof document !== "undefined"

export const isH5 = () => {
  try {
    return Taro.getEnv() === Taro.ENV_TYPE.WEB
  } catch {
    return canUseDOM()
  }
}

