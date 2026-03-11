import * as React from "react"
import { View, Text } from "@tarojs/components"
import { PageLayout } from "@/components/page-layout"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export default function InputOTPPage() {
  const [value, setValue] = React.useState("")

  return (
    <PageLayout title="InputOTP">
      <View className="p-4 space-y-8">
        <View className="space-y-2">
          <Text className="text-sm font-medium">6-Digit OTP</Text>
          <View className="flex justify-center">
            <InputOTP maxLength={6}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </View>
        </View>

        <View className="space-y-2">
          <Text className="text-sm font-medium">4-Digit OTP (Controlled)</Text>
          <View className="flex flex-col items-center gap-4">
            <InputOTP 
              maxLength={4} 
              value={value} 
              onChange={(v) => setValue(v)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
            <Text className="text-xs text-muted-foreground">
              Current value: {value}
            </Text>
          </View>
        </View>

        <View className="space-y-2">
          <Text className="text-sm font-medium">Disabled State</Text>
          <View className="flex justify-center">
            <InputOTP maxLength={4} disabled>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
          </View>
        </View>
      </View>
    </PageLayout>
  )
}
