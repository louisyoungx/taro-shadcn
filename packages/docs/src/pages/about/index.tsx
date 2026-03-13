import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { 
  Github, 
  ExternalLink, 
  Code,
  Package
} from 'lucide-react-taro'
import { Badge } from '@/components/ui/badge'
import { isH5 } from '@/lib/platform'
import type { FC } from 'react'

const About: FC = () => {
  const handleCopyLink = (link: string) => {
    if (isH5()) {
      window.open(link, '_blank')
      return
    }
    Taro.setClipboardData({
      data: link
    })
    Taro.showToast({
      title: '已复制到剪贴板',
      icon: 'success'
    })
  }

  const handleOpenLink = (url: string) => {
    if (isH5()) {
      window.open(url, '_blank')
      return
    }
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
      <View className="px-6 pt-16 pb-6">
        <View className="flex items-center justify-center mb-4">
          <View className="w-14 h-14 bg-foreground rounded-lg flex items-center justify-center">
            <Image src="/static/logo.png" className="w-10 h-10" />
          </View>
        </View>
        
        <Text className="block text-2xl font-bold text-center text-foreground mb-1">
          taro-shadcn
        </Text>
      </View>

      {/* Content */}
      <View className="px-6">
        {/* Tech Stack */}
        <View className="mb-6">
          <View className="flex flex-wrap gap-2">
            <Badge variant="secondary">Taro 4</Badge>
            <Badge variant="secondary">React 18</Badge>
            <Badge variant="secondary">TypeScript</Badge>
            <Badge variant="secondary">Tailwind CSS</Badge>
            <Badge variant="secondary">Zustand</Badge>
          </View>
        </View>

        <Text className="block text-sm text-muted-foreground leading-relaxed mb-6">
          基于 shadcn/ui 设计系统的 Taro 小程序组件库，提供 48+ 精心设计的组件，完美支持 H5 和微信小程序双端运行。
        </Text>

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

        {/* License Section */}
        <View className="mb-6">
          <Text className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">协议</Text>
          <View className="bg-muted rounded p-3">
            <Text className="block text-sm font-medium text-foreground mb-1">MIT License</Text>
            <Text className="block text-xs text-muted-foreground">
              Copyleft © {new Date().getFullYear()} taro-shadcn
            </Text>
          </View>
        </View>

        {/* Author Section */}
        <View className="mb-6">
          <Text className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">作者</Text>
          <View 
            className="flex items-center justify-between p-3 bg-muted rounded" 
            onClick={() => handleOpenLink('https://github.com/louisyoungx')} 
          > 
            <View className="flex items-center gap-2"> 
              <Github size={16} color="#737373" /> 
              <Text className="text-sm text-foreground">GitHub</Text> 
            </View> 
            <View className="flex items-center gap-1">
              <Text className="text-sm text-muted-foreground pr-1">@louisyoungx</Text>
              <ExternalLink size={14} color="#a3a3a3" /> 
            </View>
          </View> 
        </View>
      </View>

      {/* Footer */}
      <View className="px-6 py-6 text-center">
        <Text className="block text-xs text-muted-foreground">
          Copyleft © {new Date().getFullYear()} taro-shadcn
        </Text>
      </View>
    </View>
  )
}

export default About
