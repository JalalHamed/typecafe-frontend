import { useRef, useState } from "react";

// Libraries
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

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
  const registerRef = useRef();
  const backRef = useRef();
  const email = useSelector(state => state.LR.email);
  const [loading, setLoading] = useState(false);

  const onSubmit = data => {
    setLoading(true);

    if (data.password.length < 8) {
      toast.error("رمز عبور باید حداقل ۸ کاراکتر داشته باشد.");
      setLoading(false);
    } else {
      UserRegister({ email, ...data })
        .then(res => {
          sessionStorage.setItem("_at", res.access);
          sessionStorage.setItem("_rt", res.refresh);
          window.location.reload();
        })
        .catch(err => {
          setLoading(false);
          handleErrors(err);
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
            ref={registerRef}
            title="ثبت‌نام"
            loading={loading}
            type="submit"
          />
          <Previous
            ref={backRef}
            className="w-30"
            onClick={() => dispatch(LR({ page: "Email" }))}
          />
        </div>
      </form>
    </>
  );
};

export default Register;
