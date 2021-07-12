import axios from "./api";
import { toast } from "react-toastify";

// Token
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

// Profile
export const UserProfile = body => {
  return axios.post("account/user-profile/", body).then(res => res.data);
};

export const UserData = () => {
  return axios.get("account/user-data/").then(res => res.data);
};

export const ChangeProfileImage = body => {
  return axios.post("account/update-image/", body).then(res => res.data);
};

export const ChangeDisplayName = body => {
  return axios.post("account/update-displayname/", body).then(res => res.data);
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
    .post("create-project/", body, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then(res => res.data);
};

export const GetMyProjects = () => {
  return axios.get("my-projects/").then(res => res.data);
};

export const DeleteProjectReq = id => {
  return axios.post("delete-project/", id).then(res => res.data);
};

export const ClientAcceptReq = id => {
  return axios.post("client-accept/", id).then(res => res.data);
};

export const TypistDeclareReady = id => {
  return axios.post("typist-declare-ready/", id).then(res => res.data);
};

export const CreateOfferReq = body => {
  return axios.post("create-offer/", body).then(res => res.data);
};

export const DeleteOffer = id => {
  return axios.post("delete-offer/", id).then(res => res.data);
};

export const RejectOffer = id => {
  return axios.post("reject-offer/", id).then(res => res.data);
};

export const GetOffers = () => {
  return axios.get("offers/").then(res => res.data);
};

export const GetOffereds = () => {
  return axios.get("myoffers/").then(res => res.data);
};

export const GetDownloads = () => {
  return axios.get("downloaded/").then(res => res.data);
};

export const Downloaded = body => {
  return axios.post("downloaded/", body).then(res => res.data);
};

export const Deliver = body => {
  return axios
    .post("deliver/", body, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then(res => res.data);
};

// Messages
export const GetMessages = () => {
  return axios.get("messages/").then(res => res.data);
};

export const SendMessage = body => {
  return axios.post("messages/", body).then(res => res.data);
};

export const SearchDisplayname = body => {
  return axios.post("account/search-displayname/", body).then(res => res.data);
};

export const ReadMessages = body => {
  return axios.post("messages/read-messages/", body).then(res => res.data);
};

// Support
export const CreateSupportTicket = body => {
  return axios.post("account/support-ticket/", body).then(res => res.data);
};

export const CreateSupportMessage = body => {
  return axios.post("account/support-message/", body).then(res => res.data);
};

// Handle Errors
export const handleErrors = error => {
  if (error.response) {
    // Request made and server responded
    const err = error.response.data;
    console.log(err);
    if (err?.detail === "Password is not correct.") {
      toast.error("رمز عبور صحیح نمی‌باشد.");
    } else if (
      err?.email &&
      err?.email?.length &&
      err?.email[0] === "Enter a valid email address."
    ) {
      toast.error("آدرس ایمیل معتبر وارد کنید.");
    } else if (
      err?.email &&
      err?.email?.length &&
      err?.email[0] === "account with this email already exists."
    ) {
      toast.error("حسابی با این ایمیل قبلا ایجاد شده است.");
    } else if (
      err?.displayname &&
      err?.displayname?.length &&
      err?.displayname[0] === "invalid format."
    ) {
      toast.error(
        "نام نمایشی فقط می‌تواند شامل حروف، کارکترهای عددی و فاصله (space) باشد."
      );
    } else if (
      err?.displayname &&
      err?.displayname?.length &&
      err?.displayname[0] ===
        "Ensure this field has no more than 14 characters."
    ) {
      toast.error("نام نمایشی نمی‌تواند بیشتر از ۱۴ کاراکتر داشته باشد.");
    } else if (
      err?.password &&
      err?.password?.length &&
      err?.password[0] === "passwords don't match."
    ) {
      toast.error("رمز های عبور با هم مطابقت ندارند.");
    } else if (
      err?.password &&
      err?.password?.length &&
      err?.password[0] === "Ensure this field has at least 8 characters."
    ) {
      toast.error("رمز عبور باید حداقل ۸ کاراکتر داشته باشد.");
    } else if (
      err?.image &&
      err?.image?.length &&
      err?.image[0] ===
        "File extension “svg” is not allowed. Allowed extensions are: bmp, dib, gif, tif, tiff, jfif, jpe, jpg, jpeg, pbm, pgm, ppm, pnm, png, apng, blp, bufr, cur, pcx, dcx, dds, ps, eps, fit, fits, fli, flc, ftc, ftu, gbr, grib, h5, hdf, jp2, j2k, jpc, jpf, jpx, j2c, icns, ico, im, iim, mpg, mpeg, mpo, msp, palm, pcd, pdf, pxr, psd, bw, rgb, rgba, sgi, ras, tga, icb, vda, vst, webp, wmf, emf, xbm, xpm."
    ) {
      toast.error("فرمت فایل انتخاب شده صحیح نمی‌باشد.");
    } else if (
      err?.response &&
      err?.response?.data &&
      err?.response?.data?.error ===
        "You have already made a request for this project."
    ) {
      toast.error("شما قبلا برای این پروژه پیشنهاد ثبت کرده‌اید.");
    } else if (err === "Not enough credits.") {
      toast.error("اعتبار کافی نیست.");
    } else if (
      err === "Typist already has another project to declare ready for."
    ) {
      toast.error(
        "پیشنهاد دیگری از تایپیست تایید شده و در انتظار اعلام آمادگی برای شروع کار می‌باشد."
      );
    } else if (err.response?.data?.detail === "User not found") {
      sessionStorage.removeItem("_at");
      toast.error("کاربر یافت نشد.");
    } else if (
      err.response?.data?.detail === "Token is blacklisted" ||
      err.response?.data?.detail === "Token is invalid or expired"
    ) {
      sessionStorage.setItem("dont't set", 1);
      sessionStorage.setItem("long inactivity", 1);
      window.location.reload();
    } else if (error.response.status === 500) {
      toast.error("خطای سرور");
    } else {
      toast.error(err);
    }
  } else if (error.request) {
    // The request was made but no response was received
    toast.error("خطا در برقراری ارتباط با سرور");
  } else {
    // Something happened in setting up the request that triggered an Error
    toast.error(error.message);
  }
};
