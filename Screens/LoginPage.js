import { useState } from "react";
import { Pressable, StyleSheet, View, Image } from "react-native";
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
        <Image 
        source={require("../assets/roamLogo.png")}
        style={{
            height: 200,
            width: 375, 
          }}/>
        <Title style={styles.text}>Log in</Title>

        <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          mode="outlined"
          style={styles.input}
          theme={{colors: {primary: '#949494', underlineColor: 'transparent'}}}
          textColor="#ffffff"
          autoCapitalize="none"
        />

        <TextInput
          label="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          mode="outlined"
          style={styles.input}
          theme={{colors: {primary: '#949494', underlineColor: 'transparent'}}}
          textColor="#ffffff"
          autoCapitalize="none"
        />

        <Button mode="contained" onPress={handleSubmit} style={styles.button}>
          Log in
        </Button>
        <Pressable
          style={{ marginTop: 30, alignItems: "center" }}
          onPress={() => {
            navigation.navigate("Sign-up");
          }}
        >
          <Text style={styles.text}>Don't already have an account? Sign up here!</Text>
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
    backgroundColor: "#393939"
  },
  input: {
    marginVertical: 8,
    backgroundColor: "#2c2c2c",
    activeOutlineColor: "#ffffff",
  },
  button: {
    marginTop: 16,
    backgroundColor: "#42618d",
  },
  modalStyle: {
    backgroundColor: "white",
    padding: 20,
  },
  text : {
    color: "white"
  }
});
