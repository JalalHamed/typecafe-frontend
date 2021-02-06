import React, { forwardRef } from "react";

// Designs
import "./inputs.scss";

const TextArea = forwardRef(({ label, name, id, onChange, value }, ref) => {
  return (
    <div className="textarea-wrapper">
      <label htmlFor={id} className="label no-select">
        {label}
      </label>
      <textarea
        className="textarea"
        ref={ref}
        id={id}
        name={name}
        onChange={onChange}
        value={value}
      />
    </div>
  );
});

export default TextArea;
