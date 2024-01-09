import * as Location from "expo-location";
const tomLong = -1.56612;
const tomLat = 53.82441;

const createGrid = () => {
  let longitude = tomLong - 0.005;
  let longGrid = [];
  let grid = [];
  let tiles = [];
  const longitudeInterval = 0.0025;
  const latitudeInterval = 0.0015;

  while (longitude < tomLong + 0.02 && longitude >= tomLong - 0.02) {
    longGrid.push(longitude);
    longitude += longitudeInterval;
  }

  longGrid.forEach((long) => {
    let latitude = tomLat - 0.0025;
    while (latitude >= tomLat - 0.01 && latitude < tomLat + 0.01) {
      let square = { longitude: long, latitude: null };
      square.latitude = latitude;
      latitude += latitudeInterval;
      grid.push(square);
    }
  });
  grid.forEach((latLong) => {
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
      fill: true,
      sortLat: [latLong.latitude, latLong.latitude + latitudeInterval],
      sortLong: [latLong.longitude, latLong.longitude + longitudeInterval],
    });
  });
  return tiles;
};

function gridSquareId() {
  //we want two map collections on firebase
  //one stores map grids
  //other stores locations of users
  //i.e id of grid squares
  //when someone views map, make request to firebase to mapgrid with their user_id.
  //also request their history of squares than filter mapgrid to remove any squares of id's in grid array
  //store user history in state for conditional rendering.
  //when user closes app, local state updated to firebase to reflect changes on front end to backend.
}

export default createGrid;
