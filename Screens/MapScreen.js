import React, { useEffect, useState } from "react";
import MapView, { Polyline, Polygon, Marker } from "../setup/map";
import * as Location from "expo-location";
import createGrid from "../utils/createGrid";
import mapStyle from "../assets/mapStyle.json";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config";

export default function MapScreen() {
  const [location, setLocation] = useState({});
  const [locationHistory, setLocationHistory] = useState([]);
  const [region, setRegion] = useState(createGrid());
  const [finalLandmarkArray, setFinalLandmarkArray] = useState([]);
  const navigation = useNavigation();

  const exampleMarkers = [
    {
      latitude: 53.8,
      longitude: -1.54,
      title: "Centre of Leeds",
      description: "Pin of centre of Leeds",
      id: 1,
    },
    {
      latitude: 53.8,
      longitude: -1.5422,
      title: "Second test pin",
      description: "Second test pin",
      id: 2,
    },
    {
      latitude: 53.8,
      longitude: -1.53,
      title: "Third test pin",
      description: "Third test pin",
      id: 3,
    },
  ];

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
    getDocs(collection(db, "Landmarks"))
      .then((querySnapshot) => {
        const landmarkArray = querySnapshot.docs.map((landmarkData) => {
          return landmarkData._document.data.value.mapValue.fields;
        });
        return landmarkArray;
      })
      .then((array) => {
        setFinalLandmarkArray(array);
      });
  }, []);

  console.log(finalLandmarkArray, "final array");

  
    // finalLandmarkArray.map((data) =>{
    //   console.log(data.Coordinate.geoPointValue.latitude)
    //     })
  return (
    <MapView
      minZoomLevel={12}
      style={{ flex: 1 }}
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
      {location && <Polyline coordinates={locationHistory} strokeWidth={5} />}

      {finalLandmarkArray.map((data) => (
        <Marker
          // onPress={() => {
          //   console.log("marker clicked");
          //   console.log(data.id, "index");
          //   navigation.navigate("Landmark", { id: data.id });
          // }}
          key={data.id.integerValue}
          coordinate={{
            latitude: data.Coordinate.geoPointValue.latitude,
            longitude: data.Coordinate.geoPointValue.longitude,
          }}
          title={`Marker ${data.Title.stringValue}`}
          description={`Description: ${data.Description.stringValue}`}
          // image={require("../assets/pin-image.jpeg")}
        />
      ))}
    </MapView>
  );
}
