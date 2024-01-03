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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                    <Tab.Screen name="Login" component={LoginPage}/>
                    <Tab.Screen name="Sign-up" component={SignUp}/>
                    {/* <Stack.Screen name="Map" component={Map}/> */}
                    <Tab.Screen name="Landmark" component={Landmarks}/>
                    <Tab.Screen name="Routes" component={Routes}/>
                    <Tab.Screen name="What's Local?" component={WhatsLocal}/>
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
