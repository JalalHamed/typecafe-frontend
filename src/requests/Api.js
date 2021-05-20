// Libraries
import axios from "axios";

// Requests
import { NewAccToken } from "./index";

// XHR
import { baseURL } from "components/xhr";

let token = null;

export function setToken(ac_t) {
  token = ac_t;
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
    if (
      error?.response?.status === 401 &&
      !originalRequest._retry &&
      sessionStorage.getItem("re_t")
    ) {
      originalRequest._retry = true;
      return NewAccToken({
        refresh: sessionStorage.getItem("re_t"),
      })
        .then(res => {
          sessionStorage.setItem("_at", res.access);
          sessionStorage.setItem("_rt", res.refresh);
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
