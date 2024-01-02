import { useState } from "react"
import { StyleSheet } from "react-native"
import { Button, TextInput, View } from "react-native-web"
import { Text } from "react-native-web"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../config';
import {collection, addDoc} from 'firebase/firestore';





export default function SignUp() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [buttonDisabled, setButtonDisabled] = useState(false)


    const userData = {
        uid: "",
        username: "",
        email: "",
        }

    function handleSubmit(){
        userData.username = username;
        userData.email = email;
        console.log(userData)
        setButtonDisabled(true)
        
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            userData.uid = userCredential.user.uid;
            const usersCollection = collection(db, 'users');

      // Add a new document with a generated ID
            addDoc(usersCollection, userData)
            .then((docRef) => {
                console.log('User document written with ID: ', docRef.id);

                // Now you can navigate to the home page or perform other actions
                

            })
            .catch((error) => {
                console.error('Error adding document: ', error);
                // Handle Firestore error
            });
        })
        .catch((error) => {
            console.log(error);
        })

    }

     //API CALL TO SEND THESE DETAILS TO FIREBASE
        //SEPERATE PASSWORD API CALL TO STORE PASSWORD
        
        //Once all completed 




    return (

        <View> 
            <Text style={styles.text}>username</Text>
        <TextInput
            style={styles.textInput}
            placeholder="Type here to translate!"
            onChangeText={newText => setUsername(newText)}
            defaultValue={username}
            />
            <Text style={styles.text}>email</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Type here to translate!"
                onChangeText={newText => setEmail(newText)}
                defaultValue={email}
            />
            <Text style={styles.text}>password</Text>
            <TextInput
            style={styles.textInput}
            placeholder="Type here to translate!"
            onChangeText={newText => setPassword(newText)}
            defaultValue={password}
            />

            <Button style={styles.button} disabled={buttonDisabled} title="submit" onPress={handleSubmit}/>

        </View>
    );



}


const styles = StyleSheet.create({
    container: {flex: 5, backgroundColor: "black", color: "white", fontSize: 20, alignContent: 'space-between'},
    textInput: {backgroundColor:"black", color:"white", height: 40, fontSize: 20},
    text: {fontSize: 20},
    button: {marginTop: 10}, 

})