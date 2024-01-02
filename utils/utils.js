const createGrid = () => {
  let longitude = -1.6;
  let longGrid = [];
  let grid = [];
  let tiles = [];
  while (longitude < -1.4 && longitude > -2) {
    longGrid.push(longitude);
    longitude += 0.01;
  }
  longGrid.forEach((long) => {
    let latitude = 53.78;
    while (latitude >= 53.7 && latitude < 53.9) {
      let square = { longitude: long, latitude: null };
      square.latitude = latitude;
      latitude += 0.01;
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
          longitude: latLong.longitude + 0.01,
        },
        {
          latitude: latLong.latitude + 0.01,
          longitude: latLong.longitude + 0.01,
        },
        {
          latitude: latLong.latitude + 0.01,
          longitude: latLong.longitude,
        },
      ],
      fill: true,
      sortLat: [latLong.latitude, latLong.latitude + 0.01],
      sortLong: [latLong.longitude, latLong.longitude + 0.01],
    });
  });
  return tiles;
};

export default createGrid;
