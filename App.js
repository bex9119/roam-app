import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MapScreen from "./Screens/MapScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import functions from "firebase/functions";

// const secondTest = functions.httpsCallable;

// const test = functions.httpsCallable.onRequest(async (request, response) => {
//   const apiKey = await secrets.getSecret("GOOGLE_MAPS_API_KEY");
//   console.debug(`Payload: ${apiKey}`);
//   response.sendStatus(200);
// });

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MapScreen" component={MapScreen} />
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
