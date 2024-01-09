import { useState } from "react";
import {StyleSheet, View} from "react-native";
import { TextInput, Button, Title } from 'react-native-paper';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import { auth } from "../config";

export default function SignUp({navigation}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  function handleSubmit() {
      navigation.navigate('MapScreen')
      setButtonDisabled(true);
      createUserWithEmailAndPassword(auth, email, password)
          .then(() => {
              const auth = getAuth();
              const user = auth.currentUser;
              if (user) {
              }

              return auth;
          
      })
      .then((user) => {
        updateProfile(user.currentUser, { displayName: username })
        console.log(user.currentUser, "Current user logged in");
      })
  }

  return (
    <>
    <View style={styles.container}>
      <Title>Sign Up</Title>

      <TextInput
          label="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
          mode="outlined"
          style={styles.input}
      />
      
      <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          mode="outlined"
          style={styles.input}
      />

      <TextInput
          label="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          mode="outlined"
          style={styles.input}
      />

      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
          Sign Up
      </Button>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  input: {
    marginVertical: 8,
  },
  button: {
    marginTop: 16,
  },
});