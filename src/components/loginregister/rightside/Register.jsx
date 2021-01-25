import React, { useRef, useState } from "react";

// Libraries
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

// Components
import Input from "components/inputs/Input";
import Button from "components/buttons/Button";
import BackButton from "components/buttons/BackButton";

// Actions
import { LRModal } from "redux/actions";

const Register = () => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const RegisterRippleRef = useRef();
  const BackRippleRef = useRef();
  const [errMsg, setErrMsg] = useState();
  const [loading, setLoading] = useState(false);

  const onSubmit = data => {
    console.log("data", data);
  };

  return (
    <>
      <p className="lr-title no-select">ثبت نام</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="نام کاربری"
          type="text"
          id="username"
          name="username"
          ref={register({ required: true })}
          error={errors.username}
          autoFocus
        />
        <Input
          label="رمز عبور"
          type="password"
          id="password"
          name="password"
          ref={register({ required: true })}
          error={errors.password}
        />
        <Input
          label="تایید رمز عبور"
          type="password"
          id="confirm_password"
          name="confirm_password"
          ref={register({ required: true })}
          error={errors.confirm_password}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            className="w-68"
            ref={RegisterRippleRef}
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

export default Register;
