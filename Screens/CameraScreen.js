import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CameraScreen() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  // if (!permission) ... 

  // if (!permission.granted) ... 

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  return (
    <View style={{flex :1}}>
      <Camera style={{flex :1}} type={type}>
        <View style={{flex :1}}>
          <TouchableOpacity style={{flex :1}} onPress={toggleCameraType}>
            <Text style={{color: 'black'}}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}
const styles = StyleSheet.create({
  cameraContainer: {
      flex: 1,
      flexDirection: 'row'
  },

  camera: {
    flex:1
  },

  buttonContainer:{
    flex:3
  },

  button:{
    flex:3,
    backgroundColor: 'black',
    color: 'white',
  },
  // fixedRatio:{
  //     flex: 1,
  //     aspectRatio: 1
  // }
})





// make a new screen for camera preview and photo to be full screen when taken. 
// create button for submit or cancel 
// create methods for uploading to firebase storage. 



// import { Camera } from 'expo-camera'; import * as Permissions from 'expo-permissions'; async function getCameraPermission() { const { status } = await Permissions.askAsync(Permissions.CAMERA); if (status !== 'granted') { console.error('Camera permission not granted!'); return false; } return true; } 

