
import { View, Text } from "@tarojs/components";
import { PageLayout } from "@/components/page-layout";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Bold, Italic, Underline } from "lucide-react-taro";

export default function ToggleGroupPage() {
  return (
    <PageLayout title="ToggleGroup">
      <View className="space-y-4">
        <View className="space-y-2">
          <Text className="text-sm font-medium text-muted-foreground">Default (Single)</Text>
          <ToggleGroup type="single">
            <ToggleGroupItem value="bold" aria-label="Toggle bold">
              <Bold className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Toggle italic">
              <Italic className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Toggle underline">
              <Underline className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </View>

        <View className="space-y-2">
          <Text className="text-sm font-medium text-muted-foreground">Outline (Single)</Text>
          <ToggleGroup type="single" variant="outline">
            <ToggleGroupItem value="bold" aria-label="Toggle bold">
              <Bold className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Toggle italic">
              <Italic className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Toggle underline">
              <Underline className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </View>

        <View className="space-y-2">
          <Text className="text-sm font-medium text-muted-foreground">Multiple</Text>
          <ToggleGroup type="multiple" variant="outline">
            <ToggleGroupItem value="bold" aria-label="Toggle bold">
              <Bold className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Toggle italic">
              <Italic className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Toggle underline">
              <Underline className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </View>

        <View className="space-y-2">
          <Text className="text-sm font-medium text-muted-foreground">Small</Text>
          <ToggleGroup type="single" size="sm" variant="outline">
            <ToggleGroupItem value="bold" aria-label="Toggle bold">
              <Bold className="h-3.5 w-3.5" />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Toggle italic">
              <Italic className="h-3.5 w-3.5" />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Toggle underline">
              <Underline className="h-3.5 w-3.5" />
            </ToggleGroupItem>
          </ToggleGroup>
        </View>

        <View className="space-y-2">
          <Text className="text-sm font-medium text-muted-foreground">Large</Text>
          <ToggleGroup type="single" size="lg" variant="outline">
            <ToggleGroupItem value="bold" aria-label="Toggle bold">
              <Bold className="h-5 w-5" />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Toggle italic">
              <Italic className="h-5 w-5" />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Toggle underline">
              <Underline className="h-5 w-5" />
            </ToggleGroupItem>
          </ToggleGroup>
        </View>

        <View className="space-y-2">
          <Text className="text-sm font-medium text-muted-foreground">Disabled</Text>
          <ToggleGroup type="single">
            <ToggleGroupItem value="bold" aria-label="Toggle bold" disabled>
              <Bold className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Toggle italic" disabled>
              <Italic className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Toggle underline" disabled>
              <Underline className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </View>
      </View>
    </PageLayout>
  );
}
