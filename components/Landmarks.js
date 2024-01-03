import { Button, Image, StyleSheet, Text, View } from "react-native-web"
import { Camera, CameraType } from 'expo-camera';
import { useState } from "react";






export default function Landmarks() {

    const [startCamera, setStartCamera] = useState(false)
    

    function startCamera(){
        const {status} = await Camera.requestCameraPermissionsAsync()    
    }




    return (
    
    <View style={styles.container}>    
        <View>
            <Image style={styles.icon}/>
            <Text style={styles.heading}>Landmark</Text>
        </View>
        <View>
            <Image style={styles.photo} source={{uri:"https://leedsminster.org//wp-content/uploads/2022/04/Minster-NW-View-Adjusted-compressed-scaled.jpg"}}/>
        </View>
        <View>
            <Text>Take Photo</Text>
            <Button onPress={()=>{startCamera()}} title="+"/>
        </View>

        <Camera> </Camera>
    </View>)


}

const styles = StyleSheet.create({
    container: {}, 
    text:{},
    heading:{},
    icon:{},
    photo:{width:'100%', height:200},
})