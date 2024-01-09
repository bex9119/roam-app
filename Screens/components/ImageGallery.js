import { collection, getDocs, query, where } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text } from "react-native";
import { db } from "../../config";
import { View } from "react-native-animatable";

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
    <View>
      {landmarkImages.map((image, index) => {
        return (
          <Image
            style={styles.photo}
            source={{
              uri: image.doc.data.value.mapValue.fields.image_url.stringValue,
            }}
            key={index}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  photo: { width: "100%", height: 200 },
});
