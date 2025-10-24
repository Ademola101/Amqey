import { NavigationContainer } from "@react-navigation/native";
import { HomeStack } from "./HomeStack";

export function Navigation({ linking, onReady }: { linking: any; onReady: () => void }) {
  return (
    <NavigationContainer linking={linking} onReady={onReady}>
      <HomeStack />
    </NavigationContainer>
  );
}