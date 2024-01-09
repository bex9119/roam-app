import { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import { getAuth } from "firebase/auth";
import { db } from "../../config";
import { collection, addDoc } from "firebase/firestore";

export default function CommentsAdder({ setComments, landmarkId }) {
  const [comment, setComment] = useState("");

  function handleSubmit() {
    console.log("submitted");
    const username = getAuth().currentUser.displayName;
    console.log(username);

    const myCollection = collection(db, "comments");
    const myDocumentData = {
      username: username,
      body: comment,
      landmarkId: landmarkId,
    };

    addDoc(myCollection, myDocumentData)
      .then(() => {
        console.log("comment added");
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
    <View>
      <TextInput
        style={styles.textInput}
        placeholder="Type your comment here..."
        placeholderTextColor="white"
        value={comment}
        onChangeText={(value) => setComment(value)}
      />
      <Button
        style={styles.button}
        title="Add comment"
        onPress={handleSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    color: "white",
    backgroundColor: "black",
    height: 40,
    fontSize: 20,
  },
  text: {
    fontSize: 20,
    color: "white",
  },
  button: { margin: 10 },
});
