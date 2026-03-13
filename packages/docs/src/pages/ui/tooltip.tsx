
import { View } from "@tarojs/components";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

export function TooltipDemo() {
  const [controlledOpen, setControlledOpen] = useState(false);

  return (
    <TooltipProvider>
        <View className="grid gap-10">
          <View className="grid gap-2">
            <View className="text-sm text-muted-foreground">Default</View>
            <Tooltip>
              <TooltipTrigger className="inline-block">
                <Button variant="outline">Hover</Button>
              </TooltipTrigger>
              <TooltipContent>
                <View>Add to library</View>
              </TooltipContent>
            </Tooltip>
          </View>

          <View className="grid gap-2">
            <View className="text-sm text-muted-foreground">Sides</View>
            <View className="grid grid-cols-2 gap-2 justify-items-start">
              <Tooltip>
                <TooltipTrigger className="inline-block">
                  <Button variant="outline">Top</Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <View>Tooltip on top</View>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger className="inline-block">
                  <Button variant="outline">Right</Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <View>Tooltip on right</View>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger className="inline-block">
                  <Button variant="outline">Bottom</Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <View>Tooltip on bottom</View>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger className="inline-block">
                  <Button variant="outline">Left</Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <View>Tooltip on left</View>
                </TooltipContent>
              </Tooltip>
            </View>
          </View>

          <View className="grid gap-2">
            <View className="text-sm text-muted-foreground">Align</View>
            <View className="space-y-2">
              <Tooltip>
                <TooltipTrigger className="inline-block w-56">
                  <Button className="w-full" variant="outline">
                    Align start
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" align="start">
                  <View>Start aligned</View>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger className="inline-block w-56">
                  <Button className="w-full" variant="outline">
                    Align center
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" align="center">
                  <View>Center aligned</View>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger className="inline-block w-56">
                  <Button className="w-full" variant="outline">
                    Align end
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" align="end">
                  <View>End aligned</View>
                </TooltipContent>
              </Tooltip>
            </View>
          </View>

          <View className="grid gap-2">
            <View className="text-sm text-muted-foreground">Controlled</View>
            <View className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setControlledOpen((v) => !v)}
              >
                Toggle
              </Button>
              <Tooltip open={controlledOpen} onOpenChange={setControlledOpen}>
                <TooltipTrigger className="inline-block">
                  <Button variant="outline">Target</Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <View>{controlledOpen ? "Open" : "Closed"}</View>
                </TooltipContent>
              </Tooltip>
            </View>
          </View>
        </View>
      </TooltipProvider>
  );
}

export default TooltipDemo;
