
import { View, Text } from "@tarojs/components";
import { PageLayout } from "@/components/page-layout";
import { Toggle } from "@/components/ui/toggle";
import { Bold, Italic, Underline } from "lucide-react-taro";

export default function TogglePage() {
  return (
    <PageLayout title="Toggle">
      <View className="space-y-4">
        <View className="space-y-2">
          <Text className="text-sm font-medium text-muted-foreground">Default</Text>
          <View className="flex flex-row gap-4">
            <Toggle aria-label="Toggle bold">
              <Bold className="h-4 w-4" />
            </Toggle>
          </View>
        </View>

        <View className="space-y-2">
          <Text className="text-sm font-medium text-muted-foreground">Outline</Text>
          <View className="flex flex-row gap-4">
            <Toggle variant="outline" aria-label="Toggle italic">
              <Italic className="h-4 w-4" />
            </Toggle>
          </View>
        </View>

        <View className="space-y-2">
          <Text className="text-sm font-medium text-muted-foreground">With Text</Text>
          <View className="flex flex-row gap-4">
            <Toggle aria-label="Toggle italic">
              <Italic className="h-4 w-4 mr-2" />
              <Text>Italic</Text>
            </Toggle>
            <Toggle variant="outline" aria-label="Toggle italic">
              <Italic className="h-4 w-4 mr-2" />
              <Text>Italic</Text>
            </Toggle>
          </View>
        </View>

        <View className="space-y-2">
          <Text className="text-sm font-medium text-muted-foreground">Small</Text>
          <View className="flex flex-row gap-4">
            <Toggle size="sm" aria-label="Toggle small">
              <Italic className="h-3 w-3" />
            </Toggle>
            <Toggle size="sm" variant="outline" aria-label="Toggle small">
              <Italic className="h-3 w-3" />
            </Toggle>
          </View>
        </View>

        <View className="space-y-2">
          <Text className="text-sm font-medium text-muted-foreground">Large</Text>
          <View className="flex flex-row gap-4">
            <Toggle size="lg" aria-label="Toggle large">
              <Italic className="h-5 w-5" />
            </Toggle>
            <Toggle size="lg" variant="outline" aria-label="Toggle large">
              <Italic className="h-5 w-5" />
            </Toggle>
          </View>
        </View>

        <View className="space-y-2">
          <Text className="text-sm font-medium text-muted-foreground">Disabled</Text>
          <View className="flex flex-row gap-4">
            <Toggle disabled aria-label="Toggle disabled">
              <Underline className="h-4 w-4" />
            </Toggle>
            <Toggle disabled variant="outline" aria-label="Toggle disabled">
              <Underline className="h-4 w-4" />
            </Toggle>
          </View>
        </View>
      </View>
    </PageLayout>
  );
}
