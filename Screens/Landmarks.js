import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {Button, Title} from "react-native-paper";
import { Camera, CameraType } from "expo-camera";
import { useEffect, useState } from "react";
import CameraScreen from "./CameraScreen";
import CommentsList from "./components/CommentsList";
import ImageGallery from "./components/ImageGallery";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../config";



export default function Landmarks({ route, navigation }) {
  const { id, currentLandmark, setCurrentLandmark } = route.params;
  const [startCamera, setStartCamera] = useState(false);
  const [landmarkTitle, setLandmarkTitle] = useState("");

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

  useEffect(() => {
    const docRef = doc(db, "Landmarks", id);
    getDoc(docRef)
    .then((snapshot) => {
      setCurrentLandmark(snapshot.data().Title)
    })
  }, [id])

  if (startCamera) {
    return <CameraScreen landmarkId={id} setStartCamera={setStartCamera} />;
  } else {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{marginHorizontal: 0}}>
            {coverImage &&
              <Image
                style={styles.photo}
                source={{
                  uri: coverImage,
                }}
              />}
          </View>
          <View>
            <Button icon="camera" style={{marginTop: 25, marginHorizontal: 20}} mode="contained" onPress={() => setStartCamera(true)}>
            Take Photo
            </Button>
            <ImageGallery landmarkId={id}/>
          </View>
          <View>
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
    paddingTop: 0,
    marginHorizontal: -20
  },
  text: {},
  heading: {
    backgroundColor: 'white',
    padding: 20,
    marginLeft: 0
  },
  photo: { width: "100%", height: 200},
});
