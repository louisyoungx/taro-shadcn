
import { View } from "@tarojs/components";
import { PageLayout } from "@/components/page-layout";
import { Progress } from "@/components/ui/progress";
import * as React from "react";

export default function ProgressPage() {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <PageLayout title="Progress">
      <Progress value={progress} className="w-[60%]" />
    </PageLayout>
  );
}
