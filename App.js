import { StyleSheet} from "react-native";
import SignUp from "./Screens/SignUp";
import LoginPage from "./Screens/LoginPage";
import Landmarks from "./Screens/Landmarks"
import WhatsLocal from "./Screens/WhatsLocal";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Routes from "./Screens/Routes";
import MapScreen from "./Screens/MapScreen";
import CreateMap from "./Screens/CreateMap";
import { useState } from "react";


export default function App() {
    const Stack = createNativeStackNavigator();
    const [mapLoaded, setMapLoaded] = useState(false)  
    console.log(mapLoaded)

    return (          
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="SignUp" component={SignUp}/>
                <Stack.Screen name="LoginPage" component={LoginPage}/>
                <Stack.Screen name="CreateMap" component={CreateMap} setMapLoaded={setMapLoaded}/>
                <Stack.Screen name="Landmark" component={Landmarks}/>
                <Stack.Screen name="Routes" component={Routes}/>
                <Stack.Screen name="WhatsLocal?" component={WhatsLocal}/>
                <Stack.Screen name="MapScreen" component={MapScreen}/>
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
