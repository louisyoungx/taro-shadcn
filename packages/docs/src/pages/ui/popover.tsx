import * as React from "react";
import { View } from "@tarojs/components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

export function PopoverDemo() {
  const [controlledOpen, setControlledOpen] = React.useState(false);

  return (
    <View className="grid gap-8">
        <View className="space-y-2">
          <View className="text-sm text-muted-foreground">Basic Popover</View>
          <Popover>
            <PopoverTrigger >
              <Button variant="outline">Open dimensions</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <View className="grid gap-4">
                <PopoverHeader>
                  <PopoverTitle>Dimensions</PopoverTitle>
                  <PopoverDescription>Set the dimensions for the layer.</PopoverDescription>
                </PopoverHeader>
                <View className="grid gap-2">
                  <View className="grid grid-cols-3 items-center gap-4">
                    <Label>Width</Label>
                    <Input
                      id="width"
                      defaultValue="100%"
                      className="col-span-2 h-8"
                      autoFocus
                    />
                  </View>
                  <View className="grid grid-cols-3 items-center gap-4">
                    <Label>Max. width</Label>
                    <Input
                      id="maxWidth"
                      defaultValue="300px"
                      className="col-span-2 h-8"
                    />
                  </View>
                  <View className="grid grid-cols-3 items-center gap-4">
                    <Label>Height</Label>
                    <Input
                      id="height"
                      defaultValue="25px"
                      className="col-span-2 h-8"
                    />
                  </View>
                  <View className="grid grid-cols-3 items-center gap-4">
                    <Label>Max. height</Label>
                    <Input
                      id="maxHeight"
                      defaultValue="none"
                      className="col-span-2 h-8"
                    />
                  </View>
                </View>
              </View>
            </PopoverContent>
          </Popover>
        </View>

        <View className="space-y-2">
          <View className="text-sm text-muted-foreground">Profile Settings</View>
          <Popover>
            <PopoverTrigger >
              <Button variant="outline">Edit Profile</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <View className="grid gap-4">
                <PopoverHeader>
                  <PopoverTitle>Profile</PopoverTitle>
                  <PopoverDescription>Update your profile settings</PopoverDescription>
                </PopoverHeader>
                <View className="grid gap-2">
                  <View className="grid grid-cols-3 items-center gap-4">
                    <Label>Username</Label>
                    <Input defaultValue="@jdoe" className="col-span-2 h-8" />
                  </View>
                  <View className="grid grid-cols-3 items-center gap-4">
                    <Label>Email</Label>
                    <Input
                      defaultValue="jdoe@example.com"
                      className="col-span-2 h-8"
                    />
                  </View>
                </View>
              </View>
            </PopoverContent>
          </Popover>
        </View>

        <View className="space-y-2">
          <View className="text-sm text-muted-foreground">Align</View>
          <View className="flex flex-wrap gap-3">
            <Popover>
              <PopoverTrigger>
                <Button variant="outline">Start</Button>
              </PopoverTrigger>
              <PopoverContent align="start">
                <PopoverHeader>
                  <PopoverTitle>align=start</PopoverTitle>
                  <PopoverDescription>Content aligns to trigger start.</PopoverDescription>
                </PopoverHeader>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger>
                <Button variant="outline">Center</Button>
              </PopoverTrigger>
              <PopoverContent align="center">
                <PopoverHeader>
                  <PopoverTitle>align=center</PopoverTitle>
                  <PopoverDescription>Content aligns to trigger center.</PopoverDescription>
                </PopoverHeader>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger>
                <Button variant="outline">End</Button>
              </PopoverTrigger>
              <PopoverContent align="end">
                <PopoverHeader>
                  <PopoverTitle>align=end</PopoverTitle>
                  <PopoverDescription>Content aligns to trigger end.</PopoverDescription>
                </PopoverHeader>
              </PopoverContent>
            </Popover>
          </View>
        </View>

        <View className="space-y-2">
          <View className="text-sm text-muted-foreground">Position</View>
          <View className="flex flex-wrap gap-3">
            <Popover>
              <PopoverTrigger>
                <Button variant="outline">Top</Button>
              </PopoverTrigger>
              <PopoverContent position="top">
                <PopoverHeader>
                  <PopoverTitle>position=top</PopoverTitle>
                  <PopoverDescription>Alias of side.</PopoverDescription>
                </PopoverHeader>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger>
                <Button variant="outline">Bottom</Button>
              </PopoverTrigger>
              <PopoverContent position="bottom">
                <PopoverHeader>
                  <PopoverTitle>position=bottom</PopoverTitle>
                  <PopoverDescription>Alias of side.</PopoverDescription>
                </PopoverHeader>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger>
                <Button variant="outline">Left</Button>
              </PopoverTrigger>
              <PopoverContent position="left">
                <PopoverHeader>
                  <PopoverTitle>position=left</PopoverTitle>
                  <PopoverDescription>Alias of side.</PopoverDescription>
                </PopoverHeader>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger>
                <Button variant="outline">Right</Button>
              </PopoverTrigger>
              <PopoverContent position="right">
                <PopoverHeader>
                  <PopoverTitle>position=right</PopoverTitle>
                  <PopoverDescription>Alias of side.</PopoverDescription>
                </PopoverHeader>
              </PopoverContent>
            </Popover>
          </View>
        </View>

        <View className="space-y-2">
          <View className="text-sm text-muted-foreground">Controlled</View>
          <View className="flex flex-wrap gap-3">
            <Popover open={controlledOpen} onOpenChange={setControlledOpen}>
              <PopoverTrigger>
                <Button variant="outline">
                  {controlledOpen ? "Close" : "Open"} (state)
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverHeader>
                  <PopoverTitle>Controlled</PopoverTitle>
                  <PopoverDescription>
                    open/onOpenChange are controlled by local state.
                  </PopoverDescription>
                </PopoverHeader>
              </PopoverContent>
            </Popover>

            <Button
              variant="secondary"
              onClick={() => setControlledOpen((v) => !v)}
            >
              Toggle via button
            </Button>
          </View>
        </View>
      </View>
  );
}

export default PopoverDemo;
