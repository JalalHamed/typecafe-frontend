import React from "react";

// Libraries
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

// Components
import NormalInput from "components/inputs/NormalInput";

// Request
import { UserRegister } from "requests";

// Actions
import { userSignIn, closeLoginRegisterModal } from "redux/actions";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onSubmit = data => {
    const body = {
      ...data,
    };

    UserRegister(body)
      .then(res => {
        dispatch(userSignIn());
        dispatch(closeLoginRegisterModal());
      })
      .catch(err => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="lr-title no-select">ثبت نام کنید</p>
      <NormalInput
        label="نام کاربری"
        type="text"
        id="username"
        name="username"
        ref={register({ required: true })}
      />
      <NormalInput
        label="ایمیل"
        type="email"
        id="email"
        name="email"
        ref={register({ required: true })}
      />
      <NormalInput
        label="کلمه عبور"
        type="password"
        id="password"
        name="password"
        ref={register({ required: true })}
      />
      <button className="login-submit-button">ثبت نام</button>
    </form>
  );
};

export default Register;
