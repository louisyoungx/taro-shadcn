
import { View, Text } from "@tarojs/components";
import { PageLayout } from "@/components/page-layout";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react-taro";
import * as React from "react";

export default function CollapsiblePage() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <PageLayout title="Collapsible">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-[350px] space-y-2"
      >
        <View className="flex items-center justify-between space-x-4 px-4">
          <Text className="text-sm font-semibold text-foreground">
            @peduarte starred 3 repositories
          </Text>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </View>
        <View className="rounded-md border border-border px-4 py-3 font-mono text-sm text-foreground">
          @radix-ui/primitives
        </View>
        <CollapsibleContent className="space-y-2">
          <View className="rounded-md border border-border px-4 py-3 font-mono text-sm text-foreground">
            @radix-ui/colors
          </View>
          <View className="rounded-md border border-border px-4 py-3 font-mono text-sm text-foreground">
            @stitches/react
          </View>
        </CollapsibleContent>
      </Collapsible>
    </PageLayout>
  );
}
