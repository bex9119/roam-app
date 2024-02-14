import React, { useEffect, useRef, useState } from "react";
import MapView, { Polygon, Marker } from "../setup/map";
import * as Location from "expo-location";
import createGrid from "../utils/createGrid";
import mapStyle from "../assets/mapStyle.json";
import { addDoc, collection, doc, getDoc, getDocs, GeoPoint, query, where, updateDoc } from "firebase/firestore";
import { db } from "../config";
import Modal from "react-native-modal";
import { Text, View, StyleSheet, Image, ActivityIndicator, AppState } from "react-native";
import { useNavigation } from "@react-navigation/core";
const customPin = "../assets/re-sized-landmark-pin.png";
import { Button, Portal, TextInput } from "react-native-paper";
import {Modal as ModalPaper} from "react-native-paper";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function MapScreen() {
  

  const [location, setLocation] = useState({});
  const [region, setRegion] = useState([]);
  const [finalLandmarkArray, setFinalLandmarkArray] = useState([]);
  const navigation = useNavigation();
  const [addButtonClicked, setAddButtonClicked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newLandmarkTitle, setNewLandmarkTitle] = useState("");
  const [loadingModal, setLoadingModal] = useState(true);
  const [visible, setVisbile] = useState(false);
  const [userHistory, setUserHistory] = useState(['test'])
  const mapId = useRef('')

      const startLocationUpdates = () => {
        Location.requestForegroundPermissionsAsync().then(({ status }) => {
          if (status !== "granted") {
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
  
  function loadMaps() {
    return getDoc(doc(db, "Maps", "HJLCbJGvssb2onQTbiy4")).then((snapshot) => {
      return snapshot.data().mapLoad;
    });
  }

  function showModal() {
    setVisbile(true);
  }

  function hideModal() {
    setVisbile(false);
  }
  
  useEffect(() => {
    

        const q = query(
          collection(db, "maps"),
          where("uid", "==", getAuth().currentUser.uid)
        );
    getDocs(q).then((snapshot) => {
          snapshot.forEach((doc) => {
            mapId.current = doc.id
            setUserHistory(doc.data().userHistory) 
          })  
        })
        .then(()=> {
          if (getAuth().currentUser) {
            createGrid()
              .then((res) => {
                setRegion(res);
              })
              .then(() => {
                startLocationUpdates();
              });
          }
        })
    
  }, [])

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigation.navigate("LoginPage") 
      }
    });
  }, [getAuth().currentUser])

  useEffect(() => {
    if (region) {
    setRegion((currRegion) => {
      const updatedRegion = currRegion.map((area) => {
        if (
          location.latitude <= area.sortLat[1] &&
          location.latitude >= area.sortLat[0] &&
          location.longitude >= area.sortLong[0] &&
          location.longitude <= area.sortLong[1]
          ) {
          const updatedArea = { ...area };
          if (area.fill === true) {
            setUserHistory((currUserHistory) => {
              if (!currUserHistory.includes(area.id)) {
                currUserHistory.push(area.id)
              } 
                return currUserHistory
            })
            updateDoc(doc(db, "maps", mapId.current), { userHistory: userHistory })
            }
          updatedArea.fill = false;
          return updatedArea;
        } else {
          return area;
        }
      });
      return updatedRegion;
    })};
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
  delay(6000).then(() => setLoadingModal(false));

  if(region){
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
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.09,
            longitudeDelta: 0.04,
          }}
          provider="google"
          googleMapsApiKey={loadMaps}
          customMapStyle={mapStyle}
          showsUserLocation={true}
        >
          {region.filter((tile) => { return !userHistory.includes(tile.id)}).map((tile, index) => {
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
                if (
                  (data.Coordinate.latitude - 0.00033 <= location.latitude && location.latitude <= data.Coordinate.latitude + 0.00033)
                   && 
                   (data.Coordinate.longitude - 0.0005 <= location.longitude && location.longitude <= data.Coordinate.longitude + 0.0005)) {
                    {
                      navigation.navigate("Landmarks", { id: data.id });
                    }
                   }
                  else {
                    showModal()
                  }
              }}
              key={index}
              coordinate={{
                latitude: data.Coordinate._lat,
                longitude: data.Coordinate._long,
              }}
              title={`${data.Title}`}
              image={require(customPin)}
            />
          ))}
        </MapView>
      </View>
      
      <View style={styles.separator}>
        <Modal isVisible={isModalVisible}>
          <View style={styles.modal}>
            <TextInput
              placeholder="Name your landmark!"
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
      <Portal>
        <ModalPaper
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalStyle}
        >
          <Text>Landmark is too far away!</Text>
        </ModalPaper>
      </Portal>
    </View>
    )
  }
  else { return (
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
  )
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 0,
    marginTop: -30,
    backgroundColor: "#393939"
  },
  separator: {
    marginVertical: 30,
    height: 0.5,
    width: "80%",
  },
  mapView: {
    height: "90%",
    width: "100%",
  },
  addPinButton: {
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: "#42618d",
    width: "80%",
    alignItems: "center",
    marginTop: -50,
    marginBottom: 10,
    marginHorizontal: 40,
  },
  modal: {
    backgroundColor: "#ffffff",
    color: "#42618d",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
    height: "35%",
    padding: 20,
    paddingTop: 10,
    justifyContent:'center'
  },
  textInput: {
    backgroundColor: "white",
    height: 40,
    fontSize: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#ffffff",
    paddingBottom: 10,
  },
  modalText: {
    color: "#42618d",
  },
  text: {
    color: "white",
    lineHeight: 40,
    alignContent:'center'
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  modalStyle: {
    backgroundColor: "white",
    padding: 20,
  },
});
