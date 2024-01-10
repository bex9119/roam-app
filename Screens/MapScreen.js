import React, { useEffect, useState } from "react";
import MapView, { Polygon, Marker } from "../setup/map";
import * as Location from "expo-location";
import createGrid from "../utils/createGrid";
import mapStyle from "../assets/mapStyle.json";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  GeoPoint,
} from "firebase/firestore";
import { db } from "../config";
import Modal from "react-native-modal";
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
const customPin = "../assets/re-sized-landmark-pin.png";
import { Button, TextInput } from "react-native-paper";
import { getAuth } from "firebase/auth";

export default function MapScreen({ route }) {
  const [location, setLocation] = useState({});
  const [region, setRegion] = useState(createGrid());
  const [finalLandmarkArray, setFinalLandmarkArray] = useState([]);
  const navigation = useNavigation();
  const [addButtonClicked, setAddButtonClicked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newLandmarkTitle, setNewLandmarkTitle] = useState("");
  const [loadingModal, setLoadingModal] = useState(true);
  const { currentUser, setCurrentUser } = route.params;

  function loadMaps() {
    return getDoc(doc(db, "Maps", "HJLCbJGvssb2onQTbiy4")).then((snapshot) => {
      return snapshot.data().mapLoad;
    });
  }

  setCurrentUser(getAuth().currentUser.displayName);

  // if (!getAuth().currentUser) {
  //   navigation.navigate("loginPage");
  // }

  useEffect(() => {
    const startLocationUpdates = () => {
      Location.requestForegroundPermissionsAsync().then(({ status }) => {
        if (status !== "granted") {
          console.log("error");
          return "error";
        }
        return Location.watchPositionAsync(
          { accuracy: Location.Accuracy.Highest, timeInterval: 2000 },
          (movedLocation) => {
            const newCoordinates = {
              latitude: movedLocation.coords.latitude,
              longitude: movedLocation.coords.longitude,
            };
            setLocation(newCoordinates);
          }
        );
      });
    };
    startLocationUpdates();
  }, []);

  useEffect(() => {
    setRegion((currRegion) => {
      const updatedRegion = currRegion.map((area) => {
        if (
          location.latitude <= area.sortLat[1] &&
          location.latitude >= area.sortLat[0] &&
          location.longitude >= area.sortLong[0] &&
          location.longitude <= area.sortLong[1]
        ) {
          const updatedArea = { ...area };
          updatedArea.fill = false;
          return updatedArea;
        } else {
          return area;
        }
      });
      return updatedRegion;
    });
  }, [location]);

  useEffect(() => {
    const landmarkArray = [];
    getDocs(collection(db, "Landmarks"))
      .then((querySnapshot) => {
        querySnapshot.forEach((landmarkData) => {
          const landmarkDataObject = landmarkData.data();
          landmarkDataObject.id = landmarkData.id;
          landmarkArray.push(landmarkDataObject);
        });
        return landmarkArray;
      })
      .then((array) => {
        setFinalLandmarkArray(array);
      });
  }, [newLandmarkTitle]);

  function addPinFunction() {
    setAddButtonClicked(true);
    setIsModalVisible(true);
  }

  function submitLandmark() {
    const landmarksCollection = collection(db, "Landmarks");
    const landmarkData = {
      Title: newLandmarkTitle,
      Coordinate: new GeoPoint(location.latitude, location.longitude),
    };
    addDoc(landmarksCollection, landmarkData)
      .then((data) => {
        setNewLandmarkTitle("");
        navigation.navigate("Landmarks", { id: data.id });
        setIsModalVisible(false);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  }
  const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));
  delay(5000).then(() => setLoadingModal(false));

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
        }}
      >
        <Modal
          isVisible={loadingModal}
          transparent={false}
          style={styles.content}
        >
          <View>
            <Image
              source={require("../assets/Landmark.png")}
              style={{
                height: 200,
                width: 100,
                padding: 75,
              }}
            />
            <ActivityIndicator size="large" style={{ padding: 30 }} />
            <Text style={styles.text}>Explore your local area</Text>
            <Text style={styles.text}>Discover new places</Text>
            <Text style={styles.text}>Share your favourite spots</Text>
          </View>
        </Modal>
      </View>
      <View style={styles.mapView}>
        <MapView
          minZoomLevel={15}
          style={{ flex: 1, height: "100%" }}
          region={{
            latitude: 53.82,
            longitude: -1.58,
            latitudeDelta: 0.09,
            longitudeDelta: 0.04,
          }}
          provider="google"
          googleMapsApiKey={loadMaps}
          customMapStyle={mapStyle}
          showsUserLocation={true}
        >
          {region.map((tile, index) => {
            return (
              <Polygon
                key={`tile${index}`}
                coordinates={tile.location}
                fillColor={
                  tile.fill ? "rgba(208,208,208,0.90)" : "rgba(208,208,208,0)"
                }
                strokeColor="rgba(0,0,0,0)"
              />
            );
          })}

          {finalLandmarkArray.map((data, index) => (
            <Marker
              onPress={() => {
                {
                  navigation.navigate("Landmarks", { id: data.id });
                }
              }}
              key={index}
              coordinate={{
                latitude: data.Coordinate._lat,
                longitude: data.Coordinate._long,
              }}
              title={`${data.Title}`}
              description={`${data.Description}`}
              image={require(customPin)}
            />
          ))}
        </MapView>
      </View>
      <View style={styles.separator}>
        <Modal isVisible={isModalVisible}>
          <View style={styles.modal}>
            <TextInput
              placeholder="What is this Landmark?"
              style={styles.textInput}
              onChangeText={(title) => setNewLandmarkTitle(title)}
            />
            <Button onPress={submitLandmark}>
              <Text style={styles.modalText}>Create Landmark</Text>
            </Button>
            <Button
              onPress={() => {
                setIsModalVisible(false);
              }}
            >
              <Text style={styles.modalText}>Close</Text>
            </Button>
          </View>
        </Modal>
      </View>
      <Button
        mode="contained"
        style={styles.addPinButton}
        onPress={addPinFunction}
      >
        <Text>Add a new landmark</Text>
      </Button>

      {/* <Pressable style={styles.addPinButton} onPress={addPinFunction}>
        <Text>Add a new landmark</Text>
      </Pressable> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
    marginTop: -30
  },
  separator: {
    marginVertical: 30,
    height: 0.5,
    width: "80%",
  },
  mapView: {
    height: "90%",
    width: "100%",
    // borderWidth: 10,
    // borderColor: "#42618d",
  },
  addPinButton: {
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: "#42618d",
    width: "80%",
    alignItems: "center",
    marginTop: -50,
    marginHorizontal: 40,
  },
  modal: {
    backgroundColor: "#ffffff",
    color: "#42618d",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
    height: "20%",
    padding: 20,
    paddingTop: 10,
  },
  textInput: {
    backgroundColor: "white",
    height: 40,
    fontSize: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#ffffff",
    justifyContent: "center",
    alignContent: "center",
  },
  modalText: {
    color: "#42618d",
  },
  text: {
    color: "white",
    lineHeight: 40,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
});
