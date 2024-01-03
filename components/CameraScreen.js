import { useEffect, useState } from "react";
import { Camera, CameraType } from "expo-camera";
import { Button, Image, StyleSheet, Text, View } from "react-native-web";

export default function CameraScreen() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState(false);
  const [image, setImage] = useState(null);

  const takePicture = async () => {
    console.log("picture taken");
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
    }
  };

  if (permission === false) {
    return <Text>No access to camera</Text>;
  } else {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.cameraContainer}>
          <Camera
            ref={(ref) => setCamera(ref)}
            style={styles.fixedRatio}
            // type={type}
            ratio={"1:1"}
          />
        </View>
        <Button title="Take Picture" onPress={() => takePicture()} />
        {console.log(image)}
        {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: "row",
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
});
