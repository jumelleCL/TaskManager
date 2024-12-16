import axios from "axios"

const axiosApi = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: 5000,
  headers: {
    "Content-Type": 'application/json'
    // Authorization: localStorage.getItem('token') ? ('Bearer '+ localStorage.getItem('token') ): null
  },
  withCredentials: true
});

export default axiosApi;