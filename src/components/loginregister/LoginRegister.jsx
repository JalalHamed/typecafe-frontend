import React, { useState } from "react";

// Libraries
import { useDispatch } from "react-redux";

// Components
import Login from "./Login";
import Register from "./Register";
import LeftSide from "./LeftSide";

// Actions
import { closeLoginRegisterModal } from "redux/actions";

// Design
import "./loginregister.scss";

const LoginRegister = () => {
  const dispath = useDispatch();
  const [status, setStatus] = useState("login");

  return (
    <div className="lr-wrapper">
      <div
        className="lr-close-modal no-select"
        onClick={() => dispath(closeLoginRegisterModal())}
      >
        x
      </div>
      <div className="lr-right">
        <div className="lr-right-content">
          {status === "login" && <Login />}
          {status === "register" && <Register />}
        </div>
      </div>
      <div className="lr-left">
        <i className="icon icon-typecafe-big" />
        <LeftSide
          setStatus={setStatus}
          title={status === "login" ? "ثبت نام" : "ورود"}
        />
      </div>
    </div>
  );
};

export default LoginRegister;
