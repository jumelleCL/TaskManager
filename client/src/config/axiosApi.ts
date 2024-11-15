import axios from "axios"


const axiosApi = axios.create({
  // baseURL: '../src/data',
  baseURL: 'http://localhost:5000'
});


export default axiosApi;