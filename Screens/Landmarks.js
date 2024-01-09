import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {Button} from "react-native-paper";
import { Camera, CameraType } from "expo-camera";
import { useEffect, useState } from "react";
import CameraScreen from "./CameraScreen";
import CommentsList from "./components/CommentsList";
import ImageGallery from "./components/ImageGallery";

export default function Landmarks({ route, navigation }) {
  const { id } = route.params;
  const [startCamera, setStartCamera] = useState(false);

  if (startCamera) {
    return <CameraScreen landmarkId={id} setStartCamera={setStartCamera} />;
  } else {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <Image style={styles.icon} />
            <Text style={styles.heading}></Text>
          </View>
          <View>
            <ImageGallery landmarkId={id} />
          </View>
          <View>
            <Button icon="camera" mode="contained" onPress={() => setStartCamera(true)}>
            Take Photo
            </Button>
            <CommentsList landmarkId={id} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  text: {},
  heading: {},
  icon: {},
  photo: { width: "100%", height: 200 },
});
