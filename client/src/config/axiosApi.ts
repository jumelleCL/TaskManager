import axios from "axios"
import 'dotenv/config';

const axiosApi = axios.create({
  baseURL: process.env.URL_SERVER,
  timeout: 5000,
  headers: {
    "Content-Type": 'application/json'
    // Authorization: localStorage.getItem('token') ? ('Bearer '+ localStorage.getItem('token') ): null
  },
  withCredentials: true
});


export default axiosApi;