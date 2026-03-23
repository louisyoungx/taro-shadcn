
import { View } from "@tarojs/components";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, CircleAlert } from "lucide-react-taro";

export function AlertDemo() {
  return (
    <View className="space-y-4">
        <Alert>
          <Terminal size={16} color="inherit" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You can add components to your app using the cli.
          </AlertDescription>
        </Alert>

        <Alert variant="destructive">
          <CircleAlert color="#e7000b" size={16} />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Your session has expired. Please log in again.
          </AlertDescription>
        </Alert>
      </View>
  );
}

export default AlertDemo;
