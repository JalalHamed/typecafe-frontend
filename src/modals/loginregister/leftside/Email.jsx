import { useRef, useState, useEffect } from "react";

// Libraries
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

// Componenets
import Input from "components/inputs/Input";
import Button from "components/buttons/Button";

// Actions
import { LR } from "redux/actions";

// Request
import { CheckEmail, handleErrors } from "requests";

const Email = () => {
  const { register, handleSubmit, errors } = useForm();
  const loginRef = useRef();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = data => {
    setLoading(true);
    let lowerCaseEmail = data.email.toLowerCase();
    CheckEmail({ email: lowerCaseEmail })
      .then(res => {
        setLoading(false);
        if (res.is_member) {
          dispatch(LR({ page: "Login", email: lowerCaseEmail }));
        } else {
          dispatch(
            LR({
              page: "ConfirmEmail",
              email: lowerCaseEmail,
              timeleft: res.timeleft,
            })
          );
        }
      })
      .catch(err => {
        setLoading(false);
        handleErrors(err);
      });
  };

  useEffect(() => {
    if (loading) {
      let timeout = setTimeout(() => {
        if (loading) {
          toast.info(
            "عملیات ارسال ایمیل بیش از حد معمول به طول انجامیده است. لطفا در صورت استفاده از سرویس های تغییر IP مانند فیلترشکن (VPN)، این سرویس را غیرفعال کنید و مجددا تلاش کنید."
          );
        }
      }, 10000);

      return () => clearTimeout(timeout);
    }
  }, [loading]);

  return (
    <>
      <p className="lr-title no-select">ورود&nbsp;&nbsp;/&nbsp;&nbsp;ثبت‌نام</p>
      <p className="lr-sub-title">
        جهت ورود به حساب کاربری خود و یا ثبت حساب کاربری جدید، آدرس ایمیل خود را
        وارد کنید.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="ایمیل"
          type="email"
          id="email"
          name="email"
          ref={register({ required: true })}
          error={errors.email}
          autoFocus
          noBreak
          disabled={loading}
        />
        <Button
          className="submit-button"
          ref={loginRef}
          title="ادامه"
          loading={loading}
          type="submit"
        />
      </form>
    </>
  );
};

export default Email;
