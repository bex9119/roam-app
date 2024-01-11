import { useState } from "react";
import {StyleSheet, View, Image} from "react-native";
import { TextInput, Button, Title } from 'react-native-paper';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import { auth, db } from "../config";
import * as Location from "expo-location";
import { addDoc, collection } from "firebase/firestore";

export default function SignUp({navigation}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  function handleSubmit() {
      setButtonDisabled(true);
      createUserWithEmailAndPassword(auth, email, password)
          .then(() => {
              const auth = getAuth();
              const user = auth.currentUser;   
              return auth;    
      })
      .then((user) => {
        updateProfile(user.currentUser, { displayName: username })
      })
      .then(()=> {
        return Location.requestForegroundPermissionsAsync()
      })
      .then(({status}) => {
        if (status !== 'granted') {
          return error
        }
        return Location.getCurrentPositionAsync()
      })
      .then((data) => {
        const myCollection = collection(db, "maps");
        const myDocumentData = {
          uid: getAuth().currentUser.uid,
          startLatitude: data.coords.latitude,
          startLongitude: data.coords.longitude,
        };
        addDoc(myCollection, myDocumentData)
      })
      .then(()=> {
        navigation.navigate('MapScreen')
      })
      .catch((error)=> {
        console.log(error)
      })
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
      <Title style={styles.text}>Sign Up</Title>

      <TextInput
          label="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
          mode="outlined"
          style={styles.input}
          theme={{colors: {primary: '#949494', underlineColor: 'transparent'}}}
          textColor="#ffffff"
          autoCapitalize="none"
      />
      
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
  text : {
    color: "white"
  }
});