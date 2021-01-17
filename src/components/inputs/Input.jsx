import React, { forwardRef } from "react";

// Design
import "./inputs.scss";

const Input = forwardRef(
  ({ label, name, noBreak, type, id, style, wrapperStyle, error }, ref) => {
    const errorMessageProducer = () => {
      switch (error?.ref?.name) {
        case "email":
          return "لطفا آدرس ایمیل خود را وارد نمایید.";
        case "password":
          return "لطفا رمز عبور خود را وارد نمایید.";
        case "username":
          return "لطفا نام کاربری خود را وارد نمایید.";
        default:
          return "";
      }
    };

    return (
      <div className="input-wrapper" style={wrapperStyle && wrapperStyle}>
        <label htmlFor={id} className="label no-select">
          {label}
        </label>
        <div className="input-error-wrapper">
          {error && <i className="icon icon-error" />}
          <input
            type={type || "text"}
            name={name}
            id={id}
            ref={ref}
            placeholder={error && errorMessageProducer()}
            className={`input ${error ? "input-error" : ""}`}
            style={style && style}
          />
        </div>
        {!noBreak && <div className="input-break" />}
      </div>
    );
  }
);

export default Input;
