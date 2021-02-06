import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  timeout: 10000,
  headers: {
    Authorization: null,
    "Content-Type": "application/json",
  },
  origin: "http://127.0.0.1:8000/",
});

export default AxiosInstance;
