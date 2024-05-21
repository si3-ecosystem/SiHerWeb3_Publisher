// import axios from "axios";

// const data = JSON.parse(localStorage.getItem("SI_HER"));
// console.log(data);
// const axiosInstance = axios.create({
//   baseURL: process.env.REACT_APP_BASE_URL,
//   headers: {
//     Authorization: `Bearer ${data?.token}`,
//   },
// });

// export default axiosInstance;
import axios from "axios";
const data = JSON.parse(localStorage.getItem("SI_HER"));
const token = data ? data.token : null;

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
  },
});
axiosInstance.interceptors.request.use(
  config => {
    const data = JSON.parse(localStorage.getItem("SI_HER"));
    const token = data ? data.token : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
