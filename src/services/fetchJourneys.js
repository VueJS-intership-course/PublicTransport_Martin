import axios from 'axios';

export async function fetchDataJourneys() {
  return axios
    .get(
      'http://localhost:8080/public-transport/journey'
    )
    .then((response) => {
      const journeys = response.data;
      return journeys;
    })
    .catch((err) => {
      throw err;
    });
}
