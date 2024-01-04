import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SignUp from "./Screens/SignUp";
import LoginPage from "./Screens/LoginPage";
import Landmarks from "./Screens/Landmarks"
import UserProfile from "./Screens/UserProfile";
import WhatsLocal from "./Screens/WhatsLocal";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Routes from "./Screens/Routes";
import MapScreen from "./Screens/MapScreen";
import { UserProvider } from "./contexts/UserContext";
import CreateMap from "./Screens/CreateMap";
import { useState } from "react";


export default function App() {
    const Stack = createNativeStackNavigator();

    return (
        <UserProvider>            
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="MapScreen" component={MapScreen}/>
                <Stack.Screen name="Login" component={LoginPage}/>
                <Stack.Screen name="Sign-up" component={SignUp}/>
                <Stack.Screen name="CreateMap" component={CreateMap}/>
                <Stack.Screen name="Landmark" component={Landmarks}/>
                <Stack.Screen name="Routes" component={Routes}/>
                <Stack.Screen name="What's Local?" component={WhatsLocal}/>
            </Stack.Navigator>
        </NavigationContainer>
        </UserProvider>
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
