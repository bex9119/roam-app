import { Button, Image, StyleSheet, Text, View } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { useEffect, useState } from "react";
import CameraScreen from "./CameraScreen";
import CommentsList from "./components/CommentsList";
// const { id } = route.params;

export default function Landmarks() {
  const [startCamera, setStartCamera] = useState(false);

  if (startCamera) {
    return <CameraScreen />;
  } else {
    return (
      <View style={styles.container}>
        <View>
          <Image style={styles.icon} />
          <Text style={styles.heading}>Landmark</Text>
        </View>
        <View>
          <Image
            style={styles.photo}
            source={{
              uri: "https://leedsminster.org//wp-content/uploads/2022/04/Minster-NW-View-Adjusted-compressed-scaled.jpg",
            }}
          />
        </View>
        <View>
          <Text>Take Photo</Text>
          <Button
            onPress={() => {
              setStartCamera(true);
            }}
            title="+"
          />
          <CommentsList />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  text: {},
  heading: {},
  icon: {},
  photo: { width: "100%", height: 200 },
});
