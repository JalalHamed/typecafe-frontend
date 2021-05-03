// Libraries
import axios from "axios";

// Requests
import { NewAccToken } from "./index";

// XHR
import { baseURL } from "components/xhr";

const AxiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
  origin: baseURL,
});

AxiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem("ac_t");
    if (token) config.headers["Authorization"] = "Bearer " + token;
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

AxiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const originalRequest = error.config;
    console.log("error", error.response.data);
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return NewAccToken({
        refresh: localStorage.getItem("re_t"),
      })
        .then(res => {
          localStorage.setItem("ac_t", res.access);
          AxiosInstance.defaults.headers["Authorization"] =
            "Bearer " + res.access;
          return AxiosInstance(originalRequest);
        })
        .catch(err => console.log(err));
    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;
