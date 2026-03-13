import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { 
  BookOpen, 
  Boxes, 
  Sparkles, 
  Zap, 
  Palette,
  Terminal,
  Copy,
  ChevronRight
} from 'lucide-react-taro'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { FC } from 'react'

const Index: FC = () => {
  const handleNavigate = (url: string) => {
    Taro.navigateTo({ url })
  }

  const handleCopy = (text: string) => {
    Taro.setClipboardData({ data: text })
    Taro.showToast({ title: '已复制', icon: 'success' })
  }

  return (
    <View className="min-h-screen bg-background">
      {/* Hero Section */}
      <View className="px-6 pt-16 pb-8">
        <View className="flex items-center justify-center mb-5">
          <View className="w-14 h-14 bg-foreground rounded-lg flex items-center justify-center">
            <Sparkles size={28} color="#fff" />
          </View>
        </View>
        
        <Text className="block text-2xl font-bold text-center text-foreground mb-2">
          taro-shadcn
        </Text>
        
        <Text className="block text-sm text-center text-muted-foreground mb-6">
          基于 shadcn/ui 的 Taro 小程序组件库
        </Text>

        {/* Buttons */}
        <View className="flex gap-3 px-2">
          <Button 
            className="flex-1 h-10"
            onClick={() => handleNavigate('/pages/list/index')}
          >
            <BookOpen size={16} color="#fff" />
            <Text className="text-primary-foreground">浏览组件</Text>
          </Button>
          <Button 
            variant="outline"
            className="flex-1 h-10"
            onClick={() => Taro.setClipboardData({ data: 'https://github.com/louisyoungx/taro-shadcn' })}
          >
            <Text>GitHub</Text>
            <ChevronRight size={14} color="#0a0a0a" />
          </Button>
        </View>
      </View>

      {/* Features Section */}
      <View className="px-6 py-4">
        <Text className="block text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">
          特性
        </Text>
        
        <View className="space-y-2">
          <Card className="border border-border">
            <CardContent className="flex items-center gap-3 p-3">
              <View className="w-8 h-8 bg-muted rounded-md flex items-center justify-center">
                <Zap size={16} color="#0a0a0a" />
              </View>
              <View className="flex-1">
                <Text className="block text-sm font-medium text-foreground">跨端兼容</Text>
                <Text className="block text-xs text-muted-foreground">支持 Web、微信小程序、抖音小程序</Text>
              </View>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardContent className="flex items-center gap-3 p-3">
              <View className="w-8 h-8 bg-muted rounded-md flex items-center justify-center">
                <Palette size={16} color="#0a0a0a" />
              </View>
              <View className="flex-1">
                <Text className="block text-sm font-medium text-foreground">高度可定制</Text>
                <Text className="block text-xs text-muted-foreground">基于 Tailwind CSS，样式完全可控</Text>
              </View>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardContent className="flex items-center gap-3 p-3">
              <View className="w-8 h-8 bg-muted rounded-md flex items-center justify-center">
                <Boxes size={16} color="#0a0a0a" />
              </View>
              <View className="flex-1">
                <Text className="block text-sm font-medium text-foreground">丰富的组件</Text>
                <Text className="block text-xs text-muted-foreground">46 个精心设计的组件</Text>
              </View>
            </CardContent>
          </Card>
        </View>
      </View>

      {/* Quick Start Section */}
      <View className="px-6 py-4">
        <Text className="block text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">
          快速开始
        </Text>

        <Card className="border border-border">
          <CardContent className="p-3">
            <View className="flex items-center justify-between mb-2">
              <View className="flex items-center gap-2">
                <Terminal size={14} color="#737373" />
                <Text className="text-xs text-muted-foreground">添加组件</Text>
              </View>
              <View onClick={() => handleCopy('pnpm dlx taro-shadcn@latest add button')}>
                <Copy size={14} color="#737373" />
              </View>
            </View>
            <Text className="block text-sm font-mono text-foreground">
              pnpm dlx taro-shadcn@latest add button
            </Text>
          </CardContent>
        </Card>
      </View>

      {/* Stats Section */}
      <View className="px-6 py-4">
        <View className="flex justify-around">
          <View className="text-center">
            <Text className="block text-2xl font-bold text-foreground">46</Text>
            <Text className="block text-xs text-muted-foreground">组件</Text>
          </View>
          <View className="w-px bg-border" />
          <View className="text-center">
            <Text className="block text-2xl font-bold text-foreground">3</Text>
            <Text className="block text-xs text-muted-foreground">平台</Text>
          </View>
          <View className="w-px bg-border" />
          <View className="text-center">
            <Text className="block text-2xl font-bold text-foreground">MIT</Text>
            <Text className="block text-xs text-muted-foreground">开源</Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View className="px-6 py-6">
        <Text className="block text-center text-xs text-muted-foreground">
          Made by Louis Young
        </Text>
      </View>
    </View>
  )
}

export default Index
