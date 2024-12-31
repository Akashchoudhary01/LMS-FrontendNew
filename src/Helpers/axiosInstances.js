 import axios from 'axios';

const BASE_URL = "http://localhost:3300/api/v1";

const axiosInstances = axios.create();

axiosInstances.defaults.baseURL = BASE_URL;
axiosInstances.defaults.withCredentials = true;

export default axiosInstances;7