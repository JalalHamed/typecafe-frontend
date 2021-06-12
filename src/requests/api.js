// Libraries
import axios from "axios";

// Requests
import { NewAccToken } from "./index";

// XHR
import { baseURL } from "components/xhr";

let ac_t = null;
let re_t = null;

export function setToken(access, refresh) {
  ac_t = access;
  re_t = refresh;
}

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
    if (ac_t) config.headers["Authorization"] = "Bearer " + ac_t;
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

AxiosInstance.interceptors.response.use(
  response => response,
  error => {
    const originalRequest = error.config;
    if (error?.response?.status === 401 && !originalRequest._retry && re_t) {
      originalRequest._retry = true;
      return NewAccToken({
        refresh: re_t,
      })
        .then(res => {
          sessionStorage.setItem("_at", res.access);
          sessionStorage.setItem("_rt", res.refresh);
          sessionStorage.setItem("dont't replace", 1);
          window.location.reload();
        })
        .catch(err => {
          // if (err.response?.data?.detail === "Token is blacklisted") {
          // }
          console.log("err", err.response?.data?.detail);
        });
    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;
