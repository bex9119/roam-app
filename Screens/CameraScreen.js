import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';
import {ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { db, storage } from '../config';
import {collection, addDoc } from 'firebase/firestore';


export default function CameraScreen({landmarkId, setStartCamera}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  // const [retake, setRetake] = useState('Take Picture')

  useEffect(() => {
    Camera.requestCameraPermissionsAsync()
      .then(({ status }) => {
        setHasPermission(status === 'granted');
      })
      .catch((error) => {
        console.error("Error requesting camera permissions:", error);
      });
  }, []);

  function takePicture () {
    if (camera) {
      camera.takePictureAsync(null)
        .then((data) => {
          setImage(data.uri);
          // setRetake('Retake Picture')
        })
        .catch((error) => {
          console.error("Error taking picture:", error);
        });
    }
  };

  function uploadPicture() {
    const uploadUri = image;
    const filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    const pictureRef = ref(storage, filename);

    console.log(getAuth().currentUser);
  
    fetch(uploadUri)
      .then((response) => response.blob())
      .then((blob) => uploadBytes(pictureRef, blob))
      .then((snapshot) => {
        console.log("Image uploaded successfully");
        return getDownloadURL(pictureRef);
      })
      .then((url) => {
        const username = getAuth().currentUser.displayName;
        const myCollection = collection(db, 'images');
        const myDocumentData = {
          username: username,
          image_url: url,
          landmarkId: landmarkId
        };
  
        return addDoc(myCollection, myDocumentData);
      })
      .then(() => {
        setStartCamera(false)
        console.log("Image information added to the collection");
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  }
  
  

  if (hasPermission === null) {
      return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera 
          ref={ref => setCamera(ref)} 
          style={styles.camera} 
          type={type} 
          ratio={'1:1'} 
        />
      </View>
      
      <Button
        style={styles.button}
        title="Flip Image"
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
        }}>
      </Button>
      <Button title='Take Picture' onPress={() => takePicture()} />
      <Button title="Confirm" onPress={() => uploadPicture()} />
      <Button title="Close Camera" onPress={() => {setStartCamera(false)}}/>
      {image && <Image source={{uri: image}} style={{flex:1}} />}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center'
  },
  camera: {
    flex: 1,
    aspectRatio: 1,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
});