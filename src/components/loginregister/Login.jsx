import React, { useRef } from "react";

// Libraries
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

// Componenets
import NormalInput from "components/inputs/NormalInput";
import SubmitButton from "components/buttons/SubmitButton";

// Request
import { UserLogin } from "requests";

// Actions
import { userSignIn, closeLoginRegisterModal } from "redux/actions";

// Designs
import "./loginregister.scss";
import { HiOutlineMailOpen } from "react-icons/hi";

const Login = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const LoginRippleRef = useRef();

  const onSubmit = data => {
    let body = {
      username: data.email,
      password: data.password,
    };
    UserLogin(body).then(res => {
      dispatch(userSignIn());
      dispatch(closeLoginRegisterModal());
      toast.success("شما با موفقیت به حساب خود وارد شدید");
    });
  };

  return (
    <>
      <p className="lr-title no-select">وارد شوید</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <NormalInput
          label="ایمیل"
          type="email"
          id="email"
          name="email"
          ref={register({ required: true })}
        />
        <NormalInput
          label="رمز عبور"
          type="password"
          id="password"
          name="password"
          ref={register({ required: true })}
          style={{ margin: 0 }}
          icon={HiOutlineMailOpen}
        />
        <p className="login-forgot-password no-select">فراموشی رمز عبور</p>
        <SubmitButton
          className="login-submit-button"
          ref={LoginRippleRef}
          title="ورود"
        />
      </form>
    </>
  );
};

export default Login;
