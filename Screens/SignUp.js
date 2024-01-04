import { useState } from "react";
import { Button, TextInput, View, Text, StyleSheet } from "react-native";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { auth } from "../config";
import { useNavigation } from "@react-navigation/native";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const navigation = useNavigation()

  function handleSubmit() {
      setButtonDisabled(true);
      navigation.navigate('MapScreen')
      createUserWithEmailAndPassword(auth, email, password)
          .then(() => {
              const auth = getAuth();
              const user = auth.currentUser;
              if (user) {
                console.log(user);
              }
      })
  }

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
