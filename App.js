import { StyleSheet } from "react-native";
import SignUp from "./Screens/SignUp";
import LoginPage from "./Screens/LoginPage";
import Landmarks from "./Screens/Landmarks";;
import WhatsLocal from "./Screens/WhatsLocal";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import Routes from "./Screens/Routes";
import MapScreen from "./Screens/MapScreen";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import { useState } from "react";

export default function App() {
  const Stack = createNativeStackNavigator();

  const [currentLandmark, setCurrentLandmark] = useState()

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginPage} options={{headerShown: false}} />
          <Stack.Screen name="Sign-up" component={SignUp} options={{headerShown: false}} />
          <Stack.Screen name="MapScreen" component={MapScreen} options={{headerShown: false}} navigationOptions= {{gesturesEnabled: false}}/>
          <Stack.Screen name="Landmarks" component={Landmarks} options={{headerShown: true, title: currentLandmark}}  initialParams={{ currentLandmark, setCurrentLandmark }}/>
        </Stack.Navigator>
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
