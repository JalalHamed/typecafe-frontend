import axios from "./Api";

export const UserRegister = body => {
  return axios.post("user/register/", body).then(res => res);
};

export const UserLogin = body => {
  return axios.post("account/login/", body).then(res => res);
};

export const GetProjects = () => {
  return axios.get("projects/").then(res => res.data);
};
