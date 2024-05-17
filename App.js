import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SearchScreen from "./src/screens/SearchScreen";
import ResultsShowScreen from "./src/screens/ResultsShowScreen";
import { ResultsProvider } from "./src/context/ResultsContext";

const Stack = createStackNavigator();

export default function App() {
  return (
    <ResultsProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerTitle: "Business Search" }}>
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="ResultsShow" component={ResultsShowScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ResultsProvider>
  );
}
