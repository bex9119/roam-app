import React, { useEffect, useState } from "react";
import MapView, { Polyline, Polygon, Marker } from "../setup/map";
import * as Location from "expo-location";
import createGrid from "../utils/createGrid";
import mapStyle from "../assets/mapStyle.json";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../config";
import { useNavigation } from "@react-navigation/core";

export default function MapScreen() {
  const [location, setLocation] = useState({});
  const [locationHistory, setLocationHistory] = useState([]);
  const [region, setRegion] = useState(createGrid());
  const [finalLandmarkArray, setFinalLandmarkArray] = useState([]);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  function loadMaps() {
    return getDoc(doc(db, 'Maps', 'HJLCbJGvssb2onQTbiy4')).then((snapshot)=> {
     return snapshot.data().mapLoad
    })
  }


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
        });
        return landmarkArray;
      })
      .then((array) => {
        setFinalLandmarkArray(array);
      });
  }, []);
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
      googleMapsApiKey={loadMaps()}
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
      {location && <Polyline coordinates={locationHistory} strokeWidth={5} />}

      {finalLandmarkArray.map((data) => (
        <Marker
          onPress={() => {
            {
              console.log("marker clicked");
              navigation.navigate("Landmarks", { id: data.id });
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
  );
}
