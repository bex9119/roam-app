import { StyleSheet, Button, LogBox } from "react-native";
import SignUp from "./Screens/SignUp";
import LoginPage from "./Screens/LoginPage";
import Landmarks from "./Screens/Landmarks";
import {
  NavigationContainer,
  StackActions,
  useNavigation,
} from "@react-navigation/native";
import MapScreen from "./Screens/MapScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider } from "react-native-paper";
import { useState } from "react";
import { getAuth, signOut } from "firebase/auth";

export default function App() {
    LogBox.ignoreLogs([
      "Non-serializable values were found in the navigation state",
    ]);
  const Stack = createNativeStackNavigator();

  const [currentLandmark, setCurrentLandmark] = useState();
  const [currentUser, setCurrentUser] = useState();

  function handleLogout() {
    const auth = getAuth()
    signOut(auth)
  }

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="LoginPage"
            component={LoginPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Sign-up"
            component={SignUp}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MapScreen"
            component={MapScreen}
            options={{
              headerStyle: {
                backgroundColor: '#393939',
              },
              headerTitleStyle: {
                color: 'white'
              },
              headerShown: true,
              headerTitle: `${currentUser}'s map`,
              headerRight: () => (
                <Button
                  color="#42618d"
                  onPress={() => {handleLogout()}}
                  title="Log out"
                />
              ),
              headerLeft: () => false,
            }}
            navigationOptions={{ gesturesEnabled: false }}
            initialParams={{ currentUser, setCurrentUser }}
          />
          <Stack.Screen
            name="Landmarks"
            component={Landmarks}
            options={{ headerShown: true, title: currentLandmark, 
            headerStyle: {
              backgroundColor: '#393939',
            },
            headerTitleStyle: {
              color: 'white'
            },
            headerTintColor: {
              color: 'white'
            } }}
            initialParams={{ currentLandmark, setCurrentLandmark }}
          />
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
  button: {
    backgroundColor: "#42618d",
  },
});
