
import { View, Text } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'
import { Sparkles, LayoutGrid, User } from 'lucide-react-taro'
import { useState } from 'react'

const list = [
  {
    pagePath: '/pages/intro/index',
    text: '介绍',
    icon: Sparkles
  },
  {
    pagePath: '/pages/list/index',
    text: '组件',
    icon: LayoutGrid
  },
  {
    pagePath: '/pages/about/index',
    text: '关于',
    icon: User
  }
]

export default function CustomTabBar() {
  const [selected, setSelected] = useState(0)

  useDidShow(() => {
    const pages = Taro.getCurrentPages()
    const currentPage = pages[pages.length - 1]
    const url = `/${currentPage.route}`
    const index = list.findIndex(item => item.pagePath === url)
    if (index !== -1) {
      setSelected(index)
    }
  })

  const switchTab = (index: number, url: string) => {
    Taro.switchTab({ url })
    setSelected(index)
  }

  return (
    <View className="flex flex-row items-center bg-background border-t border-border pb-safe h-14">
      {list.map((item, index) => {
        const Icon = item.icon
        const isSelected = selected === index
        return (
          <View
            key={index}
            className="flex-1 flex flex-col items-center justify-center gap-1 py-1"
            onClick={() => switchTab(index, item.pagePath)}
          >
            <Icon 
              size={20} 
              color={isSelected ? '#0a0a0a' : '#737373'} 
              strokeWidth={isSelected ? 2.5 : 2}
            />
            <Text className={`text-[10px] ${isSelected ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
              {item.text}
            </Text>
          </View>
        )
      })}
    </View>
  )
}
