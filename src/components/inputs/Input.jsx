import React, { forwardRef } from "react";

// Design
import "./inputs.scss";

const Input = forwardRef(
  (
    {
      label,
      name,
      noBreak,
      type,
      id,
      style,
      labelStyle,
      wrapperStyle,
      error,
      autoFocus,
      defaultValue,
      disabled,
      min,
      max,
      value,
      onChange,
    },
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
        case "displayname":
          return ".نام نمایشی خود را وارد کنید";
        case "confirm_email_code":
          return ".کد تایید ایمیل را وارد کنید";
        default:
          return "";
      }
    };

    return (
      <div className="input-wrapper" style={wrapperStyle && wrapperStyle}>
        <label
          htmlFor={id}
          className={`label no-select ${error ? "label-error" : ""}`}
          style={labelStyle && labelStyle}
        >
          {label}
        </label>
        <div className="input-container">
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
            dir="auto"
            defaultValue={defaultValue}
            disabled={disabled}
            min={min}
            max={max}
            value={value}
            onChange={onChange}
          />
        </div>
        {!noBreak && <div className="input-break" />}
      </div>
    );
  }
);

export default Input;
