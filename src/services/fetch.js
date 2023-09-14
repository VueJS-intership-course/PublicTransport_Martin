import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/public-transport',
});

export default instance;