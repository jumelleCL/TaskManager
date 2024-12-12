import axios from "axios"

const axiosApi = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 5000,
  headers: {
    "Content-Type": 'aplication/json'
    // Authorization: localStorage.getItem('token') ? ('Bearer '+ localStorage.getItem('token') ): null
  },
  withCredentials: true
});


export default axiosApi;