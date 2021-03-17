import React, { useRef, useState } from "react";

// Libraries
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

// Components
import Input from "components/inputs/Input";
import Button from "components/buttons/Button";
import Previous from "components/buttons/Previous";

// Actions
import { LR } from "redux/actions";

const ForgotPassword = () => {
  const { register, errors, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const forgotPasswordRippleRef = useRef();
  const backRippleRef = useRef();
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
          disabled={loading}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            className="submit-button w-68"
            ref={forgotPasswordRippleRef}
            title="ارسال"
            loading={loading}
            type="submit"
          />
          <Previous
            className="w-30"
            ref={backRippleRef}
            onClick={() => dispatch(LR({ page: "Login" }))}
          />
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
