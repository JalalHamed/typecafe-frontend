import React, { useRef, useState } from "react";

// Libraries
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

// Components
import Input from "components/inputs/Input";
import Button from "components/buttons/Button";
import Previous from "components/buttons/Previous";

// Actions
import { LR } from "redux/actions";

// Requests
import { handleErrors, UserRegister } from "requests";

const Register = () => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const registerRippleRef = useRef();
  const backRippleRef = useRef();
  const email = useSelector(state => state.LR.email);
  const [errMsg, setErrMsg] = useState();
  const [loading, setLoading] = useState(false);

  const onSubmit = data => {
    setLoading(true);
    setErrMsg("");

    if (data.password.length < 8) {
      setErrMsg("پسورد باید حداقل ۸ کاراکتر داشته باشد.");
      setLoading(false);
    } else {
      UserRegister({ email, ...data })
        .then(res => {
          sessionStorage.setItem("ac_t", res.access);
          window.location.reload();
        })
        .catch(err => {
          setLoading(false);
          handleErrors(err, setErrMsg);
        });
    }
  };

  return (
    <>
      <p className="lr-title no-select">ثبت‌نام</p>
      <div className="lr-email">
        <div className="inner">{email}</div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="نام نمایشی"
          type="text"
          id="displayname"
          name="displayname"
          ref={register({ required: true })}
          error={errors.displayname}
          autoFocus
          disabled={loading}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Input
            label="رمز عبور"
            type="password"
            id="password"
            name="password"
            ref={register({ required: true })}
            error={errors.password}
            wrapperStyle={{ width: "49%" }}
            disabled={loading}
          />
          <Input
            label="تایید رمز عبور"
            type="password"
            id="confirm_password"
            name="confirm_password"
            ref={register({ required: true })}
            error={errors.confirm_password}
            noBreak
            wrapperStyle={{ width: "49%" }}
            disabled={loading}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            className="w-68"
            ref={registerRippleRef}
            title="ثبت‌نام"
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
      {!!errMsg?.length && <div className="error-message">{errMsg}</div>}
    </>
  );
};

export default Register;
