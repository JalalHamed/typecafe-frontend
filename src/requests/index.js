import axios from "./Api";

export const UserRegister = body => {
  return axios.post("user/register/", body).then(res => res);
};

export const UserLogin = body => {
  return axios.post("token/", body).then(res => res);
};

export const GetProjects = () => {
  return axios.get("projects/").then(res => res.data);
};

// Handle Errors

export const handleErrors = (error, setMessage) => {
  if (error.response) {
    // Request made and server responded
    const err = error.response.data;
    console.log(err);
    if (err?.detail === "No active account found with the given credentials") {
      setMessage("ایمیل یا رمز عبور خود را اشتباه وارد کرده اید.");
    }
  } else if (error.request) {
    // The request was made but no response was received
    console.log("yo", error.request);
    setMessage("خطا در برقرار ارتباط با سرور");
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Error", error.message);
  }
};
