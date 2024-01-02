const createGrid = () => {
  let longitude = -1.7;
  let longGrid = [];
  let grid = [];
  let tiles = [];
  const longitudeInterval = 0.0025;
  const latitudeInterval = 0.0015;

  while (longitude < -1.4 && longitude > -2) {
    longGrid.push(longitude);
    longitude += longitudeInterval;
  }
  longGrid.forEach((long) => {
    let latitude = 53.72;
    while (latitude >= 53.7 && latitude < 53.9) {
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
      fill: true,
      sortLat: [latLong.latitude, latLong.latitude + latitudeInterval],
      sortLong: [latLong.longitude, latLong.longitude + longitudeInterval],
    });
  });
  return tiles;
};

export default createGrid;
