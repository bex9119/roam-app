import { useState, useContext } from "react";
import { StyleSheet } from "react-native";
import { Button, Modal, TextInput, View } from "react-native-web";
import { Text } from "react-native-web";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../config";
import { collection, addDoc } from "firebase/firestore";
import { UserContext } from "../contexts/UserContext";

export default function LoginPage({navigation}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const {currentUser, setCurrentUser} = useContext(UserContext)

    //model under construction
    //const [modalVisible, setModalVisible] = useState(false);

    // const toggleModal = () => {
    //     setModalVisible(!isModalVisible);
    // };

    function handleSubmit() {
        setButtonDisabled(true);
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log(user.uid, "Logged in");
            setCurrentUser(user.uid)
            // ...
        })
        .catch((error) => {
            console.log(error);
            // ..
        });
    }

    return (
        <>
            <View>
                <Text style={styles.text}>email</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Type your email..."
                    onChangeText={(newText) => setEmail(newText)}
                    defaultValue={email}
                />
                <Text style={styles.text}>password</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Type your password..."
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
                <Button title="Sign-up" onPress={()=> {navigation.navigate('Sign-up')}}/>
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
