import React, { useState, useRef, useEffect } from "react";

// Libraries
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

// Components
import Input from "components/inputs/Input";
import Button from "components/buttons/Button";
import Previous from "components/buttons/Previous";
import { EmailOverFlow } from "components/helper";

// Actions
import { LR } from "redux/actions";

// Requests
import { handleErrors, ConfirmEmailReq, CheckEmail } from "requests";

const ConfirmEmail = () => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const email = useSelector(state => state.LR.email);
  const confirmEmailRippleRef = useRef();
  const backRippleRef = useRef();
  const sendCodeAgainRippleRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [sendCodeLoading, setSendCodeLoading] = useState(false);
  const [timeleft, setTimeleft] = useState(
    parseInt(
      useSelector(state => state.LR.timeleft),
      10
    )
  );

  const onSubmit = data => {
    setLoading(true);

    ConfirmEmailReq({ code: data.confirm_email_code, email })
      .then(res => {
        setLoading(false);
        if (res.potato === "potato") {
          dispatch(LR({ page: "Register" }));
        }
        if (res.potato === "potahto") {
          setErrMsg("کد تایید وارد شده صحیح نمی‌باشد.");
        }
      })
      .catch(err => {
        setLoading(false);
        handleErrors(err, setErrMsg);
      });
  };

  const sendCodeAgain = () => {
    setSendCodeLoading(true);

    CheckEmail({ email })
      .then(res => {
        setSendCodeLoading(false);
        setTimeleft(parseInt(res.timeleft, 10));
      })
      .catch(err => {
        setSendCodeLoading(false);
        handleErrors(err, setErrMsg);
      });
  };

  // Send code again count down
  useEffect(() => {
    if (timeleft !== 0) {
      let interval = setInterval(() => {
        setTimeleft(timeleft - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timeleft]);

  // Updates the timeleft value everytime the component mounts
  useEffect(() => {
    sendCodeAgain();

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <p className="lr-title no-select">تایید آدرس ایمیل</p>
      <div className="lr-email">
        <div className="inner">{EmailOverFlow({ email })}</div>
      </div>
      <p className="lr-sub-title confirm-email">
        حساب کاربری با این ایمیل وجود ندارد.
        <br />
        برای ساخت حساب جدید،‌ کد تایید به این آدرس ایمیل شد.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="کد تایید"
          type="number"
          id="confirm_email_code"
          name="confirm_email_code"
          ref={register({ required: true })}
          error={errors.confirm_email_code}
          autoFocus
          noBreak
          disabled={loading}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            className="w-68"
            ref={confirmEmailRippleRef}
            title="تایید ایمیل"
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
      {timeleft ? (
        <div className="login-send-confirm-code-again">
          ارسال مجدد تا {timeleft} ثانیه دیگر
        </div>
      ) : (
        <Button
          ref={sendCodeAgainRippleRef}
          title="ارسال مجدد"
          className="send-again"
          onClick={sendCodeAgain}
          loading={sendCodeLoading}
        />
      )}
      {!!errMsg?.length && (
        <div className="error-message confirm">
          <div className="close-error no-select" onClick={() => setErrMsg("")}>
            x
          </div>
          {errMsg}
        </div>
      )}
    </>
  );
};

export default ConfirmEmail;
