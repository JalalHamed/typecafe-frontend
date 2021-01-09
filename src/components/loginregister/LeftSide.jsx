import React, { useRef } from "react";

// Components
import Button from "components/buttons/Button";

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
      <div className="register-options-wrapper no-select">
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
      <Button
        title={title}
        ref={ButtonRippleRef}
        onClick={handleClick}
        className="lr-left-button"
      />
    </>
  );
};

export default LeftSide;
