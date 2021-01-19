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

const ForgotPassword = () => {
  const { register, errors, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const ForgotPasswordRippleRef = useRef();
  const BackRippleRef = useRef();
  const [loading, setLoading] = useState(false);

  const onSubmit = data => {
    console.log(data);
    setLoading(false);
  };

  return (
    <div>
      <p className="lr-title no-select">درخواست بازیابی رمز عبور</p>
      <p className="lr-sub-title">آدرس ایمیل خود را وارد کنید.</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="ایمیل"
          type="email"
          id="email"
          name="email"
          ref={register({ required: true })}
          error={errors.email}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            className="submit-button w-68"
            ref={ForgotPasswordRippleRef}
            title="ارسال"
            loading={loading}
          />
          <BackButton
            className="w-30"
            ref={BackRippleRef}
            onClick={() => dispatch(LRModal({ page: "Login" }))}
          />
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
