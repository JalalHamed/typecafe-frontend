import React, { useRef } from "react";

// Components
import TouchRipple from "components/ripple/TouchRipple";

const LeftSide = ({ setStatus, title }) => {
  const ButtonRippleRef = useRef();

  const handleClick = () => {
    if (title === "ثبت نام") {
      setStatus("register");
    }
    if (title === "ورود") {
      setStatus("login");
    }
  };

  return (
    <>
      <div className="register-options-wrapper">
        <p className="register-options">
          <i className="icon icon-check" />
          ثبت پروژه تایپ
        </p>
        <p className="register-options">
          <i className="icon icon-check" />
          انجام پروژه تایپ
        </p>
        <p className="register-options">
          <i className="icon icon-check" />
          فقط ۵٪ کارمزد
        </p>
      </div>
      <button
        className="lr-left-button"
        onMouseDown={e => {
          ButtonRippleRef.current.start(e);
        }}
        onMouseUp={() => {
          ButtonRippleRef.current.stop();
        }}
        onMouseOut={() => {
          ButtonRippleRef.current.stop();
        }}
        onClick={handleClick}
      >
        {title}
        <TouchRipple ref={ButtonRippleRef} />
      </button>
    </>
  );
};

export default LeftSide;
