import React, { useState, useRef } from "react";

// Libraries
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import PuffLoader from "react-spinners/PuffLoader";
import { css } from "@emotion/react";

// Components
import NormalInput from "components/inputs/NormalInput";
import SubmitButton from "components/buttons/SubmitButton";

// Request
import { UserRegister } from "requests";

// Actions
import { userSignIn, closeLoginRegisterModal } from "redux/actions";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #fff;
`;

const Register = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const RegisterRippleRef = useRef();

  const onSubmit = data => {
    setLoading(true);
    setTimeout(() => {
      UserRegister(data)
        .then(res => {
          setLoading(false);
          dispatch(userSignIn());
          dispatch(closeLoginRegisterModal());
        })
        .catch(err => console.log(err));
    }, 3000);
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
      <SubmitButton
        className="submit-button"
        ref={RegisterRippleRef}
        title="ثبت نام"
      />
    </form>
  );
};

export default Register;
