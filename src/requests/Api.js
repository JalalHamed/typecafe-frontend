import axios from "axios";
import { baseURL } from "components/xhr";

const AxiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
  origin: baseURL,
});

AxiosInstance.interceptors.request.use(
  config => {
    // Do something before request is sent
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

AxiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest.url === baseURL + "token/refresh/"
    ) {
      window.location.href = "/login/";
      return Promise.reject(error);
    }

    if (
      error.response?.data.code === "token_not_valid" &&
      error.response?.status === 401 &&
      error.response?.statusText === "Unauthorized"
    ) {
      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));

        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);
        console.log(tokenParts.exp);

        if (tokenParts.exp > now) {
          return AxiosInstance.post("/token/refresh/", {
            refresh: refreshToken,
          })
            .then(response => {
              localStorage.setItem("access_token", response?.data.access);
              localStorage.setItem("refresh_token", response?.data.refresh);

              AxiosInstance.defaults.headers["Authorization"] =
                "JWT " + response?.data.access;
              originalRequest.headers["Authorization"] =
                "JWT " + response?.data.access;

              return AxiosInstance(originalRequest);
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("Refresh token is expired", tokenParts.exp, now);
          window.location.href = "/login/";
        }
      } else {
        console.log("Refresh token not available.");
        window.location.href = "/login/";
      }
    }

    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);

export default AxiosInstance;
