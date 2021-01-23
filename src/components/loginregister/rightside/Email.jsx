import React, { useRef, useState } from "react";

// Libraries
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

// Componenets
import Input from "components/inputs/Input";
import Button from "components/buttons/Button";

// Actions
import { LRModal } from "redux/actions";

// Request
import { CheckEmail, handleErrors } from "requests";

const Email = () => {
  const { register, handleSubmit, errors } = useForm();
  const LoginRippleRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMsgStyle, setErrMsgStyle] = useState(undefined);
  const dispatch = useDispatch();

  const onSubmit = data => {
    setLoading(true);
    setErrMsg("");

    setTimeout(() => {
      setErrMsg(
        "عملیات ارسال ایمیل بیش از حد معمول به طول انجامیده است. لطفا در صورت استفاده از سرویس های تغییر IP (فیلترشکن، VPN و ...)، این سرویس را غیرفعال کنید و سپس صفحه‌‌ را Refresh کنید و مجددا تلاش کنید."
      );
      setErrMsgStyle({ fontSize: "12px" });
    }, 10000);

    CheckEmail(data)
      .then(res => {
        setLoading(false);
        if (res.is_member) {
          dispatch(LRModal({ page: "Login" }));
        } else {
          dispatch(
            LRModal({
              page: "ConfirmEmail",
              email: data.email,
              timeleft: res.timeleft,
            })
          );
        }
      })
      .catch(err => {
        setLoading(false);
        handleErrors(err, setErrMsg);
      });
  };

  return (
    <>
      <p className="lr-title no-select">ورود&nbsp;&nbsp;/&nbsp;&nbsp;ثبت‌نام</p>
      <p className="lr-sub-title">
        جهت ورود به حساب کاربری خود و یا ثبت حساب کاربری جدید، آدرس ایمیل خود را
        وارد کنید.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="ایمیل"
          type="email"
          id="email"
          name="email"
          ref={register({ required: true })}
          error={errors.email}
          autoFocus
        />
        <Button
          className="submit-button"
          ref={LoginRippleRef}
          title="ادامه"
          loading={loading}
        />
      </form>
      {!!errMsg.length && (
        <div className="error-message" style={errMsgStyle && errMsgStyle}>
          {errMsg}
        </div>
      )}
    </>
  );
};

export default Email;
