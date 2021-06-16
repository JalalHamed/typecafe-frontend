import React, { useRef, useState } from "react";

// Libraries
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

// Componenets
import Input from "components/inputs/Input";
import Button from "components/buttons/Button";
import Previous from "components/buttons/Previous";

// Actions
import { LR } from "redux/actions";

// Requests
import { handleErrors, UserLogin } from "requests";

const Login = () => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const email = useSelector(state => state.LR.email);
  const loginRef = useRef();
  const backRef = useRef();
  const [loading, setLoading] = useState(false);

  const onSubmit = data => {
    setLoading(true);

    UserLogin({ email, ...data })
      .then(res => {
        sessionStorage.setItem("_at", res.access);
        sessionStorage.setItem("_rt", res.refresh);
        window.location.reload();
      })
      .catch(err => {
        setLoading(false);
        handleErrors(err);
      });
  };

  return (
    <>
      <p className="lr-title no-select">ورود</p>
      <div className="lr-email">
        <div className="inner">{email}</div>
      </div>
      <p className="lr-sub-title">رمز عبور خود را وارد کنید.</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="رمز عبور"
          type="password"
          id="password"
          name="password"
          ref={register({ required: true })}
          error={errors.password}
          autoFocus
          noBreak
          disabled={loading}
        />
        <p
          className="login-forgot-password"
          onClick={() => dispatch(LR({ page: "ForgotPassword" }))}
        >
          فراموشی رمز عبور
        </p>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            className="w-68"
            ref={loginRef}
            title="ورود"
            loading={loading}
            type="submit"
          />
          <Previous
            ref={backRef}
            className="w-30"
            onClick={() => dispatch(LR({ page: "Email" }))}
          />
        </div>
      </form>
    </>
  );
};

export default Login;
