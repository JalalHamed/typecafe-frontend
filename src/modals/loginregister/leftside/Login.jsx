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
  const loginRippleRef = useRef();
  const backRippleRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = data => {
    setLoading(true);

    UserLogin({ email, ...data })
      .then(res => {
        localStorage.setItem("ac_t", res.access);
        localStorage.setItem("re_t", res.refresh);
        window.location.reload();
      })
      .catch(err => {
        setLoading(false);
        handleErrors(err, setErrMsg);
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
            ref={loginRippleRef}
            title="ورود"
            loading={loading}
            type="submit"
          />
          <Previous
            ref={backRippleRef}
            className="w-30"
            onClick={() => dispatch(LR({ page: "Email" }))}
          />
        </div>
      </form>
      {!!errMsg.length && <div className="error-message">{errMsg}</div>}
    </>
  );
};

export default Login;
