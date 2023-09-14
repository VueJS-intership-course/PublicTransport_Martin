import instance from './fetch';

export async function fetchDataStations(id) {
  try {
    const response = await instance.get(`/journey/${id}`);
    const stations = response.data;
    return stations;
  } catch (error) {
    console.log(error);
  }
}
// //TODO: USe axios.create