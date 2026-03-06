
import { View } from "@tarojs/components";
import { PageLayout } from "@/components/page-layout";
import { Textarea } from "@/components/ui/textarea";

export default function TextareaPage() {
  return (
    <PageLayout title="Textarea">
      <Textarea placeholder="Type your message here." />
    </PageLayout>
  );
}
