import axios from 'axios';

export async function fetchDataStations() {
  return axios
    .get(
      'http://localhost:8080/public-transport/journey/HTM_20230912_3_30088_0'
    )
    .then((response) => {
      const stations = response.data.HTM_20230912_3_30088_0.Stops;
      return stations;
    })
    .catch((err) => {
      throw err;
    });
}
