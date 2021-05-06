import React, { forwardRef } from "react";

// Components
import { Puffloader } from "components/loader";
import TouchRipple from "components/ripple/TouchRipple";

// Designs
import "./buttons.scss";

const Button = forwardRef(
  ({ className, title, loading, onClick, type, disabled }, ref) => {
    return (
      <button
        className={`button ${className ? className : ""} ${
          disabled ? "disabled" : ""
        }`}
        disabled={loading || disabled}
        onClick={onClick}
        type={type && type}
        onMouseDown={e => {
          ref.current.start(e);
        }}
        onMouseUp={() => {
          ref.current.stop();
        }}
        onMouseOut={() => {
          ref.current.stop();
        }}
      >
        {loading ? (
          <Puffloader color="#fff" loading={loading} size={25} />
        ) : (
          title
        )}
        <TouchRipple ref={ref} />
      </button>
    );
  }
);

export default Button;
