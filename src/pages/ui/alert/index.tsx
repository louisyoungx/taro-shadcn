
import { View } from "@tarojs/components";
import { PageLayout } from "@/components/page-layout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, CircleAlert } from "lucide-react-taro";

export default function AlertPage() {
  return (
    <PageLayout title="Alert">
      <View className="space-y-4">
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You can add components to your app using the cli.
          </AlertDescription>
        </Alert>

        <Alert variant="destructive">
          <CircleAlert className="h-4 w-4" color="#e7000b" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Your session has expired. Please log in again.
          </AlertDescription>
        </Alert>
      </View>
    </PageLayout>
  );
}
