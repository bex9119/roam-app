const startLong = -1.59612;
const startLat = 53.8;

const createGrid = () => {
  let longitude = startLong;
  let longGrid = [];
  let grid = [];
  let tiles = [];
  const longitudeInterval = 0.001;
  const latitudeInterval = 0.00066;

  while (longitude < startLong + 0.05 && longitude >= startLong) {
    longGrid.push(longitude);
    longitude += longitudeInterval;
  }

  longGrid.forEach((long) => {
    let latitude = startLat;
    while (latitude >= startLat && latitude < startLat + 0.03) {
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

export default createGrid;
