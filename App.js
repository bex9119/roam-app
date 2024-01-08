import { StyleSheet } from "react-native";
import SignUp from "./Screens/SignUp";
import LoginPage from "./Screens/LoginPage";
import Landmarks from "./Screens/Landmarks";
import WhatsLocal from "./Screens/WhatsLocal";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./Screens/Routes";
import MapScreen from "./Screens/MapScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Login" component={LoginPage} />
        <Tab.Screen name="Sign-up" component={SignUp} />
        <Tab.Screen name="MapScreen" component={MapScreen} />
        <Tab.Screen name="Landmarks" component={Landmarks} />
        <Tab.Screen name="Routes" component={Routes} />
        <Tab.Screen name="What's Local?" component={WhatsLocal} />
      </Tab.Navigator>
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
