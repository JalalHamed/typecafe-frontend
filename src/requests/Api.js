import axios from "axios";
import { baseURL } from "components/xhr";

const AxiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: sessionStorage.getItem("ac_t")
      ? "Bearer " + sessionStorage.getItem("ac_t")
      : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
  origin: baseURL,
});

export default AxiosInstance;
