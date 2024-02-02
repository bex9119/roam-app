import { getAuth } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config";

// const startLong = -1.59612;
// const startLat = 53.8;

const createGrid = () => {
  const user = getAuth().currentUser.uid
      const q = query(
      collection(db, "maps"),
      where("uid", "==", user)
    );
   return getDocs(q)
     .then((snapshot) => {
       const coordsData = snapshot._snapshot.docChanges;
       firebaseLat =
         coordsData[0].doc.data.value.mapValue.fields.startLatitude.doubleValue;
       firebaseLong =
         coordsData[0].doc.data.value.mapValue.fields.startLongitude
           .doubleValue;
       return Promise.all([firebaseLat, firebaseLong])
     })
     .then(([firebaseLat, firebaseLong]) => {
       let longitude = firebaseLong - 0.0245;
       let longGrid = [];
       let grid = [];
       let tiles = [];
       const longitudeInterval = 0.001;
       const latitudeInterval = 0.00066;

       while (longitude < firebaseLong + 0.025 && longitude >= firebaseLong - 0.0245) {
         longGrid.push(longitude);
         longitude += longitudeInterval;
       }

       longGrid.forEach((long) => {
         let latitude = firebaseLat - 0.015;
         while (latitude >= firebaseLat - 0.015 && latitude < firebaseLat + 0.015) {
           let square = { longitude: long, latitude: null };
           square.latitude = latitude;
           latitude += latitudeInterval;
           grid.push(square);
         }
       });

       grid.forEach((latLong, index) => {
         tiles.push({
           location: [
             {
               latitude: latLong.latitude,
               longitude: latLong.longitude,
             },
             {
               latitude: latLong.latitude,
               longitude: latLong.longitude + longitudeInterval,
             },
             {
               latitude: latLong.latitude + latitudeInterval,
               longitude: latLong.longitude + longitudeInterval,
             },
             {
               latitude: latLong.latitude + latitudeInterval,
               longitude: latLong.longitude,
             },
           ],
           id: index,
           fill: true,
           sortLat: [latLong.latitude, latLong.latitude + latitudeInterval],
           sortLong: [latLong.longitude, latLong.longitude + longitudeInterval],
         });
       });
       return tiles;
     });
};

export default createGrid;
