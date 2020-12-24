import React from "react";

// Libraries
import { useForm } from "react-hook-form";

// Components
import NormalInput from "components/inputs/NormalInput";

// Request
import { UserRegister } from "requests/Register";

const Register = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
    const body = {
      ...data,
    };

    UserRegister(body)
      .then(res => res)
      .catch(err => console.log(err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ paddingLeft: "1.3rem" }}>
          <NormalInput
            label="نام کاربری"
            type="text"
            id="username"
            name="username"
            ref={register({ required: true })}
            style={{
              direction: "rtl",
              fontFamily: "typecafe",
              fontSize: "12px",
            }}
          />
          <NormalInput
            label="ایمیل"
            type="email"
            id="email"
            name="email"
            ref={register({ required: true })}
          />
          <NormalInput
            label="کلمه عبور"
            type="password"
            id="password"
            name="password"
            ref={register({ required: true })}
          />
        </div>
        <button className="login-submit-button">ثبت نام</button>
      </form>
    </div>
  );
};

export default Register;
