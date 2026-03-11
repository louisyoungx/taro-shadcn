
import { View } from "@tarojs/components";
import { PageLayout } from "@/components/page-layout";
import { Button } from "@/components/ui/button";
import { ChevronRight, LoaderCircle, Mail } from "lucide-react-taro";

export default function ButtonPage() {
  return (
    <PageLayout title="Button">
      <View className="space-y-4">
        <View className="space-y-2">
          <View className="text-sm text-muted-foreground">Default</View>
          <Button>Button</Button>
        </View>
        <View className="space-y-2">
          <View className="text-sm text-muted-foreground">Secondary</View>
          <Button variant="secondary">Secondary</Button>
        </View>
        <View className="space-y-2">
          <View className="text-sm text-muted-foreground">Destructive</View>
          <Button variant="destructive">Destructive</Button>
        </View>
        <View className="space-y-2">
          <View className="text-sm text-muted-foreground">Outline</View>
          <Button variant="outline">Outline</Button>
        </View>
        <View className="space-y-2">
          <View className="text-sm text-muted-foreground">Ghost</View>
          <Button variant="ghost">Ghost</Button>
        </View>
        <View className="space-y-2">
          <View className="text-sm text-muted-foreground">Link</View>
          <Button variant="link">Link</Button>
        </View>
        <View className="space-y-2">
          <View className="text-sm text-muted-foreground">With Icon</View>
          <Button>
            <Mail className="mr-2" color="#fff" size={16} /> Login with Email
          </Button>
        </View>
        <View className="space-y-2">
          <View className="text-sm text-muted-foreground">Loading</View>
          <Button disabled>
            <LoaderCircle className="mr-2 animate-spin" color="#fff" size={16} />
            Please wait
          </Button>
        </View>
        <View className="space-y-2">
          <View className="text-sm text-muted-foreground">Icon Button</View>
          <Button variant="outline" size="icon">
            <ChevronRight size={16} />
          </Button>
        </View>
      </View>
    </PageLayout>
  );
}
