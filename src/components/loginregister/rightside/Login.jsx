import React, { useRef, useState } from "react";

// Libraries
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

// Componenets
import Input from "components/inputs/Input";
import Button from "components/buttons/Button";

const Login = () => {
  const { register, handleSubmit, errors } = useForm();
  const username = useSelector(state => state.LRModal.username);
  const LoginRippleRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [notMember, setNotMember] = useState(false);
  const dispatch = useDispatch();

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
        />
        <Button
          className="submit-button"
          ref={LoginRippleRef}
          title="ادامه"
          loading={loading}
        />
      </form>
      {notMember && <div>عضو نیستی. میخوای ثبت نام کنی؟</div>}
      {!!errMsg.length && <div className="login-error-message">{errMsg}</div>}
    </>
  );
};

export default Login;
