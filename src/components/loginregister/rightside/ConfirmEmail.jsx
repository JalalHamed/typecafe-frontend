import React, { useState, useRef, useEffect } from "react";

// Libraries
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

// Components
import Input from "components/inputs/Input";
import Button from "components/buttons/Button";
import BackButton from "components/buttons/BackButton";

// Actions
import { LRModal } from "redux/actions";

const ConfirmEmail = () => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const email = useSelector(state => state.LRModal.email);
  const ConfirmEmailRippleRef = useRef();
  const BackRippleRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <>
      <p className="lr-title no-select">تایید آدرس ایمیل</p>
      <p className="lr-sub-title">
        حساب کاربری با ایمیل {email} وجود ندارد.
        <br />
        برای ساخت حساب جدید،‌ کد تایید به این آدرس ایمیل شد.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="کد تایید"
          type="number"
          id="confirm_email"
          name="confirm_email"
          ref={register({ required: true })}
          error={errors.confirm_email}
          autoFocus
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            className="w-68"
            ref={ConfirmEmailRippleRef}
            title="تایید ایمیل"
            loading={loading}
          />
          <BackButton
            ref={BackRippleRef}
            className="w-30"
            onClick={() => dispatch(LRModal({ page: "Email" }))}
          />
        </div>
      </form>
      {!!errMsg.length && <div className="login-error-message">{errMsg}</div>}
    </>
  );
};

export default ConfirmEmail;
