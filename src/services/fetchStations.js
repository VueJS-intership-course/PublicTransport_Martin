import instance from './fetch';

export async function fetchDataStations(id) {
  try {
    const response = await instance.get(`/public-transport/journey/${id}`);
    const stations = response.data;
    return stations;
  } catch (error) {
    throw error;
  }
}
// //TODO: USe axios.create