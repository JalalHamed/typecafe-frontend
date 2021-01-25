import React, { forwardRef } from "react";

// Design
import "./inputs.scss";

const Input = forwardRef(
  (
    { label, name, noBreak, type, id, style, wrapperStyle, error, autoFocus },
    ref
  ) => {
    const errorMessageProducer = () => {
      switch (error?.ref?.name) {
        case "email":
          return ".آدرس ایمیل خود را وارد کنید";
        case "password":
          return ".رمز عبور خود را وارد کنید";
        case "confirm_password":
          return ".رمز عبور خود را تایید کنید";
        case "username":
          return ".نام کاربری خود را وارد کنید";
        case "confirm_email_code":
          return ".کد تایید ایمیل را وارد کنید";
        default:
          return "";
      }
    };

    const maxProducer = () => {
      switch (name) {
        case "email":
          return 256;
        case "password":
          return 100;
        case "confirm_password":
          return 100;
        case "username":
          return 20;
        default:
          return undefined;
      }
    };

    return (
      <div className="input-wrapper" style={wrapperStyle && wrapperStyle}>
        <label
          htmlFor={id}
          className={`label no-select ${error ? "label-error" : ""}`}
        >
          {label}
        </label>
        <div className="input-error-wrapper">
          {error && (
            <i
              className={`icon icon-error ${
                error?.ref?.name === "confirm_email_code" ? "confirm-email" : "" // pushes icon to left a little more
              }`}
            />
          )}
          <input
            type={type || "text"}
            name={name}
            id={id}
            ref={ref}
            placeholder={error && errorMessageProducer()}
            className={`input ${error ? "input-error" : ""} ${
              error?.ref?.name === "confirm_email_code" ? "confirm-email" : ""
            }`}
            style={style && style}
            autoFocus={autoFocus}
            max={maxProducer()}
          />
        </div>
        {!noBreak && <div className="input-break" />}
      </div>
    );
  }
);

export default Input;
