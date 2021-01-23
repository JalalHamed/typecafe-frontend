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

// Requests
import { handleErrors, ConfirmEmailReq, CheckEmail } from "requests";

const ConfirmEmail = () => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const email = useSelector(state => state.LRModal.email);
  const ConfirmEmailRippleRef = useRef();
  const BackRippleRef = useRef();
  const SendCodeAgainRippleRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [sendCodeLoading, setSendCodeLoading] = useState(false);
  const [timeleft, setTimeleft] = useState(
    parseInt(useSelector(state => state.LRModal.timeleft))
  );

  const onSubmit = data => {
    setLoading(true);

    ConfirmEmailReq({ code: data.confirm_email_code, email })
      .then(res => {
        setLoading(false);
        if (res.codes_match) {
          setErrMsg("codes match");
        } else {
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

    CheckEmail({ email: email })
      .then(res => {
        setSendCodeLoading(false);
        setTimeleft(parseInt(res.timeleft));
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
          id="confirm_email_code"
          name="confirm_email_code"
          ref={register({ required: true })}
          error={errors.confirm_email_code}
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
      {timeleft ? (
        <div className="login-send-confirm-code-again">
          ارسال مجدد تا {timeleft} ثانیه دیگر
        </div>
      ) : (
        <Button
          ref={SendCodeAgainRippleRef}
          title="ارسال مجدد"
          className="send-again"
          onClick={sendCodeAgain}
          loading={sendCodeLoading}
        />
      )}
      {!!errMsg.length && <div className="error-message confirm">{errMsg}</div>}
    </>
  );
};

export default ConfirmEmail;
