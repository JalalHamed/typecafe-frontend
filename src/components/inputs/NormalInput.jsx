import React, { forwardRef } from "react";

// Design
import "./inputs.scss";

const NormalInput = forwardRef(
  ({ label, name, placeholder, type, id, style }, ref) => {
    return (
      <div className="normal-input-wrapper">
        <label htmlFor={id} className="label no-select">
          {label}
        </label>
        <input
          type={type || "text"}
          name={name}
          id={id}
          ref={ref}
          placeholder={placeholder}
          className="normal-input"
          style={style && style}
        />
      </div>
    );
  }
);

export default NormalInput;
