
import { View } from "@tarojs/components";
import { PageLayout } from "@/components/page-layout";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function CheckboxPage() {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);

  return (
    <PageLayout title="Checkbox">
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
    </PageLayout>
  );
}
