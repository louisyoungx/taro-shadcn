import { View, Text } from "@tarojs/components"
import { PageLayout } from "@/components/page-layout"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export default function ResizablePage() {
  return (
    <PageLayout title="Resizable">
      <View className="p-4 space-y-8">
        <View className="space-y-2">
          <Text className="text-sm font-medium">Horizontal</Text>
          <ResizablePanelGroup
            direction="horizontal"
            className="min-h-30 max-w-md rounded-lg border"
          >
            <ResizablePanel defaultSize={50}>
              <View className="flex flex-1 items-center justify-center p-6">
                <Text className="font-semibold">One</Text>
              </View>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50}>
              <View className="flex flex-1 items-center justify-center p-6">
                <Text className="font-semibold">Two</Text>
              </View>
            </ResizablePanel>
          </ResizablePanelGroup>
        </View>

        <View className="space-y-2">
          <Text className="text-sm font-medium">Vertical</Text>
          <ResizablePanelGroup
            direction="vertical"
            className="min-h-45 max-w-md rounded-lg border"
          >
            <ResizablePanel defaultSize={30}>
              <View className="flex flex-1 items-center justify-center p-6">
                <Text className="font-semibold">Top</Text>
              </View>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={70}>
              <View className="flex flex-1 items-center justify-center p-6">
                <Text className="font-semibold">Bottom</Text>
              </View>
            </ResizablePanel>
          </ResizablePanelGroup>
        </View>

        <View className="space-y-2">
          <Text className="text-sm font-medium">Nested</Text>
          <ResizablePanelGroup
            direction="horizontal"
            className="min-h-45 max-w-md rounded-lg border"
          >
            <ResizablePanel defaultSize={20}>
              <View className="flex flex-1 items-center justify-center p-6">
                <Text className="font-semibold">Sidebar</Text>
              </View>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={80}>
              <ResizablePanelGroup direction="vertical">
                <ResizablePanel defaultSize={50}>
                  <View className="flex flex-1 items-center justify-center p-6">
                    <Text className="font-semibold">Header</Text>
                  </View>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={50}>
                  <View className="flex flex-1 items-center justify-center p-6">
                    <Text className="font-semibold">Content</Text>
                  </View>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </View>
      </View>
    </PageLayout>
  )
}
