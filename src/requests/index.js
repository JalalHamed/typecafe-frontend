import axios from "./Api";

// Register and Login
export const UserRegister = body => {
  return axios.post("auth/register/", body).then(res => res.data);
};

export const UserLogin = body => {
  return axios.post("auth/login/", body).then(res => {
    axios.defaults.headers["Authorization"] = "Bearer " + res.data.access;
    return res.data;
  });
};

export const CheckEmail = body => {
  return axios.post("auth/check-email/", body).then(res => res.data);
};

export const ConfirmEmailReq = body => {
  return axios.post("auth/confirm-email/", body).then(res => res.data);
};

// Projects
export const GetProjects = () => {
  return axios.get("projects/").then(res => res.data);
};

export const CreateProjectReq = body => {
  return axios
    .post("createproject/", body, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then(res => res.data);
};

// Handle Errors
export const handleErrors = (error, setMessage) => {
  if (error.response) {
    // Request made and server responded
    const err = error.response.data;
    if (err?.detail === "Password is not correct.") {
      setMessage("رمز عبور صحیح نمی‌باشد.");
    } else if (
      err?.email &&
      err?.email.length &&
      err?.email[0] === "Enter a valid email address."
    ) {
      setMessage("آدرس ایمیل معتبر وارد کنید.");
    } else if (
      err?.email &&
      err?.email.length &&
      err?.email[0] === "account with this email already exists."
    ) {
      setMessage("حسابی با این ایمیل قبلا ایجاد شده است.");
    } else if (
      err?.displayname &&
      err?.displayname.length &&
      err?.displayname[0] === "invalid format."
    ) {
      setMessage(
        "نام نمایشی فقط می‌تواند شامل حروف، کارکترهای عددی، فاصله (space) و خط ربط (hyphen) باشد."
      );
    } else if (
      err?.password &&
      err?.password.length &&
      err?.password[0] === "passwords don't match."
    ) {
      setMessage("رمز های عبور با هم مطابقت ندارند.");
    } else if (
      err?.password &&
      err?.password.length &&
      err?.password[0] === "Ensure this field has at least 8 characters."
    ) {
      setMessage("رمز عبور صحیح نمی‌باشد.");
    } else if (error.response.status === 500) {
      setMessage("خطای سرور");
    } else setMessage("");
  } else if (error.request) {
    // The request was made but no response was received
    setMessage("خطا در برقراری ارتباط با سرور");
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log(error.message);
  }
};
