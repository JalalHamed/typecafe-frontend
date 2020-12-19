import React from "react";

// Libraries
import { useForm } from "react-hook-form";

// Componenets
import NormalInput from "components/inputs/NormalInput";

// Designs
import "./loginregister.scss";

const Login = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
    console.log("data", data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ paddingLeft: "1.3rem" }}>
          <NormalInput
            label="ایمیل"
            type="email"
            id="email"
            name="email"
            ref={register({ required: true })}
          />
          <NormalInput
            label="رمز عبور"
            type="password"
            id="password"
            name="password"
            ref={register({ required: true })}
          />
        </div>
        <button className="login-submit-button">ورود</button>
      </form>
    </div>
  );
};

export default Login;
