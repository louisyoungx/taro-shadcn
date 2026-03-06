
import { View, Text } from "@tarojs/components";
import { PageLayout } from "@/components/page-layout";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function ResizablePage() {
  return (
    <PageLayout title="Resizable">
      <ResizablePanelGroup
        direction="horizontal"
        className="max-w-md rounded-lg border"
      >
        <ResizablePanel defaultSize={50}>
          <View className="flex h-[200px] items-center justify-center p-6">
            <Text className="font-semibold">One</Text>
          </View>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={25}>
              <View className="flex h-full items-center justify-center p-6">
                <Text className="font-semibold">Two</Text>
              </View>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={75}>
              <View className="flex h-full items-center justify-center p-6">
                <Text className="font-semibold">Three</Text>
              </View>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </PageLayout>
  );
}
