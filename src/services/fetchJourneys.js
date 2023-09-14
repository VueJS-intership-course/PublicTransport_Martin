import instance from "./fetch";

export async function fetchDataJourneys() {
  try {
    const response = await instance.get('/public-transport/journey');
    const journeys = response.data //(await response).data
    return journeys;
  } catch(error) {
    throw error;
  }
}