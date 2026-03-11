
import { View, Text, ScrollView } from "@tarojs/components";
import { useLoad, navigateTo } from "@tarojs/taro";
import * as React from "react";
import { ChevronRight, Search } from "lucide-react-taro";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { components, getIcon } from "@/lib/routes";
import "./index.css";

export default function IndexPage() {
  const [open, setOpen] = React.useState(false);

  useLoad(() => {
    console.log("Page loaded.");
  });

  const handleNavigate = (path: string) => {
    setOpen(false);
    navigateTo({ url: path });
  };

  return (
    <ScrollView className="h-full bg-background" scrollY>
      <View className="p-4 space-y-6 pb-10">
        <View className="flex flex-row items-center justify-between">
          <View className="space-y-1">
            <View className="text-3xl font-bold tracking-tight text-foreground">
              Taro shadcn/ui
            </View>
            <View className="text-sm text-muted-foreground">
              A collection of re-usable components built with Taro and Tailwind
              CSS.
            </View>
          </View>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full h-8 px-3 flex flex-row items-center gap-1.5 border-border bg-background"
            onClick={() => setOpen(true)}
          >
            <Search size={14} className="text-muted-foreground" />
            <Text className="text-xs font-medium text-foreground">搜索</Text>
          </Button>
        </View>

        <View className="grid gap-3">
          {components.map((item) => {
            const Icon = getIcon(item.name);
            return (
              <Card
                key={item.name}
                className="flex flex-row items-center justify-between p-4 active:bg-accent transition-colors border border-border shadow-none bg-card"
                onClick={() => handleNavigate(item.path)}
              >
                <View className="flex flex-row items-center gap-3">
                  <View className="w-9 h-9 flex items-center justify-center rounded-lg bg-secondary text-primary shrink-0">
                    <Icon size={18} />
                  </View>
                  <Text className="text-sm font-medium text-foreground">
                    {item.name}
                  </Text>
                </View>
                <ChevronRight size={16} className="text-muted-foreground" />
              </Card>
            );
          })}
        </View>
      </View>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search components..." />
        <CommandList className="h-[60vh]">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Components">
            {components.map((item) => {
              const Icon = getIcon(item.name);
              return (
                <CommandItem
                  key={item.name}
                  value={item.name}
                  onSelect={() => handleNavigate(item.path)}
                  className="flex flex-row items-center gap-3 py-3"
                >
                  <View className="w-8 h-8 flex items-center justify-center rounded-md bg-secondary text-secondary-foreground shrink-0">
                    <Icon size={16} />
                  </View>
                  <Text>{item.name}</Text>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </ScrollView>
  );
}
