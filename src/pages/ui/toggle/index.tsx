
import { View } from "@tarojs/components";
import { PageLayout } from "@/components/page-layout";
import { Toggle } from "@/components/ui/toggle";
import { Bold } from "lucide-react-taro";

export default function TogglePage() {
  return (
    <PageLayout title="Toggle">
      <Toggle aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </Toggle>
    </PageLayout>
  );
}
