import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/api/v1", // Replace with your backend base URL
  withCredentials: true, // Include credentials (cookies)
});

export default axiosInstance;
