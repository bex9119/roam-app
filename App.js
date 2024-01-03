import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SignUp from "./components/SignUp";
import LoginPage from "./components/LoginPage";
import Landmarks from "./components/Landmarks"
import UserProfile from "./components/UserProfile";
import WhatsLocal from "./components/WhatsLocal";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Routes from "./components/Routes";





const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                    
                    <Stack.Screen name="Login" component={LoginPage}/>
                    <Stack.Screen name="Sign-up" component={SignUp}/>
                    {/* <Stack.Screen name="Map" component={Map}/> */}
                    <Stack.Screen name="Landmark" component={Landmarks}/>
                    <Stack.Screen name="Routes" component={Routes}/>
                    <Stack.Screen name="What's Local?" component={WhatsLocal}/>
                    
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
