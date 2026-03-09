import { View, Text } from "@tarojs/components";
import { PageLayout } from "@/components/page-layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function InputPage() {
  return (
    <PageLayout title="Input">
      <View className="space-y-8">
        {/* Default */}
        <View className="flex w-full max-w-sm flex-col gap-2">
          <Label for="default">Default</Label>
          <Input type="text" id="default" placeholder="Default input" />
        </View>

        {/* Password */}
        <View className="flex w-full max-w-sm flex-col gap-2">
          <Label for="password">Password</Label>
          <Input type="password" password id="password" placeholder="Password" />
        </View>

        {/* Disabled */}
        <View className="flex w-full max-w-sm flex-col gap-2">
          <Label for="disabled">Disabled</Label>
          <Input disabled type="text" id="disabled" placeholder="Disabled input" />
        </View>

        {/* With Button */}
        <View className="flex w-full max-w-sm flex-col gap-2">
          <Label for="email-2">Email</Label>
          <View className="flex w-full max-w-sm items-center gap-2">
            <Input type="text" placeholder="Email" />
            <Button>Subscribe</Button>
          </View>
        </View>
      </View>
    </PageLayout>
  );
}
