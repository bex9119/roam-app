import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { useEffect, useState } from "react";
import CameraScreen from "./CameraScreen";
import CommentsList from "./components/CommentsList";
import ImageGallery from "./components/ImageGallery";
import { collection, doc, getDoc, getDocs, query, where} from "firebase/firestore";
import { db } from "../config";

export default function Landmarks({ route }) {
  const { id, currentLandmark, setCurrentLandmark } = route.params;
  const [startCamera, setStartCamera] = useState(false);

  const [coverImage, setCoverImage] = useState(null);
  useEffect(() => {
    const q = query(collection(db, "images"), where("landmarkId", "==", id));
    getDocs(q)
      .then((snapshot) => {
        let image = [];
        snapshot.forEach((imageData) => {
          image.push(imageData.data().image_url);
        });
        return image[0];
      })
      .then((image) => {
        setCoverImage(image);
      });
  }, [id, startCamera]);

  useEffect(() => {
    const docRef = doc(db, "Landmarks", id);
    getDoc(docRef).then((snapshot) => {
      setCurrentLandmark(snapshot.data().Title);
    });
  }, [id]);

  if (startCamera) {
    return <CameraScreen landmarkId={id} setStartCamera={setStartCamera} />;
  } else {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{ marginHorizontal: 0 }}>
            {coverImage && (
              <Image
                style={styles.photo}
                source={{
                  uri: coverImage,
                }}
              />
            )}
          </View>
          <View style={styles.gallery}>
            <ImageGallery landmarkId={id} style={styles.imageGallery}/>
            <Button
              icon="camera"
              style={styles.cameraButton}
              mode="contained"
              onPress={() => setStartCamera(true)}
            >
              Add Photo
            </Button>
          </View>
          <View style={styles.gallery}>
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
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingTop: 0,
    marginHorizontal: -20,
    backgroundColor: "#949494"
  },
  text: {},
  heading: {
    backgroundColor: "white",
    padding: 20,
    marginLeft: 0,
  },
  cameraButton: {
    marginHorizontal: 20,
    backgroundColor: "#42618d",
    marginBottom: 20
  },
  photo: { width: "100%", height: 200 },
  gallery: {
    margin: 20,
    borderRadius: 25,
    backgroundColor: '#c8c8c8'
  }
});
