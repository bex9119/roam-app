import { useState } from "react";
import { Button, TextInput, View, Text, StyleSheet } from "react-native";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../config";
import { useNavigation } from "@react-navigation/native";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const navigation = useNavigation()

    function handleSubmit() {
        setButtonDisabled(true);
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            navigation.navigate('MapScreen')
        })
        .catch((error) => {
            console.log(error);
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
            </View>
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
