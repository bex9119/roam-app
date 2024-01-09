import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import { useEffect, useState } from "react";
import CameraScreen from "./CameraScreen";
import CommentsList from "./components/CommentsList";
import ImageGallery from "./components/ImageGallery";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config";

export default function Landmarks({ route, navigation }) {
  const { id } = route.params;
  const [startCamera, setStartCamera] = useState(false);
  const [coverImage, setCoverImage] = useState(null)

  useEffect(() => {
      const q = query(
      collection(db, "images"),
      where("landmarkId", "==", id)
      );
      getDocs(q)
      .then((snapshot) => {
        let image = [];
        snapshot.forEach((imageData) => {
          image.push(imageData.data().image_url)
        });
        return image[0]
      })
      .then((image) => {
        setCoverImage(image);
      });
  }, [id])
  
  if (startCamera) {
    return <CameraScreen landmarkId={id} setStartCamera={setStartCamera} />;
  } else {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <Image style={styles.icon} />
            <Text style={styles.heading}>Landmark</Text>
          </View>
          <View>
            {coverImage &&
              <Image
                style={styles.photo}
                source={{
                  uri: coverImage,
                }}
              />}
          </View>
          <View>
            <Text>Take Photo</Text>
            <Button
              onPress={() => {
                setStartCamera(true);
              }}
              title="+"
            />
            <CommentsList landmarkId={id} />
            <ImageGallery landmarkId={id} />
          </View>
        </ScrollView>
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
