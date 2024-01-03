import React, { useEffect, useState } from "react";
import MapView, { Polyline, Polygon } from "../utils/map";
import * as Location from "expo-location";
import createGrid from "../utils/utils";
import mapStyle from "../assets/mapStyle.json"


export default function MapScreen() {
  const [location, setLocation] = useState({});
  const [locationHistory, setLocationHistory] = useState([]);
  const [region, setRegion] = useState(createGrid());

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

  return (
    <MapView
      minZoomLevel={12}
      maxZoomLevel={20}
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
            fillColor={tile.fill ? "rgba(105,105,105,1)" : "rgba(105,105,105,0)"}
            strokeColor="rgba(0,0,0,0)"
          />
        );
      })}
      {location && <Polyline coordinates={locationHistory} strokeWidth={5} />}
    </MapView>
  );
}