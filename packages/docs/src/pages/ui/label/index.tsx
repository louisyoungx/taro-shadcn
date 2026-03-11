import * as React from "react";
import { View, Text } from "@tarojs/components";
import { PageLayout } from "@/components/page-layout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export default function LabelPage() {
  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [checked3, setChecked3] = React.useState(true);

  return (
    <PageLayout title="Label">
      <View className="space-y-8">
        <View className="space-y-2">
          <View className="text-sm text-muted-foreground mb-2">基础用法</View>
          <View className="space-y-4">
            <View className="flex items-center gap-2">
              <Checkbox
                id="terms"
                checked={checked1}
                onCheckedChange={setChecked1}
              />
              <Label onClick={() => setChecked1(!checked1)}>
                Accept terms and conditions
              </Label>
            </View>
            <View className="flex items-center gap-2">
              <Checkbox
                id="privacy"
                checked={checked2}
                onCheckedChange={setChecked2}
              />
              <Label onClick={() => setChecked2(!checked2)}>
                Agree to privacy policy
              </Label>
            </View>
            <View className="flex items-center gap-2">
              <Checkbox
                id="notifications"
                checked={checked3}
                onCheckedChange={setChecked3}
              />
              <Label
                onClick={() => setChecked3(!checked3)}
              >
                Receive notifications
              </Label>
            </View>
          </View>
        </View>

        <View className="space-y-2">
          <View className="text-sm text-muted-foreground mb-2">配合输入框</View>
          <View className="grid w-full max-w-sm items-center gap-2">
            <Label>Email</Label>
            <Input type="email" id="email" placeholder="Email" />
          </View>
        </View>

        <View className="space-y-2">
          <View className="text-sm text-muted-foreground mb-2">必填项</View>
          <View className="grid w-full max-w-sm items-center gap-2">
            <Label>
              Username <Text className="text-red-500">*</Text>
            </Label>
            <Input type="text" id="username" placeholder="Username" />
          </View>
        </View>

        <View className="space-y-2">
          <View className="text-sm text-muted-foreground mb-2">自定义样式</View>
          <View className="grid w-full max-w-sm items-center gap-2">
            <Label className="text-lg text-primary font-bold">
              Custom Style Label
            </Label>
            <Input type="text" id="custom" placeholder="Custom styled label" />
          </View>
        </View>
      </View>
    </PageLayout>
  );
}
