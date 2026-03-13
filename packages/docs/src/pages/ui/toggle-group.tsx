
import { View, Text } from "@tarojs/components";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Bold, Italic, Underline } from "lucide-react-taro";

export function ToggleGroupDemo() {
  return (
    <View className="space-y-4">
        <View className="space-y-2">
          <Text className="text-sm font-medium text-muted-foreground">Default (Single)</Text>
          <ToggleGroup type="single">
            <ToggleGroupItem value="bold" aria-label="Toggle bold">
              <Bold size={16} />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Toggle italic">
              <Italic size={16} />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Toggle underline">
              <Underline size={16} />
            </ToggleGroupItem>
          </ToggleGroup>
        </View>

        <View className="space-y-2">
          <Text className="text-sm font-medium text-muted-foreground">Outline (Single)</Text>
          <ToggleGroup type="single" variant="outline">
            <ToggleGroupItem value="bold" aria-label="Toggle bold">
              <Bold size={16} />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Toggle italic">
              <Italic size={16} />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Toggle underline">
              <Underline size={16} />
            </ToggleGroupItem>
          </ToggleGroup>
        </View>

        <View className="space-y-2">
          <Text className="text-sm font-medium text-muted-foreground">Multiple</Text>
          <ToggleGroup type="multiple" variant="outline">
            <ToggleGroupItem value="bold" aria-label="Toggle bold">
              <Bold size={16} />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Toggle italic">
              <Italic size={16} />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Toggle underline">
              <Underline size={16} />
            </ToggleGroupItem>
          </ToggleGroup>
        </View>

        <View className="space-y-2">
          <Text className="text-sm font-medium text-muted-foreground">Small</Text>
          <ToggleGroup type="single" size="sm" variant="outline">
            <ToggleGroupItem value="bold" aria-label="Toggle bold">
              <Bold size={16} />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Toggle italic">
              <Italic size={16} />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Toggle underline">
              <Underline size={16} />
            </ToggleGroupItem>
          </ToggleGroup>
        </View>

        <View className="space-y-2">
          <Text className="text-sm font-medium text-muted-foreground">Large</Text>
          <ToggleGroup type="single" size="lg" variant="outline">
            <ToggleGroupItem value="bold" aria-label="Toggle bold">
              <Bold size={20} />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Toggle italic">
              <Italic size={20} />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Toggle underline">
              <Underline size={20} />
            </ToggleGroupItem>
          </ToggleGroup>
        </View>

        <View className="space-y-2">
          <Text className="text-sm font-medium text-muted-foreground">Disabled</Text>
          <ToggleGroup type="single">
            <ToggleGroupItem value="bold" aria-label="Toggle bold" disabled>
              <Bold size={16} />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Toggle italic" disabled>
              <Italic size={16} />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Toggle underline" disabled>
              <Underline size={16} />
            </ToggleGroupItem>
          </ToggleGroup>
        </View>
      </View>
  );
}

export default ToggleGroupDemo;
