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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from "./Screens/MapScreen";
import { UserProvider } from "./contexts/UserContext";

//const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <UserProvider>            
        <NavigationContainer>
            <Tab.Navigator>
                    <Tab.Screen name="Login" component={LoginPage}/>
                    <Tab.Screen name="Sign-up" component={SignUp}/>
                    <Tab.Screen name="MapScreen" component={MapScreen}/>
                    <Tab.Screen name="Landmarks" component={Landmarks}/>
                    <Tab.Screen name="Routes" component={Routes}/>
                    <Tab.Screen name="What's Local?" component={WhatsLocal}/>
            </Tab.Navigator>
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
