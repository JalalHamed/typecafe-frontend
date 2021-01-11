import React, { useRef } from "react";

// Libraries
import { useDispatch, useSelector } from "react-redux";

// Components
import Button from "components/buttons/Button";
import ArrowStem from "./ArrowStem";
import ArrowPoint from "./ArrowPoint";

// Actios
import {
  lRModalLoginFirstMount,
  lRModalRegisterFirstMount,
} from "redux/actions";

const LeftSide = ({ setStatus, title }) => {
  const dispatch = useDispatch();
  const loginFirstMount = useSelector(state => state.lRModal.loginFirstMount);
  const registerFirstMount = useSelector(
    state => state.lRModal.registerFirstMount
  );
  const ButtonRippleRef = useRef();

  const handleClick = () => {
    if (loginFirstMount) dispatch(lRModalLoginFirstMount());
    if (registerFirstMount) dispatch(lRModalRegisterFirstMount());

    if (title === "ثبت‌نام") {
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
          <i className="icon icon-check no-select" />
          ثبت نامحدود پروژه تایپ
        </p>
        <p className="register-options">
          <i className="icon icon-check no-select" />
          انجام نامحدود پروژه تایپ
        </p>
        <p className="register-options">
          <i className="icon icon-check no-select" />
          فقط ۵٪ کارمزد
        </p>
      </div>
      <Button
        title={title}
        ref={ButtonRippleRef}
        onClick={handleClick}
        className="lr-left-button"
      />
      {title === "ثبت‌نام" && loginFirstMount && (
        <>
          <p className="not-a-member no-select">عضو نیستید؟</p>
          <ArrowStem />
          <ArrowPoint />
        </>
      )}
      {title === "ورود" && registerFirstMount && (
        <>
          <p className="not-a-member">عضو هستید؟</p>
          <ArrowStem />
          <ArrowPoint />
        </>
      )}
    </>
  );
};

export default LeftSide;
