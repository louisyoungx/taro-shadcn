import * as React from 'react'
import Taro from '@tarojs/taro'

// Global state to track keyboard height across the app
let globalKeyboardHeight = 0
const listeners = new Set<(height: number) => void>()

const isNotWeb = Taro.getEnv() !== Taro.ENV_TYPE.WEB

if (isNotWeb && typeof Taro.onKeyboardHeightChange === 'function') {
    Taro.onKeyboardHeightChange(res => {
        globalKeyboardHeight = res.height
        listeners.forEach(listener => listener(globalKeyboardHeight))
    })
}

export function useKeyboardOffset() {
    const [offset, setOffset] = React.useState(globalKeyboardHeight)

    React.useEffect(() => {
        if (!isNotWeb) return

        const handler = (height: number) => {
            setOffset(height)
        }

        listeners.add(handler)
        // Update immediately with current global value in case it changed
        setOffset(globalKeyboardHeight)

        return () => {
            listeners.delete(handler)
        }
    }, [])

    return offset
}
