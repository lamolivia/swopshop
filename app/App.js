import Navigation from "./src/navigation/navigation";
import { AppProvider } from "./src/utils/context";

export default function App() {
  return (
    <AppProvider>
      <Navigation />
    </AppProvider>
  );
}
