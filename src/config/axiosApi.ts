import axios from "axios"


const axiosApi = axios.create({
  baseURL: '../src/data'
});


export default axiosApi;