import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { 
  Github, 
  ExternalLink, 
  Code,
  Package
} from 'lucide-react-taro'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import type { FC } from 'react'

const About: FC = () => {
  const handleCopyLink = (link: string) => {
    Taro.setClipboardData({
      data: link
    })
    Taro.showToast({
      title: '已复制到剪贴板',
      icon: 'success'
    })
  }

  const handleOpenLink = (url: string) => {
    Taro.setClipboardData({
      data: url
    })
    Taro.showToast({
      title: '链接已复制',
      icon: 'success'
    })
  }

  return (
    <View className="min-h-screen bg-background">
      {/* Header */}
      <View className="px-6 pt-16 pb-8">
        <View className="flex items-center justify-center mb-4">
          <View className="w-14 h-14 bg-foreground rounded-lg flex items-center justify-center">
            <Package size={28} color="#fff" />
          </View>
        </View>
        
        <Text className="block text-2xl font-bold text-center text-foreground mb-1">
          taro-shadcn
        </Text>
        
        <Text className="block text-sm text-center text-muted-foreground">
          v1.0.0
        </Text>
      </View>

      {/* Content */}
      <View className="px-6">
        <Text className="block text-sm text-muted-foreground leading-relaxed mb-6">
          基于 shadcn/ui 设计系统的 Taro 小程序组件库，提供 48+ 精心设计的组件，完美支持 H5 和微信小程序双端运行。
        </Text>

        {/* Author Section */}
        <View className="mb-6">
          <Text className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">作者</Text>
          <Card className="border-0 shadow-none bg-muted">
            <CardContent className="p-3 space-y-2">
              <View className="flex items-center justify-between">
                <Text className="text-sm text-muted-foreground">作者</Text>
                <Text className="text-sm font-medium text-foreground">Louis Young</Text>
              </View>
              <Separator />
              <View className="flex items-center justify-between">
                <Text className="text-sm text-muted-foreground">GitHub</Text>
                <View 
                  className="flex items-center gap-1"
                  onClick={() => handleOpenLink('https://github.com/louisyoungx')}
                >
                  <Text className="text-sm text-foreground">@louisyoungx</Text>
                  <ExternalLink size={12} color="#737373" />
                </View>
              </View>
            </CardContent>
          </Card>
        </View>

        {/* Links Section */}
        <View className="mb-6">
          <Text className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">链接</Text>
          <View className="space-y-1">
            <View 
              className="flex items-center justify-between p-3 bg-muted rounded"
              onClick={() => handleCopyLink('https://github.com/louisyoungx/taro-shadcn')}
            >
              <View className="flex items-center gap-2">
                <Github size={16} color="#737373" />
                <Text className="text-sm text-foreground">GitHub 仓库</Text>
              </View>
              <ExternalLink size={14} color="#a3a3a3" />
            </View>
            
            <View 
              className="flex items-center justify-between p-3 bg-muted rounded"
              onClick={() => handleCopyLink('https://ui.shadcn.com')}
            >
              <View className="flex items-center gap-2">
                <Package size={16} color="#737373" />
                <Text className="text-sm text-foreground">shadcn/ui</Text>
              </View>
              <ExternalLink size={14} color="#a3a3a3" />
            </View>
            
            <View 
              className="flex items-center justify-between p-3 bg-muted rounded"
              onClick={() => handleCopyLink('https://taro.zone')}
            >
              <View className="flex items-center gap-2">
                <Code size={16} color="#737373" />
                <Text className="text-sm text-foreground">Taro</Text>
              </View>
              <ExternalLink size={14} color="#a3a3a3" />
            </View>
          </View>
        </View>

        {/* Tech Stack */}
        <View className="mb-6">
          <Text className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">技术栈</Text>
          <View className="flex flex-wrap gap-2">
            <Badge variant="secondary">Taro 4</Badge>
            <Badge variant="secondary">React 18</Badge>
            <Badge variant="secondary">TypeScript</Badge>
            <Badge variant="secondary">Tailwind CSS</Badge>
            <Badge variant="secondary">Zustand</Badge>
          </View>
        </View>

        {/* License Section */}
        <View className="mb-6">
          <Text className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">协议</Text>
          <View className="bg-muted rounded p-3">
            <Text className="block text-sm font-medium text-foreground mb-1">MIT License</Text>
            <Text className="block text-xs text-muted-foreground">
              Copyright (c) 2024 Louis Young
            </Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View className="px-6 py-6 text-center">
        <Text className="block text-xs text-muted-foreground">
          © 2024 taro-shadcn
        </Text>
      </View>
    </View>
  )
}

export default About
