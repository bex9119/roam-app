import React, { useEffect, useState } from "react";
import MapView, { Polyline, Polygon, Marker } from "../setup/map";
import * as Location from "expo-location";
import createGrid from "../utils/createGrid";
import mapStyle from "../assets/mapStyle.json";
import { Pressable, Text, View, StyleSheet } from "react-native";

export default function MapScreen() {
  const [location, setLocation] = useState({});
  const [locationHistory, setLocationHistory] = useState([]);
  const [region, setRegion] = useState(createGrid());
  const [addButtonClicked, setAddButtonClicked] = useState(false);

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
            console.log(location, "in use effect");
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

  function addPinFunction() {
    console.log(location, "in new function");
    setAddButtonClicked(true);
  }
  return (
    <View style={styles.container}>
      <View style={styles.mapView}>
        <MapView
          minZoomLevel={7}
          maxZoomLevel={20}
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
                strokeColor="rgba(0,0,0,0)"
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
        </MapView>
      </View>
      <Pressable style={styles.addPinButton} onPress={addPinFunction}>
        <Text>Add a new landmark</Text>
      </Pressable>
    </View>
  );
}

// <Marker
//           onPress={() => {
//             {
//               console.log("marker clicked");
//               console.log(data.id, "index");
//               navigation.navigate("Landmark", { id: data.id });
//             }
//           }}
//           key={data.id}
//           coordinate={{
//           latitude: data.Coordinate._lat,
//           longitude: data.Coordinate._long,
//           }}
//           title={`${data.Title}`}
//            description={`${data.Description}`}
//        />

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
});
