
import { View } from "@tarojs/components";
import { PageLayout } from "@/components/page-layout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

export default function ToastPage() {
  const { toast } = useToast();

  return (
    <PageLayout title="Toast">
      <Toaster />
      <Button
        variant="outline"
        onClick={() => {
          toast({
            title: "Scheduled: Catch up ",
            description: "Friday, February 10, 2023 at 5:57 PM",
          });
        }}
      >
        Show Toast
      </Button>
    </PageLayout>
  );
}
