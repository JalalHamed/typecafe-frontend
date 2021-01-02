import React from "react";

// Libraries
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

// Componenets
import NormalInput from "components/inputs/NormalInput";

// Request
import { UserLogin } from "requests";

// Actions
import { userSignIn, closeLoginRegisterModal } from "redux/actions";

// Designs
import "./loginregister.scss";

const Login = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
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
          />
        </div>
        <button className="login-submit-button">ورود</button>
      </form>
    </div>
  );
};

export default Login;
