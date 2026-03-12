import Taro from '@tarojs/taro'
import { canUseDOM, isH5 } from './platform'

export type Rect = { left: number; top: number; width: number; height: number }

const toNumber = (v: unknown) => {
    if (typeof v === 'number') return v
    if (typeof v === 'string') {
        const n = parseFloat(v)
        return Number.isFinite(n) ? n : 0
    }
    return 0
}

const normalizeRect = (r: any): Rect | null => {
    if (!r) return null
    return {
        left: toNumber(r.left),
        top: toNumber(r.top),
        width: toNumber(r.width),
        height: toNumber(r.height),
    }
}

export const getViewport = () => {
    if (isH5() && canUseDOM()) {
        return { width: window.innerWidth, height: window.innerHeight }
    }
    try {
        const info = Taro.getSystemInfoSync()
        return {
            width: toNumber(info.windowWidth),
            height: toNumber(info.windowHeight),
        }
    } catch {
        return { width: 375, height: 667 }
    }
}

const getRectH5 = (id: string): Rect | null => {
    if (!isH5() || !canUseDOM()) return null
    const el = document.getElementById(id)
    if (!el) return null
    const r = el.getBoundingClientRect()
    return normalizeRect(r)
}

export const getRectById = (id: string): Promise<Rect | null> => {
    const h5Rect = getRectH5(id)
    if (h5Rect) return Promise.resolve(h5Rect)
    return new Promise(resolve => {
        const query = Taro.createSelectorQuery()
        query
            .select(`#${id}`)
            .boundingClientRect(res => {
                const rect = Array.isArray(res) ? res[0] : res
                resolve(normalizeRect(rect))
            })
            .exec()
    })
}

export const computePosition = (params: {
    triggerRect: Rect
    contentRect: Rect
    align: 'start' | 'center' | 'end'
    side: 'top' | 'bottom' | 'left' | 'right'
    sideOffset: number
}) => {
    const { triggerRect, contentRect, align, side, sideOffset } = params
    const { width: vw, height: vh } = getViewport()
    const margin = 8

    const crossStart =
        side === 'left' || side === 'right' ? triggerRect.top : triggerRect.left
    const crossSize =
        side === 'left' || side === 'right'
            ? triggerRect.height
            : triggerRect.width
    const contentCrossSize =
        side === 'left' || side === 'right'
            ? contentRect.height
            : contentRect.width

    const cross = (() => {
        if (align === 'start') return crossStart
        if (align === 'end') return crossStart + crossSize - contentCrossSize
        return crossStart + crossSize / 2 - contentCrossSize / 2
    })()

    let left = 0
    let top = 0

    if (side === 'bottom' || side === 'top') {
        left = cross
        top =
            side === 'bottom'
                ? triggerRect.top + triggerRect.height + sideOffset
                : triggerRect.top - contentRect.height - sideOffset
    } else {
        top = cross
        left =
            side === 'right'
                ? triggerRect.left + triggerRect.width + sideOffset
                : triggerRect.left - contentRect.width - sideOffset
    }

    const maxLeft = Math.max(margin, vw - contentRect.width - margin)
    const maxTop = Math.max(margin, vh - contentRect.height - margin)

    left = Math.min(Math.max(left, margin), maxLeft)
    top = Math.min(Math.max(top, margin), maxTop)

    return { left, top }
}
