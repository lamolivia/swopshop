import { LogBox } from "react-native";
import Navigation from "./src/navigation/navigation";
import { AppProvider } from "./src/utils/context";

export default function App() {
  LogBox.ignoreLogs([
    "AsyncStorage has been extracted from react-native core and will be removed in a future release",
  ]);

  return (
    <AppProvider>
      <Navigation />
    </AppProvider>
  );
}
