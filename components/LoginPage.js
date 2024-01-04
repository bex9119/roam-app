import { useState, useContext } from "react";
import { Button, Modal, TextInput, View, Text, StyleSheet } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config";
import { collection, addDoc } from "firebase/firestore";
import { UserContext } from "../contexts/UserContext";
import createGrid from "../utils/utils";
import * as Location from "expo-location";
export default function SignUp({ navigation }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const { currentUser, setCurrentUser } = useContext(UserContext);
    //model under construction
    //const [modalVisible, setModalVisible] = useState(false);
    // const toggleModal = () => {
    //     setModalVisible(!isModalVisible);
    // };
    function handleSubmit() {
        setButtonDisabled(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;
                console.log(user.uid);
                const userData = {
                    uid: user.uid,
                    username: username,
                    email: email,
                };
                const usersCollection = collection(db, "users");
                // Add a new document with a generated ID
                return addDoc(usersCollection, userData);
            })
            .then((userData) => {
                console.log("data written to firebase");
                setCurrentUser((currUser) => {
                    currUser = userData.uid;
                    return currUser;
                });
                // Now you can navigate to the home page or perform other actions
            });
        //   .then(() => {
        //     return Location.requestForegroundPermissionsAsync();
        //   })
        //   .then(({ status }) => {
        //     const mapsCollection = collection(db, "maps");
        //     if (status === "granted") {
        //       const mapGrid = createGrid();
        //       const mapData = {
        //         uid: currentUser,
        //         map: mapGrid,
        //       };
        //       addDoc(mapsCollection, mapData).then((docRef) => {
        //         console.log("Map document written with ID: ", docRef.id);
        //       });
        //     }
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });
    }
    // if (modalVisible) {
    //     return (
    //         <View style={styles.centeredView}>
    //             <Modal visible={modalVisible}>
    //                 <View style={styles.centeredView}>
    //                     <Text>All signed up!</Text>
    //                     <Button
    //                         title="OK"
    //                         onPress={setModalVisible(false)}
    //                     ></Button>
    //                 </View>
    //             </Modal>
    //         </View>
    //     );
    // }
    return (
        <>
            <View>
                <Text style={styles.text}>username</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Type here to translate!"
                    onChangeText={(newText) => setUsername(newText)}
                    defaultValue={username}
                />
                <Text style={styles.text}>email</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Type here to translate!"
                    onChangeText={(newText) => setEmail(newText)}
                    defaultValue={email}
                />
                <Text style={styles.text}>password</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Type here to translate!"
                    onChangeText={(newText) => setPassword(newText)}
                    defaultValue={password}
                />
            </View>
            <View>
                <Button
                    style={styles.button}
                    disabled={buttonDisabled}
                    title="submit"
                    onPress={handleSubmit}
                />
            </View>{" "}
        </>
    );
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    text: { fontSize: 20 },
    button: { margin: 10 },
});