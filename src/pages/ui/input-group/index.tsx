import { View, Text } from "@tarojs/components"
import { PageLayout } from "@/components/page-layout"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { Copy, FileCode, Search } from "lucide-react-taro"

export default function InputGroupPage() {
  return (
    <PageLayout title="Input Group">
      <View className="space-y-4">
        <View className="space-y-2">
          <View className="text-sm text-muted-foreground">Input</View>
          <InputGroup>
            <InputGroupAddon>@</InputGroupAddon>
            <InputGroupInput placeholder="Username" />
          </InputGroup>
        </View>

        <View className="space-y-2">
          <View className="text-sm text-muted-foreground">Textarea</View>
          <InputGroup>
            <InputGroupTextarea
              id="block-start-textarea"
              placeholder="console.log('Hello, world!');"
              className="font-mono text-sm h-40"
            />
            <InputGroupAddon align="block-start">
              <FileCode className="h-4 w-4 text-muted-foreground" color="#737373" />
              <InputGroupText className="font-mono">script.js</InputGroupText>
              <InputGroupButton size="icon-xs" className="ml-auto">
                <Copy className="h-4 w-4" color="#737373" />
                <Text className="sr-only">Copy</Text>
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </View>

        <View className="space-y-2">
          <View className="text-sm text-muted-foreground">Right Addon</View>
          <InputGroup>
            <InputGroupInput placeholder="Search..." />
            <InputGroupAddon align="inline-end">
              <Search className="h-4 w-4" color="#737373" />
            </InputGroupAddon>
          </InputGroup>
        </View>

        <View className="space-y-2">
          <View className="text-sm text-muted-foreground">With Button</View>
          <InputGroup>
            <InputGroupInput placeholder="Email" />
            <InputGroupButton className="text-muted-foreground">Subscribe</InputGroupButton>
          </InputGroup>
        </View>

        <View className="space-y-2">
          <View className="text-sm text-muted-foreground">Multiple Addons</View>
          <InputGroup>
            <InputGroupAddon>https://</InputGroupAddon>
            <InputGroupInput placeholder="google.com" />
            <InputGroupAddon align="inline-end">.com</InputGroupAddon>
          </InputGroup>
        </View>

        <View className="space-y-2">
          <View className="text-sm text-muted-foreground">With Text Helper</View>
          <InputGroup>
            <InputGroupInput placeholder="Amount" />
            <InputGroupAddon align="inline-end">
              <InputGroupText>USD</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </View>
      </View>
    </PageLayout>
  )
}
