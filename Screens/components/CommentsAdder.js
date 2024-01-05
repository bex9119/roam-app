import { useState } from "react"
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import { getAuth } from "firebase/auth";
import {db} from '../../config'
import {collection, addDoc } from 'firebase/firestore';


export default function CommentsAdder(){
    const [comment, setComment] = useState("");

    function handleSubmit(){
        console.log("submitted");
        const username = getAuth().currentUser.displayName;
        console.log(username);

        const myCollection = collection(db, 'comments');
        const myDocumentData = {
            username: username,
            body: comment,
            //later on add landmark_id
        };

        // Add the document to the collection
        addDoc(myCollection, myDocumentData)
        .then(() => {
            console.log('comment added');
        })
        .catch((error) => {
            console.log('error:', error)
        })



    }
    
    return (
        <View style={styles.container}>
                <Text>Add your comment:</Text>
                <TextInput
                style={styles.textInput}
                    placeholder="Type your comment here..."
                    onChangeText={(newText) => setComment(newText)}
                    defaultValue={comment}
                />
                <Button
                    style={styles.button}
                    title="Add comment"
                    onPress={handleSubmit}
                />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 5,
        backgroundColor: "black",
        color: "white",
        fontSize: 20,
        alignContent: "space-between",
    },
    textInput: {
        backgroundColor: "black",
        color: "white",
        height: 40,
        fontSize: 20,
    }, 
    text: { fontSize: 20 },
    button: { margin: 10 }
});