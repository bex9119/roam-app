import { StyleSheet } from "react-native";
import SignUp from "./Screens/SignUp";
import LoginPage from "./Screens/LoginPage";
import Landmarks from "./Screens/Landmarks";
import WhatsLocal from "./Screens/WhatsLocal";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Routes from "./Screens/Routes";
import MapScreen from "./Screens/MapScreen";
import CreateMap from "./Screens/CreateMap";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Sign-up" component={SignUp} /> */}
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="CreateMap" component={CreateMap} />
        <Stack.Screen name="Landmark" component={Landmarks} />
        <Stack.Screen name="Routes" component={Routes} />
        <Stack.Screen name="What's Local?" component={WhatsLocal} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
