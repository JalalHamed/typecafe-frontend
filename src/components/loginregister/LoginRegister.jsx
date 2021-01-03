import React, { useState } from "react";

// Components
import Login from "./Login";
import Register from "./Register";
import LoginLeftSide from "./LoginLeftSide";
import RegisterLeftSide from "./RegisterLeftSide";

// Design
import "./loginregister.scss";

const LoginRegister = () => {
  const [status, setStatus] = useState("login");

  return (
    <div className="lr-wrapper">
      <div className="lr-right">
        <div className="lr-right-content">
          {status === "login" && <Login />}
          {status === "register" && <Register />}
        </div>
      </div>
      <div className="lr-left">
        <i className="icon icon-typecafe-big" />
        {status === "login" && <LoginLeftSide />}
        {status === "register" && <RegisterLeftSide />}
      </div>
    </div>
  );
};

export default LoginRegister;
