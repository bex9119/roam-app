import React, { useEffect, useState } from "react";
import MapView, { Polyline, Polygon, Marker } from "../setup/map";
import * as Location from "expo-location";
import createGrid from "../utils/createGrid";
import mapStyle from "../assets/mapStyle.json";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config";
import Modal from "react-native-modal"
import { Pressable, Text, View, StyleSheet, TextInput } from "react-native";

export default function MapScreen() {
  const [location, setLocation] = useState({});
  const [locationHistory, setLocationHistory] = useState([]);
  const [region, setRegion] = useState(createGrid());
  const [finalLandmarkArray, setFinalLandmarkArray] = useState([]);
  // const navigation = useNavigation();
  const [addButtonClicked, setAddButtonClicked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const startLocationUpdates = () => {
      Location.requestForegroundPermissionsAsync().then(({ status }) => {
        if (status !== "granted") {
          console.log("error");
          return "error";
        }
        return Location.watchPositionAsync(
          { accuracy: Location.Accuracy.Highest, timeInterval: 5000 },
          (location) => {
            const newCoordinates = {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            };
            setLocation(newCoordinates);
            setLocationHistory((currHistory) => {
              return [...currHistory, newCoordinates];
            });
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
          landmarkArray.push(landmarkData.data());
          console.log(landmarkData.id, 'landmark id')
        });
        return landmarkArray;
      })
      .then((array) => {
        setFinalLandmarkArray(array);
      });
  }, []);

  function addPinFunction() {
    setAddButtonClicked(true);
    setIsModalVisible(true);
  }
  return (
    <View style={styles.container}>
      <View style={styles.mapView}>
        <MapView
          minZoomLevel={7}
          style={{ flex: 1, height: "100%" }}
          initialRegion={{
            latitude: 53.8,
            longitude: -1.54,
            latitudeDelta: 0.09,
            longitudeDelta: 0.04,
          }}
          provider="google"
          googleMapsApiKey="AIzaSyBdvF-tHDZd-CAjetSae6Eut8VL_xrgpMw"
          customMapStyle={mapStyle}
        >
          {region.map((tile, index) => {
            return (
              <Polygon
                key={`tile${index}`}
                coordinates={tile.location}
                fillColor={
                  tile.fill ? "rgba(105,105,105,1)" : "rgba(105,105,105,0)"
                }
                strokeColor="rgba(0,0,0,1)"
              />
            );
          })}
          {location && (
            <Polyline coordinates={locationHistory} strokeWidth={5} />
          )}
          {addButtonClicked && (
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
            />
          )}

          {finalLandmarkArray.map((data) => (
            <Marker
              onPress={() => {
                {
                  console.log("marker clicked");
                  console.log(data.id, "index");
                  // navigation.navigate("Landmark", { id: data.id });
                }
              }}
              key={data.id}
              coordinate={{
                latitude: data.Coordinate._lat,
                longitude: data.Coordinate._long,
              }}
              title={`${data.Title}`}
              description={`${data.Description}`}
            />
          ))}
        </MapView>
      </View>
      {addButtonClicked && (
        <View style={styles.separator}>
          <Modal isVisible={true}>
            <View style={styles.modal}>
              <TextInput
                placeholder="What Landmark is this?"
                style={styles.textInput}
              />
            <Pressable style={styles.addPinButton} onPress={submitLandmark}>
              <Text>Submit</Text>
            </Pressable>
            </View>
          </Modal>
        </View>
      )}

      <Pressable style={styles.addPinButton} onPress={addPinFunction}>
        <Text>Add a new landmark</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    padding: 20,
    margin: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#f0f0f0",
    backgroundColor: "#2596be",
    width: "50%",
    alignItems: 'center',
marginLeft: '25%'
  },
  modal: {
    backgroundColor: "#ffffff",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
    height: "20%",
  },
  textInput: {
    backgroundColor: "white",
    height: 40,
    fontSize: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#ffffff",
    justifyContent: 'center',
  },
});
