import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput, Button, Title, Modal, Text } from "react-native-paper";
import { getAuth } from "firebase/auth";
import { db } from "../../config";
import { collection, addDoc } from "firebase/firestore";

export default function CommentsAdder({ setComments, landmarkId }) {
  const [comment, setComment] = useState("");

  function handleSubmit() {
    const username = getAuth().currentUser.displayName;

    const myCollection = collection(db, "comments");
    const myDocumentData = {
      username: username,
      body: comment,
      landmarkId: landmarkId,
    };

    addDoc(myCollection, myDocumentData)
      .then(() => {
        setComments((currComments) => {
          return [...currComments, [comment, username]];
        });
        setComment("");
      })
      .catch((error) => {
        console.log("error:", error);
      });
  }

  return (
    <View style={styles.container}>
      <TextInput
        label="Leave a comment..."
        value={comment}
        onChangeText={(text) => setComment(text)}
        mode="outlined"
        style={styles.input}
        theme={{colors: {primary: '#42618d', underlineColor: 'transparent'}}}
      />

      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        Post comment
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  input: {
    marginVertical: 0,
  },
  button: {
    marginVertical: 20,
    backgroundColor: "#42618d",
  },
});
