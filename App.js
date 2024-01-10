import { StyleSheet } from "react-native";
import SignUp from "./Screens/SignUp";
import LoginPage from "./Screens/LoginPage";
import Landmarks from "./Screens/Landmarks";;
import WhatsLocal from "./Screens/WhatsLocal";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./Screens/Routes";
import MapScreen from "./Screens/MapScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PaperProvider } from 'react-native-paper';

export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Login" component={LoginPage} options={{headerShown: false}} />
          <Tab.Screen name="Sign-up" component={SignUp} options={{headerShown: false}} />
          <Tab.Screen name="MapScreen" component={MapScreen} options={{headerShown: false}} />
          <Tab.Screen name="Landmarks" component={Landmarks} options={{headerShown: false}}  />
          <Tab.Screen name="Routes" component={Routes} options={{headerShown: false}} />
          <Tab.Screen name="What's Local?" component={WhatsLocal} options={{headerShown: false}} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
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
