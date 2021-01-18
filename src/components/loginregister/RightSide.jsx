import React, { useRef, useState } from "react";

// Libraries
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

// Componenets
import Input from "components/inputs/Input";
import Button from "components/buttons/Button";

// Request
import { UserLogin, handleErrors } from "requests";

// Actions
import { userLogIn, closeLrModal } from "redux/actions";

// Designs
import "./loginregister.scss";

const Login = ({ setStatus }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();
  const LoginRippleRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = data => {
    setLoading(true);
    setErrMsg("");

    UserLogin(data)
      .then(res => {
        setLoading(false);
        dispatch(userLogIn());
        dispatch(closeLrModal());
        toast.success("شما با موفقیت به حساب خود وارد شدید");
      })
      .catch(err => {
        handleErrors(err, setErrMsg);
        setLoading(false);
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
        />
        <Button
          className="submit-button"
          ref={LoginRippleRef}
          title="ادامه"
          loading={loading}
        />
      </form>
      {!!errMsg.length && <div className="login-error-message">{errMsg}</div>}
    </>
  );
};

export default Login;
