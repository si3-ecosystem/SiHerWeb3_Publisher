import axios from "axios";

const data = JSON.parse(localStorage.getItem("SI_HER"));
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Authorization: `Bearer ${data?.token}`,
  },
});

export default axiosInstance;
