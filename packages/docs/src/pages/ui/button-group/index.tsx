import { View } from "@tarojs/components"
import { PageLayout } from "@/biz/page-layout"
import { Button } from "@/components/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group"
import { ChevronDown, Cloud, Github, LifeBuoy } from "lucide-react-taro"

export default function ButtonGroupPage() {
  return (
    <PageLayout title="Button Group">
      <View className="space-y-4">
        <View className="space-y-2">
          <View className="text-sm text-muted-foreground">Default</View>
          <ButtonGroup>
            <Button variant="outline">One</Button>
            <Button variant="outline">Two</Button>
            <Button variant="outline">Three</Button>
            <Button variant="outline">Four</Button>
            <Button variant="outline">Five</Button>
          </ButtonGroup>
        </View>

        <View className="space-y-2">
          <View className="text-sm text-muted-foreground">Vertical</View>
          <ButtonGroup orientation="vertical">
            <Button variant="outline">One</Button>
            <Button variant="outline">Two</Button>
            <Button variant="outline">Three</Button>
          </ButtonGroup>
        </View>

        <View className="space-y-2">
          <View className="text-sm text-muted-foreground">With Icons</View>
          <ButtonGroup>
            <Button variant="outline" size="icon">
              <Cloud size={16} />
            </Button>
            <Button variant="outline" size="icon">
              <LifeBuoy size={16} />
            </Button>
            <Button variant="outline" size="icon">
              <Github size={16} />
            </Button>
          </ButtonGroup>
        </View>

        <View className="space-y-2">
          <View className="text-sm text-muted-foreground">Mixed</View>
          <ButtonGroup>
            <Button variant="outline">Save</Button>
            <ButtonGroupSeparator />
            <Button variant="outline" size="icon">
              <ChevronDown size={16} />
            </Button>
          </ButtonGroup>
        </View>

        <View className="space-y-2">
          <View className="text-sm text-muted-foreground">With Text</View>
          <ButtonGroup>
            <ButtonGroupText>Label</ButtonGroupText>
            <Button variant="outline">Action</Button>
          </ButtonGroup>
        </View>
      </View>
    </PageLayout>
  )
}
