import React from "react";

// Libraries
import { useSelector, useDispatch } from "react-redux";

// Components
import Email from "./Email";
import Login from "./Login";
import ConfirmEmail from "./ConfirmEmail";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";

// Actions
import { closeLRModal, changePage } from "redux/actions";

// Designs
import "../loginregister.scss";

const RightSide = () => {
  const dispatch = useDispatch();
  const page = useSelector(state => state.LRModal.page);
  const websitePage = useSelector(state => state.page);

  const handleRulesClick = () => {
    dispatch(closeLRModal());
    if (websitePage !== "rules") {
      dispatch(changePage("rules"));
    }
  };

  return (
    <>
      {page === "Email" && <Email />}
      {page === "Login" && <Login />}
      {page === "ConfirmEmail" && <ConfirmEmail />}
      {page === "Register" && <Register />}
      {page === "ForgotPassword" && <ForgotPassword />}
      <div className="usage-agreement">
        ورود یا ثبت‌نام در تایپ‌کافه، به منزله‌ی پذیرش{" "}
        <span className="rules" onClick={handleRulesClick}>
          قوانین
        </span>{" "}
        می‌باشد.
      </div>
    </>
  );
};

export default RightSide;
