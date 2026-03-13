import { View, Text } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { useState, useMemo, useEffect } from 'react'
import { Copy, Terminal, Code, ChevronDown, ChevronUp } from 'lucide-react-taro'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CodeBlock } from '@/components/ui/code-block'
import type { FC } from 'react'
import { 
  type PackageManager, 
  defaultDoc, 
  componentDocs, 
  getInstallCmd 
} from './data'
import { uiRegistry } from '../ui/registry'

// Demo 组件
const ComponentDemo: FC<{ componentName: string }> = ({ componentName }) => {
  const demo = uiRegistry[componentName];
  if (!demo) {
    return <Text className="text-sm text-muted-foreground">暂无 Demo</Text>;
  }
  const DemoComponent = demo.component;
  return <DemoComponent />;
}

// 包管理器选项
const packageManagers: { value: PackageManager; label: string }[] = [
  { value: 'npm', label: 'npm' },
  { value: 'pnpm', label: 'pnpm' },
  { value: 'yarn', label: 'yarn' },
  { value: 'bun', label: 'bun' },
]

const ComponentDetail: FC = () => {
  const router = useRouter()
  const { name } = router.params
  const [packageManager, setPackageManager] = useState<PackageManager>('npm')
  const [codeExpanded, setCodeExpanded] = useState(true)

  const doc = useMemo(() => {
    if (!name) return { ...defaultDoc, code: '' }
    const baseDoc = componentDocs[name] || defaultDoc
    const registryEntry = uiRegistry[name as string]
    return {
      ...baseDoc,
      code: registryEntry?.code || ''
    }
  }, [name])

  // 设置导航栏标题为组件名称
  useEffect(() => {
    Taro.setNavigationBarTitle({ title: doc.title })
  }, [doc.title])

  const installCmd = getInstallCmd(doc.packageName, packageManager)

  const copyInstallCmd = async () => {
    await Taro.setClipboardData({ data: installCmd })
    Taro.showToast({ title: '已复制', icon: 'success' })
  }

  const copyCode = async () => {
    await Taro.setClipboardData({ data: doc.code })
    Taro.showToast({ title: '已复制', icon: 'success' })
  }

  return (
    <View className="flex flex-col min-h-screen bg-background">
      <View className="flex-1 p-4">
        {/* 简介 */}
        <View className="px-2 pb-6 pt-4 text-sm text-muted-foreground">{doc.description}</View>

        <Card className="mb-6">
          <CardHeader>
            <View className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">安装</CardTitle>
              <View className="flex flex-row items-center gap-1">
                {packageManagers.map((pm) => (
                  <Button
                    key={pm.value}
                    variant={packageManager === pm.value ? 'secondary' : 'ghost'}
                    size="sm"
                    className="h-7 px-2"
                    onClick={() => setPackageManager(pm.value)}
                  >
                    <Text className="text-xs">{pm.label}</Text>
                  </Button>
                ))}
              </View>
            </View>
          </CardHeader>
          <CardContent>
            {/* 命令显示 */}
            <View className="bg-muted rounded-lg p-3 flex flex-row items-center justify-between">
              <View className="flex flex-row items-center gap-2 flex-1 overflow-hidden">
                <Terminal size={16} color="#737373" className="shrink-0" />
                <ScrollArea orientation="horizontal" className="flex-1">
                  <Text className="text-xs text-muted-foreground whitespace-nowrap">{installCmd}</Text>
                </ScrollArea>
              </View>
              <Button variant="ghost" size="icon" className="shrink-0" onClick={copyInstallCmd}>
                <Copy size={16} color="#737373" />
              </Button>
            </View>
          </CardContent>
        </Card>

        {/* 示例 */}
        <Card className="mb-4">
          <CardHeader>
            <View className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">示例</CardTitle>
              <Button variant="ghost" size="sm" onClick={copyCode}>
                <Copy size={14} color="#737373" />
                <Text className="text-xs ml-1">复制代码</Text>
              </Button>
            </View>
          </CardHeader>
          <CardContent>
            <ComponentDemo componentName={name as string} />
          </CardContent>
        </Card>

        {/* 代码 */}
        <Card className="mb-4">
          <CardHeader>
            <View className="flex flex-row items-center justify-between">
              <View className="flex flex-row items-center gap-2">
                <Code size={16} color="#737373" />
                <CardTitle className="text-base">代码</CardTitle>
              </View>
              <Button variant="ghost" size="sm" onClick={() => setCodeExpanded(!codeExpanded)}>
                <Text className="text-xs">{codeExpanded ? '收起' : '展开'}</Text>
                {codeExpanded ? <ChevronUp size={14} color="#737373" /> : <ChevronDown size={14} color="#737373" />}
              </Button>
            </View>
          </CardHeader>
          {codeExpanded && (
            <CardContent>
              <CodeBlock scrollAreaClassName="h-100" code={doc.code} language="tsx" />
            </CardContent>
           )}
        </Card>

        {/* Props */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Props</CardTitle>
          </CardHeader>
          <CardContent>
            {doc.props.length > 0 ? (
              <View className="flex flex-col gap-3">
                {doc.props.map((prop, index) => (
                  <View key={index} className="flex flex-col gap-1">
                    <View className="flex flex-row items-center gap-2">
                      <Text className="text-sm font-mono font-medium break-all">{prop.name}</Text>
                    </View>
                    <Text className="text-xs text-muted-foreground font-mono break-all">{prop.type}</Text>
                    <Text className="text-sm text-muted-foreground">{prop.description}</Text>
                    {index < doc.props.length - 1 && <Separator className="mt-2" />}
                  </View>
                ))}
              </View>
            ) : (
              <Text className="text-sm text-muted-foreground">暂无 Props 文档</Text>
            )}
          </CardContent>
        </Card>
      </View>
    </View>
  )
}

export default ComponentDetail
