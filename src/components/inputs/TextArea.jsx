import { forwardRef } from "react";

// Designs
import "./inputs.scss";

const TextArea = forwardRef(
  ({ label, name, id, onChange, value, className, optional }, ref) => {
    return (
      <div className="textarea-wrapper">
        <label htmlFor={id} className="label no-select">
          {label}
          {optional && <span className="optional"> (اختیاری)</span>}
        </label>
        <textarea
          className={`textarea ${className ? className : ""}`}
          ref={ref}
          id={id}
          name={name}
          onChange={onChange}
          value={value}
        />
      </div>
    );
  }
);

export default TextArea;
