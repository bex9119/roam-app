import { Button, Modal, TextInput, View, Text, StyleSheet, Pressable } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from "./MapScreen";
import Landmarks from "./Landmarks";
import Routes from "./Routes";
import WhatsLocal from "./WhatsLocal";
import SignUp from "./SignUp";

export default function CreateMap() {
    const Tab = createBottomTabNavigator();
    const navigation = useNavigation()

    function handleLogOut() {
        signOut(getAuth())
        console.log(getAuth())
        navigation.navigate(SignUp)
    }

    return (
        <View>
        <Text>Create map page</Text>
        <Button onPress={handleLogOut()} title={'Log out'}>
            <Text>Log out</Text>
        </Button>
        <Tab.Navigator>
            <Tab.Screen name="MapScreen" component={MapScreen}/>
            <Tab.Screen name="Landmark" component={Landmarks}/>
            <Tab.Screen name="Routes" component={Routes}/>
            <Tab.Screen name="What's Local?" component={WhatsLocal}/>
        </Tab.Navigator>
        </View>
    ) 
}