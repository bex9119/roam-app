import MapScreen from "./MapScreen";
import Landmarks from "./Landmarks";
import Routes from "./Routes";
import WhatsLocal from "./WhatsLocal";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function TabNavigator() {
    const Tab = createBottomTabNavigator();
    return 
    // (
        // <>
        // <Tab.Navigator>
        //     <Tab.Screen name="MapScreen" component={MapScreen}/>
        //     <Tab.Screen name="Landmark" component={Landmarks}/>
        //     <Tab.Screen name="Routes" component={Routes}/>
        //     <Tab.Screen name="What's Local?" component={WhatsLocal}/>
        // </Tab.Navigator>
        // </>
    // )
}