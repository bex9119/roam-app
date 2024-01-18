import { collection, getDocs, query, where } from "@firebase/firestore";
import { useEffect, useState} from "react";
import { Image, StyleSheet, Text } from "react-native";
import { db } from "../../config";
import { View } from "react-native-animatable";
import Swiper from 'react-native-swiper';
import { Title } from "react-native-paper";

export default function ImageGallery({ landmarkId }) {
  const [landmarkImages, setLandmarkImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "images"),
      where("landmarkId", "==", landmarkId)
    );
    getDocs(q).then((snapshot) => {
      const images = snapshot._snapshot.docChanges;
      setLandmarkImages(images);
      setIsLoading(false);
    });
  }, [landmarkId]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  return (
    <View style={{marginHorizontal: 20, paddingBottom: 0, marginTop: 25}}>
      <Title>Landmark Gallery</Title>
      <Swiper style={styles.wrapper} height={300} showsButtons={false}>
        {landmarkImages.map((image, index) => (
          <View key={index} style={styles.slide}>
            <Image source={{ uri: image.doc.data.value.mapValue.fields.image_url.stringValue }} style={styles.image} />
          </View>
        ))}
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: -30,
    marginHorizontal: 0
  },
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",

  },
  image: {
    width: '100%',
    height: '60%',
    borderRadius: 25
  }
});
