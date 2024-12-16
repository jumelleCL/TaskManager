import axios from "axios"
import 'dotenv/config';

const axiosApi = axios.create({
  baseURL: 'https://taskmanager-t1ak.onrender.com',
  timeout: 5000,
  headers: {
    "Content-Type": 'application/json'
    // Authorization: localStorage.getItem('token') ? ('Bearer '+ localStorage.getItem('token') ): null
  },
  withCredentials: true
});

export default axiosApi;