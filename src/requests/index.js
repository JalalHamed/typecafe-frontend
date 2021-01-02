import axios from "./Api";

export const UserRegister = body => {
  return axios.post("account/register/", body).then(res => res);
};

export const UserLogin = body => {
  return axios.post("account/login/", body).then(res => res);
};
