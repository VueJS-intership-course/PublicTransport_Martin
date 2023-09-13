import axios from 'axios';

export async function fetchDataStations(id) {
  return axios
    .get(
      // 'http://localhost:8080/public-transport/journey/HTM_20230912_3_30088_0'
      `http://localhost:8080/public-transport/journey/${id}`
    )
    .then((response) => {
      const stations = response.data;
      // console.log(stations);
      return stations;
    })
    .catch((err) => {
      throw err;
    });
}
