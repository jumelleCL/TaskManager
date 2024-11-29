import axios from "axios"




const axiosApi = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    Authorization: localStorage.getItem('token') ? ('Bearer '+ localStorage.getItem('token') ): null
  }
});


export default axiosApi;