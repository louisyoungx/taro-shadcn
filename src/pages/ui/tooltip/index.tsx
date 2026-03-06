
import { View } from "@tarojs/components";
import { PageLayout } from "@/components/page-layout";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function TooltipPage() {
  return (
    <PageLayout title="Tooltip">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Hover</Button>
          </TooltipTrigger>
          <TooltipContent>
            <View>Add to library</View>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </PageLayout>
  );
}
