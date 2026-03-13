import { View } from "@tarojs/components";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "@/components/ui/toast";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

type Position =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center";

export function ToastDemo() {
  const [position, setPosition] = useState<Position>("bottom-right");
  const [richColors, setRichColors] = useState(false);
  const [expand, setExpand] = useState(false);
  const [closeButton, setCloseButton] = useState(false);

  return (
    <>
      <Toaster
        position={position}
        richColors={richColors}
        expand={expand}
        closeButton={closeButton}
      />
      <View className="space-y-6">
        {/* Types */}
        <View className="space-y-2">
          <View className="text-sm text-muted-foreground">Types</View>
          <View className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              onClick={() => toast("Event has been created")}
            >
              Default
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                toast.success("Event has been created", {
                  description: "Monday, January 3rd at 6:00pm",
                })
              }
            >
              Success
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.info("Event has been created")}
            >
              Info
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.warning("Event has been created")}
            >
              Warning
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.error("Event has not been created")}
            >
              Error
            </Button>
          </View>
        </View>

        {/* Features */}
        <View className="space-y-2">
          <View className="text-sm text-muted-foreground">Features</View>
          <View className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              onClick={() =>
                toast("Event has been created", {
                  action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                  },
                })
              }
            >
              With Action
            </Button>
             <Button
               variant="outline"
               onClick={() =>
                toast("Event has been created", {
                  cancel: {
                    label: "Cancel",
                    onClick: () => console.log("Cancel"),
                  },
                })
              }
             >
              With Cancel
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                toast.promise(
                  () =>
                    new Promise((resolve) =>
                      setTimeout(() => resolve({ name: "Sonner" }), 2000)
                    ),
                  {
                    loading: "Loading...",
                    success: (data: any) => {
                      return `${data.name} toast has been added`;
                    },
                    error: "Error",
                  }
                )
              }
            >
              Promise
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                toast("Event has been created", {
                  duration: 10000, 
                  description: "This toast will stay for 10 seconds",
                })
              }
            >
              Custom Duration
            </Button>
             <Button
               variant="outline"
               onClick={() => {
                toast.message("Event has been created", {
                    description: "This is a custom message toast"
                })
              }}
             >
              Custom Message
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                toast.custom((t) => (
                  <View className="w-full rounded-md border bg-background p-4 shadow-sm">
                    <View className="text-sm font-medium">Custom Toast</View>
                    <View className="text-sm text-muted-foreground">
                      This is a custom toast component with ID: {t}
                    </View>
                  </View>
                ));
              }}
            >
              Custom Component
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                const id = toast.loading("Loading data...");
                setTimeout(() => {
                  toast.dismiss(id);
                  toast.success("Data loaded!");
                }, 2000);
              }}
            >
              Dismiss & Update
            </Button>
          </View>
        </View>

        {/* Configuration */}
        <View className="space-y-2">
          <View className="text-sm text-muted-foreground">Configuration</View>
          <View className="space-y-4">
            <View className="flex items-center justify-between">
              <View className="text-sm">Position</View>
              <View className="w-40">
                <Select
                  value={position}
                  onValueChange={(val) => setPosition(val as Position)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="top-left">Top Left</SelectItem>
                    <SelectItem value="top-center">Top Center</SelectItem>
                    <SelectItem value="top-right">Top Right</SelectItem>
                    <SelectItem value="bottom-left">Bottom Left</SelectItem>
                    <SelectItem value="bottom-center">Bottom Center</SelectItem>
                    <SelectItem value="bottom-right">Bottom Right</SelectItem>
                  </SelectContent>
                </Select>
              </View>
            </View>

            <View className="flex items-center justify-between">
              <View className="text-sm">Rich Colors</View>
              <Switch checked={richColors} onCheckedChange={setRichColors} />
            </View>

            <View className="flex items-center justify-between">
              <View className="text-sm">Expand</View>
              <Switch checked={expand} onCheckedChange={setExpand} />
            </View>

            <View className="flex items-center justify-between">
              <View className="text-sm">Close Button</View>
              <Switch checked={closeButton} onCheckedChange={setCloseButton} />
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

export default ToastDemo;
