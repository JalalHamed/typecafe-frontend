import React, { useState, useRef } from "react";

// Libraries
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

// Components
import Input from "components/inputs/Input";
import Button from "components/buttons/Button";

// Request
import { UserRegister, handleErrors } from "requests";

// Actions
import { userLogIn, closelRModal } from "redux/actions";

const Register = () => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const RegisterRippleRef = useRef();
  const [errMsg, setErrMsg] = useState("");

  const onSubmit = data => {
    setLoading(true);
    UserRegister(data)
      .then(res => {
        setLoading(false);
        dispatch(userLogIn());
        dispatch(closelRModal());
      })
      .catch(err => {
        handleErrors(err, setErrMsg);
        setLoading(false);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="lr-title no-select">ثبت‌نام کنید</p>
        <Input
          label="نام کاربری"
          type="text"
          id="username"
          name="username"
          ref={register({ required: true })}
          error={errors.username}
        />
        <Input
          label="ایمیل"
          type="email"
          id="email"
          name="email"
          ref={register({ required: true })}
          error={errors.email}
        />
        <Input
          label="کلمه عبور"
          type="password"
          id="password"
          name="password"
          ref={register({ required: true })}
          error={errors.password}
        />
        <Button
          className="submit-button"
          ref={RegisterRippleRef}
          title="ثبت‌نام"
          loading={loading}
        />
      </form>
      {!!errMsg.length && (
        <div className="register-error-message">{errMsg}</div>
      )}
    </>
  );
};

export default Register;
