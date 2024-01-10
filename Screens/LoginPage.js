import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import {
  TextInput,
  Button,
  Title,
  Modal,
  Text,
  Portal,
} from "react-native-paper";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config";
import { useNavigation } from "@react-navigation/native";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [visible, setVisbile] = useState(false);
  const navigation = useNavigation();

  function handleSubmit() {
    setButtonDisabled(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigation.navigate("MapScreen");
      })
      .catch((error) => {
        showModal();
      });
  }

  function showModal() {
    setVisbile(true);
  }

  function hideModal() {
    setVisbile(false);
  }

  return (
    <>
      <View style={styles.container}>
        <Title>Login</Title>

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
          Login
        </Button>
        <Pressable
          style={{ marginTop: 30, alignItems: "center" }}
          onPress={() => {
            navigation.navigate("Sign-up");
          }}
        >
          <Text>Click here if you want to Sign up</Text>
        </Pressable>
      </View>

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalStyle}
        >
          <Text>Invalid email or password</Text>
        </Modal>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    color: "#42618d",
  },
  input: {
    marginVertical: 8,
  },
  button: {
    marginTop: 16,
    backgroundColor: "#42618d",
  },
  modalStyle: {
    backgroundColor: "white",
    padding: 20,
  },
});
