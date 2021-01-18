import React, { useRef, useState } from "react";

// Libraries
import { useForm } from "react-hook-form";

// Components
import Input from "components/inputs/Input";
import Button from "components/buttons/Button";

const ForgotPassword = () => {
  const { register, errors, handleSubmit } = useForm();
  const ForgotPasswordRippleRef = useRef();
  const [loading, setLoading] = useState(false);

  const onSubmit = data => {
    console.log(data);
    setLoading(false);
  };

  return (
    <div>
      <p className="lr-title no-select">رمز خود را فراموش کرده‌اید؟</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="ایمیل"
          type="email"
          id="email"
          name="email"
          ref={register({ required: true })}
          error={errors.email}
        />
        <Button
          className="submit-button"
          ref={ForgotPasswordRippleRef}
          title="بازیابی رمز عبور"
          loading={loading}
        />
      </form>
    </div>
  );
};

export default ForgotPassword;
