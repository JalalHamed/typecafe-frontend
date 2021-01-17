import React, { useState } from "react";

// Libraries
import { useDispatch, useSelector } from "react-redux";

// Components
import Login from "./Login";
import Register from "./Register";
import LeftSide from "./LeftSide";
import ForgotPassword from "./ForgotPassword";

// Actions
import { closelRModal } from "redux/actions";

// Design
import "./loginregister.scss";

const LoginRegister = () => {
  const dispath = useDispatch();
  const page = useSelector(state => state.lRModal.page);
  const [status, setStatus] = useState(page);

  return (
    <div className="lr-wrapper">
      <div
        className="lr-close-modal no-select"
        onClick={() => dispath(closelRModal())}
      >
        x
      </div>
      <div className="lr-right">
        {status === "login" && <Login setStatus={setStatus} />}
        {status === "register" && <Register />}
        {status === "forgotPassword" && <ForgotPassword />}
      </div>
      <div className="lr-left">
        <i className="icon icon-typecafe-big no-select" />
        <LeftSide
          setStatus={setStatus}
          title={status === "login" ? "ثبت‌نام" : "ورود"}
        />
      </div>
    </div>
  );
};

export default LoginRegister;
