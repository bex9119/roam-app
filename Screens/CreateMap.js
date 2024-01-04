import { Button, Modal, TextInput, View, Text, StyleSheet, Pressable } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from "./MapScreen";
import Landmarks from "./Landmarks";
import Routes from "./Routes";
import WhatsLocal from "./WhatsLocal";
import SignUp from "./SignUp";
import { useEffect } from "react";
import * as Location from "expo-location";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config";

export default function CreateMap({navigation}) {
    const Tab = createBottomTabNavigator();

    // function handleLogOut() {
    //     signOut(getAuth())
    //     console.log(getAuth())
    //     navigation.navigate('LoginPage')
    // }

function handleCreateMap() {
        const currentLocation = Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest})
        const mapGrids = collection(db, 'mapGrids')
        const userId = getAuth().currentUser.uid
        return Promise.all([currentLocation, mapGrids, userId])
        .then(([currentLocation, mapGrids, userId]) => {
            const mapGridData = {
                currentLocation: currentLocation,
                userId: userId
            }
            return addDoc(mapGrids, mapGridData)
        })
        // return navigation.navigate('MapScreen')
    }

    useEffect(() => {
        Location.requestForegroundPermissionsAsync().then(({ status }) => {
            if (status !== "granted") {
              console.log("error");
              return "error";
            }
    })
    }, []);

    return (
        <View>
        <Text>Create map page</Text>
        {/* <Button onPress={handleLogOut()} title={'Log out'}>
            <Text>Log out</Text>
        </Button> */}
        <Button onPress={() => {handleCreateMap()}} title={'Create map'}>
            <Text>Create map</Text>
        </Button>
        {/* <Tab.Navigator>
            <Tab.Screen name="MapScreen" component={MapScreen}/>
            <Tab.Screen name="Landmark" component={Landmarks}/>
            <Tab.Screen name="Routes" component={Routes}/>
            <Tab.Screen name="What's Local?" component={WhatsLocal}/>
        </Tab.Navigator> */}
        </View>
    ) 
}