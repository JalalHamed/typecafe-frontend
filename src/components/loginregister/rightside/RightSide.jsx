import React from "react";

// Components
import Email from "./Email";
import Login from "./Login";
import ConfirmEmail from "./ConfirmEmail";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";

// Libraries
import { useSelector } from "react-redux";

// Designs
import "../loginregister.scss";

const RightSide = () => {
  const page = useSelector(state => state.LRModal.page);

  return (
    <>
      {page === "Email" && <Email />}
      {page === "Login" && <Login />}
      {page === "ConfirmEmail" && <ConfirmEmail />}
      {page === "Register" && <Register />}
      {page === "ForgotPassword" && <ForgotPassword />}
    </>
  );
};

export default RightSide;
