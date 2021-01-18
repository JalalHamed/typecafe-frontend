import axios from "./Api";

export const UserRegister = body => {
  return axios.post("auth/register/", body).then(res => res);
};

export const UserLogin = body => {
  return axios.post("auth/token/", body).then(res => res);
};

export const GetProjects = () => {
  return axios.get("projects/").then(res => res.data);
};

// Handle Errors

export const handleErrors = (error, setMessage) => {
  if (error.response) {
    // Request made and server responded
    const err = error.response.data;
    console.log("1", err);
    console.log("status", error.response.status);
    if (err?.detail === "No active account found with the given credentials") {
      setMessage("ایمیل یا رمز عبور خود را اشتباه وارد کرده اید.");
    } else if (err?.email && err?.email[0] === "Enter a valid email address.") {
      setMessage("آدرس ایمیل معتبر وارد کنید.");
    } else if (
      err?.email &&
      err?.email[0] === "account with this email already exists."
    ) {
      setMessage("کاربری با این ایمیل قبلا ایجاد شده است.");
    } else if (
      err?.username &&
      err?.username[0] === "account with this username already exists."
    ) {
      setMessage("کابری با این نام کاربری قبلا ایجاد شده است.");
    } else if (
      err?.password &&
      err?.password[0] === "Ensure this field has at least 8 characters."
    ) {
      setMessage("رمز عبور باید حداقل ۸ کاراکتر داشته باشد.");
    } else if (
      err?.password &&
      err?.password.length &&
      err?.password[0] === "passwords don't match."
    ) {
      setMessage("رمز های عبور با هم مطابقت ندارند.");
    } else if (
      err?.error &&
      err?.error[0] ===
        "The username should only contain alphanumeric characters."
    ) {
      setMessage("نام کاربری فقط می‌تواند شامل حروف و اعداد باشد.");
    } else if (error.response.status === 500) {
      setMessage("خطای سرور");
    } else setMessage("");
  } else if (error.request) {
    // The request was made but no response was received
    console.log("2", error.request);
    setMessage("خطا در برقرار ارتباط با سرور");
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("3", error.message);
  }
};
