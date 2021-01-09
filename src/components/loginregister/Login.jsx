import React, { useRef, useState } from "react";

// Libraries
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

// Componenets
import Input from "components/inputs/Input";
import Button from "components/buttons/Button";

// Request
import { UserLogin } from "requests";

// Actions
import { userSignIn, closeLoginRegisterModal } from "redux/actions";

// Designs
import "./loginregister.scss";
import { HiOutlineMailOpen } from "react-icons/hi";

const Login = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();
  const LoginRippleRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = data => {
    setLoading(true);
    let body = {
      username: data.email,
      password: data.password,
    };
    UserLogin(body)
      .then(res => {
        setLoading(false);
        dispatch(userSignIn());
        dispatch(closeLoginRegisterModal());
        toast.success("شما با موفقیت به حساب خود وارد شدید");
      })
      .catch(err => {
        console.log("err", err.message);
        setLoading(false);
        setErrMsg(err.message);
      });
  };

  return (
    <>
      <p className="lr-title no-select">وارد شوید</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="ایمیل"
          type="email"
          id="email"
          name="email"
          ref={register({ required: true })}
          error={errors.email}
        />
        <Input
          label="رمز عبور"
          type="password"
          id="password"
          name="password"
          ref={register({ required: true })}
          icon={HiOutlineMailOpen}
          error={errors.password}
          noBreak
        />
        <p className="login-forgot-password no-select">فراموشی رمز عبور</p>
        <Button
          className="submit-button"
          ref={LoginRippleRef}
          title="ورود"
          loading={loading}
        />
      </form>
      {!!errMsg.length && <div className="login-error-message">{errMsg}</div>}
    </>
  );
};

export default Login;
