import axios from "axios";

import { baseURL } from "components/xhr";

const AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    Authorization: null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
  origin: baseURL,
});

// AxiosInstance.interceptors.response.use(
//   response => {
//     return response;
//   },

//   async function (error) {
//     const originalRequest = error.config;

//     if (
//       error.response.data.code === "token_not_valid" &&
//       error.response.status === 401 &&
//       error.response.statusText === "Unauthorized"
//     ) {
//       const refreshToken = localStorage.getItem("refresh_token");

//       if (refreshToken) {
//         const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));

//         // exp date in token is expressed in seconds, while now() returns milliseconds:
//         const now = Math.ceil(Date.now() / 1000);
//         console.log(tokenParts.exp);

//         if (tokenParts.exp > now) {
//           return AxiosInstance.post("/token/refresh/", {
//             refresh: refreshToken,
//           })
//             .then(response => {
//               AxiosInstance.defaults.headers["Authorization"] =
//                 "JWT " + response.data.access;
//               originalRequest.headers["Authorization"] =
//                 "JWT " + response.data.access;

//               return AxiosInstance(originalRequest);
//             })
//             .catch(err => {
//               console.log(err);
//             });
//         } else {
//           console.log("Refresh token is expired", tokenParts.exp, now);
//         }
//       } else {
//         console.log("Refresh token not available.");
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default AxiosInstance;
