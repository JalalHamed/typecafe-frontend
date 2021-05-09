import axios from "./Api";

// New Acc Token
export const NewAccToken = body => {
  return axios.post("account/token/refresh/", body).then(res => res.data);
};

// Register and Login
export const UserRegister = body => {
  return axios.post("account/register/", body).then(res => res.data);
};

export const UserLogin = body => {
  return axios.post("account/login/", body).then(res => res.data);
};

export const CheckEmail = body => {
  return axios.post("account/check-email/", body).then(res => res.data);
};

export const ConfirmEmailReq = body => {
  return axios.post("account/confirm-email/", body).then(res => res.data);
};

export const UserDisconnect = () => {
  return axios.get("account/user-disconnect/").then(res => res.data);
};

// Profile
export const UserProfile = body => {
  return axios.post("account/user-profile/", body).then(res => res.data);
};

export const UserData = () => {
  return axios.get("account/user-data/").then(res => res.data);
};

export const ChangeProfileImage = body => {
  return axios.patch("account/update-image/", body).then(res => res.data);
};

export const ChangeDisplayName = body => {
  return axios.patch("account/update-displayname/", body).then(res => res.data);
};

export const DeleteProfileImage = () => {
  return axios.get("account/delete-image/").then(res => res.data);
};

// Projects
export const GetProjects = () => {
  return axios.get("projects/").then(res => res.data);
};

export const GetMoreProjects = url => {
  return axios.get(url).then(res => res.data);
};

export const CreateProjectReq = body => {
  return axios
    .post("createproject/", body, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then(res => res.data);
};

export const GetMyProjects = () => {
  return axios.get("myprojects/").then(res => res.data);
};

export const DeleteProjectReq = id => {
  return axios.post("deleteproject/", id).then(res => res.data);
};

export const CreateOfferReq = body => {
  return axios.post("createoffer/", body).then(res => res.data);
};

export const GetOffers = () => {
  return axios.get("offers/").then(res => res.data);
};

export const GetDownloads = () => {
  return axios.get("downloaded/").then(res => res.data);
};

export const Downloaded = body => {
  return axios.post("downloaded/", body).then(res => res.data);
};

// Messages
export const GetMessages = () => {
  return axios.get("messages/").then(res => res.data);
};

// Support
export const CreateSupportTicket = body => {
  return axios.post("account/support-ticket/", body).then(res => res.data);
};

export const CreateSupportMessage = body => {
  return axios.post("account/support-message/", body).then(res => res.data);
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
      err?.displayname &&
      err?.displayname.length &&
      err?.displayname[0] ===
        "Ensure this field has no more than 14 characters."
    ) {
      setMessage("نام نمایشی نمی‌تواند بیشتر از ۱۴ کاراکتر داشته باشد.");
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
    } else if (
      err?.image &&
      err?.image.length &&
      err?.image[0] ===
        "File extension “svg” is not allowed. Allowed extensions are: bmp, dib, gif, tif, tiff, jfif, jpe, jpg, jpeg, pbm, pgm, ppm, pnm, png, apng, blp, bufr, cur, pcx, dcx, dds, ps, eps, fit, fits, fli, flc, ftc, ftu, gbr, grib, h5, hdf, jp2, j2k, jpc, jpf, jpx, j2c, icns, ico, im, iim, mpg, mpeg, mpo, msp, palm, pcd, pdf, pxr, psd, bw, rgb, rgba, sgi, ras, tga, icb, vda, vst, webp, wmf, emf, xbm, xpm."
    ) {
      setMessage("فرمت فایل انتخاب شده صحیح نمی‌باشد.");
    } else if (
      err?.error &&
      err?.error === "You have already made a request for this project."
    ) {
      setMessage("شما قبلا برای این پروژه پیشنهاد ثبت کرده‌اید.");
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
