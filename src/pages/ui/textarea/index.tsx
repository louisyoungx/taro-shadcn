
import { View, Text } from "@tarojs/components";
import { PageLayout } from "@/components/page-layout";
import { Textarea } from "@/components/ui/textarea";

export default function TextareaPage() {
  return (
    <PageLayout title="Textarea">
      <View className="space-y-2">
        <Text className="text-sm font-medium leading-none">
          Default
        </Text>
        <Textarea 
          className="h-20"
          placeholder="Type your message here."
        />
      </View>

      <View className="space-y-2">
        <Text className="text-sm font-medium leading-none">
          With Initial Value
        </Text>
        <Textarea 
          className="h-20"
          placeholder="Type your message here." 
          value="This is a textarea with an initial value."
        />
      </View>

      <View className="space-y-2">
        <Text className="text-sm font-medium leading-none">
          Disabled
        </Text>
        <Textarea 
          className="h-20"
          disabled 
          placeholder="Disabled textarea." 
        />
      </View>

      <View className="space-y-2">
        <Text className="text-sm font-medium leading-none">
          Custom Height (h-40)
        </Text>
        <Textarea 
          className="h-40"
          placeholder="This textarea has a custom height." 
        />
      </View>
    </PageLayout>
  );
}
