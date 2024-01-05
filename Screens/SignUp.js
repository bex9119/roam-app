import { useState } from "react";
import { Button, TextInput, View, Text, StyleSheet } from "react-native";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { auth } from "../config";

export default function SignUp({navigation}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  function handleSubmit() {
      navigation.navigate('CreateMap')
      setButtonDisabled(true);
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
          placeholder="Username"
          autoCapitalize="none"
          onChangeText={(newText) => setUsername(newText)}
          defaultValue={username}
        />
        <Text style={styles.text}>email</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={(newText) => setEmail(newText)}
          defaultValue={email}
        />
        <Text style={styles.text}>password</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry 
          autoCapitalize="none"
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
