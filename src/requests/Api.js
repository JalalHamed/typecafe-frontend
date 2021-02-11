import axios from "axios";

import { baseURL } from "components/xhr";

const AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    Authorization: null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
  origin: baseURL,
});

export default AxiosInstance;
