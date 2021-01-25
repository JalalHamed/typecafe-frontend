import React, { useRef, useState } from "react";

// Libraries
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

// Componenets
import Input from "components/inputs/Input";
import Button from "components/buttons/Button";
import BackButton from "components/buttons/BackButton";

// Actions
import { LRModal } from "redux/actions";

const Login = () => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const LoginRippleRef = useRef();
  const BackRippleRef = useRef();
  const username = useSelector(state => state.LRModal.username);
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = data => {
    console.log("data", data);
  };

  return (
    <>
      <p className="lr-title no-select">ورود</p>
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
        />
        <p
          className="login-forgot-password"
          onClick={() => dispatch(LRModal({ page: "ForgotPassword" }))}
        >
          فراموشی رمز عبور
        </p>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            className="w-68"
            ref={LoginRippleRef}
            title="ورود"
            loading={loading}
          />
          <BackButton
            ref={BackRippleRef}
            className="w-30"
            onClick={() => dispatch(LRModal({ page: "Email" }))}
          />
        </div>
      </form>
      {!!errMsg.length && <div className="error-message">{errMsg}</div>}
    </>
  );
};

export default Login;
