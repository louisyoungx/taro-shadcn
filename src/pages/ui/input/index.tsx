
import { View } from "@tarojs/components";
import { PageLayout } from "@/components/page-layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function InputPage() {
  return (
    <PageLayout title="Input">
      <View className="space-y-6">
        <View className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Email" />
        </View>

        <View className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="file">File</Label>
          <Input id="file" type="file" />
        </View>

        <View className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="disabled">Disabled</Label>
          <Input disabled type="email" id="disabled" placeholder="Email" />
        </View>

        <View className="flex w-full max-w-sm items-center space-x-2">
          <Input type="email" placeholder="Email" />
          <Button type="submit">Subscribe</Button>
        </View>
      </View>
    </PageLayout>
  );
}
