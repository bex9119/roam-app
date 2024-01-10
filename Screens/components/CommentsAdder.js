import { useState } from "react";
import { StyleSheet, View} from "react-native";
import { TextInput, Button, Title, Modal, Text} from 'react-native-paper';
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
    <View style={styles.container}>

        <TextInput
            label="Type your comment..."
            value={comment}
            onChangeText={(text) => setComment(text)}
            mode="outlined"
            style={styles.input}
        />

        <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        Add comment
        </Button>
      
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
      },
      input: {
        marginVertical: 0,
      },
      button: {
        marginVertical: 20,
      }
});
